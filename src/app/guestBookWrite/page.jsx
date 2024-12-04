"use client"

import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuthStore from '../../../store/authStore';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {ssr:false});
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Page(props) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const { isAuthenticated, token } = useAuthStore();
    const router = useRouter();
    // 배열 또는 객체로 만들지만 보통 객체로 만든다. key:value로!
    const [formData, setFormData] = useState({
        gb_name: '', 
        gb_subject: '', 
        gb_content: '', 
        gb_email: '', 
        file: null
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev, [name]:value
        }));
    };
    
    const handleFileChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev, file: e.target.files[0] // 첫 번째 파일인데 나중에 여러 개도 가능
        }));
    }

    const handleSubmit = async() => {
        const API_URL = `${LOCAL_API_BASE_URL}/guestbook/write`;
        const data = new FormData(); // get이나 post 쓰려면 FormData()를 써야한다.
        // append로 처리 key:value 형식으로!
        data.append("gb_name", formData.gb_name);
        data.append("gb_subject", formData.gb_subject);
        data.append("gb_content", formData.gb_content);
        data.append("gb_email", formData.gb_email);
        if (formData.file) {
            data.append("file", formData.file);
        }

        try {
            const response = await axios.post(API_URL, data, { // 갈 주소와 데이터
                headers: {
                    Authorization: `Bearer ${token}`, // 헤더에 로그인 토큰 값 넣어서 보내기
                    "Content-Type" : "multipart/form-data"
                }
            }); 
            if (response.data.success) {
                alert(response.data.message);
                router.push("/guestBookList")
            } else{
                alert(response.data.message);
            }
        } catch (error) {
            alert("오류 발생")
        }
    }

    const isFormBVaild = 
        isAuthenticated && 
        formData.gb_name.trim() !== "" && 
        formData.gb_subject.trim() !== "" && 
        formData.gb_content.trim() !== "" &&
        formData.gb_email.trim() !== "" ;

    return (
        <div style={{padding: "20px"}}>
            <h2>GuestBook Writer</h2>
            {/* TextField에는 꼭 onChange가 있어야 한다. */}
            <TextField
                label='이름'
                name='gb_name'
                value={formData.gb_name}
                onChange={handleChange}
                fullWidth
                margin='nomal' />

            <TextField
                label='제목'
                name='gb_subject'
                value={formData.gb_subject}
                onChange={handleChange}
                fullWidth
                margin='nomal' />

            <SimpleMDE
                value={formData.gb_content}
                onChange={(value) => setFormData((prev) => ({...prev, gb_content:value}))}
            />

            <TextField
                label='이메일'
                name='gb_email'
                value={formData.gb_email}
                onChange={handleChange}
                fullWidth
                margin='nomal' />

            <input type='file' onChange={handleFileChange} />

            <Button
                variant='contained' 
                color='primary' 
                style={{marginTop:"20px"}} 
                onClick={handleSubmit}
                disabled={!isFormBVaild} // 로그인 상태와 폼 입력 상태 체크
            >저장</Button>
        </div>
    );
}

export default Page;