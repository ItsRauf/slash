import {
  ApplicationCommandOption,
  ApplicationCommandOptionType,
} from '../../slash/ApplicationCommand';
import { Button, Card, Col, Row, Space, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { commandState, optionElementState } from '../../recoil';

import GenericInput from './GenericInput';
import { useRecoilState } from 'recoil';

interface OptionProps {
  type: ApplicationCommandOptionType;
  index: number;
}
function Option({ type, index }: OptionProps) {
  const [option, setOption] = useState<ApplicationCommandOption>({
    key: `${ApplicationCommandOptionType[type]}Option-${index}`,
    type,
    name: '',
    description: '',
  });
  const [command, setCommand] = useRecoilState(commandState);
  useEffect(() => {
    if (command.options) {
      setCommand({
        ...command,
        options: [
          ...command.options.filter((o) => o.key !== option.key),
          option,
        ],
      });
    }
  }, [option]);

  const [required, setRequired] = useState(false);
  useEffect(() => {
    setOption({ ...option, required: required });
  }, [required]);
  const [_default, setDefault] = useState(false);
  useEffect(() => {
    setOption({ ...option, default: _default });
  }, [_default]);

  const [optionElements, setOptionElements] = useRecoilState(
    optionElementState,
  );

  function deleteOption() {
    if (command.options) {
      setCommand({
        ...command,
        options: command.options.filter((o) => o.key !== option.key),
      });
    }
    setOptionElements(
      optionElements.filter((elem: any) => elem.key !== option.key),
    );
  }

  return (
    <Card title={ApplicationCommandOptionType[type]} bordered={false}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <GenericInput name="name" setter={[option, setOption]} />
        <GenericInput name="description" setter={[option, setOption]} />
        <Row>
          <Col span={6}>
            <Typography.Title level={5}>Required?</Typography.Title>
            <Switch
              checked={required}
              onChange={(checked) => setRequired(checked)}
            />
          </Col>
          <Col span={6}>
            <Typography.Title level={5}>Default?</Typography.Title>
            <Switch
              checked={_default}
              onChange={(checked) => setDefault(checked)}
            />
          </Col>
          <Col flex="auto">
            <Row align="middle" justify="end">
              <Space align="center">
                <Button
                  danger
                  type="primary"
                  size="large"
                  onClick={deleteOption}
                >
                  Delete
                </Button>
              </Space>
            </Row>
          </Col>
        </Row>
      </Space>
    </Card>
  );
}

export default Option;
