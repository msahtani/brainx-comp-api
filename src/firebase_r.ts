import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import env from "dotenv"

env.config()

const e = process.env

const app = initializeApp({
    apiKey:            e.F_API_KEY ,
    authDomain:        e.F_AUTH_DOMAIN,
    projectId:         e.F_PROJECT_ID,
    storageBucket:     e.F_STORAGE_BUCKET,
    messagingSenderId: e.F_MESSAGING_SENDER,
    appId:             e.F_APP_ID,
    measurementId:     e.F_MEASUREMENT_ID,
})

export const db      = getFirestore(app)
