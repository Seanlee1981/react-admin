// 用于验证密码
export const validate_password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;

// 验证邮箱
// S-5
const reg_email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;


// 下面函数说明: 当输入一个参数，然后调用 reg_email 的 test 方法检测，如果成功返回true，否则返回 false
export function validate_email(value){
    return reg_email.test(value)
}