
import React from 'react';
import Header from './../../components/tab/Header'
import {Link,hashHistory} from 'react-router';
import { List, InputItem, Toast,Button,WhiteSpace } from 'antd-mobile';

export default class CardId extends React.Component{


    constructor(props){
        super(props);
        this.state={
            hasError: false,
            value: '',
            disabled:true,
            data:this.props.location.query,
        }
    }
    onErrorClick  () {
        if (this.state.hasError) {
            Toast.info('Please enter your real CardId', 2, null, false);
        }
    }
    onChange (value) {
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
        this.setState({
            value,
        });
    }

    render(){
        const { getFieldProps } = this.props;
        return(
            <div>
                <Header title="绑定身份证"/>
                <div style={{paddingTop:50,height:window.innerHeight}} className="input-test">
                    <List>
                        <InputItem
                            clear
                            type="number"
                            placeholder="请输入身份证号"
                            ref={el => this.autoFocusInst = el}
                            value={this.state.value}
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick.bind(this)}
                            onChange={this.onChange.bind(this)}
                        >身份证号码</InputItem>
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

        const reg=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if(!reg.test(this.state.value)){
            this.setState({
                hasError: true,
                disabled:true
            },()=>{Toast.info('ID card format error ', 2, null, false);});
            return false;
        }

        var _this=this;

        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/updateCust",//请求的路径
            async:true,
            data: {
                id:localStorage['id'],
                custId:_this.state.value,
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(response, textStatus){

                if(response.code==1){
                    hashHistory.push({pathname:'/CardIndex',state:_this.state.data})
                }else{
                    Toast.info(response.message, 2, null, false);
                }

            }
        });

    }

}