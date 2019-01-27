/**
 * Created by zhangHeng on 17/6/10.
 * 注册-发送短信验证码
 */
import React from 'react';
import Header from './../../components/tab/Header'
import {Link,hashHistory} from 'react-router';
import { List, InputItem, Toast,Button,WhiteSpace } from 'antd-mobile';

export default class ForgertPass extends React.Component{


    constructor(props){
        super(props);
        this.state={
            hasError: false,
            value: '',
            value2:'',
            disabled:true,
        }
    }
    onErrorClick  () {
        if (this.state.hasError) {
            Toast.info('Please enter your telephone', 2, null, false);
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
            this.setState({
                value:value
            });
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
                <Header title="输入手机号"/>
                <div style={{paddingTop:50,height:window.innerHeight}} className="input-test">
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
                        <InputItem
                            clear
                            type="text"
                            placeholder="请输入短信验证码"
                            ref={el => this.autoFocusInst = el}
                            value={this.state.value2}
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick.bind(this)}
                            onChange={this.onChange.bind(this,2)}
                        >验证码</InputItem>
                    </List>
                    <div style={{padding:10}}>
                        <Button type="warning"
                                onClick={this.saveNickName.bind(this)}
                                ref="btnSave"
                                className="btnSave"
                                disabled={this.state.disabled}>确认
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
            url: "http://116.62.119.165/shop-portal/swagger/api/validForgetPasswordCode",//请求的路径
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
                        pathname: '/ForgetPassResetPass',
                        search: '?account='+_this.state.value,
                        state: { the: 'state' }
                    })
                }else{
                    Toast.info(response.message, 2, null, false);
                }

            }
        });

    }

}