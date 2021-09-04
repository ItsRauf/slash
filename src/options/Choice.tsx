import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import type { ApplicationCommandOptionChoice } from 'src/state';
import BaseInput from './BaseInput';
import { Choice as ChoiceIcon } from '../icons';

interface ChoiceProps {
  _key: string;
  addChoice: (choice: ApplicationCommandOptionChoice) => void;
  updateChoice: (choice: ApplicationCommandOptionChoice) => void;
  deleteChoice: (key?: string) => void;
}

function Choice({ _key, addChoice, deleteChoice, updateChoice }: ChoiceProps) {
  const [choice, setChoice] = useState<ApplicationCommandOptionChoice>({
    key: _key,
    name: '',
    value: '',
  });

  useEffect(() => {
    addChoice(choice);
  }, []);

  useEffect(() => {
    updateChoice(choice);
  }, [choice]);

  const updateLocalChoice = (c: Partial<ApplicationCommandOptionChoice>) => {
    setChoice((choice) => ({ ...choice, ...c }));
  };

  return (
    <>
      <Box
        boxShadow={useColorModeValue('lg', 'dark-lg')}
        p="6"
        my="4"
        rounded="md"
        w="sm"
      >
        <VStack spacing={2}>
          <HStack spacing="2" w="full">
            <ChoiceIcon boxSize={6} />
            <Text>Choice</Text>
            <Spacer />
            <CloseButton onClick={() => deleteChoice(_key)} />
          </HStack>
          <Flex direction="column" w="full">
            <BaseInput
              title="Name"
              placeholder="Choice Name"
              setter={(name) => updateLocalChoice({ name })}
            />
            <BaseInput
              title="Value"
              placeholder="Choice Value"
              setter={(value) =>
                updateLocalChoice({ value: isNaN(+value!) ? value : +value! })
              }
            />
          </Flex>
        </VStack>
      </Box>
    </>
  );
}

export default Choice;
