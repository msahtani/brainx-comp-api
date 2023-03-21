import { collection, getDocs } from 'firebase/firestore'
import { doc, setDoc }         from "firebase/firestore"
import { db }                  from './firebase_r'
import { randomUUID }          from 'crypto'

export type Contact = {
    name:     string
    email:    string
    subject?: string
    message:  string
}

// Get a list of contacts from the database
export async function getContacts(){
    
    const contactSnapshot = await getDocs(
        collection(db, 'contact')
    )
    
    return contactSnapshot
        .docs
        .map(
            doc => doc.data()
        )
}

// add the contact to the database
export async function addContact(contact: Contact){
    const docRef = doc(
        db, "contact",
        randomUUID({disableEntropyCache: true})
    )
    setDoc(docRef, contact).then(
        () => console.log("added successfully")
    )
}