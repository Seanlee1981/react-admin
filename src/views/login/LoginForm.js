import React, {Component, Fragment} from "react";
import "./Index.scss";
// antd 组件
import { Form, Input, Button, Col, Row, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
// API
import { Login, GetCode } from "../../api/account";
import axios from "axios";


class LoginForm extends Component {
    constructor(){
        super();
        this.state={
            username: "",
            code_button_loading: false,
            code_button_text: "获取验证码",
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
      if(!this.state.username){
          message.warning('用户名不能为空!!',1);
          return false;
      }      
      this.setState({
          code_button_loading: true,
          code_button_text: "发送中",
      })
      return false;
      const requestData = {
          username: "this.state.username",
          module: "login",
      }  
      GetCode(requestData).then(response => {
        //   s-1: 如果成功,执行倒计时，每1秒钟，改变button 的文字；
        //   console.log(response);
      }).catch(error => {
          this.setState({
            code_button_loading:false,
            code_buton_text: "重新获取",
          })
      })
    }

    inputChange = (e) => {
        let value = e.target.value
        this.setState({
            username: value
        })
    }

    toggleForm = () =>{
        // 调父级的方法
        this.props.switchForm("register");
    }

    render(){
        const { username, code_button_loading, code_button_text } = this.state;
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
                                    <Button onClick = {this.getCode} type="danger" loading = {code_button_loading} >{code_button_text}</Button>
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