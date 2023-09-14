import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    initialize: (state, action) => {
      this.state = action.payload;
    },
    addTodo: (state, action) => {
        state.todos.push(action.payload)
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id!==action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo } = todoSlice.actions

export default todoSlice.reducer