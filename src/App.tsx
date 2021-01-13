//import './App.scss';

import { Card, Layout, Space } from 'antd';
import { finalCommandState, finalOptionElementState } from './recoil';

import CodeBlock from './components/CodeBlock';
import OptionsModal from './components/OptionsModal';
import React from 'react';
import ValueInput from './components/ValueInput';
import { useRecoilValue } from 'recoil';

function Heading() {
  return (
    <Layout.Header>
      <h2>Rauf's Slash Command Generator</h2>
    </Layout.Header>
  );
}

function App() {
  return (
    <Layout>
      <Heading />
      <Layout.Content style={{ padding: '10px' }}>
        <Space direction="vertical" style={{ width: '100%' }} size={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <ValueInput keyName="name" />
                <ValueInput keyName="description" />
              </Space>
            </Card>
            {useRecoilValue(finalOptionElementState)}
            <OptionsModal />
          </Space>
          <CodeBlock code={useRecoilValue(finalCommandState)} />
        </Space>
      </Layout.Content>
    </Layout>
  );
}

export default App;
