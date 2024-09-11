import React, { useState, useEffect } from 'react';
import './Todo.css';
import { Button, Container, Form, ListGroup, Row, Col } from 'react-bootstrap';

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputTitle.trim() === '' || inputDescription.trim() === '') return;
    setTodos([...todos, { title: inputTitle, description: inputDescription }]);
    setInputTitle('');
    setInputDescription('');
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <Container className="todo-container py-5">
      <div className="header text-center mb-4">
        <h1>Task Management & To-Do List</h1>
        <h2>Welcome to Todo App</h2>
        <p>Manage your tasks efficiently!</p>
      </div>

      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <div className="todo-input-card p-4 mb-4">
            <Form.Group>
              <Form.Control
                type="text"
                className="input-title mb-3"
                placeholder="Title"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
              />
              <Form.Control
                as="textarea"
                className="input-description mb-3"
                rows={3}
                placeholder="Description"
                value={inputDescription}
                onChange={(e) => setInputDescription(e.target.value)}
              />
              <Button variant="primary" block onClick={addTodo}>
                Add Task
              </Button>
            </Form.Group>
          </div>

          <ListGroup className="todo-list">
            {todos.length === 0 ? (
              <p className="empty-state">No tasks added yet. Start by adding one!</p>
            ) : (
              todos.map((todo, index) => (
                <ListGroup.Item key={index} className="todo-card mb-3 d-flex justify-content-between align-items-center">
                  <div>
                    <h4>{todo.title}</h4>
                    <p>{todo.description}</p>
                  </div>
                  <Button variant="danger" onClick={() => removeTodo(index)}>Remove</Button>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
