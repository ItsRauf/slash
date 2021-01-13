import { Button, Col, Modal, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { commandState, optionElementState } from '../recoil';

import { ApplicationCommandOptionType } from '../slash/ApplicationCommand';
import Option from './options/Option';
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
    if (!command.options) {
      setCommand({ ...command, options: [] });
    }
    setModalVisibility(!modalVisibility);
  }

  const OptionNames = keyofEnum(ApplicationCommandOptionType);

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
            {OptionNames.splice(0, 3).map((val) => (
              <Col flex="auto">
                <Button
                  key={val}
                  id={
                    ApplicationCommandOptionType[
                      (val as unknown) as ApplicationCommandOptionType
                    ]
                  }
                  onClick={addOptionElement}
                >
                  {val}
                </Button>
              </Col>
            ))}
          </Row>
          <Row gutter={16} justify="space-around" align="middle">
            {OptionNames.splice(-3).map((val) => (
              <Col flex="auto">
                <Button
                  key={val}
                  id={
                    ApplicationCommandOptionType[
                      (val as unknown) as ApplicationCommandOptionType
                    ]
                  }
                  onClick={addOptionElement}
                >
                  {val}
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
