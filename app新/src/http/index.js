import axios from 'axios';
// import qs from 'qs';
// axios.defaults.baseURL = 'http://39.104.64.133:8080';

let projUrl = '/Home/Index';
let url = window.location.href;
console.log(url)
axios.defaults.baseURL = url.substring(0,url.lastIndexOf(projUrl));
// debugger
console.log('当前BaseUrl:'+axios.defaults.baseURL)
   
const getData = {
  get:(url,data)=>{
    return axios({
      url: url,
      method:'get',
      data
    })
  },      
  post: (url, data) => {
    return axios({
      url: url,
      method: 'post',
      data
    });
  },
}

export default getData;