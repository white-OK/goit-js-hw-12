import axios from "axios";

const API_KEY = "49396849-83bcb41d8b5c3c417310bffba";
const BASE_URL = "https://pixabay.com/api/";

export async function getImages(query, page = 1, per_page) {
    const {data} = await axios(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page,
            per_page,
        },
    });
    return data;
}