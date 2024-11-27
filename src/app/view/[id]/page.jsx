import Item from "@/app/item/page";
// @ =>src까지 가는 것
import axios from "axios";

// 서버 컴포넌트 : 데이터를 가져오는데만 사용 (useState, useEffect 사용 불가)
async function Page({ params }) {
  const param = await params;
  const id = params.id;
  const API_URL = `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`;

  try {
    const response = await axios.get(API_URL);
    const item = response.data;
    console.log(item);
    return <Item item={item} />;
  } catch (error) {
    console.error("error:", error);
    return <div>Errora.</div>;
  }
}

export default Page;
