import React, {Component, Fragment} from "react";
import "./Index.scss";
// antd 组件
import { Form, Input, Button, Col, Row, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
// API
import { Login, GetCode } from "../../api/account";


class LoginForm extends Component {
    constructor(){
        super();
        this.state={
            username: "",
            code_button_loading: false,
            code_button_disable : false,
            code_button_text: "获取验证码",
            // S-2: 定义一个开关，通常用于 处理 连续触发事件；
            flag: true,
        };
    }
    onFinish = (values) => {
        Login(values).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
        console.log('Received values of form: ', values);        
    };
    getCode = () => {
      //   S-3: 增加判断: 如果 flag 是false，就阻止; 如果是true，就继续进行；
      if (!this.state.flag) {return false;}
      if(!this.state.username){
          message.warning('用户名不能为空!!',1);
          return false;
      }         
      const requestData = {
          username: "this.state.username",
          module: "login",
      }
    
    //   S-4: 让下一次不可以继续点击；
    this.setState({
        code_button_loading: true,
        code_button_text: "发送中",
        flag: false,
    })
      GetCode(requestData).then(response => {
          this.countDown();
      }).catch(error => {
          this.setState({
            // code_button_loading:false,
            code_buton_text: "重新获取",
          })
        //   S-5: 如果出错的话，可以继续点击
          this.setState({ flag: true })
      })
    }

    inputChange = (e) => {
        let value = e.target.value
        this.setState({
            username: value
        })
    }

    countDown = () => {
        let timer = null;
        let sec = 5;
        this.setState({            
            code_button_text: `${sec} S`,  // 注意是 ``, 不是 '';          
          })
        timer = setInterval(() => {
            sec --;
            if (sec <= 0){
                this.setState({
                    code_button_text: "重新获取",
                    // S-6： 当倒计时计数，让开关 true;
                    // code_button_disable: false,
                    flag: true,
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                code_button_text: `${sec} S`,
            })
        }, 1000)
    } 

    toggleForm = () =>{
        // 调父级的方法
        this.props.switchForm("register");
    }

    render(){
        const { username, code_button_loading, code_button_text, code_button_disable } = this.state;
        return (
            <Fragment>
                <div className="form-head">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username" 
                            rules={
                                [   
                                    { required: true, message: '邮箱不能为空！' },
                                    { type:"email", message: "邮箱格式不正确！" }
                                ]
                            }
                        >
                            <Input value = {username} onChange = {this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={
                                [   
                                    { required: true, message: '密码不能为空!' },
                                    ({getFieldValue}) => ({
                                        validator(rule, value){
                                            if (value.length < 6){
                                                return Promise.reject("不能小于 6 位");
                                            } 
                                            else{
                                                return Promise.resolve();
                                            }
                                        },
                                    }),
                                ]
                            }
                        >
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="字母+数字长度 大于6位" />
                        </Form.Item>

                        <Form.Item
                            name="code"
                            rules={
                                [
                                    { required: true, message: 'Code 不能为空!' },
                                    { len: 6, message: '请输入6位验证码!' },
                                ]
                            }
                        >
                            <Row gutter={13}>
                                <Col span={16}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>                                    
                                <Col span={8}>
                                    {/* S-1 使用div 模拟没有 disable 属性时，我们增加 开关 属性 */}
                                    {/* 注意在react中写style 的方式 {{}}； */}
                                    <div style={{color:'#fff'}} onClick = {this.getCode}>{code_button_text}</div>
                                    {/* <Button onClick = {this.getCode} disabled = {code_button_disable} type="danger" loading = {code_button_loading} >{code_button_text}</Button> */}
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                            登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default LoginForm;