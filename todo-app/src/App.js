import React, { useCallback, useRef, useState } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoTemplate from './components/TodoTemplate';
import TodoList from './components/TodoList';

// 나중에 추가할 일정 항목에 대한 상태를 관리
function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: true,
    },
    {
      id: 3,
      text: 'Todo-List 만들어보기',
      checked: false,
    },
  ]);

  //  고윳값으로 사용될 id : useState 가 아니라 왜 useRef 로 만드냐?
  // id 값은 렌더링되는 정보가 아니기 때문에, 화면에 보이지도 않고, 이 값이 바뀐다고 해서 컴포넌트가 리렌더링될 필요가 없기 때문. 단순히 새로운 항목을 만들 때 참조되는 값일뿐임.
  const nextId = useRef(4);
  // props 로 전달해야 할 함수를 만들 때는 useCallback 사용하여 함수를 감싼다. ( 성능의 최적화를 위해 )
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      // 받아온 정보를 새로 todos 에 추가해서 갈아끼움.
      setTodos(todos.concat(todo));
      // 추가한 후, id 값을 +1 씩 증가시킴.
      nextId.current += 1;
    },
    [todos],
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    (id) => {
      // map 을 사용하여 특정 id 를 가지고 있는 객체의 checked 값을 !로 반전 시켜줌.
      // 근데 하나만 변환하는데 왜 map 씀 ? >> 이 코드는 todo.id 와 현재 파라미터의 id 값이 같을 때는 우리가 정해준 규칙대로 새로운 객체를 생성하지만, id 값이 다를 때는 변화를 주지 않고, 처음 받아왔던 상태 그대로 반환.
      // 그렇기 때문에 map 을 사용하여 만든 배열에서 변화가 필요한 원소만 업데이트 되고 나머지는 그대로 남아 있게 되는 것.
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
