import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const BookingCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('12:00');
  const [bookedSlots, setBookedSlots] = useState([]);

  // Function to handle date selection
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Function to handle time selection
  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  // Function to check if all slots for a date are booked
  const isDateDisabled = (date) => {
    // Get the date in 'YYYY-MM-DD' format
    const dateString = date.toISOString().split('T')[0];
    // Check if all slots for the date are booked
    return bookedSlots.filter(slot => slot.date === dateString).length === 4;
  };

  return (
    <div>
      <h2>Booking Calendar</h2>
      <div className="booking-controls">
        <Calendar
          onChange={handleDateChange}
          value={date}
          minDate={new Date()}
          tileDisabled={({ date }) => isDateDisabled(date)} // Disable dates with all slots booked
        />
        <TimePicker
          onChange={handleTimeChange}
          value={time}
        />
      </div>
      <p>Selected date: {date.toDateString()}</p>
      <p>Selected time: {time}</p>
      {/* Add additional UI elements for booking */}
    </div>
  );
};

export default BookingCalendar;
