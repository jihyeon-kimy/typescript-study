# Typescript + React

타입스크립트를 익히기 위해, 기본적인 CRUD(Todo List앱)을 만들며 기록한 레포지토리 입니다.

---

### 1. `React.FC`와 Props

- `React.FC` 단순한 function이 아닌, 함수형 컴포넌트 라는 것을 표시한다.
- 컴포넌트 안에서 props를 사용하면, 타입스크립트는 props의 구조를 모르기 때문에 알려줘야 한다.

```tsx
interface TodoListProps {
  items: { id: string; text: string }[];
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};
```

### 2. useRef (와 !의 의미)

- ref는 일반적인 function이기 때문에, 어떤 데이터(아래에서는 데이터 타입은 HTMLInputElement, 기본값은 null을 주었다)가 저장될지 아는 것은 중요하다.
- 타입스크립트는 ref 연결이 완료되었는지 확실히 알 수 없기 때문에, textInputRef.current가 null일 수 있다고 생각한다. null이라면 value값을 갖지 못하기 때문에 오류가 생긴다. `textInputRef.current!.value` 느낌표를 더해서 타입스크립트에게 ref의 값이 설정될 것임을 알려준다.
- 처음에 컴포넌트는 순차적으로 렌더링 되기 때문에, return의 form부분이 렌더링된 후에야 ref연결이 완료되고 ref가 작동하기 시작한다. 코드를 작성하는 사람 ref가 연결되어 null값이 들어가지 않음을 알지만, 타입스크립트는 이를 이해하지 못한다.

```tsx
interface NewTodoProps {
  onAddTodo: (todoText: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null); // **useRef
  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value; // **ref.current!.value
    props.onAddTodo(enteredText);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">ADD TODO</button>
    </form>
  );
};
```

### 3. useState를 배열로 초기화할 때

```tsx
// wrong way❌
const [todos, setTodos] = useState<>([]);
// right way👍
const [todos, setTodos] = useState<Todo[]>([]);
```

- wrong way에 적혀있는 것과 같이 빈 배열로 useState를 초기화하면, 타입스크립트는 useSate가 항상 비여있을 배열을 가질 것을 기대한다. never[]
- 따라서 State가 시간이 지날 수록 어떻게 될 것인지 타입스크립트에게 알려주어야 한다.
- useState도 일반적인 function이므로, state가 어떤 데이터 종류를 갖을지 알려줄 수 있다. (right way 참고)
