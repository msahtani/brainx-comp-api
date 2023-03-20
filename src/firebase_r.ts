import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

  
const app = initializeApp({
    apiKey:            "AIzaSyCDhJlKAzNYWJ_4Lg54y-Ci4_cAEg9ERT0",
    authDomain:        "brainx-comp.firebaseapp.com",
    projectId:         "brainx-comp",
    storageBucket:     "brainx-comp.appspot.com",
    messagingSenderId: "389689288531",
    appId:             "1:389689288531:web:bb8f6dc282e6b5c37e23a6",
    measurementId:     "G-XH1P24TKLF"
})

export const db      = getFirestore(app)
export const storage = getStorage(app);