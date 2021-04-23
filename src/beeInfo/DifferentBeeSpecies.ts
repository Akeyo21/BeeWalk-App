/**
 * File holding the information on the different species in the UK
 */
export class Bee{
    common:string
    scientific:string
    caste:Caste[]
    image: string
    constructor(common:string, scientific:string, caste:Caste[], image:string){
        this.common = common;
        this.scientific = scientific;
        this.caste = caste;
        this.image = image;
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

    getImage(){
        return this.image;
    }
}
export enum Caste{
    Queen = "Queen",
    Male = "Male",
    Worker= "Worker",
    Female = "Female",
    Unknown = "Unknown"
}
export const allCastes = [Caste.Male, Caste.Queen,Caste.Unknown, Caste.Worker]
const twoCastes = [Caste.Male, Caste.Female, Caste.Unknown]

//whitetailed bumblebees
////social bumblebees
const ws1 = new Bee("Buff-tailed bumblebee", "Bombus terrestris", allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Buff-tailed-bumblebee-1.png");
const ws2 = new Bee("White-tailed bumblebee","Bombus lucorum", allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/White-tailed-bumblebee-1.png");
const ws3 = new Bee("Tree bumblebee","Bombus hypnorum", allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Tree-bumblebee-1.png")
const ws4 = new Bee("Garden bumblebee","Bombus hortorum", allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Garden-bumblebee-1.png")
const ws5 = new Bee("Heath bumblebee","Bombus jonellus", allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Heath-bumblebee-1.png")
const ws6 = new Bee("Ruderal bumblebee","Bombus ruderatus",[Caste.Queen], "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Ruderal-bumblebee-1.png")
const ws7 = new Bee("Broken-belted bumblebee","Bombus soroeensis",allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Broken-belted-bumblebee-1.png")

//cuckoo bumblebees
const wc1 = new Bee("Southern cuckoo bumblebee","Bombus vestalis", twoCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Southern-cuckoo-bumblebee-1.png")
const wc2 = new Bee("Gypsy cuckoo bumblebee","Bombus bohemicus", twoCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Gypsy-cuckoo-bumblebee-1.png")
const wc3 = new Bee("Forest cuckoo bumblebee","Bombus sylvestris", twoCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Forest-cuckoo-bumblebee-1.png")
const wc4 = new Bee("Barbuts cuckoo bumblebee","Bombus barbetellus", twoCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Barbuts-cuckoo-bumblebee-1.png")

const whiteSocial = [ws1, ws2, ws3, ws4, ws5, ws6, ws7]
const whiteCuckoo = [wc1, wc2, wc3, wc4]
export const whiteTailed = {whiteSocial, whiteCuckoo}


//Red-tailed bumblebees
////socialbumblebees
const rs1 = new Bee("Red-tailed bumblebee","Bombus lapidarius",allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Red-tailed-bumblebee-1.png")
const rs2 = new Bee("Early bumblebee","Bombus pratorum",allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Early-bumblebee-1.png")
const rs3 = new Bee("Red-shanked bumblebee","Bombus ruderarius",allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Red-shanked-bumblebee-1.png")
const rs4 = new Bee("Billberry bumblebee","Bombus monticola",allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Bilberry-bumblebee-1.png")
//cuckoo bumblebees
const rc1 = new Bee("Red-tailed cuckoo bumblebee","Bombus rupestris",twoCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Red-tailed-cuckoo-bumblebee-1.png")
const redSocial = [rs1, rs2, rs3, rs4]
const redCuckoo = [rc1]
export const redTailed = {redSocial, redCuckoo}


//ginger-yellow bumblebees
//social bumblebees
const gs1 = new Bee("Common carder bee","Bombus pascuorum",allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Common-carder-bee-1.png")
const gs2= new Bee("Brown-banded carder bee","Bombus humilis",allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Brown-banded-carder-bee-1.png")
const gs3 = new Bee("Moss carder bee","Bombus muscorum",allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Moss-carder-bee-1.png")
const gs4 = new Bee("Great yellow bumblebee","Bombus distinguendus",allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Great-yellow-bumblebee-1.png")
const gs5 = new Bee("Shrill carder bee","Bombus sylvarum",allCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Shrill-carder-bee-1.png")
//cuckoo bumblebees
const gc1 = new Bee("Field cuckoo bumblebee","Bombus campestris",twoCastes, "https://www.bumblebeeconservation.org/wp-content/uploads/2019/01/Field-cuckoo-bumblebee-1.png")
const gingerSocial = [gs1, gs2, gs3, gs4, gs5]
const gingerCuckoo = [gc1]
export const gingerYellow = {gingerSocial, gingerCuckoo}

const bumble = new Bee("", "", allCastes, "")
const confusion = new Bee("", "", allCastes, "")
const beelist :Bee[]= [bumble,confusion]
export const allBees = beelist.concat(whiteCuckoo, whiteSocial, redSocial, redCuckoo, gingerSocial, gingerCuckoo)
