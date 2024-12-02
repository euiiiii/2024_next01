"use client"
import { Avatar, Button, FormControl, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// zustand store 호출
import useAuthStore from '../../../store/authStore';

function Page(props) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const API_URL = `${LOCAL_API_BASE_URL}/members/login`;
    const router = useRouter(); // useRouter 초기화

    const {login} = useAuthStore(); // zustand login 함수 가져오기

    // 텍스트필드 초기화
    const initUvo = {
        m_id: "",
        m_pw: ""
    }

    const [uvo, setUvo] = useState(initUvo);
    // 모든 입력 필드가 비어 있지 않아야 true => 버튼이 활성화
    const isBtnChk = !uvo.m_id || !uvo.m_pw;

    function changUvo(e) {
        const {name, value} = e.target;
        setUvo(prev => ({
            ...prev, [name]: value
        }));
    }

    function goServer(params) {
        axios.post(API_URL, uvo)
        .then(response => {
            const data = response.data;
            if (data.success) {
            console.log(data.data);
            alert(data.message);
            // {} 객체
            // data.data: user 집어 넣고, data.token: token 집어 넣음
            login(data.data, data.token)
            // 성공했을 때 login 페이지로 페이지 이동
            router.push("/")
            } else {
                alert(data.message);
                setUvo(initUvo);
            }
        });
    }

    return (
        <div>
            {/* 수직 정렬 */}
            <FormControl>
                <Stack direction="column" spacing={1} alignItems='center'>
                    <Avatar />
                        <TextField type='text' label='아이디' name='m_id' value={uvo.m_id} onChange={changUvo}/> 
                        <TextField type='password' label='패스워드' name='m_pw' value={uvo.m_pw} onChange={changUvo}/>
                        <Button fullWidth variant='contained' disabled={isBtnChk} onClick={goServer}>로그인</Button>
                </Stack>
            </FormControl>
        </div>
    );
}

export default Page;    