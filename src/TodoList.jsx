import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import TodoItem from './TodoItem';
import TodoForm from './TodoFormj';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem('todos'));
    if (!data) return [];
    return data;
}

export default function TodoList() {
    const [todos, setTodos] = useState(getInitialData);

    const toggle = (id) => {
        setTodos(oldTodos => (
            oldTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                } else {
                    return todo;
                }
            })
        ))
    };
    const deleteTodo = (id) => {
        setTodos(oldTodos => (
            oldTodos.filter(todo => (
                todo.id !== id
            ))
        ))
    }
    const addTodo = (text) => {
        setTodos(oldTodos => (
            [...oldTodos, { id: crypto.randomUUID(), text: text, completed: false }]
        ))
    }
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            m: 3,
        }}>
            <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
                Todos
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {todos.map((todo) => (
                    <TodoItem todo={todo} key={todo.id} remove={deleteTodo} toggle={() => toggle(todo.id)} />
                ))}

                <TodoForm addTodo={addTodo} />
            </List>
        </Box>
    );
}