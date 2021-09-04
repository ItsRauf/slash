import React, { useState, useEffect } from 'react';
import { Flex, Heading, Spacer, VStack } from '@chakra-ui/react';
import ThemeToggle from './helpers/toggleTheme';
import { useCommandStore, useOptionElementStore } from './state';
import BaseInput from './options/BaseInput';
import AddOption from './options/addOption';
import CodeBlock from './helpers/CodeBlock';

function App() {
  const optionElements = useOptionElementStore((state) => state.elements);
  const commandStore = useCommandStore();
  const getCleanedCommandJSON = useCommandStore(
    (state) => state.getCleanedCommandJSON,
  );
  const [output, setOutput] = useState(getCleanedCommandJSON());
  const update = useCommandStore((state) => state.update);
  useEffect(() => {
    setOutput(getCleanedCommandJSON());
  }, [commandStore]);

  return (
    <VStack px="8">
      <Flex w="full" py="4">
        <Heading as="h3" size="lg">
          Rauf's Slash Command Generator
        </Heading>
        <Spacer />
        <ThemeToggle />
      </Flex>
      <Flex direction="column" w="full" h="full">
        <BaseInput
          title="Name"
          placeholder="Command Name"
          setter={(val) => update('name', val)}
        />
        <BaseInput
          title="Description"
          placeholder="Command Description"
          setter={(val) => update('description', val)}
        />
        <AddOption />
        <Spacer />
        {optionElements}
        <Spacer />
        <CodeBlock code={output} />
      </Flex>
    </VStack>
  );
}

export default App;
