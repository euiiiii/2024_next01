import ReadOne from '@/app/page/readOne';
import ReadThree from '@/app/page/readThree';
import ReadTwo from '@/app/page/readTwo';
import React from 'react';

// 동적 쿼리는 
async function page({params}) {
    const param = await params;
    const msg = param.id;
    console.log("msg: ", param.id);
    let str = ""
    if (msg === '1') {
        str = "HTML 선택";
    } else if(msg === '2') {
        str = "CSS 선택";
    } else if(msg === '3') {
        str = "JavaScript 선택";
    }

    return (
        <div>
            <h2>하이</h2>
            <h3>{str}</h3>
            <hr />
            {/* 글자 대신 컴포넌트를 넣을 수 있다. */}
            <h3>{msg === '1' ? "html 선택" : msg === '2' ? "css 선택" : "js 선택"}</h3>
            {msg === '1' ? <ReadOne /> : msg === '2' ? <ReadTwo /> : <ReadThree />}
        </div>
    );
}

export default page;