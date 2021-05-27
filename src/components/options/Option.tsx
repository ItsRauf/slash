import {
  ApplicationCommandOption,
  ApplicationCommandOptionChoice,
  ApplicationCommandOptionType,
} from '../../slash/ApplicationCommand';
// import { Button, Card, Col, Row, Space, Switch, Typography } from 'antd';
import Button from 'antd/es/button';
import Space from 'antd/es/space';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import Switch from 'antd/es/switch';
import Typography from 'antd/es/typography';
import React, { ReactNode, useEffect, useState } from 'react';
import { commandState, optionElementState } from '../../recoil';

import GenericInput from './GenericInput';
import Icons from '../../icons';
import { useRecoilState } from 'recoil';
import Choice from './Choice';

interface OptionProps {
  type: ApplicationCommandOptionType;
  index: number;
  inSubCommand?: boolean;
  offset?: string;
  deleter?: (key: string) => void;
  updater?: (val: Partial<ApplicationCommandOption>) => void;
  className?: string;
}
function Option({
  type,
  index,
  inSubCommand,
  offset,
  deleter,
  updater,
}: OptionProps) {
  const [option, setOption] = useState<Partial<ApplicationCommandOption>>({
    key: `${ApplicationCommandOptionType[type]}Option-${index}`,
    type,
    name: '',
    description: '',
    required: false,
  });
  const [command, setCommand] = useRecoilState(commandState);
  useEffect(() => {
    if (inSubCommand && updater) {
      updater(option);
    }
    if (!inSubCommand && command.options) {
      setCommand({
        ...command,
        options: [
          ...command.options.filter((o) => o.key !== option.key),
          option as ApplicationCommandOption,
        ],
      });
    }
  }, [option]);

  const [required, setRequired] = useState(false);
  useEffect(() => {
    setOption({ ...option, required: required });
  }, [required]);

  const [optionElements, setOptionElements] =
    useRecoilState(optionElementState);

  function deleteOption() {
    if (inSubCommand && deleter) {
      deleter(option.key ?? '');
    }
    if (!inSubCommand && command.options) {
      setCommand({
        ...command,
        options: command.options.filter((o) => o.key !== option.key),
      });
      setOptionElements(
        optionElements.filter((elem: any) => elem.key !== option.key),
      );
    }
  }

  const [choiceOptionElements, setChoiceOptionElements] = useState<ReactNode[]>(
    [],
  );

  useEffect(() => {
    console.log('useEffect:choiceOptionElements', choiceOptionElements);
  }, [choiceOptionElements]);

  function deleteChoiceOption(index: number) {
    console.log(`delete on ${index}`);
    setChoiceOptionElements((prev) => {
      return prev.filter((elem: any) => elem.props.index !== index);
    });
    setOption((prev) => {
      return {
        ...prev,
        choices: prev.choices!.filter((c) => c.key !== `ChoiceOption-${index}`),
      };
    });
  }

  function updateChoiceOption(val: Partial<ApplicationCommandOptionChoice>) {
    if (val.name) {
      setOption((prev) => {
        console.log('updateChoiceOption:setOption', prev);
        return {
          ...prev,
          choices: [
            ...(prev.choices ?? []).filter((o) => {
              return o.key !== val.key;
            }),
            val as ApplicationCommandOptionChoice,
          ],
        };
      });
    }
  }

  function addChoiceOption(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const ts = Date.now();
    const choiceOption = {
      key: `ChoiceOption-${ts}`,
      name: '',
      value: '' || 0,
    };
    setOption({
      ...option,
      choices: [...(option.choices ?? []), choiceOption],
    });
    setChoiceOptionElements([
      ...choiceOptionElements,
      <Choice
        key={`ChoiceOption-${ts}`}
        index={ts}
        inGroup
        deleter={deleteChoiceOption}
        updater={updateChoiceOption}
        className="choiceChild"
      />,
    ]);
  }

  return (
    <>
      <Card
        title={
          <>
            <Row gutter={16} align="middle" justify="start">
              <Col>{Icons[ApplicationCommandOptionType[type]]}</Col>
              <Col>{ApplicationCommandOptionType[type]}</Col>
            </Row>
          </>
        }
        bordered={false}
        style={inSubCommand ? { marginLeft: offset || '20px' } : {}}
      >
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
          <Row align="middle" justify="start">
            <Space align="center">
              <Button type="primary" size="large" onClick={addChoiceOption}>
                Add Choice
              </Button>
            </Space>
          </Row>
        </Space>
      </Card>
      <Space
        direction="horizontal"
        style={{ width: '100%', paddingBottom: '10px' }}
      >
        {choiceOptionElements}
      </Space>
    </>
  );
}

export default Option;
