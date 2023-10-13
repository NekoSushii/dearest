import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function Game(){
    const[isLoading, setIsLoading] = useState(true)

    
    useEffect(() => {

        async function fetchData(){
          await getDocs(collection(db, 'game')).then((response: any) => {
    
            let tempEvents = response.docs.map((val: { data: () => any; },key: any)=>({data: val.data()}))
    
            for(let i=0; i<tempEvents.length; i++){
            }
            setIsLoading(false)
        });}
    
        fetchData()
        
      },[])

    return(
        <div>

        </div>
    )
}

export default Game