import React, { useState, useEffect } from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <IconButton
        onClick={toggleColorMode}
        aria-label="Toggle Theme"
        icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
      />
    </>
  );
}

export default ThemeToggle;
