import { configureStore  } from '@reduxjs/toolkit';
import Todoreducer from '@components/redux/slice'

const store = configureStore({
    reducer: {
        todo:Todoreducer
    }
})

export default store;