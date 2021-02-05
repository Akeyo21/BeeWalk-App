/**
 * File holding the information on the different species in the UK
 */
export class Bee{
    common:string
    scientific:string
    caste:Caste[]
    constructor(common:string, scientific:string, caste:Caste[]){
        this.common = common;
        this.scientific = scientific;
        this.caste = caste;
    }
    getCommon(){
        return this.common;
    }
    getScientific(){
        return this.scientific;
    }
    getCaste(){
        return this.caste;
    }
}
export enum Caste{
    Queen = "Queen",
    Male = "Male",
    Worker= "Worker",
    Female = "Female",
    Unknown = "Unknown"
}
const allCastes = [Caste.Male, Caste.Queen,Caste.Unknown, Caste.Worker]
const twoCastes = [Caste.Male, Caste.Female, Caste.Unknown]
//whitetailed bumblebees
////social bumblebees
const ws1 = new Bee("Buff-tailed bumblebee", "Bombus terrestris", allCastes)
const ws2 = new Bee("White-tailed bumblebee","Bombus lucorum", allCastes)
const ws3 = new Bee("Tree bumblebee","Bombus hypnorum", allCastes)
const ws4 = new Bee("Garden bumblebee","Bombus hortorum", allCastes)
const ws5 = new Bee("Heath bumblebee","Bombus jonellus", allCastes)
const ws6 = new Bee("Ruderal bumblebee","Bombus ruderatus",[Caste.Queen])
const ws7 = new Bee("Brokwn-belted bumblebee","Bombus soroeensis",allCastes)

//cuckoo bumblebees
const wc1 = new Bee("Southern cuckoo bumblebee","Bombus vestalis", twoCastes)
const wc2 = new Bee("Gypsy cuckoo bumblebee","Bombus bohemicus", twoCastes)
const wc3 = new Bee("Forest cuckoo bumblebee","Bombus sylvestris", twoCastes)
const wc4 = new Bee("Barbuts cuckoo bumblebee","Bombus barbetellus", twoCastes)

const whiteSocial = [ws1, ws2, ws3, ws4, ws5, ws6, ws7]
const whiteCuckoo = [wc1, wc2, wc3, wc4]
export const whiteTailed = {whiteSocial, whiteCuckoo}


//Red-tailed bumblebees
////socialbumblebees
const rs1 = new Bee("Red-tailed bumblebee","Bombus lapidarius",allCastes)
const rs2 = new Bee("Early bumblebee","Bombus pratorum",allCastes)
const rs3 = new Bee("Red-shanked bumblebee","Bombus ruderarius",allCastes)
const rs4 = new Bee("Billberry bumblebee","Bombus monticola",allCastes)
//cuckoo bumblebees
const rc1 = new Bee("Red-tailed cuckoo bumblebee","Bombus rupestris",twoCastes)
const redSocial = [rs1, rs2, rs3, rs4]
const redCuckoo = [rc1]
export const redTailed = {redSocial, redCuckoo}


//ginger-yellow bumblebees
//social bumblebees
const gs1 = new Bee("Common carder bee","Bombus pascuorum",allCastes)
const gs2= new Bee("Brown-banded carder bee","Bombus humilis",allCastes)
const gs3 = new Bee("Moss carder bee","Bombus muscorum",allCastes)
const gs4 = new Bee("Great yellow bumblebee","Bombus distinguendus",allCastes)
const gs5 = new Bee("Shrill carder bee","Bombus sylvarum",allCastes)
//cuckoo bumblebees
const gc1 = new Bee("Field cuckoo bumblebee","Bombus campestris",twoCastes)
const gingerSocial = [gs1, gs2, gs3, gs4, gs5]
const gingerCuckoo = [gc1]
export const gingerYellow = {gingerSocial, gingerCuckoo}