import { db } from "./firebase_r"
import sendMail from "./email"
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    setDoc,
    updateDoc 
} from "firebase/firestore"
import { generateId } from "./utils"
import * as check from './utils'


enum TShirtSize {
    XS  = "XS",
    S   = "S",
    M   = "M",
    L   = "L",
    XL  = "XL",  
    XXL = "XXL"
}

type Member = {
    name: string
    email: string
    phone: string
    tshirtSize?: TShirtSize
}


export type Team = { 
    name: string
    teamLeader: Member
    member1: Member
    member2: Member
    school: string
    readonly registedAt: string
    accepted?: boolean
    uploadedFiles?: string[]
}


function validateTeamInfo(team: Team){

    function validateMemberInfo(member: Member){
        return check.checkEmail(member.email)
            && check.checkPhone(member.phone)
    }

    return validateMemberInfo(team.teamLeader)
        && validateMemberInfo(team.member1)
        && validateMemberInfo(team.member2)
}


export async function addTeam(team: Team){

    // check the info
    if(!validateTeamInfo(team)){
        console.log("the info are invalid")
        return
    }

    // assign the default value `false` to the `accepted` attribute
    team.accepted = false

    const docRef = doc(db, "teams", generateId())
    setDoc(docRef, team).then(
        _ => {
            sendMail(
                team.teamLeader.email,
                "you're registed successfully",
                "..."
            )
        }
    ).catch(console.error)

}

export async function getTeams() {
    const teamSnapshot = await getDocs(
        collection(db, "teams")
    )
    const teamList = teamSnapshot.docs.map(
        doc => ({
            ref: doc.id,
            ...doc.data()
        })
    )

    return teamList
}

export async function acceptTeam(ref: string) {
    
    const docRef = doc(db, "teams", ref)
    
    getDoc(docRef).then(
        doc => {
            if(!doc.exists()){
                throw new Error("the team does not exists")
            }

            updateDoc(docRef, {accepted:true})
            return ({
                email: doc.data().teamLeader.email as string,
                name:  doc.data().name             as string
            })
        }
    ).then(
        (v) => {
            // TODO: we need a HTML template for a professional mailing
            sendMail(
                v!.email,
                "you're acccepted ",
                "..."
            )
            console.log(`the team ${v!.name} is accepted successfully`)
        }
    ).catch(console.error)

}