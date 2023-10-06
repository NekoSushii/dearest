import '../style/Calendar.css'

import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth } from 'date-fns';
import { db } from '../firebase';
import { toast} from "react-toastify";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Calendar() {
  let currentDate = new Date()
  const [open, setOpen] = useState(false)
  const [currentDateState, setCurrentDate] = useState(currentDate);
  const [eventsData, setEventsData] = useState<any[]>([])
  const [currentMonthState, setCurrentMonthState] = useState(currentDate.getMonth())
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStartDate, setselectedStartDate] = React.useState<Dayjs | null>(dayjs(currentDateState));
  const [selectedEndDate, setselectedEndDate] = React.useState<Dayjs | null>(dayjs(currentDateState));
  const [selectedEvent, setSelectedEvent] =  React.useState('')
  const [toggleDialog, setToggleDialog] = React.useState(false)
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isShown, setIsShown] = useState(false)

  
  const startTime = 1
  const endTime = 23


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

  useEffect(() => {
    setTimeSlots(generateTimeSlots());
  }, []);


  //function to decode the date-string to Date object that is stored within firebase
  const FirebaseDateDecoder = (aDateString: string) =>{
    const [datePart, timePart] = aDateString.split(' ')
    const [day, month, year] = datePart.split('-')
    const [hours, minutes, seconds] = timePart.split(':')
    const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds))

    return date
  }



  //function to encode the date-string that will be stored within firebase
  const FirebaseDateEncoder = (date: Date, dateOnly?: boolean) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
  const dateString = date.toLocaleDateString('en-SG', options).split('/').join('-')
  const timeString = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const customFormattedString = `${dateString} ${timeString}`;

  if(dateOnly === true){
    return(dateString)
  }
  else if(dateOnly ===false){
    return(timeString)
  }

  return(customFormattedString)
  }



  function GetMatchedEventIndex(date: Date){
    const startDateList = eventsData[0]
    const endDateList = eventsData[1]
    var listOfMatchedEventIndex: (number)[] = []
    const dateFormatted: Date = new Date(formatDateWithoutTime(date))

    if(startDateList === undefined){
      return
    }

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

    return listOfMatchedEventIndex
  }



  //function to populate the events that will exist within the date of the cell
  const renderCurrentDayEvents = (date: Date) => {
    const startDateList = eventsData[0]
    const endDateList = eventsData[1]
    const eventList = eventsData[2]
    const locationList = eventsData[3]
    const commentsList = eventsData[4]
    const listOfMatchedEvents = []
    var listOfMatchedEventIndex: (number)[] = []

    listOfMatchedEventIndex = GetMatchedEventIndex(date) || []

    //Once the list of index of events is sorted, push into a list html elements of the event with style
    for(let i=0; i<listOfMatchedEventIndex.length; i++){
      let currentIndex = listOfMatchedEventIndex[i]
      eventList.push([startDateList[currentIndex], endDateList[currentIndex], eventList[currentIndex], commentsList[currentIndex], locationList[currentIndex]])

      if(eventList[currentIndex] === 'food'){
        listOfMatchedEvents.push(<div style={{ background: "aqua", margin: '5px', borderRadius: '5px', padding: '3px' }}>{commentsList[currentIndex]}</div>)
      }
  
      if(eventList[currentIndex] === 'travel'){
        listOfMatchedEvents.push(<div style={{ background: "aquamarine", margin: '5px', borderRadius: '5px', padding: '3px' }} >{commentsList[currentIndex]}</div>)
      }
  
      if(eventList[currentIndex] === 'others'){
        listOfMatchedEvents.push(<div style={{ background: 'lemonchiffon ', margin: '5px', borderRadius: '5px', padding: '3px' }}>{commentsList[currentIndex]}</div>)
      }
    }
    
    //populated the cell with the list of html elements to be created
    if(listOfMatchedEvents.length > 0){
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



  function FormatDateToText(date: Date){
    const dateString = format(date, 'dd MMMM yyyy')

    return(dateString)
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
    let startDate = startOfWeek(currentDateState, {weekStartsOn: 1});

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
    const startDate = startOfWeek(monthStart, {weekStartsOn: 1});
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
    setCurrentDate(date);
    setselectedStartDate(dayjs(date))
    setselectedEndDate(dayjs(date))
    setOpen(true)
  };


  //function that closes the modal when user exits the modal
  const handleDialogClose = () =>{
    setOpen(false)
    setSelectedEvent('')
    setToggleDialog(false)
  }


  const handleDialogSubmit = (values: any, {resetForm}: any) => {
    const dbRef = collection(db, "events")

    if(selectedStartDate?.toDate() !== undefined){
      let localStartDate = FirebaseDateEncoder(selectedStartDate?.toDate())

      if(selectedEndDate?.toDate() !== undefined){
        let localEndDate = FirebaseDateEncoder(selectedEndDate?.toDate())

        const dataToStore = {
          event: selectedEvent,
          comments: values.comments,
          startDateTime: localStartDate,
          endDateTime: localEndDate,
          location: values.location
        }
    
        addDoc(dbRef, dataToStore).then(response => {
          toast.success(response)
        })
        .catch(error => {
          console.log(error)
        })
    
        setOpen(false)
      }
    }
  }


  async function DeleteEvent(index: number){
    const dbRef = collection(db, "events")
    const startDateList = eventsData[0]
    const endDateList = eventsData[1]
    const eventList = eventsData[2]
    const locationList = eventsData[3]
    const commentsList = eventsData[4]
    var commentID: string[] = []
    var startID: string[] = []

    const q1 = query(dbRef, where('comments', '==', commentsList[index]))
    const querySnapshot1 = await getDocs(q1)
    querySnapshot1.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data())
      commentID.push(doc.id)
    })

    const q2 = query(dbRef, where('startDateTime', '==', startDateList[index]))
    const querySnapshot2 = await getDocs(q1)
    querySnapshot2.forEach((doc) => {
      startID.push(doc.id)
    })

    for(let i=0; i<commentID.length; i++){
      for(let j=0; j<startID.length; j++){
        if(commentID[i] === startID[j]){
          // eslint-disable-next-line no-restricted-globals
          if(confirm('Delete Event?') === true){
            await deleteDoc(doc(db, 'events', commentID[i])).then
            (response => {
              toast.success('Deleted')
            })
          }
        }
      }
    }
  }


  const swapDialog = () => {
    if(toggleDialog === true){
      setToggleDialog(false)
    }

    else{
      setToggleDialog(true)
    }
  }


  const generateTimeSlots = () => {
    const slots: string[] = []

    for (let hour=startTime; hour<=endTime; hour++){
      for (let minutes=0; minutes<60; minutes += 30){
        const time = `${hour}:${minutes === 0 ? '00' : minutes}`
        slots.push(time)
      }
    }

    return slots
  }


  //create the elements that should be showned within the dialog
  const dialogContent = () => {

    const initialValues = {
    }

    const validationSchema = Yup.object().shape({
      comments: Yup.string().nullable().required('Description is required'),
      location: Yup.string().nullable().required('location isrequired'),
    })

    const handleEventChange = (event: SelectChangeEvent) => {
      setSelectedEvent(event.target.value as string);
    };

    const backToTime = (timeString: String) => {
      const [hours, minutes] = timeString.split(':').map(Number)

      if (!isNaN(hours) && !isNaN(minutes)) {
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return(date)
      }
      else return(new Date())
    }


    //toggle starts
    if(toggleDialog === false){
      var listOfMatchedEventIndex: (number)[] = []

      listOfMatchedEventIndex = GetMatchedEventIndex(currentDateState) || []
      // console.log(listOfMatchedEventIndex.length)
      
      const renderDialogEvents = () => {
        const startDateList = eventsData[0]
        const endDateList = eventsData[1]
        const eventList = eventsData[2]
        const locationList = eventsData[3]
        const commentsList = eventsData[4]
        var outputList = []

        const getOnlyHoursMinutes = (date: Date) => {
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');

          return `${hours}:${minutes}`;
        }

        function hover(e: any) {
          e.target.style.cursor = 'pointer';
        }

        if(listOfMatchedEventIndex.length > 0){
          for (let i=0; i<listOfMatchedEventIndex.length; i++){
            var eventsList = []
            for (let hour=startTime; hour<=endTime; hour++){
              for (let minutes=0; minutes<60; minutes += 30){
                const time = `${hour}:${minutes === 0 ? '00' : minutes}`
                const startTimeString: String = getOnlyHoursMinutes(startDateList[listOfMatchedEventIndex[i]])
                const endTimeString: String = getOnlyHoursMinutes(endDateList[listOfMatchedEventIndex[i]])

                const startTime = backToTime(startTimeString)
                const endTime = backToTime(endTimeString)
                const currentTime = backToTime(time)

                if(currentTime >= startTime && currentTime <= endTime){
                  if(eventList[listOfMatchedEventIndex[i]] === 'food'){
                    eventsList.push(<div className='emptydiv' style={{background: 'aqua'}} onClick={() => DeleteEvent(listOfMatchedEventIndex[i])} onMouseOver={hover} onMouseEnter={() => setIsShown(true)}>{commentsList[listOfMatchedEventIndex[i]]}</div>)
                  }

                  if(eventList[listOfMatchedEventIndex[i]] === 'travel'){
                    eventsList.push(<div className='emptydiv' style={{background: 'aquamarine'}} onClick={() => DeleteEvent(listOfMatchedEventIndex[i])} onMouseOver={hover} onMouseEnter={() => setIsShown(true)}>{commentsList[listOfMatchedEventIndex[i]]}</div>)
                  }

                  if(eventList[listOfMatchedEventIndex[i]] === 'others'){
                    eventsList.push(<div className='emptydiv' style={{background: 'lemonchiffon'}} onClick={() => DeleteEvent(listOfMatchedEventIndex[i])} onMouseOver={hover} onMouseEnter={() => setIsShown(true)}>{commentsList[listOfMatchedEventIndex[i]]}</div>)
                  }
                }
                else{
                  eventsList.push(<div className='emptydiv'>&nbsp;</div>)
                }
              }
            }

            outputList.push(<div className='events'>{eventsList}</div>)
          }
        }

        return(
          <>
          {outputList}
          </>
        )
      }

      return(
        <>
        <div className='dialog-form'>
          <div className="scrolling-calendar">
            <div className="time-slots">
              {timeSlots.map((time, index) => (
                <div key={index} className="time-slot">
                  {time}
                </div>
              ))}
            </div>
            {renderDialogEvents()}
          </div>
        </div>
        </>
      )
    }

    else{
      return(
        
        <div className='dialog-form'>
          <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleDialogSubmit}
          >
            <Form>
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Event</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedEvent}
                    label="Event"
                    onChange={handleEventChange}
                  >
                    <MenuItem value={'food'}>Food</MenuItem>
                    <MenuItem value={'travel'}>Travel</MenuItem>
                    <MenuItem value={'others'}>travel</MenuItem>
                  </Select>
                </FormControl>
              </Box>
    
              <div>
                <label>Description:</label>
                <Field type="text" name="comments"/>
                <ErrorMessage name="comments" component="div"/>
              </div>
    
              <label>Start Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                  <DateTimePicker
                    // label="Controlled picker"
                    value={selectedStartDate}
                    onChange={(newValue) => setselectedStartDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
    
              <label>End Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                  <DateTimePicker
                    // label="Controlled picker"
                    value={selectedEndDate}
                    onChange={(newValue) => setselectedEndDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
    
              <div>
                <label>Location:</label>
                <Field type="text" name="location"/>
                <ErrorMessage name="location" component="div"/>
              </div>
    
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      )
    }
    
  }


  const getTitle = () => {
    let formattedDate = FormatDateToText(currentDateState)

    return(formattedDate)
  }


  const toggleButton = () => {
    if(toggleDialog === true){
      return(<Button onClick={swapDialog} style={{float: 'inline-start'}}>Back</Button>)
    }

    else{
      return(<Button onClick={swapDialog} style={{float: 'inline-start'}}>Create Event</Button>)
    }
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
      <DialogTitle className='dialog-title'>{getTitle()}</DialogTitle>
      <DialogContent>
        <p>{dialogContent()}</p>
      </DialogContent>
      <DialogActions>
        {toggleButton()}
        <Button onClick={handleDialogClose} color="primary">
          Close
        </Button>
      </DialogActions>
      </Dialog>
    </div>
  );
}

export default Calendar;
