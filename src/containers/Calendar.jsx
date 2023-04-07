import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button } from 'antd';

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
  const handleEventClick = (clickInfo) => {
    clickInfo.event.remove();
  };

  return (
    <div className="flex flex-row h-screen bg-white">
      <div className="w-3/4 justify-center">
        <FullCalendar
          className="flex w-3/4 justify-center"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="timeGridWeek"
          slotDuration="00:30:00"
          selectable
          editable
          events={events}
          select={handleDateSelect}
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
        />
      </div>
      <div className="flex w-1/4 justify-center mt-8">
        <div className="flex flex-col w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Upcoming Meetings</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Meeting with John Doe</h3>
              <p className="text-gray-500 text-sm mt-1">Wednesday, March 23, 2023 at 10:00 AM</p>
            </div>
            <div className="p-4 flex justify-end">
              <Button className="mr-2">Accept</Button>
              <Button className="mr-2">Reject</Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Meeting with Jane Doe</h3>
              <p className="text-gray-500 text-sm mt-1">Thursday, March 24, 2023 at 2:00 PM</p>
            </div>
            <div className="p-4 flex justify-end">
              <Button className="mr-2">Accept</Button>
              <Button className="mr-2">Reject</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
