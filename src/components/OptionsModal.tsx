import { Button, Col, Modal, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { commandState, optionElementState } from '../recoil';

import { ApplicationCommandOptionType } from '../slash/ApplicationCommand';
import Icons from '../icons';
import Option from './options/Option';
import SubCommand from './options/SubCommand';
import SubCommandGroup from './options/SubCommandGroup';
import keyofEnum from '../helpers/keyofEnum';
import { useRecoilState } from 'recoil';

function OptionsModal() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  const [modalVisibility, setModalVisibility] = useState(false);
  function changeModalVisibility() {
    setModalVisibility(!modalVisibility);
  }

  const [optionElements, setOptionElements] = useRecoilState(
    optionElementState,
  );
  const [command, setCommand] = useRecoilState(commandState);
  function addOptionElement(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const ts = Date.now();
    const optionType = parseInt(e.currentTarget.id);
    switch (optionType) {
      case ApplicationCommandOptionType.SubCommand:
        setOptionElements([
          ...optionElements,
          <SubCommand
            key={`${
              ApplicationCommandOptionType[parseInt(e.currentTarget.id)]
            }Option-${ts}`}
            type={parseInt(e.currentTarget.id)}
            index={ts}
            inGroup={false}
          />,
        ]);
        break;

      case ApplicationCommandOptionType.SubCommandGroup:
        setOptionElements([
          ...optionElements,
          <SubCommandGroup
            key={`${
              ApplicationCommandOptionType[parseInt(e.currentTarget.id)]
            }Option-${ts}`}
            type={parseInt(e.currentTarget.id)}
            index={ts}
            inGroup={false}
          />,
        ]);
        break;

      default:
        setOptionElements([
          ...optionElements,
          <Option
            key={`${
              ApplicationCommandOptionType[parseInt(e.currentTarget.id)]
            }Option-${ts}`}
            type={parseInt(e.currentTarget.id)}
            index={ts}
          />,
        ]);
        break;
    }
    if (!command.options) {
      setCommand({ ...command, options: [] });
    }
    setModalVisibility(!modalVisibility);
  }

  const OptionNames = keyofEnum(ApplicationCommandOptionType);
  const SubCommandOptions = OptionNames.splice(0, 2);

  return (
    <>
      <Button
        type="primary"
        size="large"
        loading={!loaded}
        onClick={changeModalVisibility}
      >
        Add Option
      </Button>
      <Modal
        centered
        title="Add Option"
        visible={modalVisibility}
        // onOk={addOptionElement}
        onCancel={changeModalVisibility}
        footer={null}
      >
        <Space size={24} direction="vertical" style={{ width: '100%' }}>
          <Row gutter={16} justify="space-around" align="middle">
            {OptionNames.splice(0, 3).map((val, ind) => (
              <Col flex="auto" key={ind}>
                <Button
                  key={val}
                  id={
                    ApplicationCommandOptionType[
                      (val as unknown) as ApplicationCommandOptionType
                    ]
                  }
                  onClick={addOptionElement}
                  size="large"
                >
                  <Row gutter={8} align="middle" justify="space-around">
                    <Col>{Icons[val]}</Col>
                    <Col>{val}</Col>
                  </Row>
                </Button>
              </Col>
            ))}
          </Row>
          <Row gutter={16} justify="space-around" align="middle">
            {OptionNames.splice(-3).map((val, ind) => (
              <Col flex="auto" key={ind}>
                <Button
                  key={val}
                  id={
                    ApplicationCommandOptionType[
                      (val as unknown) as ApplicationCommandOptionType
                    ]
                  }
                  onClick={addOptionElement}
                  size="large"
                >
                  <Row gutter={8} align="middle" justify="space-around">
                    <Col>{Icons[val]}</Col>
                    <Col>{val}</Col>
                  </Row>
                </Button>
              </Col>
            ))}
          </Row>
          <Row gutter={16} justify="space-around" align="middle">
            {SubCommandOptions.map((val, ind) => (
              <Col flex="auto" key={ind}>
                <Button
                  key={val}
                  id={
                    ApplicationCommandOptionType[
                      (val as unknown) as ApplicationCommandOptionType
                    ]
                  }
                  onClick={addOptionElement}
                  size="large"
                >
                  <Row gutter={8} align="middle" justify="space-around">
                    <Col>{Icons[val]}</Col>
                    <Col>{val}</Col>
                  </Row>
                </Button>
              </Col>
            ))}
          </Row>
        </Space>
      </Modal>
    </>
  );
}

export default OptionsModal;
