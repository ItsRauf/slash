import { Card, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

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

  return (
    <Card loading={!loaded}>
      <pre>
        <code>{useSkeleton ? <Skeleton /> : code}</code>
      </pre>
    </Card>
  );
}

export default CodeBlock;
