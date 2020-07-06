import React, { useState, useReducer } from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/compact-theme';
import HooksExperiment from './hooks-try/HooksExperiment';
import ReduxExperiment from './redux-try/ReduxExperiment';
import MobxExperiment from './mobx-try/MobxExperiment';

const { Header, Content } = Layout;

export default function App() {
  const [menuIndex, setMenuIndex] = useState('1');
  const { onClick, items } = useContentState();

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[menuIndex]}>
          <Menu.Item key='hooks' onClick={(e) => onClick(e.key.toString())}>
            Hooks
          </Menu.Item>
          <Menu.Item key='mobx' onClick={(e) => onClick(e.key.toString())}>
            Mobx
          </Menu.Item>
          <Menu.Item key='redux' onClick={(e) => onClick(e.key.toString())}>
            Redux
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{ background: 'white', padding: '0 50px', marginTop: 64 }}
      >
        <div style={{ padding: 24, minHeight: 380 }}>
          <HooksExperiment visible={items[getIndex(items, 'hooks')].visible} />
          <ReduxExperiment visible={items[getIndex(items, 'redux')].visible} />
          <MobxExperiment visible={items[getIndex(items, 'mobx')].visible} />
        </div>
      </Content>
    </Layout>
  );
}

interface IMenu {
  item: String;
  visible: Boolean;
}

const initialMenu: IMenu[] = [
  {
    item: 'mobx',
    visible: false,
  },
  {
    item: 'redux',
    visible: false,
  },
  {
    item: 'hooks',
    visible: true,
  },
];

const useContentState = () => {
  const [state, dispatch] = useReducer(reducer, initialMenu);
  const onClick = (menu: string) => {
    dispatch({ type: menu });
  };

  return { onClick, items: state };
};

const reducer = (state: IMenu[], action: any) => {
  state.map((x) => (x.visible = false));
  state[getIndex(state, action.type)].visible = true;
  return [...state];
};

const getIndex = (state: IMenu[], bodyItem: string) => {
  return state.findIndex((x) => x.item === bodyItem) || 0;
};
