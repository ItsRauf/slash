import Button from 'antd/es/button';
import Space from 'antd/es/space';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import React, { ReactNode, useEffect, useState } from 'react';
import { commandState, optionElementState } from '../../recoil';

import GenericInput from './GenericInput';
import Icons from '../../icons';
import { useRecoilState } from 'recoil';
import type { ApplicationCommandOptionChoice } from 'src/slash/ApplicationCommand';

interface ChoiceProps {
  key: string;
  index: number;
  inGroup: boolean;
  offset?: number;
  deleter?: (index: number) => void;
  updater?: (val: Partial<ApplicationCommandOptionChoice>) => void;
  className?: string;
}
function Choice({ index, inGroup, offset, deleter, updater }: ChoiceProps) {
  const [option, setOption] = useState<Partial<ApplicationCommandOptionChoice>>(
    {
      key: `ChoiceOption-${index}`,
      name: '',
      value: '' || 0,
    },
  );
  // const [command, setCommand] = useRecoilState(commandState);
  useEffect(() => {
    if (inGroup && updater) {
      updater({
        ...option,
        value: isNaN(option.value as number)
          ? option.value!
          : parseInt(option.value! as string),
      });
    }
  }, [option]);

  function deleteOption() {
    if (inGroup && deleter) {
      deleter(index);
    }
  }

  return (
    <>
      <Card
        title={
          <>
            <Row gutter={16} align="middle" justify="start">
              <Col>{Icons['Choice']}</Col>
              <Col>Choice</Col>
            </Row>
          </>
        }
        bordered={false}
        style={inGroup ? { marginLeft: offset || '20px' } : {}}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <GenericInput name="name" setter={[option, setOption]} />
          <GenericInput name="value" setter={[option, setOption]} />
          <Row>
            <Col flex="auto"></Col>
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
    </>
  );
}

export default Choice;
