import React, { useEffect, useState } from 'react';
import './Calendar.css';
import 'firebase/firestore'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth } from 'date-fns';
import restAPI from './controller';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { colors } from '@mui/material';

interface CalendarProps {
  currentDate: Date;
  onSelectDate: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, onSelectDate }) => {
  const [currentDateState, setCurrentDate] = useState(currentDate);
  const [eventsData, setEventsData] = useState<any[]>([])
  const [currentMonthState, setCurrentMonthState] = useState(currentDate.getMonth())
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
  },[currentDate, setCurrentDate])


  const renderCurrentDayEvents = (date: Date) => {
    const startDateList = eventsData[0]
    const endDateList = eventsData[1]
    const eventList = eventsData[2]
    const locationList = eventsData[3]
    const commentsList = eventsData[4]

    for(let i=0; i<startDateList.length; i++){

      if(formatDateWithoutTime(date) >= formatDateWithoutTime(startDateList[i]) 
        && formatDateWithoutTime(date) <= formatDateWithoutTime(endDateList[i])){

        if(eventList[i] === 'food'){
          return( <div style={{ background: "aqua" }}>{commentsList[i]}</div> )
        }

        else if(eventList[i] === 'travel'){
          return( <div style={{ background: "aquamarine" }} >{locationList[i]}</div>)
        }

        else if(eventList[i] === 'others'){
          return( <div style={{ background: 'lemonchiffon '}}>{commentsList[i]}</div>)
        }

      }
    }
  }


  function formatDateWithoutTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${day}-${month}-${year}`;
  }
  

  const renderHeader = () => {
    return (
      <div className="header">
        <button onClick={prevMonth}>Prev</button>
        <h2>{format(currentDateState, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth}>Next</button>
      </div>
    );
  };


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
            onClick={() => handleDateClick(cloneDay)}
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


  const GetCellType = (formattedDate: String) =>{

    return(
      <div className=''>
      </div>
    )
  }


  const prevMonth = () => {
    setCurrentDate((prevDate) => addDays(startOfMonth(prevDate), -1));
    setCurrentMonthState(currentMonthState - 1)
  };


  const nextMonth = () => {
    setCurrentDate((prevDate) => addDays(endOfMonth(prevDate), 1));
    setCurrentMonthState(currentMonthState + 1)
  };


  const handleDateClick = (date: Date) => {
    onSelectDate(date);
  };

  
  return (
    <div className="calendar-container">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
