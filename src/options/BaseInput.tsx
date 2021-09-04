import React, { ChangeEventHandler, useState, useEffect } from 'react';
import { Box, Input, Text } from '@chakra-ui/react';

interface BaseInputProps {
  title: string;
  placeholder: string;
  setter(val?: string): void;
  validationRegex?: RegExp;
}

function BaseInput({ title, placeholder, setter }: BaseInputProps) {
  const [value, setValue] = useState('');
  useEffect(() => {
    if (value) {
      setter(value);
    } else {
      setter(undefined);
    }
  }, [value]);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setValue(event.target.value);
  return (
    <Box pb="4">
      <Text fontSize="xl" mb="8px">
        {title}:
      </Text>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        size="md"
      />
    </Box>
  );
}

export default BaseInput;
