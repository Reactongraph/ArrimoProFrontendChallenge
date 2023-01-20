import {
  GetEvents,
  DeleteEvent,
  EditEvent,
} from "../../redux/calendar/eventActions";

import React from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DemoApp() {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.events.getEvents);

  const [currentEvents, setCurrentEvents] = useState([]);

  const createEventId = () => {
    let randomId = (Math.random() + 1).toString(36).substring(1);
    return String(randomId);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  };

  const handleDateSelect = (selectInfo) => {
    const EID = createEventId();
    let eventTitle = prompt("Please enter a new title for your event");

    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    let calendarselectedEvent = {
      id: EID,
      title: eventTitle,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    };

    dispatch(GetEvents([...allEvents, calendarselectedEvent]));

    if (eventTitle) {
      calendarApi.addEvent({
        id: EID,
        title: eventTitle,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      dispatch(DeleteEvent(clickInfo.event.id));
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const change = (e) => {
    const selectedEvent = e.event;
    const events = allEvents;

    events.forEach((event) => {
      if (event.id === selectedEvent.id) {
        event.start = selectedEvent.start;
        event.end = selectedEvent.end;
      }
    });

    dispatch(EditEvent(events));
  };

  return (
    <div className="demo-app">
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>All Events ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>

      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          initialEvents={allEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          eventChange={(e) => {
            change(e);
          }}
        />
      </div>
    </div>
  );
}
