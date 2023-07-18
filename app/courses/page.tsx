"use client";
import React, { useState, useEffect } from "react";
import { message } from "antd";
import AddModal from "../AddModal";
import LayoutCourses from "../LayoutCourses";

export default function Courses() {
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
  const [filterEvents, setFilterEvents] = useState<any[]>([]);
  const [course, setCourse] = useState<string>("");
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<any>({});
  const [date, setDate] = useState<string>("");
  const [dataEdit, setDataEdit] = useState<any>({});
  const [events, setEvents] = useState<any[]>([]);
  const [filtering, setFiltering] = useState<any>({});
  return (
    <>
      <LayoutCourses
        setFiltering={setFiltering}
        events={events}
        setFilterEvents={setFilterEvents}
        filterEvents={filterEvents}
        setAddModal={setAddModal}
        setDate={setDate}
        setDataEdit={setDataEdit}
      />
      <AddModal
        date={date}
        addModal={addModal}
        setAddModal={setAddModal}
        setfilterEvents={setFilterEvents}
        setEvents={setEvents}
        filtering={filtering}
      />
    </>
  );
}
