/**
 * Created by zhangHeng on 17/6/10.
 * 添加-多多鸟说文章
 */
import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import $ from 'jquery'
import {Link,hashHistory} from 'react-router';
import Header from './../../components/tab/Header'
import { List, InputItem, Toast ,TextareaItem,Button,WhiteSpace  } from 'antd-mobile';
import { createForm } from 'rc-form';

class Written extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hasError: false,
            value: '',
            value2:''
        }
    }

    onErrorClick () {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }

    onChange (value) {
        if (value.replace(/\s/g, '').length == 0) {
            this.setState({
                hasError: true,
            },()=>{Toast.info('请输入健康笔记标题');});
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value,
        });
    }

    onChange2 (value) {
        if (value.replace(/\s/g, '').length == 0) {
            this.setState({
                hasError: true,
            },()=>{Toast.info('请输入健康笔记内容');});
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value2:value,
        });
    }

    render(){
        const { getFieldProps } = this.props.form;
        return(
            <div>

                <Header title="书写健康笔记"/>

                <div className="mui-content background-none">
                    <ul className="written" style={{background:'#fff'}}>
                        <li><a className="healthy-note marginTop-10">健康日记</a></li>
                        <li>
                            <p className="written-icon">
                                 <span ><img className="smaile" src={require('../../images/icon/6.png')}/></span>
                                 <span ><img src={require('../../images/icon/photon.png')}/></span>

                                <span className="mui-pull-right"><img src={require('../../images/icon/1.png')}/></span>
                            </p>
                        </li>
                        <li className="border-none">
                            <div>
                                <List renderHeader={() => '标题'}>
                                    <InputItem
                                        type="text"
                                        placeholder="请输入笔记标题"
                                        error={this.state.hasError}
                                        onErrorClick={this.onErrorClick.bind(this)}
                                        onChange={this.onChange.bind(this)}
                                        value={this.state.value}
                                    ></InputItem>
                                </List>
                                <List renderHeader={() => '内容'}>
                                    <TextareaItem
                                        {...getFieldProps('count', {
                                            initialValue: '',
                                        })}
                                        placeholder="请输入你笔记内容"
                                        rows={5}
                                        count={100}
                                        onErrorClick={this.onErrorClick.bind(this)}
                                        onChange={this.onChange2.bind(this)}
                                        value={this.state.value2}
                                    />
                                </List>
                            </div>
                        </li>
                        <li className="mui-content-padded">
                            <Button type="warning" onClick={this.saveWritten.bind(this)}>保存笔记</Button><WhiteSpace />
                        </li>
                    </ul>
                </div>
                <Navigator/>
            </div>
        )
    }
    componentDidMount(){

    }

    saveWritten(){


        if(this.state.value2.length>100){
            Toast.info('健康笔记内容不能超过100个字符');
            return false;
        }

        var _this=this;
         $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/saySave",
            async:true,
            data: {
                custId:localStorage['id'],
                introduction:_this.state.value2,
                sayType:'90003',
                title:_this.state.value,
                content:_this.state.value2
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    Toast.info(data.message, 2, null, false);
                    hashHistory.push({
                        pathname:'/Bird'
                    })
                }else{
                    Toast.info(data.message, 2, null, false);
                }
            }
        });

    }

   
}
export default createForm()(Written);
