'use client';

import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store/index';

interface IProperties {
  children: ReactNode;
}

const ReduxProvider: FC<IProperties> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
