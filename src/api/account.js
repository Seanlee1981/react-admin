import service from "../../src/utils/request";

// 登陆接口
export function Login(data){
    return service.request({
        url: "/login/",
        method: "post",
        data, // POST 请求时传入参数data 的获取方式;
        // params: data // GET 请求时传入参数data 的获取方式;
    });
}

// 获取验证码接口
export function GetCode(data){
    return service.request({
        url: "/getSms/",
        method: "POST",
        data: data, 
    });
}