import { collection, getDocs } from 'firebase/firestore';
import {db} from './firebase'

async function restAPI(requestType: string, writeDetails?: string) {

    var events = ''
    await getDocs(collection(db, 'events')).then((response: any) => {
        let tempEvents = response.docs.map((val: { data: () => any; },key: any)=>({data: val.data()}))
        events = tempEvents[0].data
    });
    

    if(requestType === 'read'){
        return events
    }

    if(requestType === 'write'){

    }
}

export default restAPI