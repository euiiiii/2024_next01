import Image from 'next/image';
import React from 'react';

function ReadTwo(props) {
    return (
        <div>
            <h3>Read-2</h3>
            <Image src="/images/photo-3.jpg" alt="" width={100} height={100} />
        </div>
    );
}

export default ReadTwo;