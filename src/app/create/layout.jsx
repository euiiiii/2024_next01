import React from 'react';

// 부모
function layout({children}) {
    return (
        <>
            <h3>CREATE 부모 컴포넌트 시작</h3>
            {children}
        </>
    );
}

export default layout;