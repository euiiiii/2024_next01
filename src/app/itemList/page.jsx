"use client"
import React, { useEffect, useState } from 'react';
import './itemList.css';
import { Divider, Grid2 } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';

function Page(props) {
    const [list, setList] = useState([]);
    const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
    const getData = () => {
        axios.get(
            API_URL
        ).then(res => {
            console.log(res.data)
            setList(res.data);
        }).catch(
            console.log("에러 발생")
        )
    }
    // 최초 한 번만 실행
    useEffect(()=>{
        getData();
    }, [])
    return (
        <div style={{width:"80%", margin:"auto", padding:"20px"}}>
            <h2>베스트 상품</h2>
            {/* mui의 구분선: Divider */}
            <Divider />
            {/* 그리드의 기본 개수 12개 */}
            <Grid2 container spacing={2}>
                {list.map(k=>{
                    // 전체 12개에서 3개를 차지한다.(한 줄에 4개)
                    return <Grid2 item xs={3} key={k.id} size={{xs:3}} >
                        {/* next 내에 있는 <Image /> 말고 html 안에 있는 <img> 사용해야 한다. */}
                        <img src={k.image_link} alt="" className='img_item' />
                        <strong>{k.name}</strong>
                        <span className='txt_info'>{k.category}&nbsp;&nbsp;{k.product_type}</span>
                        <strong className='num_price'>{k.price}</strong>
                    </Grid2>
                })}
            </Grid2>
        </div>
    );
}

export default Page;