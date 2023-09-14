import { Schema, model, models } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        default: ""
    },
    is_completed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    set_time: {
        type: Date
    }
});

const Todo = models.Todo || model('Todo', todoSchema);

export default Todo;