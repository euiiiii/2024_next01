"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

function Page({params}) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const [item, setItem] = useState(null); // 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true); // 로딩 시작
          // params 언래핑: Promise로 감싸진 값을 꺼내는 과정
          // Promise.resolve(params)의 역할
          // 비동기 처리할 때 사용
          // Promise.resolve()는 전달된 값을 Promise 객체로 변환합니다.
          // 만약 params가 이미 Promise라면, 원래 Promise를 반환합니다.
          // 만약 params가 일반 객체라면, 이를 즉시 해결된(resolved) Promise로 감쌉니다.
          // Promise인지 아닌지 신경 쓰지 않고 항상 비동기적으로 다룰 수 있습니다.
          // const resolvedParams = await Promise.resolve(params); // params 언래핑
          // const { id } = resolvedParams; // id 추출
          const {id} = await Promise.resolve(params);
          const API_URL = `${LOCAL_API_BASE_URL}/guestbook/detail?gb_idx=${id}`;
  
          // 데이터 가져오기
          const response = await axios.get(API_URL);
          setItem(response.data);
        } catch (err) {
          console.log("Error fetching product data: ",err);
        } finally {
          setLoading(false); // 로딩 종료
        }
      };
  
      fetchData();
    }, [params, LOCAL_API_BASE_URL]);
  
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
        <div>
            <h2 className="title">GuestBookDetail</h2>
            <TableContainer component={Paper} className="table-container">
                <Table className="custom-table">
                    <TableBody>
                        <TableRow>
                            <TableCell className="table-cell">{item.gb_idx}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">{item.gb_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">{item.gb_subject}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">{item.gb_content}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">{item.gb_email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">{item.gb_pw}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">{item.gb_regdate.substring(0,10)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}

export default Page;