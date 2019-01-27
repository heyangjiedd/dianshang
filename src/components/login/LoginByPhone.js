/**
 * Created by zhangHeng on 17/6/10.
 * 注册-手机号登录
 */
import React from 'react';
import Header from './../../components/tab/Header'
import {Link,hashHistory} from 'react-router';
import { List, InputItem, Toast,Button,WhiteSpace } from 'antd-mobile';

export default class RegByPhone extends React.Component{


    constructor(props){
        super(props);
        this.state={
            hasError: false,
            value: '',
            value2:'',
            disabled:true,
            isGetCode:true
        }
    }
    onErrorClick  () {
        if (this.state.hasError) {
            Toast.info('Please enter your password', 2, null, false);
        }
    }
    onChange (type,value) {
        if (value.replace(/\s/g, '').length ==0) {
            this.setState({
                hasError: true,
                disabled:true
            });
        } else {
            this.setState({
                hasError: false,
                disabled:false
            });
        }
        if(type==1){
            value.length==11

            if(value.length==11){
                this.setState({
                    value:value,
                    isGetCode:false
                });
            }else{
                this.setState({
                    value:value,
                    isGetCode:true
                });
            }


        }else{
            this.setState({
                value2:value,
            });
        }
    }

    render(){
        const { getFieldProps } = this.props;
        return(
            <div>
                <Header title="快捷登陆"/>
                <div style={{paddingTop:50,height:window.innerHeight}} className="input-test">
                    <p style={{paddingLeft:10}}>我们将验证码发送至你的手机，请注意查收！</p>
                    <List>
                        <InputItem
                            clear
                            type="text"
                            placeholder="请输入电话号码"
                            ref={el => this.autoFocusInst = el}
                            value={this.state.value}
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick.bind(this)}
                            onChange={this.onChange.bind(this,1)}
                        >电话号码</InputItem>
                        <List.Item style={{padding:0}}>
                            <div style={{ width: '100%', color: '#108ee9', textAlign: 'left',position:'relative',marginTop:-7,marginBottom:-7 }}>
                                <InputItem
                                    clear
                                    type="text"
                                    placeholder="请输入验证码"
                                    ref={el => this.autoFocusInst = el}
                                    value={this.state.value2}
                                    error={this.state.hasError}
                                    onChange={this.onChange.bind(this,2)}
                                >验证码</InputItem>
                                <button className="btn-getCode"
                                        disabled={this.state.isGetCode}
                                        onClick={this.getCode.bind(this)}>获取验证码</button>
                            </div>
                        </List.Item>
                    </List>

                    <p className="mui-content-padded">若你输入手机未注册，将会进入注册流程。注册即视为同意<a>多多鸟服务协议</a></p>

                    <div style={{padding:10}}>
                        <Button type="warning"
                                onClick={this.saveNickName.bind(this)}
                                ref="btnSave"
                                className="btnSave"
                                disabled={this.state.disabled}>下一步
                        </Button><WhiteSpace />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){

    }

    saveNickName(){

        //验证
        if(this.state.value.length!=11){
            this.setState({
                hasError: true,
                disabled:true
            },()=>{Toast.info('请输入11位手机号码', 2, null, false);});

            return false;
        }

        if(this.state.value2.length!=6){
            this.setState({
                hasError: true,
                disabled:true
            },()=>{Toast.info('请输入6位数字短信验证码', 2, null, false);});

            return false;
        }


        var _this=this;

        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/sendLoginValidCode",//请求的路径
            async:true,
            data: {
                phone:_this.state.value,
                code:_this.state.value2
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(response, textStatus){

                if(response.code==1){
                    hashHistory.push({
                        pathname:'/Home',
                        search:'?account='+_this.state.userName,
                        state:{the:'state'}
                    })
                }else{
                    Toast.info(response.message, 2, null, false);
                }

            }
        });

    }

    getCode(){
        var _this=this;
        var oBody = document.querySelector('.btn-getCode');
        this.setState({isGetCode:true})
        var i=60;
        var cuntdow=setInterval(updateNum, 1000);//倒计时为1000为1秒间隔，每秒倒计时，动态秒数
        updateNum();

        function updateNum()
        {
            oBody.innerHTML = i--+'s后获取';
            if(i<0){
                oBody.innerHTML='重新获取';
                _this.setState({isGetCode:false})
                window.clearInterval(cuntdow)
            }
        }

        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/sendRegisterValidCode",
            async:true,
            data: {
                phone:_this.state.value,
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(response, textStatus){
                window.clearInterval(cuntdow)
                Toast.info(response.message, 2, null, false);
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });


    }
}