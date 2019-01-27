/**
 * Created by zhangHeng on 17/6/10.
 * 我的-个人生日
 */
import React from 'react';
import Header from './../../components/tab/Header'
import {Link,hashHistory} from 'react-router';
import { DatePicker, List ,Button ,WhiteSpace } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';


const dateStr="1970/1/1 23:23:23";
const date=new Date(dateStr);
// const nowTimeStamp = Date.now();
// const now = new Date(nowTimeStamp);

export default class BirthDady extends React.Component{

    constructor(props){
        super(props);
        this.state={
            date: '',
            visible: false,
        }
    }

    render(){
        return(
            <div>
                <Header title="出生日期"/>

                <div style={{height:window.innerHeight,paddingTop:50}}>
                    <List className="date-picker-list">
                        <DatePicker
                            mode="date"
                            title="Select Date"
                            extra="Optional"
                            value={this.state.date}
                            minDate={date}
                            onChange={date => this.setState({ date })}>
                            <List.Item arrow="horizontal">出生日期</List.Item>
                        </DatePicker>
                    </List>
                    <div style={{padding:10}}>
                        <Button type="warning"
                                onClick={this.saveBirthDay.bind(this)}
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
        let _this=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/custDetails",//请求的路径
            async:true,
            data: {
                custId:localStorage['id'],
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){},
            success: function(response, textStatus){
                if(response.code==1){
                    _this.setState({date:new Date(response.data.custBirth)})
                }else{
                    Toast.info(response.message, 2, null, false);
                }
            }
        });
    }

    //保存数据
    saveBirthDay(){
        var _this=this;
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/updateCust",//请求的路径
            async:true,
            data: {
                id:localStorage['id'],
                custBirth:(_this.state.date).toLocaleDateString(),
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){

                if(data.code==1){
                    hashHistory.push({
                        pathname:'PersonInfor'
                    })
                }
            }
        });
    }

}