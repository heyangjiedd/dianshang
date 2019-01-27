/**
 * Created by zhangHeng on 17/6/10.
 * 注册-重置密码
 */
import React from 'react';
import Header from './../../components/tab/Header'
import {Link,hashHistory} from 'react-router';
import { List, InputItem, Toast,Button,WhiteSpace } from 'antd-mobile';

export default class ForgetPassResetPass extends React.Component{


    constructor(props){
        super(props);
        this.state={
            hasError: false,
            value: '',
            value2:'',
            disabled:true,
            phone:this.props.location.state.phone,
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
                <Header title="设置密码"/>
                <div style={{paddingTop:50,height:window.innerHeight}} className="input-test">
                    <List>
                        <InputItem
                            clear
                            type="password"
                            placeholder="请输入密码"
                            ref={el => this.autoFocusInst = el}
                            value={this.state.value}
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick.bind(this)}
                            onChange={this.onChange.bind(this,1)}
                        >新密码</InputItem>
                        <InputItem
                            clear
                            type="password"
                            placeholder="再次输入密码"
                            ref={el => this.autoFocusInst = el}
                            value={this.state.value2}
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick.bind(this)}
                            onChange={this.onChange.bind(this,2)}
                        >确认密码</InputItem>
                    </List>
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
        console.log(this.state.phone,'phone')
        //验证
        if(this.state.value!=this.state.value2){
            this.setState({
                hasError: true,
                disabled:true
            },()=>{Toast.fail('两次输入的密码不一致', 2, null, false);});

            return false;
        }

        if(this.state.value.length<6 || this.state.value2.length<6){
            this.setState({
                hasError: true,
                disabled:true
            },()=>{Toast.fail('密码的长度不能小于6位', 2, null, false);});

            return false;
        }

        var _this=this;

        $.ajax({
            type: "post",
            url: "http://116.62.119.165/shop-portal/swagger/api/registerUser",//请求的路径
            async:true,
            data: {
                phone:_this.state.phone,
                password1:_this.state.value,
                password2:_this.state.value2,
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

}