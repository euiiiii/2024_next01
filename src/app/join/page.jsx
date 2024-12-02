"use client"
import { Avatar, Button, FormControl, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

function Page(props) {
  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
  const API_URL = `${LOCAL_API_BASE_URL}/members/join`;
  const [uvo, setUvo] = useState({
    m_id:"",
    m_pw:"",
    m_name:"",
    m_age:""
  });
  // 모든 입력 필드가 비어있지 않아야 true => 버튼이 활성화
  const isBtnChk = !uvo.m_id || !uvo.m_pw || !uvo.m_name || !uvo.m_age;

  function changUvo(e) {
    const {name, value} = e.target;
    setUvo(prev => ({
        ...prev, [name]: value
    }));
  }

  function goServer(params) {
    // axios -> 정보 보낼 때 사용
    axios.post(
      // 비밀번호 때문에 보안
      API_URL, uvo
    ).then(data => {
      if (data.data) {
        console.log(data);
        alert(data.data.message);
      }else{
        alert(data.data.message);
        return;
      }
    });
  }

  return (
    <div>
      <FormControl>
        {/* 수직 정렬(column), 간격, 가운데 정렬 */}
        <Stack direction="column" spacing={1} alignItems='center'>
          <Avatar />
          {/* {블록}은 변수 아니면 객체 */}
          <TextField type='text' label='아이디' name='m_id' onChange={changUvo}/> 
          <TextField type='password' label='패스워드' name='m_pw' onChange={changUvo}/>
          <TextField type='text' label='이름' name='m_name' onChange={changUvo}/>
          <TextField type='number' label='나이' name='m_age' onChange={changUvo}/>
          <Button fullWidth variant='contained' disabled={isBtnChk} onClick={goServer}>JOIN</Button>
        </Stack>
      </FormControl>
    </div>
  );
}

export default Page;