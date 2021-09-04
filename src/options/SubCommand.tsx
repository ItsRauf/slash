import {
  Box,
  Button,
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
} from '../state';
import Icons from '../icons';
import BaseInput from './BaseInput';
import { getIcon } from './addOption';
import { nanoid } from 'nanoid';
import OptionBlock from './OptionBlock';

interface SubCommandProps {
  type: keyof typeof ApplicationCommandOptionType;
  _key: string;
  inGroup?: boolean;
  setters?: {
    addOption: (option: ApplicationCommandOption) => void;
    removeElement: (key: string) => void;
    removeOption: (key?: string) => void;
    updateOption: (option: ApplicationCommandOption) => void;
  };
}

function SubCommand({ type, _key, inGroup, setters }: SubCommandProps) {
  const Icon = Icons.SubCommand;
  const removeElement = useOptionElementStore((state) => state.removeElement);
  const addOption = useCommandStore((state) => state.addOption);
  const removeOption = useCommandStore((state) => state.removeOption);
  const updateOption = useCommandStore((state) => state.updateOption);
  const removeOptionElement = () => {
    if (inGroup) {
      setters?.removeOption(_key);
      setters?.removeElement(_key);
    } else {
      removeOption(_key);
      removeElement(_key);
    }
  };

  const optionNames = Object.values(ApplicationCommandOptionType).filter(
    (value) => typeof value === 'string',
  ) as Array<keyof typeof ApplicationCommandOptionType>;

  const [option, setOption] = useState<ApplicationCommandOption>({
    key: _key,
    type: ApplicationCommandOptionType.SubCommand,
    name: '',
    description: '',
    options: [],
  });

  const [optionElements, setOptionElements] = useState<ReactNode[]>([]);

  const addOptionElement = (
    type: keyof typeof ApplicationCommandOptionType,
  ) => {
    const elemKey = nanoid();
    const setters = {
      addOption: (option: ApplicationCommandOption) => {
        setOption((opt) => ({
          ...opt,
          options: [...(opt.options ?? []), option],
        }));
      },
      removeElement: (key: string) => {
        setOptionElements((elems) =>
          elems.filter((elem: any) => elem.key !== key),
        );
      },
      removeOption: (key?: string | undefined) => {
        setOption((opt) => ({
          ...opt,
          options: (opt.options ?? []).filter((o) => o.key !== key),
        }));
      },
      updateOption: (option: ApplicationCommandOption) => {
        setOption((opt) => ({
          ...opt,
          options: [
            ...(opt.options ?? []).filter((o) => o.key !== option.key),
            option,
          ],
        }));
      },
    };
    setOptionElements((elems) => [
      ...elems,
      <OptionBlock
        type={type}
        key={elemKey}
        _key={elemKey}
        inSubCommand
        setters={setters}
      />,
    ]);
  };

  useEffect(() => {
    inGroup ? setters?.addOption(option) : addOption(option);
  }, []);

  useEffect(() => {
    inGroup ? setters?.updateOption(option) : updateOption(option);
  }, [option]);

  const updateLocalOption = (opt: Partial<ApplicationCommandOption>) => {
    setOption({
      ...option,
      ...opt,
    });
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
            <Icon boxSize={6} mt="1" />
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
          </Flex>
          <Wrap spacing="2" w="full">
            {optionNames
              .filter((o) => !o.includes('SubCommand'))
              .map((val) => (
                <Button
                  m="1"
                  leftIcon={getIcon(val)}
                  onClick={() => addOptionElement(val)}
                  key={val}
                >
                  {val}
                </Button>
              ))}
          </Wrap>
        </VStack>
      </Box>
      <Box ml="8">{optionElements}</Box>
    </>
  );
}

export default SubCommand;
