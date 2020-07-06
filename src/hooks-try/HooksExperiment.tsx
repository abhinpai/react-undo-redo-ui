import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Button, Row, Col } from 'antd';
import 'antd/dist/compact-theme';
import '../App.scss';
import useUR from './useUR.js';

import { RedoOutlined, UndoOutlined } from '@ant-design/icons';

interface MyProps {
  visible: Boolean;
}

export default function HooksExperiment(props: any) {
  const { onSubmit, nodes } = useUR();
  const [nodeCount, setNodeCount] = useState(1);

  function handleBtnClick(action: string) {
    onSubmit(action, nodeCount);
    setNodeCount(nodeCount + 1);

  }

  return (
    <>
      {props.visible && (
        <div>
          <h2>Undo / Redo with React Hooks</h2>
          <div className='btn-div'>
            <Button
              className='margin-right'
              type='primary'
              shape='circle'
              icon={<UndoOutlined />}
              size={'middle'}
              onClick={() => onSubmit('undo')}
            />
            <Button
              className='margin-right'
              type='primary'
              shape='circle'
              icon={<RedoOutlined />}
              size={'middle'}
              onClick={() => onSubmit('redo')}
            />
            <Button
              className='margin-right'
              type='primary'
              onClick={() => handleBtnClick('add')}
            >
              Add Node
            </Button>
          </div>
          <Row gutter={[16, 24]}>
            {nodes.map((node: any, index: number) => {
              return (
                <Col key={index} className='gutter-row' span={6}>
                  <div className='node'>{node}</div>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </>
  );
}
