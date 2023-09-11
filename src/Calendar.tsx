import React, { useEffect, useState } from 'react';
import './Calendar.css';
import {db} from './firebase'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth } from 'date-fns';
import {collection, addDoc, getDocs, getDoc, updateDoc,deleteDoc ,Timestamp} from 'firebase/firestore'

interface CalendarProps {
  currentDate: Date;
  onSelectDate: (date: Date) => void;
}


const Calendar: React.FC<CalendarProps> = ({ currentDate, onSelectDate }) => {
  const [currentDateState, setCurrentDate] = useState(currentDate);

  useEffect(() => {
    async function fetchEventsFromDB() {
      await getDocs(collection(db, 'events')).then((response: any) => {
        let tempEvents = response.docs.map((val: { data: () => any; },key: any)=>({data: val.data()}))
        let events = tempEvents[0].data

        const options: Intl.DateTimeFormatOptions = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        };
        const formattedDate = currentDateState.toLocaleString('en-GB', options);
        const eventStr : string = events
        var localDateEvent : string = ''
        if(eventStr.includes(formattedDate)){
          localDateEvent = eventStr.substring(eventStr.indexOf(formattedDate))
        }
        console.log(localDateEvent)
      })
    }
    fetchEventsFromDB()
  })


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

    function getClassForCell(cellValue: String) {
      if (cellValue === 'A') {
        return 'green-cell';
      } else if (cellValue === 'B') {
        return 'red-cell';
      } else {
        return 'blue-cell';
      }
    }

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

    const foodDateTest: Date = new Date(2023, 8, 11)
    const busyDateTest: Date = new Date(2023, 8, 24)
    const outingDateTest: Date = new Date(2023, 8, 3)

    return(
      <div className=''>
        {formattedDate}
      </div>
    )
  }


  const prevMonth = () => {
    setCurrentDate((prevDate) => addDays(startOfMonth(prevDate), -1));
  };


  const nextMonth = () => {
    setCurrentDate((prevDate) => addDays(endOfMonth(prevDate), 1));
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
