import Detail from '@/app/detail/page';
import axios from 'axios';

async function Page({params}) {
    const param = await params;
        const gb_idx = param.id;
        console.log(gb_idx);
        const API_URL = `http://localhost:8080/api/guestbook/detail?gb_idx=${gb_idx}`;
        // const API_URL = `/guestbook/detail?gb_idx=${gb_idx}`;

        try {
            const response = await axios.get(API_URL);
            const item = response.data;
            return <Detail item={item} />
        } catch (error) {
            console.error("error: ", error);
            return <div>Errora.</div>
        }
}

export default Page;