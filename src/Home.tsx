import './Home.css';
import restAPI from './controller';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { db } from './firebase';

import Calendar from './Calendar';
import { collection, getDocs } from 'firebase/firestore';

function Home() {
  const [open, setOpen] = useState(false);
  const [eventsData, setEventsData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    async function fetchData(){
      await getDocs(collection(db, 'events')).then((response: any) => {

        let tempEvents = response.docs.map((val: { data: () => any; },key: any)=>({data: val.data()}))
        const startDateList = []
        const endDateList = []
        const eventList = []
        const locationList = []
        const commentList = []

        for(let i=0; i<tempEvents.length; i++){
          startDateList.push(tempEvents[i].data.startDateTime.toDate())
          endDateList.push(tempEvents[i].data.endDateTime.toDate())
          eventList.push(tempEvents[i].data.event)
          locationList.push(tempEvents[i].data.location)
          commentList.push(tempEvents[i].data.comments)
        }

        const combinedList = []
        combinedList.push(startDateList, endDateList, eventList, locationList, commentList)
        setEventsData(combinedList)
        setIsLoading(false)
    });}

    fetchData()
  },[])

  const handleSelectDate = (date: Date) => {
    setOpen(true)
  };

  const handleSelectDateClose = () =>{
    setOpen(false)
  }

  const dialogTitle = () => {
  }
  
  return (
    <div className="App">
      <Router>
      <Calendar currentDate={new Date()} onSelectDate={handleSelectDate} />
      <Dialog open={open} onClose={handleSelectDateClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSelectDateClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSelectDateClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </Router>
    </div>
  );
}

export default Home;
