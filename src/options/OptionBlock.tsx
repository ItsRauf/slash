import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  Flex,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  ApplicationCommandOptionType,
  useOptionElementStore,
  useCommandStore,
  ApplicationCommandOption,
  ApplicationCommandOptionChoice,
} from '../state';
import Icons from '../icons';
import BaseInput from './BaseInput';
import { nanoid } from 'nanoid';
import Choice from './Choice';

interface OptionBlockProps {
  type: keyof typeof ApplicationCommandOptionType;
  _key: string;
  inSubCommand?: boolean;
  setters?: {
    addOption: (option: ApplicationCommandOption) => void;
    removeElement: (key: string) => void;
    removeOption: (key?: string) => void;
    updateOption: (option: ApplicationCommandOption) => void;
  };
}

function OptionBlock({ type, _key, inSubCommand, setters }: OptionBlockProps) {
  const Icon = Icons[type];
  const removeElement = useOptionElementStore((state) => state.removeElement);
  const addOption = useCommandStore((state) => state.addOption);
  const removeOption = useCommandStore((state) => state.removeOption);
  const updateOption = useCommandStore((state) => state.updateOption);
  const removeOptionElement = () => {
    if (inSubCommand) {
      setters?.removeOption(_key);
      setters?.removeElement(_key);
    } else {
      removeOption(_key);
      removeElement(_key);
    }
  };

  const [option, setOption] = useState<ApplicationCommandOption>({
    key: _key,
    type: ApplicationCommandOptionType[type],
    name: '',
    description: '',
  });

  useEffect(() => {
    inSubCommand ? setters?.addOption(option) : addOption(option);
  }, []);

  useEffect(() => {
    inSubCommand ? setters?.updateOption(option) : updateOption(option);
  }, [option]);

  const updateLocalOption = (opt: Partial<ApplicationCommandOption>) => {
    setOption((option) => ({ ...option, ...opt }));
  };

  const [choiceElements, setChoiceElements] = useState<ReactNode[]>([]);

  const addChoice = () => {
    const key = nanoid();
    const addChoice = (choice: ApplicationCommandOptionChoice) => {
      setOption((option) => ({
        ...option,
        choices: [...(option.choices ?? []), choice],
      }));
    };
    const updateChoice = (choice: ApplicationCommandOptionChoice) => {
      setOption((option) => ({
        ...option,
        choices: [
          ...(option.choices ?? []).filter((c) => c.key !== choice.key),
          choice,
        ],
      }));
    };
    const deleteChoice = (key?: string) => {
      setOption((option) => ({
        ...option,
        choices: (option.choices ?? []).filter((c) => c.key !== key),
      }));
      setChoiceElements((elems) =>
        elems.filter((elem: any) => elem.key !== key),
      );
    };
    setChoiceElements((elems) => [
      ...elems,
      <Choice
        key={key}
        _key={key}
        addChoice={addChoice}
        updateChoice={updateChoice}
        deleteChoice={deleteChoice}
      />,
    ]);
  };

  return (
    <>
      <Box
        boxShadow={useColorModeValue('lg', 'dark-lg')}
        p="6"
        my="4"
        rounded="md"
      >
        <VStack spacing={2}>
          <HStack spacing="2" w="full">
            <Icon boxSize={6} />
            <Text>{type}</Text>
            <Spacer />
            <CloseButton size="md" onClick={removeOptionElement} />
          </HStack>
          <Flex direction="column" w="full">
            <BaseInput
              title="Name"
              placeholder="Option Name"
              setter={(name) => updateLocalOption({ name })}
            />
            <BaseInput
              title="Description"
              placeholder="Option Description"
              setter={(description) => updateLocalOption({ description })}
            />
            <Checkbox
              size="lg"
              colorScheme="blue"
              onChange={(e) =>
                updateLocalOption({
                  required: e.target.checked ? true : undefined,
                })
              }
            >
              Required
            </Checkbox>
            <Button mx="1" mt="4" w="32" colorScheme="blue" onClick={addChoice}>
              Add Choice
            </Button>
          </Flex>
        </VStack>
      </Box>
      <Box ml="8">
        <Wrap>{choiceElements}</Wrap>
      </Box>
    </>
  );
}

export default OptionBlock;
