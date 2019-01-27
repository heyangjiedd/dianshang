
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
                <Header title="电话号码"/>
                <div style={{paddingTop:50,height:window.innerHeight}} className="input-test">
                    <List>
                        <InputItem
                            clear
                            type="number"
                            placeholder="请输入电话号码"
                            ref={el => this.autoFocusInst = el}
                            value={this.state.value}
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick.bind(this)}
                            onChange={this.onChange.bind(this)}
                        >电话号码</InputItem>
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

        if(this.state.value.length!=11){
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
                custPhone:_this.state.value,
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