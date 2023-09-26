import './Calendar.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { db } from './firebase';

import CalendarCells from './CalendarCells';
import { collection, getDocs } from 'firebase/firestore';

function Calendar() {
  const [open, setOpen] = useState(false)


  //function that opens the modal when user selects the date
  const handleSelectDate = (date: Date) => {
    setOpen(true)
  };


  //create the elements that should be showned within the dialog
  const dialogContent = () => {
    
    return('Hello')
  }


  //function that closes the modal when user exits the modal
  const handleSelectDateClose = () =>{
    setOpen(false)
  }


  //create the html elements
  return (
    <div className="App">
      <CalendarCells currentDate={new Date()} onSelectDate={handleSelectDate} />
      <Dialog open={open} onClose={handleSelectDateClose}>
      <DialogTitle className='dialog-title'>Title Placeholder</DialogTitle>
      <DialogContent>
        <p>{dialogContent()}</p>
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
    </div>
  );
}

export default Calendar;
