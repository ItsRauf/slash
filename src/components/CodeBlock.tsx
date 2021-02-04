import { Button, Card, Skeleton, Row, Col, Alert } from 'antd';
import React, { useEffect, useState, useRef } from 'react';

interface CodeBlockProps {
  code: string;
}
function CodeBlock({ code }: CodeBlockProps) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  const [useSkeleton, setUseSkeleton] = useState(code === '{}');
  useEffect(() => {
    if (code !== '{}') {
      setUseSkeleton(false);
    } else {
      setUseSkeleton(true);
    }
  }, [code]);

  const textArea = useRef<HTMLTextAreaElement>(null);
  function copy(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    textArea.current?.select();
    document.execCommand('copy');
    e.currentTarget.focus();
  }

  return (
    <Card loading={!loaded}>
      <pre>
        <code>{useSkeleton ? <Skeleton /> : code}</code>
      </pre>
      <Row justify="end">
        <Col span={1}>
          <Button ghost type="primary" onClick={copy}>
            Copy
          </Button>
        </Col>
      </Row>
      <textarea
        ref={textArea}
        style={{
          height: '0',
          position: 'absolute',
          zIndex: -1,
          opacity: '.01',
        }}
        value={code}
      />
    </Card>
  );
}

export default CodeBlock;
