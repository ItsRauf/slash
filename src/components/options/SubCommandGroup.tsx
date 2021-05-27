import {
  ApplicationCommandOption,
  ApplicationCommandOptionType,
} from '../../slash/ApplicationCommand';
// import { Button, Card, Col, Row, Space, Switch, Typography } from 'antd';
import Button from 'antd/es/button';
import Space from 'antd/es/space';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import React, { ReactNode, useEffect, useState } from 'react';
import { commandState, optionElementState } from '../../recoil';

import GenericInput from './GenericInput';
import Icons from '../../icons';
import SubCommand from './SubCommand';
import keyofEnum from '../../helpers/keyofEnum';
import { useRecoilState } from 'recoil';

interface SubCommandGroupProps {
  type: ApplicationCommandOptionType;
  index: number;
  inGroup: boolean;
}
function SubCommandGroup({ type, index }: SubCommandGroupProps) {
  const [option, setOption] = useState<Partial<ApplicationCommandOption>>({
    key: `${ApplicationCommandOptionType[type]}Option-${index}`,
    type,
    name: '',
    description: '',
    options: [],
  });
  const [command, setCommand] = useRecoilState(commandState);
  useEffect(() => {
    if (command.options) {
      setCommand({
        ...command,
        options: [
          ...command.options.filter((o) => o.key !== option.key),
          {
            ...(option as ApplicationCommandOption),
            options: option.options?.map((o) => ({
              ...o,
              key: undefined,
            })),
          },
        ],
      });
    }
  }, [option]);

  const [optionElements, setOptionElements] =
    useRecoilState(optionElementState);

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

  const [childOptionElements, setChildOptionElements] = useState<ReactNode[]>(
    [],
  );

  function updateChildOption(val: Partial<ApplicationCommandOption>) {
    setOption((prev) => ({
      ...prev,
      options: [
        ...(prev.options ?? []).filter((o) => {
          // console.log(o, val, o.key !== val.key);
          return o.key !== val.key;
        }),
        val as ApplicationCommandOption,
      ],
    }));
  }

  function deleteChildOption(key: string) {
    // console.log(key, childOptionElements, option.options);
    setChildOptionElements((prev) =>
      prev.filter((elem: any) => elem.key !== key),
    );
    // setOption({
    //   ...option,
    //   options: option.options?.filter((o) => o.key !== key),
    // });
    setOption((prev) => ({
      ...prev,
      options: prev.options?.filter((o) => o.key !== key),
    }));
  }

  function addChildOption(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const ts = Date.now();
    const childOption = {
      key: `${
        ApplicationCommandOptionType[parseInt(e.currentTarget.id)]
      }Option-${ts}`,
      type: parseInt(e.currentTarget.id),
      name: '',
      description: '',
      options: [],
    };
    setOption({
      ...option,
      options: [...(option.options ?? []), childOption],
    });
    setChildOptionElements([
      ...childOptionElements,
      <SubCommand
        key={`${
          ApplicationCommandOptionType[parseInt(e.currentTarget.id)]
        }Option-${ts}`}
        type={parseInt(e.currentTarget.id)}
        index={ts}
        inGroup
        deleter={deleteChildOption}
        updater={updateChildOption}
        className="subCommandChild"
      />,
    ]);
  }

  const OptionNames = keyofEnum(ApplicationCommandOptionType);
  const SubCommandOpt = OptionNames.splice(0, 1);

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
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <GenericInput name="name" setter={[option, setOption]} />
          <GenericInput name="description" setter={[option, setOption]} />
          <Row>
            <Col flex="auto">
              <Row align="middle" justify="start">
                <Space align="center">
                  {SubCommandOpt.map((val) => (
                    <Button
                      key={val}
                      id={
                        ApplicationCommandOptionType[
                          val as unknown as ApplicationCommandOptionType
                        ]
                      }
                      onClick={addChildOption}
                      size="large"
                      type="primary"
                    >
                      <Row gutter={8} align="middle" justify="space-around">
                        <Col>{Icons[val]}</Col>
                        <Col>{val}</Col>
                      </Row>
                    </Button>
                  ))}
                </Space>
              </Row>
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
      <Space
        direction="vertical"
        style={{ width: '100%', paddingBottom: '10px' }}
      >
        {childOptionElements}
      </Space>
    </>
  );
}

export default SubCommandGroup;
