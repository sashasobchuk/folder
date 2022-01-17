import * as axios from "axios";
export const Api = axios.create({
    baseURL: 'https://prof.world/api/test_json_files/?token=6a06cc0050374e32be51125978904bd8',
})