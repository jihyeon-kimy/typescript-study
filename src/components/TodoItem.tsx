import React from "react";
import { Todo } from "../todo.model";

interface TodoItemProps {
  todo: Todo;
  idx: number;
  onDeleteTodo: (id: string) => void;
  onDragStart: (event: React.DragEvent<HTMLElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  return (
    <li
      draggable="true"
      onDragStart={props.onDragStart}
      onDragOver={props.onDragEnter}
      onDragEnd={props.onDragEnd}
      key={props.todo.id}
      data-id={props.idx}>
      <span>{props.todo.text}</span>
      <button onClick={props.onDeleteTodo.bind(null, props.todo.id)}>DELETE</button>
    </li>
  );
};

export default TodoItem;
