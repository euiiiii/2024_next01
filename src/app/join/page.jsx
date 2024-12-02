"use client"
import { Avatar, Button, FormControl, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Page(props) {
  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
  const API_URL = `${LOCAL_API_BASE_URL}/members/join`;
  /*
    useRouter
    - 다른 페이지로 갈 수 있도록 도와주는 hook
    - 현재 페이지의 URL, 경로, 쿼리 파라미터 등과 같은 정보에 쉽게 엑세스 가능
    - 이를 통해 페이지 내에서 필요한 정보를 동적으로 가져와 사용 가능
    - 동적 라우팅, 쿼리 파라미터 처리, 페이지 리다이렉션 가능
    Ex) 로그인 성공 시, 메인 페이지로 가듯이 그런 느낌!
  */
  const router = useRouter(); // useRouter 초기화
  // 텍스트필드 초기화
  const initUvo = {
    m_id:"",
    m_pw:"",
    m_name:"",
    m_age:"" 
  }
  const [uvo, setUvo] = useState(initUvo);
  // 모든 입력 필드가 비어 있지 않아야 true => 버튼이 활성화
  const isBtnChk = !uvo.m_id || !uvo.m_pw || !uvo.m_name || !uvo.m_age;

  function changUvo(e) {
    // 입력 필드 참조 {name, value} => {입력필드의 name 속성값 : 입력 필드의 현재 값}
    const {name, value} = e.target;
    setUvo(prev => ({
      // ...prev: 기존 상태 복사
      // [name]: value => name에 해당하는 상태 값을 value로 업데이트
        ...prev, [name]: value
    }));
  }

  function goServer(params) {
    // axios => 정보 보낼 때 사용
    // axios.post: post로 보냄
    axios.post(API_URL, uvo)
      .then(data => {
        if (data.data.success) {
          console.log(data.message);
          alert(data.data.message);
          // 성공했을 때 login 페이지로 페이지 이동
          router.push("/login")
        } else {
          alert(data.data.message);
          setUvo(initUvo);
        }
      });
  }

  return (
    <div>
      <FormControl>
        {/* Stack: 수직정렬(column), 간격: 8px(8의 배수 => createTheme() 함수를 통해 커스텀 가능), 가운데 정렬 */}
        <Stack direction="column" spacing={1} alignItems='center'>
          <Avatar />
          {/* {블록}은 변수 아니면 객체 */}
          <TextField type='text' label='아이디' name='m_id' value={uvo.m_id} onChange={changUvo}/> 
          <TextField type='password' label='패스워드' name='m_pw' value={uvo.m_pw} onChange={changUvo}/>
          <TextField type='text' label='이름' name='m_name' value={uvo.m_name} onChange={changUvo}/>
          <TextField type='number' label='나이' name='m_age' value={uvo.m_age}onChange={changUvo}/>
          <Button fullWidth variant='contained' disabled={isBtnChk} onClick={goServer}>회원가입</Button>
        </Stack>
      </FormControl>
    </div>
  );
}

export default Page;