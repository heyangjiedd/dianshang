/**
 * Created by zhangHeng on 17/6/12.
 * 账户登录
 */
import React from 'react';
import $ from 'jquery';
import { Link, hashHistory } from 'react-router';
import Header from './../../components/tab/Header'

export default class LoginByAccount extends React.Component {
	constructor(prop) {
		super(prop);
		this.state = {
			userName: "",
			userPassword: "",
			isRemember: false,
			unameHelp: "请输入昵称/手机号码/邮箱",
			upwdHelp: "请输入登录密码",
			isAccountNull: false,
			isPassNull: false,
		}
	}

	render() {
		return(
			<div className="loginByAccount">
               <header className="mui-bar mui-bar-nav">
                <Link  to={{pathname:'/'}} className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left">
                </Link>
                <h1 className="mui-title">登录</h1>
            </header>
                <div className="company-icon" style={{marginTop:44}}>
                    <div className='loginBackground1'></div>
                </div>
                <form id='login-form' className="login-form">
                    <div className="input-row">
                        <input type="text" className="mui-input-clear" placeholder={this.state.unameHelp}
                               name="userName"  value={this.state.userName}  onChange={this.handleChange.bind(this,0)}/>
                        <span
                                className={this.state.isAccountNull?'mui-icon mui-icon-clear ':'mui-icon mui-icon-clear mui-hidden'}
                                onClick={this.clearText.bind(this,0)}>
                        </span>
                    </div>
                    <div className="input-row">
                        <input type="password" className="mui-input-clear mui-input-password" placeholder={this.state.upwdHelp}
                               name="userPassword" value={this.state.userPassword} onChange={this.handleChange.bind(this,1)}/>
                        <span
                            className={this.state.isPassNull?'mui-icon mui-icon-clear':'mui-icon mui-icon-clear mui-hidden'}
                            onClick={this.clearText.bind(this,1)}>
                        </span>
                    </div>
                    <div className="input-row mui-text-right">
                        <a id='forgetPassword' href="#/RegByPhone" className="mui-pull-left">立即注册</a>
                        <a className="color-block font-size-14" href="#/ForgetPass">忘记密码?</a>
                    </div>
                    <div className="mui-content-padded">
                        <button className="mui-btn mui-btn-block mui-btn-danger padding-10"
                                type="button" onClick={this.handleClick.bind(this)}>登录</button>
                        <a className="mui-text-right loginByPhone" href="#/LoginByPhone">手机快捷登录</a>
                    </div>
                </form>

                <div className="loginByOther">
                    <a id='reg'>三方登陆：</a>
                    {/*<img className="weixin-login" src={require('../../images/weixin.png')}/>*/}
                    <a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101363001&redirect_uri=http://www.dooodu.com/custInfo/indexWebQQ&state=duduniao"><img className="weixin-login" src={require('../../images/qq.png')}/></a>
                </div>

                <div className="totost" id="message">
                    <p className="">账号不存在,请注册!</p>
                </div>
            </div>
		)
	}

	componentDidMount() {

	}
	goHome(){
		history.go(-1);
	}
	handleClick() {

		var that = this;
		var data = {
			userName: this.state.userName,
			userPassword: this.state.userPassword,
		}

		if(data.userName == null || data.userName.trim() == '') {

			this.setState({
				unameHelp: '账号不能为空'
			}, () => {
				document.getElementById('message').style.display = 'block';
				document.getElementById('message').firstChild.textContent = this.state.unameHelp
				setTimeout(function() {
					document.getElementById('message').style.display = 'none'
				}, 2000)
			})
			return false;
		}
		if(data.userPassword == null || data.userPassword.trim() == '') {
			this.setState({
				upwdHelp: '密码不能为空'
			}, () => {
				document.getElementById('message').style.display = 'block';
				document.getElementById('message').firstChild.textContent = this.state.upwdHelp
				setTimeout(function() {
					document.getElementById('message').style.display = 'none'
				}, 2000)
			})

			return false;
		}

		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/passwordLogin",
			async: true,
			data: {
				account: data.userName,
				password: data.userPassword
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},
			success: function(data, textStatus) {
				if(data.code == 1) {
					hashHistory.push({
						pathname: '/',
					})

					localStorage.setItem('id', data.data.id)
					localStorage.setItem('custId', data.data.custId)

					return true;
				}
				document.getElementById('message').style.display = 'block';
				document.getElementById('message').firstChild.textContent = data.message
				setTimeout(function() {
					document.getElementById('message').style.display = 'none'
				}, 2000)
			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}
		});
	}

	handleChange(index, e) {
		var newState = {};
		newState[e.target.name] = this.Trim(e.target.value, 'g');

		if(index == 0) {
			if(this.Trim(e.target.value, 'g').length != 0) {
				this.setState({
					isAccountNull: true
				})
			} else {
				this.setState({
					isAccountNull: false
				})
			}
		} else {
			if(this.Trim(e.target.value, 'g').length != 0) {
				this.setState({
					isPassNull: true
				})
			} else {
				this.setState({
					isPassNull: false
				})
			}
		}
		this.setState(newState);
	}

	//去掉空格
	Trim(str, is_global) {
		var result;
		result = str.replace(/(^\s+)|(\s+$)/g, "");
		if(is_global.toLowerCase() == "g") {
			result = result.replace(/\s/g, "");
		}
		return result;
	}

	clearText(index) {
		if(index == 0) {
			this.setState({
				userName: ''
			})
		} else {
			this.setState({
				userPassword: ''
			})
		}
	}

}