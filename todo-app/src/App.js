import React, { useCallback, useReducer, useRef, useState } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoTemplate from './components/TodoTemplate';
import TodoList from './components/TodoList';




function createBulkTodos(){
  const array = [];
  for (let i=1; i<=2500; i++){
    array.push({
      id:i,
      text:`할 일${i}`,
      checked:false
    })
  }
  return array;
}


function todoReducer(todos,action){
  switch(action.type){
    // 새로 추가
    case 'INSERT':
      // {type:'INSERT',todo:{id:1,text:'todo',checked:false}}
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo=>
        todo.id === action.id ? {...todo,checked:!todo.checked} :todo,
      );
    default:
      return todos;
  }
}



// 나중에 추가할 일정 항목에 대한 상태를 관리
function App() {
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트 기초 알아보기',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링 해보기',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: 'Todo-List 만들어보기',
  //     checked: false,
  //   },
  // ]);

  // const [todos,setTodos] =useState(createBulkTodos)

  const [todos,dispatch] = useReducer(todoReducer,undefined,createBulkTodos)

  //  고윳값으로 사용될 id : useState 가 아니라 왜 useRef 로 만드냐?
  // id 값은 렌더링되는 정보가 아니기 때문에, 화면에 보이지도 않고, 이 값이 바뀐다고 해서 컴포넌트가 리렌더링될 필요가 없기 때문. 단순히 새로운 항목을 만들 때 참조되는 값일뿐임.
  const nextId = useRef(2501);
  // props 로 전달해야 할 함수를 만들 때는 useCallback 사용하여 함수를 감싼다. ( 성능의 최적화를 위해 )
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      // todos 를 어떻게 업데이트할지 정의해주는 업데이트 함수를 넣어줌. 그러면 useCallback 에서 두번째 파라미터로 넣는 배열에 todos 안넣어도 됨.
      // setTodos(todos=>todos.concat(todo));
      dispatch({type:'INSERT',todo})
      // 추가한 후, id 값을 +1 씩 증가시킴.
      nextId.current += 1;
    },
    // todos delete
    [],
  );

  const onRemove = useCallback(
    (id) => {
      //  // 함수형 업데이트
      // setTodos(todos=>todos.filter((todo) => todo.id !== id));,
      dispatch({type:'REMOVE',id})
    },
    [],
  );

  const onToggle = useCallback(
    (id) => {

      // 함수형 업데이트
      // setTodos(todos=>
      //   todos.map((todo) =>
      //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      //   ),
      // );
      dispatch({type:'TOGGLE',id})
    },
    [],
  );
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
