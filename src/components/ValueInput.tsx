// import { Form, Input, Typography } from 'antd';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Typography from 'antd/es/typography';
import React, { useState } from 'react';
import validate, { ValidationState } from '../helpers/validate';

import type { ApplicationCommand } from '../slash/ApplicationCommand';
import { commandState } from '../recoil';
import { useRecoilState } from 'recoil';

interface ValueInputProps {
  keyName: Omit<keyof ApplicationCommand, 'options'>;
}
function ValueInput({ keyName }: ValueInputProps) {
  const [command, setCommand] = useRecoilState(commandState);
  const [validation, setValidation] = useState<ValidationState>({ status: '' });

  function updateCommandKey(e: React.ChangeEvent<HTMLInputElement>) {
    const [isValid, validationData] = validate(
      keyName as string,
      e.target.value,
      3,
    );
    setValidation(validationData);
    if (isValid) {
      setCommand({ ...command, [keyName as string]: e.target.value });
    }
  }
  return (
    <>
      <Typography.Title level={5} style={{ textTransform: 'capitalize' }}>
        {keyName}:
      </Typography.Title>
      <Form.Item
        hasFeedback
        validateStatus={validation.status}
        help={validation.message}
      >
        <Input
          allowClear
          size="large"
          placeholder={`Command ${keyName}...`}
          value={command[keyName as string]}
          onChange={updateCommandKey}
        />
      </Form.Item>
    </>
  );
}

export default ValueInput;
