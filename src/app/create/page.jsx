import Image from 'next/image';
import React from 'react';

// 자식
function page(props) {
    return (
        <div>
            <h2>자식 페이지 Create!!</h2>
            <p><Image src="/images/photo-2.jpg" alt="" width={100} height={100} /></p>
        </div>
    );
}

export default page;