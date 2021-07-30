// 새로운 항목을 추가하고 추가할 수 있는 컴포넌트. state 를 통해 인풋의 상태 관리

import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  // 리렌더링 될 때 마다 함수를 새로 만들지 않고, 한번 함수를 만들고 재사용할 수 있도록 useCallback 사용
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  // 이 함수가 호출되면, props 로 받아온 onInsert 함수에 현재 value 값을 파라미터로 넣어서 호출, value 의 값 초기화
  // 그렇다면 왜 onClick 말고 onSubmit 로 설정했을까? : 엔터를 눌러도 동작하기 때문. onClick 은 따로 이벤트 넣어주어야함.
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(''); //submit 하고 나서는 input value 값 초기화
      // submit 이벤트는 브라우저에서 새로고침을 발생시켜서, 이를 방지하기 위해 해당 함수 호출.
      e.preventDefault();
    },
    // 함수 내부에서 state 값을 사용하고 있으므로, 어떤 값이 바뀔 때 함수를 새로 생성해야 한다. 지금 그 값들이 바로 onInsert,value

  [onInsert, value],
  );
  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      {/* 추가 인풋을 현재 value 를 받아와서 업데이트 해줌. */}
      <input
        placeholder="할 일을 입력하세요."
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
