import React, { useState } from 'react';
import './Calendar.css';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth } from 'date-fns';

interface CalendarProps {
  currentDate: Date;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate }) => {
  const [currentDateState, setCurrentDate] = useState(currentDate);

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

  const prevMonth = () => {
    setCurrentDate((prevDate) => addDays(startOfMonth(prevDate), -1));
  };

  const nextMonth = () => {
    setCurrentDate((prevDate) => addDays(endOfMonth(prevDate), 1));
  };

  const handleDateClick = (date: Date) => {
    alert(`Clicked on date: ${format(date, 'MMMM d, yyyy')}`);
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
