import React, { useRef } from "react";
import Todo from "../models/todo.model";
import TodoItem from "./TodoItem";
import "./TodoList.css";

interface TodoListProps {
  items: Todo[];
  onDeleteTodo: (id: string) => void;
  onSwitchTodos: (dragIdx: number, dropIdx: number) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  let dragAndDropIdx = { drag: 0, drop: 0 };
  const dragStartHandler = (event: React.DragEvent<HTMLElement>) => {
    event.dataTransfer.dropEffect = "move";
    dragAndDropIdx.drag = +event.currentTarget.dataset.id!;
  };

  const dragEnterHandler = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    dragAndDropIdx.drop = +event.currentTarget.dataset.id!;
  };

  const dragEndHandler = () => {
    props.onSwitchTodos(dragAndDropIdx.drag, dragAndDropIdx.drop);
  };

  return (
    <ul>
      {props.items.map((todo, idx) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          idx={idx}
          onDeleteTodo={props.onDeleteTodo}
          onDragStart={dragStartHandler}
          onDragEnter={dragEnterHandler}
          onDragEnd={dragEndHandler}
        />
      ))}
    </ul>
  );
};

export default TodoList;
