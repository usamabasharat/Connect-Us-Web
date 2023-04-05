import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar() {
  const [events] = useState([]);

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventDrop = (dropInfo) => {
    const calendarApi = dropInfo.view.calendar;
    const event = calendarApi.getEventById(dropInfo.event.id);
    const { start } = dropInfo.event;
    const { end } = dropInfo.event;

    calendarApi.unselect(); // clear date selection

    if (event) {
      event.setDates(start, end);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      slotDuration="00:30:00"
      selectable
      editable
      events={events}
      select={handleDateSelect}
      eventDrop={handleEventDrop}
    />
  );
}

export default Calendar;
