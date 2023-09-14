"use client"

import TodoFeed from '@components/TodoFeed';
import store from '@components/redux/store'
import { Provider as ReduxProvider } from 'react-redux'

export default function Home() {
  return (
    <ReduxProvider store={store}>
      <TodoFeed />
    </ReduxProvider>
  )
}
