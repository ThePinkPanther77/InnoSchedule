"use client";
import React, { useState, useEffect } from "react";
import { Divider, Modal } from "antd";
import { Form, Button, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import FormItemComponent from "@/components/FormItemComponent";
// import { FormatingDateTime } from "@/utils/FormatingDateTime";
import moment, { Moment } from "moment";
// import { EventData } from "../../types";
import { useParams, useRouter } from 'next/navigation';
import style from "./page.module.scss";


interface EditModalProps {
  title: string;
  start: string;
  end: string;
  extendedProps: {
    course: string,
    group: string,
    id: number,
    instructorName: string,
    room: number|string
  };
}

const EditModal: React.FC = () => {
    const params = useParams();
    const {id} = params;
    const [event, setEvent] = useState<EditModalProps|null>(null);
    const router = useRouter();

    useEffect(() => {
        fetch("https://inno-schedule-bot.onrender.com/get/", {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const found = data.find((elem: EditModalProps) => elem.extendedProps.id===Number.parseInt(id));
            setEvent(found);
          })
          .catch((err) => {
            message.error("Network error");
            setEvent(null);
          });
      }, []);

    const handleDateTimePickerChange = () => {
        if (event) {
            const newEvent = {...event};
            

        }
    };

  const [form] = useForm();

  const dataForm = [
    {
      name: "title",
      label: "Title:",
      placeholder: "Enter the title of event.",
      value: "",
    },
    {
      name: "room",
      label: "Room Number:",
      placeholder: "Enter the room number.",
      value: "",
    },
    {
      name: "date",
      label: "Date:",
      value: "",
    },
    {
      name: "instructorName",
      label: "Name instructor:",
      placeholder: "Enter the name instructor.",
    },
    {
      name: "course",
      label: "Course:",
      options: [
        { value: "B22", label: "B22" },
        { value: "B21", label: "B21" },
        { value: "B20", label: "B20" },
        { value: "B219", label: "B19" },
      ],
      value: "",
    },
    {
      name: "group",
      label: "Group:",
      options: [
        { value: "CS-01", label: "CS-01" },
        { value: "CS-02", label: "CS-02" },
        { value: "CS-03", label: "CS-03" },
        { value: "CS-04", label: "CS-04" },
        { value: "CS-05", label: "CS-05" },
        { value: "CS-06", label: "CS-06" },
        { value: "DSAI-01", label: "DSAI-01" },
        { value: "DSAI-02", label: "DSAI-02" },
        { value: "DSAI-03", label: "DSAI-03" },
        { value: "DSAI-04", label: "DSAI-04" },
      ],
      value: "",
    },
  ];

  const handleCancel = () => {
    form.resetFields();
  };

  const handleDelete = () => {
    if (event) {
      const eventId = event?.extendedProps.id;
      fetch(`https://inno-schedule-bot.onrender.com/delete/${eventId}`, {
        method: "DELETE",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
    }
    router.push("/courses");
  };

  useEffect(() => {
    if (event && event.extendedProps) {
      form.setFieldsValue({
        title: event.title,
        room: event.extendedProps.room,
        group: event.extendedProps?.group || undefined,
        course: event.extendedProps.course,
        instructorName: event.extendedProps.instructorName,
        date: [moment(event.start), moment(event.end)],
      });
    }
  }, [event]);

  const handleUpdate = () => {
    const eventId = event?.extendedProps.id;
      fetch(`https://inno-schedule-bot.onrender.com/delete/${eventId}`, {
        method: "DELETE",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })

      const newEvent = {event};
      // TODO: Update the new event
      // Some Code goes here
    fetch(`https://inno-schedule-bot.onrender.com/create/`, {
        method: "POST",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newEvent),
      })
    router.push("/courses");
  };


  return (
    <div className={style["wrapper"]}>
      <Modal
      title={`Edit ${event?.title}`}
      onCancel={handleCancel}
      open={true}
      footer={[
          <Button key="update" type="primary" onClick={handleUpdate}>
            Update
          </Button>,
          <Button type="primary" danger onClick={handleDelete}>
            Delete
          </Button>,
      ]}
      >
      <Divider />
      <Form form={form}>
          {dataForm.map((item) => {
          if (item.name === "group" && event && !event.extendedProps?.group) {
              return null;
          }
          return (
              <FormItemComponent
                key={item.name}
                name={item.name}
                label={item.label}
                rules={[]}
                options={item.options}
                placeholder={item.placeholder}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                onChange={handleDateTimePickerChange}
                value={item.value}
              />
          );
          })}
      </Form>
      </Modal>
    </div>
  );
};

export default EditModal;