import axios from "axios";

const http = axios.create({
  baseURL: 'https://gc01.lhmp.xyz/'
})

export default http