 
import bee_data from  '../beeInfo/bee_data.json';
 //check if current location is in the UK
 const inUK = (lat:number, long:number)=>{
    if(lat<40 || lat>60){
        throw new Error("Not in the UK-lat")
    }else if (long<-10|| long>20){
        throw new Error("Not in the UK- long")
    }else{
        return "In the UK"
    }
  }

  const latStart = 40
  const longStart = -10
  const interval = 0.5
//change index
const latLongIndex = (pos:any, start:number, intervals:number)=>{
    let difference = pos - start;
    let division = difference/0.5;
    return division-1;
}
var today = new Date();

export function getBees (lat:number, long:number){
    
    inUK(lat, long)
    console.log(inUK(lat, long));     
    let beelist =  Object.values(bee_data);
    console.log(beelist[Math.floor(latLongIndex(lat, latStart, interval))])
    let selected:number[]|any= beelist[Math.floor(latLongIndex(lat, latStart, interval))][Math.floor(latLongIndex(long, longStart, interval))][1]
  
   return selected.filter((species: any)=>species>0&&species!=26)
}