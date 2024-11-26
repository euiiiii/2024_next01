// props가 있는 애가 부모
// layout.js는 선택이다. (RootLayout  제외)
// layout이 필요없는 간단한 페이지에서는 생략 가능

import Link from "next/link";

// 페이지 전체에 공통 구조를 렌더링 할 때 사용

// 부모 컴포넌트
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{textAlign: "center"}}>
        {/* <header style={{marginTop: "50px"}}>공통 헤더</header> */}
        {/* 자식컴포넌트가 렌더링 된다. */}
        {/* {children} */}
        {/* <footer style={{marginTop: "50px"}}>공통 푸터</footer> */}

        <h1><Link href="/">WEB</Link></h1>
        <ol>
          {/* read 뒤 1,2,3 은 [id] */}
          <li><Link href="/read/1">HTML</Link></li>
          <li><Link href="/read/2">CSS</Link></li>
          <li><Link href="/read/3">JS</Link></li>
          <li><Link href="/gallery">image</Link></li>
          <li>ItemList(외부 서버)</li>
          <li>guestbook(Spring 내부 서버)</li>
        </ol>
        <hr />
        {children}
        <hr />
        <ul>
          {/* href="/create" 이건 폴더 이름이 된다. */}
          {/* /create 이면 create 폴더를 찾는다. (page.jsx(필수), layout.jsx(선택)가 있어야 한다.) */}
          <li><Link href="/create">Create</Link></li>
          <li>Update</li>
          <li><input type="button" value="delete" /></li>
        </ul>
      </body>
    </html>
  );
}
