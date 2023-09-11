import './Home.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import Calendar from './Calendar';

function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelectDate = (date: Date) => {
    setOpen(true)
  };

  const handleSelectDateClose = () =>{
    setOpen(false)
  }
  
  return (
    <div className="App">
      <Router>
      <Calendar currentDate={new Date()} onSelectDate={handleSelectDate} />
      <Dialog open={open} onClose={handleSelectDateClose}>
      <DialogTitle>Material-UI Dialog</DialogTitle>
        <DialogContent>
          {}
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
