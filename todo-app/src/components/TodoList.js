// todo 배열을 props 로 받아온 후 이를 배열 내장 함수 map 을 사용해서 여러 개의 TodoListItem 컴포넌트로 반환해서 보여줌.

import React, { useCallback } from 'react';
// List import
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';
const TodoList = ({ todos, onRemove, onToggle }) => {
  // 각 TodoListItem 렌더링에 필요한 함수. 이 함수를 List 컴포넌트의 props 로 설정해주어야함. 이 함수는 index,key,style 의 값을 객체형태로 받아옴. 
  //  그러면 List 컴포넌트는 props 를 받아서 자동으로 최적화해줌
  const rowRendrer = useCallback(({ index, key, style }) => {
    const todo = todos[index];
    return (
      <TodoListItem
        todo={todo}
        key={key}
        onRemove={onRemove}
        onToggle={onToggle}
        style={style}
      />
    );
  },[onRemove,onToggle,todos]);
  // App 에서 props 로 넘겨준 부분을 받아와서 TodoListItem 으로 변환하여 렌더링 해줄 것임
  return (
    // <div className="TodoList">
    //   {/* map 을 사용하여 컴포넌트로 변환할 때는 key 값 필요 ( 고유의 id 값으로 설정해주었음. )*/}
    //   {/* todo 데이터는 통째로 props 로 TodoListItem 에 전달 => 객체 통째로 전달해주는게 나중에 여러 종류의 값을 전달해야 하는 경우에 최적화가 편함*/}
    //   {todos.map((todo) => (
    //     <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
    //   ))}
    // </div>
    <List
      className="TodoList" //classname
      width={512} // 전체 가로
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRendrer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      sytle={{ outline: 'none' }} // 리스트에 기본으로 적용되는 outline 스타일 제거
    />

  );
};

export default React.memo(TodoList);
