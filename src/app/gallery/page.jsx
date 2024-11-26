import Image from 'next/image';
import React from 'react';
import "./gallery.css"

function page(props) {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><Image src="/images/photo-2.jpg" alt="" width={100} height={100} /></td>
                        <td><Image src="/images/photo-3.jpg" alt="" width={100} height={100} /></td>
                        <td><Image src="/images/flower.jpg" alt="" width={100} height={100} /></td>
                    </tr>
                    <tr>
                        <td><Image src="/images/tree-1.jpg" alt="" width={100} height={100} /></td>
                        <td><Image src="/images/tree-2.jpg" alt="" width={100} height={100} /></td>
                        <td><Image src="/images/tree-3.jpg" alt="" width={100} height={100} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default page;