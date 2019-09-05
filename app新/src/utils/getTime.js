var method={
    getTime:()=>{
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1 >= 10 ? time.getMonth()+1: "0" + (time.getMonth()+1);
        var day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
        var hour = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
        var minute = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
        var second = time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds();
        var xingqicode = time.getDay();
        var xingqi = (function(code) {
            switch (code) {
                case 1:
                    return "一";
                    break;
                case 2:
                    return "二";
                    break;
                case 3:
                    return "三";
                    break;
                case 4:
                    return "四";
                    break;
                case 5:
                    return "五";
                    break;
                case 6:
                    return "六";
                    break;
                case 7:
                    return "日";
                    break;
                default:
                    "出错了";
            }
        })(xingqicode)
        var exTime = `${year}-${month}-${day} ${hour}:${minute}:${second} 星期${xingqi}`
        return exTime;
    }
}
export default method;