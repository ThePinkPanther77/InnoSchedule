'use client'
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventContentArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Layout, Menu, message,theme } from "antd";
import AddModal from "./AddModal";
// import EditModal from "./EditModal";
import moment from 'moment'
import {FormatingDateTime} from './utils/FormatingDateTime'

const { Content, Sider } = Layout;
const courses = ["B22", "B21", "B20", "B19"];

const groups = [
  "CS-01",
  "CS-02",
  "CS-03",
  "CS-04",
  "CS-05",
  "CS-06",
  "DSAI-01",
  "DSAI-02",
  "DSAI-03",
  "DSAI-04",
];
const subjects: string[] = [];

const Calender: React.FC = () => {
  const [filterEvents, setfilterEvents] = useState<any[]>([]);
  const [course, setCourse] = useState<string>("");
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<any>({});
  const [date, setDate] = useState<string>("");
  const [data, setData] = useState<any>({});
  const [events, setEvents] = useState<any[]>([]);
  const [filtering, setFiltering] = useState<any>({});

  useEffect(() => {
    fetch("https://inno-schedule-bot.onrender.com/get/", {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        message.error("Network error");
        setEvents([]);
      });
  }, []);

  const items2 = [
    {
      key: "courses",
      label: "Courses",
      children: courses.map((course, index) => ({
        key: course,
        label: course,
      })),
    },
    {
      key: "groups",
      label: "Groups",
      children: course
        ? groups.map((group) => ({
            key: group,
            label: group,
          }))
        : [],
    },
    {
      key: "subjects",
      label: "Subjects",
      children: course
        ? subjects.map((subject) => ({
            key: subject,
            label: subject,
          }))
        : [],
    },
  ];

  const eventContent = (arg: EventContentArg) => (
    <div className="event-container">
      <p className="title-event">{arg.event.title}</p>
      <p className="time-event">
        {arg.event.start?.toLocaleTimeString()} - {arg.event.end?.toLocaleTimeString()}
      </p>
    </div>
  );

  const handleOnDateClick = (arg: DateClickArg) => {
    setDate(arg.dateStr);
    setAddModal(true);
    console.log(arg);
  };

  const handleEventClick = (arg: EventClickArg) => {
    const { ...extendedProps } = arg.event.extendedProps;

    const data = {
      title: arg.event.title,
      start: moment.utc(arg.event.start).format("YYYY-MM-DDTHH:mm:ss"),
      end: moment.utc(arg.event.end).format("YYYY-MM-DDTHH:mm:ss"),
      extendedProps,
    };
    setData(data);
    setEditModal(true);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Layout style={{ padding: "24px 0",          background: colorBgContainer,
 }}>
        <Sider  style={{
            background: colorBgContainer,
          }} width={200}>
          <Menu
            mode="inline"
            onClick={(selected) => {
              if (selected.keyPath[1] === "courses") {
                setFiltering({ type: "courses", course: selected.key });
                setCourse(selected.key);
                setfilterEvents(
                  events.filter((event) => event.extendedProps.course === selected.key)
                );
              } else if (selected.keyPath[1] === "groups") {
                setFiltering({ type: "groups", group: selected.key });
                setfilterEvents(
                  events.filter((event) =>
                    event.extendedProps.group ? event.extendedProps.group === selected.key : event
                  )
                );
              } else {
                setFiltering({ type: "subjects", title: selected.key });
                setfilterEvents(
                  events.filter((event) => event.extendedProps.title === selected.key)
                );
              }
            }}
          >
            {items2.map((item) => (
              <Menu.SubMenu key={item.key} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>{child.label}</Menu.Item>
                ))}
              </Menu.SubMenu>
            ))}
          </Menu>
        </Sider>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
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
          <AddModal
            date={date}
            addModal={addModal}
            setAddModal={setAddModal}
            setfilterEvents={setfilterEvents}
            setEvents={setEvents}
            filtering={filtering}
          />
          {/* <EditModal
            data={data}
            editModal={editModal}
            setEditModal={setEditModal}
            setfilterEvents={setfilterEvents}
            filterEvents={filterEvents}
            setEvents={setEvents}
            filtering={filtering}
          /> */}
        </Content>
      </Layout>
    </div>
  );
};

export default Calender;
