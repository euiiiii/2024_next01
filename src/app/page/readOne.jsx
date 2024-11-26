import Image from 'next/image';
import React from 'react';

function ReadOne(props) {
    return (
        <>
            <h3>Read-1</h3>
            <Image src="/images/photo-2.jpg" alt="" width={100} height={100} />
        </>
    );
}

export default ReadOne;