// import { Form, Input, Typography } from 'antd';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Typography from 'antd/es/typography';
import React, { useEffect, useState } from 'react';

import type {
  ApplicationCommandOption,
  ApplicationCommandOptionChoice,
} from '../../slash/ApplicationCommand';
import validate from '../../helpers/validate';

interface ValidationState {
  status: '' | 'success' | 'warning' | 'error' | 'validating';
  message?: string;
}

interface GenericInputProps<
  T = ApplicationCommandOption & ApplicationCommandOptionChoice,
> {
  name: string;
  setter: [Partial<T>, React.Dispatch<React.SetStateAction<Partial<T>>>];
}
function GenericInput({ name, setter }: GenericInputProps) {
  const [value, setValue] = useState('');
  useEffect(() => {
    const [option, setOption] = setter;
    setOption({ ...option, [name]: value });
  }, [value]);

  const [validation, setValidation] = useState<ValidationState>({
    status: '',
  });

  function updateValue(e: React.ChangeEvent<HTMLInputElement>) {
    const [isValid, validationData] = validate(name, e.target.value, 1);
    setValidation(validationData);
    if (isValid) {
      setValue(e.target.value);
    }
  }

  return (
    <>
      <Typography.Title level={5} style={{ textTransform: 'capitalize' }}>
        {name}:
      </Typography.Title>
      <Form.Item
        hasFeedback
        validateStatus={validation.status}
        help={validation.message}
      >
        <Input
          allowClear
          size="large"
          placeholder={`Option ${name}...`}
          value={value}
          onChange={updateValue}
        />
      </Form.Item>
    </>
  );
}

export default GenericInput;
