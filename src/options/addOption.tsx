import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React from 'react';
import Icons from '../icons';
import {
  ApplicationCommandOptionType,
  useCommandStore,
  useOptionElementStore,
} from '../state';
import OptionBlock from './OptionBlock';
import SubCommand from './SubCommand';
import SubCommandGroup from './SubCommandGroup';

export function getIcon(name: keyof typeof ApplicationCommandOptionType) {
  const Icon = Icons[name];
  return <Icon boxSize={6} />;
}

function AddOption() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const options = useCommandStore((state) => state.options);
  const optionNames = Object.values(ApplicationCommandOptionType).filter(
    (value) => typeof value === 'string',
  ) as Array<keyof typeof ApplicationCommandOptionType>;

  const addElement = useOptionElementStore((state) => state.addElement);

  const addOptionElement = (
    type: keyof typeof ApplicationCommandOptionType,
  ) => {
    const elemKey = nanoid();
    switch (type) {
      case 'SubCommand':
        addElement(<SubCommand type={type} key={elemKey} _key={elemKey} />);
        break;
      case 'SubCommandGroup':
        addElement(
          <SubCommandGroup type={type} key={elemKey} _key={elemKey} />,
        );
        break;

      default:
        addElement(<OptionBlock type={type} key={elemKey} _key={elemKey} />);
        break;
    }
    return onClose();
  };

  const isDisabled = (type: keyof typeof ApplicationCommandOptionType) => {
    const optNames = options?.map(
      (opt) => ApplicationCommandOptionType[opt.type],
    );
    if (
      optNames &&
      optNames.length > 0 &&
      optNames.find((o) => o.includes('SubCommand')) &&
      !type.includes('SubCommand')
    )
      return true;
    if (
      optNames &&
      optNames.length > 0 &&
      !optNames.find((o) => o.includes('SubCommand')) &&
      type.includes('SubCommand')
    )
      return true;
    return false;
  };

  return (
    <>
      <Button w="32" mb="4" colorScheme="blue" onClick={onOpen}>
        Add Option
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Option</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {optionNames.map((val) => (
              <Button
                m="1"
                leftIcon={getIcon(val)}
                onClick={() => addOptionElement(val)}
                key={val}
                disabled={isDisabled(val)}
              >
                {val}
              </Button>
            ))}
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddOption;
