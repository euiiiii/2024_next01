"use client"
import { useEffect, useState } from 'react';
import './itemList.css';
import { Divider, Grid2 } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';

function Page(props) {
    const MAKEUP_API_BASE_URL = process.env.NEXT_PUBLIC_MAKEUP_API_BASE_URL;
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
    const API_URL = `${MAKEUP_API_BASE_URL}/v1/products.json?brand=maybelline`; // 프록시 된 API URL

    // 데이터 가져오기
    const getData = async () => {
        try {
            setLoading(true); // 로딩 상태 시작
            const response = await axios.get(API_URL);
            setList(response.data.slice(0,12));
        } catch (err) {
            console.error("Error fetching data: ", err);
            setError(err.message);
        } finally {
            setLoading(false); // 로딩 상태 확인
        }
    }

    // 최초 한 번만 실행
    useEffect(()=>{
        getData();
    }, [])

    // 로딩 중
    if (loading) {
        return <div style={{textAlign: "center", padding: "20px"}}>Loading...</div>;
    }
  
    // 에러 발생 시
    if (error) {
        return(
        <div style={{textAlign: "center", padding: "20px", color: "red"}}>
            <h2>Error:</h2>
            <p>{error}</p>
        </div>
        );
    }

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