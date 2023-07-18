"use client";
import { Divider, Modal, message } from "antd";
import { Form } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItemComponent from "./FormItemComponent";
import { FormatingDateTime } from "./utils/FormatingDateTime";
import dayjs, { Dayjs } from "dayjs";
import moment,{Moment} from 'moment'

interface Event {
  title: string;
  start: string;
  end: string;
  extendedProps: {
    room: string;
    group: String;
    course: string;
    instructorName: string;
  };
}
interface DataForm {
  title: string;
  room: Number;
  instructorName: string;
  group: String;
  date: [string, string];
  course: string;
}

interface Filtering {
  type: string;
  value: string;
}
interface AddModalProps {
  addModal: boolean;
  setAddModal: (value: boolean) => void;
  setEvents: (value: [Event]) => void;
  date: string;
  setfilterEvents: (value: [Event]) => void;
  filtering: Filtering;
}

const AddModal: React.FC<AddModalProps> = ({
  addModal,
  setAddModal,
  setEvents,
  date,
  setfilterEvents,
  filtering,
}) => {
  const [form] = useForm();

  const dataForm = [
    {
      name: "title",
      label: "Title:",
      placeholder: "Enter the title of event.",
    },
    {
      name: "room",
      label: "Room Number:",
      placeholder: "Enter the room number.",
    },
    {
      name: "date",
      label: "Date:",
      placeholder: "Enter the date.",
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
    },
  ];

  const handleCancel = () => {
    setAddModal(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values: DataForm) => {
      const start = {
        date: date,
        hours: new Date(values.date[0]).getHours(),
        minutes: new Date(values.date[0]).getMinutes(),
      };
      const end = {
        date: date,
        hours: new Date(values.date[1]).getHours(),
        minutes: new Date(values.date[1]).getMinutes(),
      };
      const data: Event = {
        title: values.title,
        start: FormatingDateTime(start),
        end: FormatingDateTime(end),
        extendedProps: {
          room: values.room.toString(),
          course: values.course,
          group: values.group,
          instructorName: values.instructorName,
        },
      };
      console.log(data);
      fetch(`https://inno-schedule-bot.onrender.com/create/`, {
        method: "POST",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((da) => {
          if (filtering.type === "courses") {
            setfilterEvents(
              da.filter(
                (event: any) => event.extendedProps.course === filtering.value
              )
            );
          } else if (filtering.type === "groups") {
            setfilterEvents(
              da.filter((event: any) =>
                event.extendedProps.group
                  ? event.extendedProps.group === filtering.value
                  : event
              )
            );
          } else {
            setfilterEvents(
              da.filter(
                (event: any) => event.extendedProps.title === filtering.value
              )
            );
          }
        })
        .catch((err) => message.error("Network error"));
      setAddModal(false);
      form.resetFields();
    });
  };

  const handleDateTimePickerChange = (
    value: [Dayjs | null, Dayjs | null],
    dateString?: [string, string]
  ) => {
    form.setFieldValue("date", value);
  };

  return (
    <Modal
      title={`Create event`}
      open={addModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Divider />
      <Form form={form}>
        {dataForm.map((item) => (
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
          />
        ))}
      </Form>
    </Modal>
  );
};

export default AddModal;
