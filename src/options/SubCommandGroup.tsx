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
import SubCommand from './SubCommand';

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

function SubCommandGroup({ type, _key, inGroup, setters }: SubCommandProps) {
  const Icon = Icons.SubCommandGroup;
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
    type: ApplicationCommandOptionType.SubCommandGroup,
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
      <SubCommand
        type={type}
        key={elemKey}
        _key={elemKey}
        inGroup
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
          <HStack spacing="2" w="full">
            <Button
              m="1"
              leftIcon={getIcon(optionNames[0])}
              onClick={() => addOptionElement(optionNames[0])}
              key={optionNames[0]}
            >
              {optionNames[0]}
            </Button>
          </HStack>
        </VStack>
      </Box>
      <Box ml="8">{optionElements}</Box>
    </>
  );
}

export default SubCommandGroup;
