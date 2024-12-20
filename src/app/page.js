import Image from "next/image";
import img01 from "/public/images/coffee-blue.jpg"
// page.js는 필수이다.(생략 불가)
// 각 경로(/, /about, /content ..)마다 페이지를 렌더링하려면 해당 경로의 page.js 파일이 반드시 필요하다.
// 리액트 문법 그대로 쓴다.


// 자식 컴포넌트는 필수이지만 부모 컴포넌트는 선택이다.
import ItemList from './itemList/page.jsx'
export default function Home() {
  // 해당 내용은 부모 컴포넌트의 props => {children} 에 삽입된다.
  return (
    <>
      {/* <h1>Welcome</h1> */}
      {/* 이미지 자체를 import 하지 않으면 너비, 높이를 지정해줘야 한다. */}
      {/* <p><Image src="/images/coffee-blue.jpg" alt="" width={100} height={100} /></p> */}

      {/* 너비, 높이는 선택 사항 */}
      {/* <p><Image src={img01} alt="" /></p> */}
      {/* <p><Image src={img01} width={50} height={50} alt="" /></p> */}
      <ItemList />
    </>
  );
};