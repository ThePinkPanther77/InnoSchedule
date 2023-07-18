"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import { EventContentArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Event } from "@/app/utils/EventInteerface";

interface CalenderProps {
  filterEvents: Event[];
  setDate: (date: string) => void;
  setAddModal: (AddModal: boolean) => void;
  setDataEdit: (dataEdit: Event) => void;
}

const Calender: React.FC<CalenderProps> = ({
  setAddModal,
  setDate,
  setDataEdit,
  filterEvents,
}) => {
  const eventContent = (arg: EventContentArg) => (
    <div className="event-container">
      <p className="title-event">{arg.event.title}</p>
      <p className="time-event">
        {arg.event.start?.toLocaleTimeString()} -{" "}
        {arg.event.end?.toLocaleTimeString()}
      </p>
    </div>
  );

  const handleOnDateClick = (arg: DateClickArg) => {
    setDate(arg.dateStr);
    setAddModal(true);
  };

  const handleEventClick = (arg: EventClickArg) => {
    //   const { ...extendedProps } = arg.event.extendedProps;
    //   // const data = {
    //   //   title: arg.event.title,
    //   //   start: moment.utc(arg.event.start).format("YYYY-MM-DDTHH:mm:ss"),
    //   //   end: moment.utc(arg.event.end).format("YYYY-MM-DDTHH:mm:ss"),
    //   //   extendedProps,
    //   // };
    //   // setDataEdit(data);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      initialView="dayGridMonth"
      events={filterEvents}
      eventContent={eventContent}
      dateClick={handleOnDateClick}
      eventClick={handleEventClick}
      dayCellDidMount={(cellInfo) => {
        if (!cellInfo.event) {
          cellInfo.el.style.cursor = "pointer";
        }
      }}
    />
  );
};

export default Calender;