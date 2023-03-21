import { collection, getDocs } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";
import {db} from './firebase_r'
import { generateId } from './utils';

export interface Contact {
    name:     string
    email:    string
    subject?: string
    message:  string
}


// Get a list of contacts from the database
export async function getContacts(){
    const contactCol = collection(db, 'contact')
    const contactSnapshot = await getDocs(contactCol)
    const contactList = contactSnapshot.docs.map(
        doc => doc.data()
    )

    return contactList
}

// add the contact to the database
export async function addContact(contact: Contact){
    const docRef = doc(db, "contact", generateId())
    setDoc(docRef, contact).then(
        () => console.log("added successfully")
    )
}
