import { db } from "./firebase_r"
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
    XS, // extra-small
    S,  // small
    M,  // medium
    L,  // large
    XL, // extra-large
    XXL // double extra-large
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
    setDoc(docRef, team)

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
                console.log("the team does not exists")
                return
            }
            
            const teamName = doc.data()["name"]

            updateDoc(docRef, {accepted:true}).then(
                _ => console.log(`the team ${teamName} is accepted successfully`)
            )
        }
    ).catch(
        err => console.log(err)
    )

}