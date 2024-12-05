"use client"

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../../store/authStore';
function Page({ params }) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const { isAuthenticated, token } = useAuthStore();
    const [orginalData, setOriginalData] = useState(null);
    const [editData, setEditData] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null);     // 에러 상태

    // 상세보기 한 번 더하기 => 렌더링을 하기 위해서 useEffect를 사용
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // 로딩 시작
                const { gb_idx } = await Promise.resolve(params); 
                const API_URL = `${LOCAL_API_BASE_URL}/guestbook/detail/${gb_idx}`;

                // 데이터 가져오기
                // 수정이나 삽입은 put이나 form-data를 써야한다. => put은 수정할 때 쓴다고 생각하면 된다.
                const response = await axios.get(API_URL); // axios를 사용한 GET 방식으로 API 호출
                // response.data: DataVO를 포장한 것
                // response.data.data: DataVO 안에 있는 data
                const data = response.data;
                if (data.success) {
                    setOriginalData(data.data);
                    setEditData(data.data);
                } else {
                    setError("Failed to fetch product data.");
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
                setError("Failed to fetch product data.");
            } finally {
                setLoading(false); // 로딩 종료
            }
        };
        fetchData();
    }, [params, LOCAL_API_BASE_URL]);

    console.log("ori", orginalData)
    console.log("edt", editData)
    console.log("isAuth", isAuthenticated)

    // 입력값 변경 
    const changItem = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // 데이터 변경 체크
    const isChanged = () => {
        return (
            orginalData &&
            (orginalData.gb_name !== editData.gb_name ||
                orginalData.gb_subject !== editData.gb_subject ||
                orginalData.gb_content !== editData.gb_content ||
                orginalData.gb_email !== editData.gb_email
            )
        );
    };

    const handleUpdate = async () => {
        const { gb_idx } = await Promise.resolve(params);
        const API_URL = `${LOCAL_API_BASE_URL}/guestbook/update/${gb_idx}`;
        try {
            // 수정이나 삽입은 put이나 form-data를 써야한다. => put은 수정할 때 쓴다고 생각하면 된다.
            const response = await axios.put(API_URL, editData, {
                headers: {
                    // 로그인했을 때 삭제가 가능하니까 token 정보가 필요해서 헤더에 token 정보를 넣는다.
                    // 무분별한 데이터 접근을 막기 위해 headers에 token을 추가하여 token 값이 있어야만 데이터 접근 가능
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                alert(response.data.message)
                router.push(`/guestBookDetails/${gb_idx}`)
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            alert(response.data.message)
        }
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
    return (
        <>
            <h2 className="title">GuestBookList</h2>
            <TableContainer component={Paper} className="table-container">
                <Table className="custom-table">
                    <TableBody>
                        <TableRow>
                            <TableCell className="table-cell">NAME</TableCell>
                            <TableCell className="table-cell">
                                <TextField type='text' name="gb_name" value={editData.gb_name} onChange={changItem} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">SUBJECT</TableCell>
                            <TableCell className="table-cell">
                                <TextField type='text' name="gb_subject" value={editData.gb_subject} onChange={changItem} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">CONTENT</TableCell>
                            <TableCell className="table-cell">
                                <TextField type='text' multiline rows={4} name="gb_content" value={editData.gb_content} onChange={changItem} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">EMAIL</TableCell>
                            <TableCell className="table-cell">
                                <TextField type='text' name="gb_email" value={editData.gb_email} onChange={changItem} />
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ margin: "20px", textAlign: "center" }}>
                <Button variant='contained'
                    color='primary'
                    onClick={handleUpdate}
                    disabled={!isAuthenticated || !isChanged()} // 로그인 상태 및 value 값 변경 여부 확인
                >수정</Button>
            </div>
        </>
    );
}

export default Page;