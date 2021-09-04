import React from 'react';
import {
  Button,
  Code,
  Flex,
  Spacer,
  useClipboard,
  useColorMode,
} from '@chakra-ui/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import nightowl from 'prism-react-renderer/themes/nightowl';
import nightowlLight from 'prism-react-renderer/themes/nightOwlLight';
import { CopyIcon } from '@chakra-ui/icons';

interface CodeBlockProps {
  code: string;
}

function CodeBlock({ code }: CodeBlockProps) {
  const { colorMode } = useColorMode();
  const { onCopy, hasCopied } = useClipboard(code);
  return (
    <Code display="block" whiteSpace="pre" flexGrow={1} p="4" my="4">
      <Highlight
        {...defaultProps}
        theme={colorMode === 'dark' ? nightowl : nightowlLight}
        code={code}
        language="json"
      >
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre className={className}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Flex>
        <Spacer />
        <Button leftIcon={<CopyIcon />} onClick={onCopy}>
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </Flex>
    </Code>
  );
}

export default CodeBlock;
