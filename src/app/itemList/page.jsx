"use client"
import React, { useEffect, useState } from 'react';
import './itemList.css';
import { Divider, Grid2 } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

function Page(props) {
    const [list, setList] = useState([]);
    const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
    const getData = () => {
        axios.get(
            API_URL
        ).then(res => {
            // console.log(res.data)
            // setList(res.data);

            // 상위 12개 데이터만 추출 => 페이징 기법을 이렇게 써도 된다 하셨음 그럼 map으로 돌려서 하면 되나?
            // 현재 페이지 계산해서 하면 된다 하셨음 오...
            setList(res.data.slice(0,12));
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
                    // size={{xs:3}} 전체 12개에서 3개를 차지한다.(한 줄에 4개)
                    return <Grid2 item xs={3} key={k.id} size={{xs:3}} >
                        {/* next 내에 있는 <Image /> 말고 html 안에 있는 <img> 사용해야 한다. */}
                        {/* 동적 라우팅 */}
                        <Link href={'/view/' + k.id}>
                            <img src={k.image_link} alt="" className='img_item' />
                            <strong>{k.name}</strong>
                            <span className='txt_info'>{k.category}&nbsp;&nbsp;{k.product_type}</span>
                            <strong className='num_price'>{k.price}</strong>
                        </Link>
                    </Grid2>
                })}
            </Grid2>
        </div>
    );
}

export default Page;