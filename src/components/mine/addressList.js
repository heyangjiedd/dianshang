/**
 * Created by zhangHeng on 17/9/15.
 * 我的-地址列表
 */

import React from 'react'
import {Link,hashHistory} from 'react-router';
import Header from "../tab/Header";
import Navigator from "../tabNavigator/NavigatorMain";

export default class Refresh extends React.Component{

    constructor(props){
        super(props)
        this.state={
            addressList:[]
        }
    }

    _renderItem(){
        if(this.state.addressList.length!=0){
            return (
                this.state.addressList.map((item,index)=>{
                    return (
                        <li key={index} className="mui-table-view-cell address-list-item">
                            <div className="address-content flex-1">
                                <h4 className="font-size-16 margin-bottom-10">
                                    <span className="margin-right-10">{item.custRealName}</span>
                                    {item.consigneePhone}
                                    <a className="mui-pull-right font-size-14"
                                       style={{display:item.isDefault=='13900001'?'block':'none'}}>默认地址</a>
                                </h4>
                                <h5>
                                    <label className="add-address-icon">
                                        <img src={require('../../images/icon/address.png')}/>
                                    </label>
                                    <span className="color-block font-size-16">{item.regionText+item.addressDetail}</span>
                                </h5>
                            </div>
                            <div className="mui-radio box-size">
                                <input  name="defaultAddress"  type="radio"
                                        defaultChecked={item.isDefault=='13900001'?'checked':''}
                                        onChange={this.setDefault.bind(this,item.id)}/>
                            </div>
                        </li>
                    )
                })
            )
        }else{
            return null
        }
    }

    render(){

        return (
            <div>
                <Header title="地址管理"/>
                <Navigator/>
                <div className="mui-content" >
                    <ul className="mui-table-view">{this._renderItem()}</ul>
                    <div className="mui-content-padded">
                        <Link id="login" className="mui-btn mui-btn-block mui-btn-danger padding-10"
                              to={{pathname:'AddAddress'}}>新增收货地址</Link>
                    </div>
                </div>
                
            </div>
        )
    }

    componentWillMount() {
        this.addressList();
    }



    addressList() {
        var _this=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165:8080/shop-portal/swagger/api/queryAddress",
            async:true,
            data: {
                custId:localStorage['id']
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(respones, textStatus){
                if(respones.code==1 && respones.data.length!=0){
                    _this.setState({addressList:respones.data});
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
    }

    setDefault(id){
        var self=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165:8080/shop-portal/swagger/api/updateDefault",
            async: true,
            data: {
                addressId: id
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //todo
            },

            success: function (data, textStatus) {
                if (data.code == 1) {
                    self.addressList();
                }
            },

            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function () {

            }

        })
    }

}