/**
 * Created by zhangHeng on 17/6/10.
 * 订单-添加地址
 */
import React from 'react';
import {hashHistory} from 'react-router'
import $ from 'jquery'
import Header from './../../components/tab/Header'

export default class AddAddress extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            cityData: [],
            areaData: [],
            countryData: [],
            addressDetail:'',
            consignee:'',
            postCode:'',
            regionId:'',
            errorMesg:''
        }
    }
    renderOption(){
        if(this.state.cityData.length!=0){
            return (
                this.state.cityData.map((item,index)=>{
                    return (<option key={index} value={item.id}>{item.areaName}</option>)
                })
            )
        }
        else{
            return null
        }

    }

    renderOptionArea(){
        if(this.state.areaData.length!=0){
            return (
                this.state.areaData.map((item,index)=>{
                    return (<option key={index} value={item.id}>{item.areaName}</option>)
                })
            )
        }
        else{
            return null
        }

    }

    renderOptionCountry(){
        if(this.state.countryData.length!=0){
            return (
                this.state.countryData.map((item,index)=>{
                    return (<option key={index} value={item.id}>{item.areaName}</option>)
                })
            )
        }
        else{
            return null
        }

    }

    render(){
        return(
            <div>

                <Header title="新增收货地址"/>

                <div className="mui-content">
                    <form className="forgetPass-code-march">
                        <div className="row">
                            <label className="width-90">所在地</label>
                            <div className="display-flex city-country">
                                <select onChange={this.selectHandChange.bind(this)}>
                                    <option>所在省市</option>
                                    {this.renderOption()}
                                </select>
                                <select onChange={this.selectAreaHandChange.bind(this)}>
                                    <option>所在市</option>
                                    {this.renderOptionArea()}
                                </select>
                                <select onChange={this.selectCountryHandChange.bind(this)} name="regionId">
                                    <option>所在区</option>
                                    {this.renderOptionCountry()}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <label className="width-90">详细地址</label>
                            <input type="text" className="mui-input-clear" placeholder="街道、门牌号"
                                   name="addressDetail" value={this.state.addressDetail} onChange={this.handChange1.bind(this)}/>
                        </div>
                        <div className="row">
                            <label className="width-90">收货人</label>
                            <input type="text" className="mui-input-clear" placeholder="联系人名称"
                                   name="consignee" value={this.state.consignee}  onChange={this.handChange2.bind(this)}/>
                        </div>
                        <div className="row">
                            <label className="width-90">邮政编码</label>
                            <input type="number" className="mui-input-clear" placeholder="所在区邮政编码"
                                   name="postCode" value={this.state.postCode} onChange={this.handChange3.bind(this)}/>
                        </div>
                        <div className="row" style={{justifyContent:'left',padding:'14px'}}>
                            <span className="add-setting-default"   onClick={this.addAddress.bind(this)}>设置为默认地址</span>
                        </div>
                        <div className="mui-content-padded">
                            <button className="mui-btn mui-btn-block mui-btn-danger padding-10" type="button"
                                onClick={this.addAddress.bind(this)}>
                               确认添加
                            </button>
                        </div>
                    </form>
                </div>
                <div className="totost" id="errorMessage">
                    <p className="">{this.state.errorMesg}</p>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.getCityData();


    }

    handChange1(event){
       this.setState({addressDetail:event.target.value})
    }

    handChange2(event){
        this.setState({consignee:event.target.value})
    }

    handChange3(event){
        this.setState({postCode:event.target.value})
    }


    selectHandChange(event){
        this.getAreaData(event.target.value)
    }

    selectAreaHandChange(event){
        this.getCountryData(event.target.value)
    }

    selectCountryHandChange(event){
        this.setState({regionId:event.target.value})
    }

    getCityData(OptionId){
        var self=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/regionList",
            async: true,
            data: {
                id:OptionId
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //todo
            },

            success: function (data, textStatus) {

                if (data.code == 1) {


                    if (data.data !=null) {
                        self.setState({cityData:data.data})
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

    getAreaData(OptionId){
        var self=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/regionList",
            async: true,
            data: {
                id:OptionId
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //todo
            },

            success: function (data, textStatus) {

                if (data.code == 1) {
                     
                    if (data.data !=null) {
                        self.setState({areaData:data.data})
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

    getCountryData(OptionId){
        var self=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/regionList",
            async: true,
            data: {
                id:OptionId
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //todo
            },

            success: function (data, textStatus) {

                if (data.code == 1) {
                    
                    if (data.data !=null) {
                        self.setState({countryData:data.data})
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

    addAddress(){
        var self=this;

        if(self.state.regionId==''){
            this.setState({
                errorMesg:'请选择省市区'
            },()=>{
                document.getElementById('errorMessage').style.display='block';
                setTimeout(function () {
                    document.getElementById('errorMessage').style.display='none';
                },2000)
            })
            return false;
        }

        if(self.state.addressDetail==''){
            this.setState({
                errorMesg:'请输入详细地址'
            },()=>{
                document.getElementById('errorMessage').style.display='block';
                setTimeout(function () {
                    document.getElementById('errorMessage').style.display='none';
                },2000)
            })
            return false;
        }

        if(self.state.consignee==''){
            this.setState({
                errorMesg:'请输入详细地址'
            },()=>{
                document.getElementById('errorMessage').style.display='block';
                setTimeout(function () {
                    document.getElementById('errorMessage').style.display='none';
                },2000)
            })
            return false;
        }


        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/addAddress",
            async: true,
            data: {
                custId:localStorage['id'],
                regionId:self.state.regionId,
                addressDetail:self.state.addressDetail,
                postCode:self.state.postCode,
                consignee:self.state.consignee,
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //todo
            },

            success: function (response, textStatus) {
                console.log(response,'response')
                if (response.code == 1) {

                    console.log(data,'8888888888')
                    // hashHistory.push({
                    //     pathname:'/MangerAddress',
                    //     query:{
                    //         accountId:localStorage['id'],
                    //     }
                    // })
                }
            },

            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function () {

            }

        })
    }

    // setDefaultAddr(){
    //     $('.')
        
    // }

}
