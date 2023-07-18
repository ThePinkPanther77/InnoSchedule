import React from 'react';
import { Form, Input, InputNumber, Checkbox, Select } from 'antd';
import DateTimePicker from './DateTimePicker';
import { FormItemProps } from 'antd/lib/form';

import dayjs, { Dayjs } from "dayjs";

const { Option } = Select;

interface FormItemComponentProps extends FormItemProps {
  name: string;
  label: string;
  rules?: any[];
  placeholder?: string;
  labelCol?: any;
  wrapperCol?: any;
  onChange: ((value: [Dayjs | null, Dayjs | null], dateString: [string, string] ) => void) ;
  options?: { value: string; label: string }[];
  value?: any;
}

const FormItemComponent: React.FC<FormItemComponentProps> = ({
  name,
  label,
  rules,
  placeholder,
  labelCol,
  wrapperCol,
  onChange,
  options,
  value,
}) => {
  return (
    <Form.Item
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      name={name}
      label={label}
      initialValue={value}
    >
      {name === 'room' ? (
        <InputNumber type="number" placeholder={placeholder} />
      ) : name === 'date' ? (
        <DateTimePicker value={value} onChange={onChange} />
      ) : name === 'group' || name === 'course' ? (
        <Select>
          {options?.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      ) : (
        <Input placeholder={placeholder} />
      )}
    </Form.Item>
  );
};

export default FormItemComponent;
