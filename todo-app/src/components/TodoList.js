// todo 배열을 props 로 받아온 후 이를 배열 내장 함수 map 을 사용해서 여러 개의 TodoListItem 컴포넌트로 반환해서 보여줌.

import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';
const TodoList = ({ todos, onRemove, onToggle}) => {
  // App 에서 props 로 넘겨준 부분을 받아와서 TodoListItem 으로 변환하여 렌더링 해줄 것임
  return (
    <div className="TodoList">
      {/* map 을 사용하여 컴포넌트로 변환할 때는 key 값 필요 ( 고유의 id 값으로 설정해주었음. )*/}
      {/* todo 데이터는 통째로 props 로 TodoListItem 에 전달 => 객체 통째로 전달해주는게 나중에 여러 종류의 값을 전달해야 하는 경우에 최적화가 편함*/}
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
      ))}
    </div>
  );
};

export default TodoList;
