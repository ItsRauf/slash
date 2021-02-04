import {
  ApplicationCommandOption,
  ApplicationCommandOptionType,
} from '../../slash/ApplicationCommand';
import { Button, Card, Col, Row, Space, Switch, Typography } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { commandState, optionElementState } from '../../recoil';

import GenericInput from './GenericInput';
import Icons from '../../icons';
import Option from './Option';
import keyofEnum from '../../helpers/keyofEnum';
import { useRecoilState } from 'recoil';

interface SubCommandProps {
  type: ApplicationCommandOptionType;
  index: number;
  inGroup: boolean;
  offset?: number;
  deleter?: (key: string) => void;
  updater?: (val: ApplicationCommandOption) => void;
  className?: string;
}
function SubCommand({
  type,
  index,
  inGroup,
  offset,
  deleter,
  updater,
}: SubCommandProps) {
  const [option, setOption] = useState<ApplicationCommandOption>({
    key: `${ApplicationCommandOptionType[type]}Option-${index}`,
    type,
    name: '',
    description: '',
    options: [],
  });
  const [command, setCommand] = useRecoilState(commandState);
  useEffect(() => {
    console.log('useEffect [option] (SubCommand.tsx:30)', option);
    if (inGroup && updater) {
      updater({
        ...option,
        options: option.options?.map((o) => ({
          ...o,
          key: undefined,
        })),
      });
    }
    if (!inGroup && command.options) {
      setCommand({
        ...command,
        options: [
          ...command.options.filter((o) => o.key !== option.key),
          {
            ...option,
            options: option.options?.map((o) => ({
              ...o,
              key: undefined,
            })),
          },
        ],
      });
    }
  }, [option]);

  const [optionElements, setOptionElements] = useRecoilState(
    optionElementState,
  );

  function deleteOption() {
    if (inGroup && deleter) {
      deleter(option.key ?? '');
    }
    if (!inGroup && command.options) {
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

  function updateChildOption(val: ApplicationCommandOption) {
    setOption((prev) => ({
      ...prev,
      options: [
        ...(prev.options ?? []).filter((o) => {
          // console.log(o, val, o.key !== val.key);
          return o.key !== val.key;
        }),
        val,
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
      <Option
        key={`${
          ApplicationCommandOptionType[parseInt(e.currentTarget.id)]
        }Option-${ts}`}
        type={parseInt(e.currentTarget.id)}
        index={ts}
        inSubCommand
        offset={inGroup ? '40px' : undefined}
        deleter={deleteChildOption}
        updater={updateChildOption}
        className="subCommandChild"
      />,
    ]);
  }

  const OptionNames = keyofEnum(ApplicationCommandOptionType);
  const SubCommandOptions = OptionNames.splice(0, 2);

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
        style={inGroup ? { marginLeft: offset || '20px' } : {}}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <GenericInput name="name" setter={[option, setOption]} />
          <GenericInput name="description" setter={[option, setOption]} />
          <Row>
            <Col flex="auto">
              <Row align="middle" justify="start">
                <Space align="center">
                  {OptionNames.map((val) => (
                    <Button
                      key={val}
                      id={
                        ApplicationCommandOptionType[
                          (val as unknown) as ApplicationCommandOptionType
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

export default SubCommand;
