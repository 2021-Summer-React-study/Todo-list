// 각 할 일 항목에 대한 정보를 보여 주는 컴포넌트. todo 객체를 props 로 받아 와서 상태에 따라 다른 스타일의 UI 를 보여줌.

import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;
  return (
    <div className="TodoListItem">
      {/* 조건부 스타일링 위해서 classnames 사용 */}
      {/* classnames 는 true 인 값만 classname 으로 적용시켜주므로, */}
      {/* checked 가 true면,  "checkbox checked" false면, "checkbox" 이렇게 적용됨. */}
      <div className={cn('checkbox', { checked })} onClick={()=> onToggle(id)}>
        {/* checked class 있으면 체크박스 엘리먼트 띄우고, 아니면 체크 안된 빈칸 띄우기 */}
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        {/* 데이터 전체를 객체비구조화 할당으로 가져왔으니까 text 를 쓰면 App 에 적은 객체에서 text 만 가져오기 가능 */}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;

