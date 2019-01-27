/**
 * Created by zhangHeng on 17/7/1.
 */

import React from 'react';
import {Link,hashHistory} from 'react-router'
import Header from '../../components/tab/Header'

export default class MangerAddress extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.location.query,
            addressList:[]
        }
    }


    _render(){
        if(this.state.addressList.length!=0){
            return (
                this.state.addressList.map((item,index)=>{
                    return (
                        <li className="mui-table-view-cell flex-space-between" key={index}>
                            <div className="address-content flex-1">
                                <p className="font-size-16 color-block margin-bottom-10">
                                    <span className="margin-right-10">{item.consignee}</span>
                                    <span>{item.consignee}</span>
                                    <a className="mui-pull-right font-size-14"
                                       style={{display:item.isDefault=='13900001'?'block':'none'}}>默认地址</a>
                                </p>
                                <p>
                                    <label className="add-address-icon">
                                        <img src={require('../../images/icon/address.png')}/>
                                    </label>
                                    {item.regionText+item.addressDetail}
                                </p>
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
        return(
            <div>
                <Header title="新增收货地址"/>

                <div className="mui-content">
                    <ul className="mui-card-content background-white">
                        {this._render()}
                    </ul>
                    <div className="mui-content-padded">
                        <Link id="login" className="mui-btn mui-btn-block mui-btn-danger padding-10"
                              to={{pathname:'AddAddress'}}>新增收货地址</Link>
                    </div>
                </div>
            </div>
        )
    }


    componentDidMount(){
        this.userDefaultAddress(localStorage['id'])
    }


    //获取用户默认地址
    userDefaultAddress(accountId){
        var self=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/queryAddress",
            async: true,
            data: {
                custId: accountId
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //todo
            },

            success: function (data, textStatus) {

                if (data.code == 1) {

                    if (data.data !=null) {
                        self.setState({addressList:data.data})
                        return true;
                    }
                }
            },

            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function () {

            }

        })
    }

    //重新设置默认地址
    setDefault(id,event){
        var self=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/updateDefault",
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
                    self.userDefaultAddress(self.state.custId);
                    hashHistory.push({pathname:'/CardIndex',state:self.state.data})
                }
            },

            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function () {

            }

        })

    }
}
