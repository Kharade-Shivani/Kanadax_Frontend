import axios from 'axios';
// export const baseURL= 'http://192.168.0.125:9595';
 export const baseURL= 'https://kandax-backend.vercel.app/';


export const httpClient = axios.create({
    baseURL,
});

export default httpClient;
