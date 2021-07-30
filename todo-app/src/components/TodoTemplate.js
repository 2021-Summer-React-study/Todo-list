// 화면을 가운데 정렬, 앱 타이틀인 일정관리를 보여줌, children 으로 내부 JSX 를 props 로 받아와서 렌더링 해줌.

import React from 'react';
import './TodoTemplate.scss' 
const TodoTemplate = ({children}) => {
    return (
        <div className="TodoTemplate">
            <div className="app-title"><b>TODO-LIST</b></div>
            <div className="content">{children}</div>
            
        </div>
    );
};

export default TodoTemplate;