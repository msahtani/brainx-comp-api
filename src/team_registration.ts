import { db } from "./firebase_r"
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    setDoc,
    updateDoc 
} from "firebase/firestore"
import { generateId } from "./generate_id"
import * as check from './checks'

interface Member {
    name: string
    email: string
    phone: string
}


export interface Team { 
    name: string
    teamLeader: Member
    member1: Member
    member2: Member
    schoool: string
    readonly registedAt: string
    accepted?: boolean
    uploadedFiles?: string[]
}

class MemberValidator{

    #email: string
    #phone: string

    constructor(member: Member){
        this.#email = member.email
        this.#phone = member.phone
    }

    validate(): boolean{
        return check.checkEmail(this.#email)
            && check.checkPhone(this.#phone)
    }

}

class TeamValidator{

    #mValidators: MemberValidator[]

    constructor(team: Team) {
        this.#mValidators = new Array<MemberValidator>()
        this.#mValidators.push(
            new MemberValidator(team.teamLeader),
            new MemberValidator(team.member1),
            new MemberValidator(team.member2)
        )
    }


    validate(): boolean{
        return this.#mValidators.reduce(
            (b, m) => b && m.validate(), true
        )
    }

}


export async function addTeam(team: Team){

    // check the info
    const teamValidator = new TeamValidator(team)
    if(!teamValidator.validate()){
        console.log("the info are invalid")
        return
    }

    // assign the default value `false` to the `accepted` attribute
    team.accepted = false


    const docRef = doc(db, "registration", generateId())
    setDoc(docRef, team)

}

export async function getTeams() {
    const teamCol = collection(db, "teams")
    const teamSnapshot = await getDocs(teamCol)
    const teamList = teamSnapshot.docs.map(
        doc => doc.data()
    )

    return teamList
}

export async function acceptTeam(ref: string) {
    
    const docRef = doc(db, "registration", ref)
    
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