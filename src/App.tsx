import React, { useState } from "react";
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";
import { Todo } from "./todo.model";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    setTodos((prev) => [...prev, { id: Math.random().toString(), text }]);
  };

  const switchTodoHandler = (dragIdx: number, dropIdx: number) => {
    const switchedTodos = JSON.parse(JSON.stringify(todos));
    switchedTodos.splice(dragIdx, 1);
    switchedTodos.splice(dropIdx, 0, todos[dragIdx]);
    setTodos(switchedTodos);
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList
        items={todos}
        onDeleteTodo={todoDeleteHandler}
        onSwitchTodos={switchTodoHandler}
      />
    </div>
  );
};

export default App;
