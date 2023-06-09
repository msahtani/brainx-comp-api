import {addContact, Contact, getContacts} from "./contact"

import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import fileUpload, { UploadedFile } from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import { acceptTeam, addTeam, getTeams, Team} from "./teams";

env.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload({ createParentPath: true }))
app.use(cors())
app.use(morgan('dev'));

/* ====== routes for contact ====== */
app.get("/contact", async (req, res) => {

    // check the api key
    if(req.query.api_key != process.env.API_KEY) 
    {
        res.sendStatus(403)
        return
    }
    
    res
        .send(await getContacts())
        .sendStatus(200)
})

app.post("/contact", async (req, res) => {
    const contactForm = req.body as Contact
    addContact(contactForm)
    res
        .send("sent successfully")
        .sendStatus(201) // CREATED
})


/* ====== routes for teams ====== */
app.post("/apply", async (req, res) => {

    const team : Team = {
        name: req.body.teamName,
        teamLeader: {
            name: req.body.teamLeaderName,
            email: req.body.teamLeaderEmail,
            phone: req.body.teamLeaderPhone
        },
        member1: {
            name: req.body.member1Name,
            email: req.body.member1Email,
            phone: req.body.member1Phone
        },
        member2: {
            name: req.body.member2Name,
            email: req.body.member2Email,
            phone: req.body.member2Phone
        },
        school: req.body.school,
        registedAt: new Date().toLocaleString()
    }

    // handle files uploads
    if(req.files){
        const files = req.files.attachments as UploadedFile[]
        
        team.uploadedFiles = files.map(
            file => {
                let tmpSplit = file.name.split(".")
                const ext = tmpSplit[tmpSplit.length - 1]
                const fileName = `${Date.now()}-${team.name}.${ext}`
                file.mv(`./uploads/${fileName}`)
                return fileName
            }
        )
    }

    // register the team into the database
    await addTeam(team)

    res.send("sent successfully")
})

app.put("/accept/:teamRef", async(req, res) => {

    // check the API key
    if(req.query.api_key != process.env.API_KEY){
        res.send("unauthorized").sendStatus(403)
    }

    const ref = req.params.teamRef

    await acceptTeam(ref)

    res.sendStatus(204)
})

app.get("/applied_teams", async (req, res) => {

    if(req.query.api_key != process.env.API_KEY){
        res.send("unauthorized").sendStatus(403)
    }

    res.send(
        await getTeams()
    )
})

app.get("/attachment", (req, res) => {
    // res.download("./uploads/1679351164944-blackscreen.js")

})


/* ====== listen to the app ====== */
app.listen(PORT, () => {
    console.log(
        `server started at http://localhost:${PORT}/`
    )
})