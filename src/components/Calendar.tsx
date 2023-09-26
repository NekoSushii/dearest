import '../style/Calendar.css'

import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth } from 'date-fns';
import { db } from '../firebase';

import { collection, getDocs } from 'firebase/firestore';

function Calendar() {
  let currentDate = new Date()
  let totalEventList: (any)[][] = []
  const [open, setOpen] = useState(false)
  const [currentDateState, setCurrentDate] = useState(currentDate);
  const [eventsData, setEventsData] = useState<any[]>([])
  const [currentMonthState, setCurrentMonthState] = useState(currentDate.getMonth())
  const [isLoading, setIsLoading] = useState(true)


  //fetch the data from firebase into a useState
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
          startDateList.push(FirebaseDateDecoder(tempEvents[i].data.startDateTime))
          endDateList.push(FirebaseDateDecoder(tempEvents[i].data.endDateTime))
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
  },[currentDate, setCurrentDate])


  //function to decode the date-string to Date object that is stored within firebase
  const FirebaseDateDecoder = (aDateString: string) =>{
    const [datePart, timePart] = aDateString.split(' ')
    const [day, month, year] = datePart.split('-')
    const [hours, minutes, seconds] = timePart.split(':')
    const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds))

    return date
  }



  //function to encode the date-string that will be stored within firebase
  const FirebaseDateEncoder = () => {
    
  }



  //function to populate the events that will exist within the date of the cell
  const renderCurrentDayEvents = (date: Date) => {
    const startDateList = eventsData[0]
    const endDateList = eventsData[1]
    const eventList = eventsData[2]
    const locationList = eventsData[3]
    const commentsList = eventsData[4]
    const dateFormatted: Date = new Date(formatDateWithoutTime(date))
    const listOfMatchedEvents = []
    const listOfMatchedEventIndex: (number)[] = []

    //push into a list the index of events that includes the cell's dates
    for(let i=0; i<startDateList.length; i++){
      const startDateFormatted: Date = new Date(formatDateWithoutTime(startDateList[i]))
      const endDateFormatted: Date = new Date(formatDateWithoutTime(endDateList[i]))
      
      if(dateFormatted >= startDateFormatted && dateFormatted <= endDateFormatted){
        listOfMatchedEventIndex.push(i)
      }
    }

    //if the list of index of events contains 2 or more numbers, sort the list of index of events to which event has the earliest start date
    //the earliest start date will be placed at the start of the cell
    if(listOfMatchedEventIndex.length > 1){
      for(let i=0; i<listOfMatchedEventIndex.length; i++){

        const DateSorter = (index: number ) =>{
          for(let j=index+1; j<listOfMatchedEventIndex.length-(i); j++){

            if(listOfMatchedEventIndex[0] === undefined){
              listOfMatchedEventIndex.shift()
            }

            const pointerFormattedDate: Date = new Date(formatDateWithoutTime(startDateList[listOfMatchedEventIndex[index]]))
            const interateFormattedDate: Date = new Date(formatDateWithoutTime(startDateList[listOfMatchedEventIndex[j]]))
            if(pointerFormattedDate > interateFormattedDate){
              let temp = listOfMatchedEventIndex[j+1]
              listOfMatchedEventIndex[j+1] = listOfMatchedEventIndex[index]
              listOfMatchedEventIndex[index] = temp
              return true
            }
            else{
              return false
            }

          }
        }
  
        while(DateSorter(i) === true){
          DateSorter(i)
        }

      }
    }

    //Once the list of index of events is sorted, push into a list html elements of the event with style
    for(let i=0; i<listOfMatchedEventIndex.length; i++){
      let currentIndex = listOfMatchedEventIndex[i]
      eventList.push([startDateList[currentIndex], endDateList[currentIndex], eventList[currentIndex], commentsList[currentIndex], locationList[currentIndex]])

      if(eventList[currentIndex] === 'food'){
        listOfMatchedEvents.push(<div style={{ background: "aqua", margin: '3px' }}>{commentsList[currentIndex]}</div>)
      }
  
      if(eventList[currentIndex] === 'travel'){
        listOfMatchedEvents.push(<div style={{ background: "aquamarine", margin: '3px' }} >{locationList[currentIndex]}</div>)
      }
  
      if(eventList[currentIndex] === 'others'){
        listOfMatchedEvents.push(<div style={{ background: 'lemonchiffon ', margin: '3px'}}>{commentsList[currentIndex]}</div>)
      }
    }
    
    //populated the cell with the list of html elements to be created
    if(listOfMatchedEvents.length > 0){
      totalEventList.push([date, eventList])
      // console.log(date)
      // console.log(eventList)

      return(
        <div>
            {listOfMatchedEvents}
        </div>
      ) 
    }

  }


  //function used to remove time from any Date
  function formatDateWithoutTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  


  //functional component that creates html elements and logic to update state of calendar month
  const renderHeader = () => {
    return (
      <div className="header">
        <button onClick={prevMonth}>Prev</button>
        <h2>{format(currentDateState, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth}>Next</button>
      </div>
    );
  };


  //functional component that creates html element and logic to create the monday to sunday header for each week
  const renderDays = () => {
    const dateFormat = 'eeee';
    const days = [];
    let startDate = startOfWeek(currentDateState);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days">{days}</div>;
  };

  
  //functional component that creates html element and logic to create the cells and the logic to compute the date of the cell
  //as well as control the styling of the cell to include previous and upcmomming days of previous and future month
  const renderCells = () => {
    const monthStart = startOfMonth(currentDateState);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`cell ${!isSameMonth(day, monthStart) ? 'disabled' : ''}`}
            key={day.toString()}
            onClick={() => handleDialogOpen(cloneDay)}
          >
            {formattedDate}
            {GetCellType(formattedDate)}
            {isLoading ? (<p>Loading...</p>) : (renderCurrentDayEvents(day))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  };


  //function to check the type of the cell for the above function
  const GetCellType = (formattedDate: String) =>{
    return(
      <div className=''></div>
    )
  }

  
  //function that updates the month state when the previous month button is pushed
  const prevMonth = () => {
    setCurrentDate((prevDate) => addDays(startOfMonth(prevDate), -1));
    setCurrentMonthState(currentMonthState - 1)
  };


  //function that updates the month state when the next month button is pushed
  const nextMonth = () => {
    setCurrentDate((prevDate) => addDays(endOfMonth(prevDate), 1));
    setCurrentMonthState(currentMonthState + 1)
  };


  //function that opens the modal when user clicks on a date cell
  const handleDialogOpen = (date: Date) => {
    setOpen(true)
    setCurrentDate(date);
  };


  //function that closes the modal when user exits the modal
  const handleDialogClose = () =>{
    setOpen(false)
  }


  //create the elements that should be showned within the dialog
  const dialogContent = () => {
    let date = new Date()
    let eventList = []

    for(let i=0; i<totalEventList.length; i++){
      let event = totalEventList[i]
      date = new Date(formatDateWithoutTime(event[0]))
      eventList = event[1]
    }
    
    return('Hello')
  }


  //create the html elements
  return (
    <div className="App">
      <div className="calendar-container">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle className='dialog-title'>Title Placeholder</DialogTitle>
      <DialogContent>
        <p>{dialogContent()}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Close
        </Button>
        <Button onClick={handleDialogClose} color="primary">
          Save
        </Button>
      </DialogActions>
      </Dialog>
    </div>
  );
}

export default Calendar;
