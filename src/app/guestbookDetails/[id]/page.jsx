"use client";

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from "react";
import './guestBookDetails.css'
import useAuthStore from '../../../../store/authStore';
import { useRouter } from 'next/navigation';


function Page({ params }) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const LOCAL_IMG_URL = process.env.NEXT_PUBLIC_LOCAL_IMG_URL;
    const [item, setItem] = useState(null);       // 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null);     // 에러 상태
    const { isAuthenticated, token } = useAuthStore(); // 로그인 상태
    const router = useRouter();

    // 데이터를 비동기로 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // 로딩 시작

                const { id } = await Promise.resolve(params);
                const API_URL = `${LOCAL_API_BASE_URL}/guestbook/detail/${id}`;

                // 데이터 가져오기
                const response = await axios.get(API_URL);
                const data = response.data;
                if (data.success) {
                    setItem(data.data); // 데이터를 setItem에 저장
                } else {
                    setError("Failed to fetch product data.");
                }
            } catch (err) {
                console.error("Error fetching product data:", err);
                setError("Failed to fetch product data.");
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchData(); // fetchData는 비동기 함수를 선언하여 API에서 데이터를 가져오는 역할
    }, [params, LOCAL_API_BASE_URL]);

    // delete
    const handleDelete = async () => {
        // 버튼을 항상 활성화 하면 
        // if (!isAuthenticated) {
        //     alert("로그인이 필요합니다.")
        //     router.push("/login");
        // }

        // 선생님은 버튼 비활성화 방법을 추천하심
        // 상세보기 성공했을 때 데이터 item에 넣었다.
        const API_URL = `${LOCAL_API_BASE_URL}/guestbook/delete/${item.gb_idx}`;
        try {
            const response = await axios.get(API_URL, { // GetMapping으로 API_URL 접속? 무튼...
                headers: {
                    // 로그인했을 때 삭제가 가능하니까 token 정보가 필요해서 헤더에 token 정보를 넣는다.
                    // 무분별한 데이터 접근을 막기 위해 headers에 token을 추가하여 token 값이 있어야만 데이터 접근 가능
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                alert(response.data.message);
                router.push("/guestBookList")
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("delete error");
        }
    }

    // update
    const handleUpdate = async () => {
        // 수정페이지로 이동
        router.push(`/guestBookUpdate/${item.gb_idx}`)
    }

    // 로딩 중
    if (loading) {
        return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
    }

    // 에러 발생 시
    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
                <h2>Error:</h2>
                <p>{error}</p>
            </div>
        );
    }

    // 로딩 완료 후
    return (
        <>
            <h2 className="title">GuestBookList</h2>
            <TableContainer component={Paper} className="table-container">
                <Table className="custom-table">
                    <TableBody>
                        <TableRow>
                            <TableCell className="table-cell">NAME</TableCell>
                            <TableCell className="table-cell">{item.gb_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">SUBJECT</TableCell>
                            <TableCell className="table-cell">{item.gb_subject}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">CONTENT</TableCell>
                            <TableCell className="table-cell"><pre>{item.gb_content}</pre></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">EMAIL</TableCell>
                            <TableCell className="table-cell">{item.gb_email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">DATE</TableCell>
                            <TableCell className="table-cell">{item.gb_regdate.substring(0, 10)}</TableCell>
                        </TableRow>
                        {/* 조건 렌더링 */}
                        {item.gb_filename && (
                        <TableRow>
                            <TableCell className="table-cell">Image</TableCell>
                            <TableCell className="table-cell">
                                {isAuthenticated ? (
                                    // 다운로드
                                    <a
                                        href={`${LOCAL_API_BASE_URL}/guestbook/download/${item.gb_filename}`} // 스프링부트 다운로드
                                        download={item.gb_filename} // 다운로드 파일 이름 지정
                                        target='_blank' // 새 탭에서 열림
                                        rel='noopener noreferrer' // 보안 향상을 위해 추가
                                    >
                                        <img 
                                            src={`${LOCAL_IMG_URL}/${item.gb_filename}`} 
                                            alt="Upload Image" 
                                            style={{width:"150px"}}
                                        />
                                    </a>) : (
                                    <img 
                                        src={`${LOCAL_IMG_URL}/${item.gb_filename}`} 
                                        alt="Upload Image" 
                                        style={{width:"150px"}}
                                    />
                                    )}
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ margin: "20px", textAlign: "center" }}>
                <Button variant='contained'
                    color='primary'
                    onClick={handleUpdate}
                    disabled={!isAuthenticated}
                >수정</Button>

                <Button variant='contained'
                    color='error'
                    onClick={handleDelete}
                    style={{ marginLeft: "10px" }}
                    disabled={!isAuthenticated}
                >삭제</Button>
            </div>
        </>
    );
}
export default Page;