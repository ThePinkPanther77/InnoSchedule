// import React, { useState, useEffect } from "react";
// import { Divider, Modal } from "antd";
// import { Form, Button, message } from "antd";
// import { useForm } from "antd/lib/form/Form";
// import FormItemComponent from "./FormItemComponent";
// import { FormatingDateTime } from "../utils/FormatingDateTime";
// import moment, { Moment } from "moment";
// import { EventData } from "../types";

// interface EditModalProps {
//   data: EventData | null;
//   filterEvents: EventData[];
//   setfilterEvents: (value: EventData[]) => void;
//   setEvents: (value: EventData[]) => void;
//   editModal: boolean;
//   setEditModal: (value: boolean) => void;
//   filtering: any;
// }

// const EditModal: React.FC<EditModalProps> = ({
//   data,
//   filterEvents,
//   setfilterEvents,
//   setEvents,
//   editModal,
//   setEditModal,
//   filtering,
// }) => {
//   const handleDateTimePickerChange = (value: Moment[], dateString: string[]) => {
//     if (data) {
//       if (value) {
//         const startDate = moment(data.start).format("YYYY-MM-DD");
//         const endDate = moment(data.end).format("YYYY-MM-DD");
//         const startTime = moment(startDate)
//           .set({ hour: value[0].hour(), minute: value[0].minute() })
//           .format("YYYY-MM-DDTHH:mm:ss");

//         const endTime = moment(endDate)
//           .set({ hour: value[1].hour(), minute: value[1].minute() })
//           .format("YYYY-MM-DDTHH:mm:ss");
//         form.setFieldsValue({ date: [moment(startTime), moment(endTime)] });
//       }
//     } else {
//       form.setFieldsValue({ date: value });
//     }
//   };

//   const [form] = useForm();

//   const dataForm = [
//     {
//       name: "title",
//       label: "Title:",
//       placeholder: "Enter the title of event.",
//       value: "",
//     },
//     {
//       name: "room",
//       label: "Room Number:",
//       placeholder: "Enter the room number.",
//       value: "",
//     },
//     {
//       name: "date",
//       label: "Date:",
//       value: "",
//     },
//     {
//       name: "instructorName",
//       label: "Name instructor:",
//       placeholder: "Enter the name instructor.",
//     },
//     {
//       name: "course",
//       label: "Course:",
//       options: [
//         { value: "B22", label: "B22" },
//         { value: "B21", label: "B21" },
//         { value: "B20", label: "B20" },
//         { value: "B219", label: "B19" },
//       ],
//       value: "",
//     },
//     {
//       name: "group",
//       label: "Group:",
//       options: [
//         { value: "CS-01", label: "CS-01" },
//         { value: "CS-02", label: "CS-02" },
//         { value: "CS-03", label: "CS-03" },
//         { value: "CS-04", label: "CS-04" },
//         { value: "CS-05", label: "CS-05" },
//         { value: "CS-06", label: "CS-06" },
//         { value: "DSAI-01", label: "DSAI-01" },
//         { value: "DSAI-02", label: "DSAI-02" },
//         { value: "DSAI-03", label: "DSAI-03" },
//         { value: "DSAI-04", label: "DSAI-04" },
//       ],
//       value: "",
//     },
//   ];

//   const handleCancel = () => {
//     form.resetFields();
//     setEditModal(false);
//   };

//   const handleDelete = () => {
//     if (data) {
//       const id = data.extendedProps.id;

//       fetch(`https://inno-schedule-bot.onrender.com/delete/${id}`, {
//         method: "DELETE",
//         headers: new Headers({
//           "ngrok-skip-browser-warning": "69420",
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (filtering.type === "courses") {
//             setfilterEvents(
//               data.filter(
//                 (event: EventData) => event.extendedProps.course === filtering.course
//               )
//             );
//           } else if (filtering.type === "groups") {
//             setEvents(data);
//             setfilterEvents(
//               data.filter((event: EventData) =>
//                 event.extendedProps.group
//                   ? event.extendedProps.group === filtering.group
//                   : event
//               )
//             );
//           } else {
//             setfilterEvents(
//               data.filter(
//                 (event: EventData) => event.extendedProps.title === filtering.title
//               )
//             );
//           }
//         })
//         .catch((err) => message.error("Network error"));
//     }
//     setEditModal(false);
//   };

//   useEffect(() => {
//     if (data && data.extendedProps) {
//       form.setFieldsValue({
//         title: data.title,
//         room: data.extendedProps.room,
//         group: data.extendedProps?.group || undefined,
//         course: data.extendedProps.course,
//         instructorName: data.extendedProps.instructorName,
//         date: [moment(data.start), moment(data.end)],
//       });
//     }
//   }, [data]);

//   const handleUpdate = () => {
//     form.validateFields().then((val) => {
//       const extendedProps = {
//         course: val.course,
//         instructorName: val.instructorName,
//         room: val.room,
//         id: data?.extendedProps?.id,
//         group: val.group ? val.group : "None",
//       };
//       const payload = {
//         title: val.title,
//         start: moment(form.getFieldValue("date")[0]).format(
//           "YYYY-MM-DDTHH:mm:ss"
//         ),
//         end: moment(form.getFieldValue("date")[1]).format(
//           "YYYY-MM-DDTHH:mm:ss"
//         ),
//         extendedProps,
//       };
//       fetch(`https://inno-schedule-bot.onrender.com/update/`, {
//         method: "PUT",
//         headers: new Headers({
//           "ngrok-skip-browser-warning": "69420",
//           "Content-Type": "application/json",
//         }),
//         body: JSON.stringify(payload),
//       })
//         .then((response) => response.json())
//         .then((da) => {
//           if (filtering.type === "courses") {
//             setfilterEvents(
//               da.filter(
//                 (event: EventData) => event.extendedProps.course === filtering.course
//               )
//             );
//           } else if (filtering.type === "groups") {
//             setfilterEvents(
//               da.filter((event: EventData) =>
//                 event.extendedProps.group
//                   ? event.extendedProps.group === filtering.group
//                   : event
//               )
//             );
//           } else {
//             setfilterEvents(
//               da.filter(
//                 (event: EventData) => event.extendedProps.title === filtering.title
//               )
//             );
//           }
//         })
//         .catch((err) => message.error("Network error"));
//       setEditModal(false);
//     });
//   };

//   return (
//     <Modal
//       title={`Edit ${data?.title}`}
//       visible={editModal}
//       onCancel={handleCancel}
//       footer={[
//         <Button key="update" type="primary" onClick={handleUpdate}>
//           Update
//         </Button>,
//         <Button type="primary" danger onClick={handleDelete}>
//           Delete
//         </Button>,
//       ]}
//     >
//       <Divider />
//       <Form form={form}>
//         {dataForm.map((item) => {
//           if (item.name === "group" && data && !data.extendedProps?.group) {
//             return null;
//           }
//           return (
//             <FormItemComponent
//               key={item.name}
//               name={item.name}
//               label={item.label}
//               rules={[]}
//               options={item.options}
//               placeholder={item.placeholder}
//               labelCol={{ span: 6 }}
//               wrapperCol={{ span: 16 }}
//               onChange={handleDateTimePickerChange}
//               value={item.value}
//             />
//           );
//         })}
//       </Form>
//     </Modal>
//   );
// };

// export default EditModal;
