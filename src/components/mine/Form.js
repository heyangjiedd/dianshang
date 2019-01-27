/**
 * Created by zhangHeng on 17/11/2.
 * 添加地址
 */
import React from 'react'
import { List, InputItem ,Button ,WhiteSpace ,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Header from './../../components/tab/Header'
import {hashHistory} from 'react-router'

class Form extends React.Component {
    constructor(props){
        super(props)
        this.state={
            disabled:true,
            area:'',
            address:'',
            name:'',
            code:'',
            value: null,
            cityData: [],
            areaData: [],
            countryData: [],
            regionId:'',
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

    render() {

        const { type } = this.state;
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div>
                <div style={{height:window.innerHeight,paddingTop:60,position:'relative'}}>
                    <Header title="收货地址" />
                    <List>
                        <List.Item>
                            <div style={{display:'flex'}} className="mine-address">
                                <label className="width-90">所在地</label>
                                <div className="display-flex">
                                    <select onChange={this.selectHandChange.bind(this)}>
                                        <option>所在省市</option>
                                        {this.renderOption()}
                                    </select>
                                    <select onChange={this.selectAreaHandChange.bind(this)} style={{marginLeft:5,marginRight:5}}>
                                        <option>所在市</option>
                                        {this.renderOptionArea()}
                                    </select>
                                    <select onChange={this.selectCountryHandChange.bind(this)} name="regionId">
                                        <option>所在区</option>
                                        {this.renderOptionCountry()}
                                    </select>
                                </div>
                            </div>
                        </List.Item>
                        <InputItem
                            {...getFieldProps('address', {
                                rules: [{required: true}],
                            })}
                            type="text"
                            placeholder="请输入详细地址"
                            clear
                            value={this.state.address}
                            onChange={(v) => { this.setState({address:v}),console.log(v,'v') }}
                            onBlur={(v) => {
                                if(v.length==0){
                                    Toast.info('请输入你的详细地址', 2, null, false);
                                    this.setState({disabled:true})
                                }else{this.setState({disabled:false})}
                                }
                            }
                        >详细地址</InputItem>

                        <InputItem
                            {...getFieldProps('name', {
                                rules: [{required: true}],
                            })}
                            type='text'
                            placeholder="请输入收货人姓名"
                            clear
                            value={this.state.name}
                            onChange={(v) => { this.setState({name:v}); }}
                            onBlur={(v) => {
                                if(v.length==0){
                                    Toast.info('请输入你的收货人姓名', 2, null, false);
                                    this.setState({disabled:true})
                                }else{this.setState({disabled:false})}
                            }
                            }
                        >收货人</InputItem>

                        <InputItem
                            type="number"
                            placeholder="请输入邮政编码"
                            ref={el => this.customFocusInst = el}
                            clear
                            onChange={(v) => { this.setState({code:v}); }}
                            value={this.state.code}
                        >邮政编码</InputItem>

                    </List>
                    <div style={{padding:10,marginTop:10}}>
                        <Button type="warning"
                                onClick={this.submit.bind(this)}
                                disabled={this.state.disabled}>确认
                        </Button><WhiteSpace />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.getCityData()
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

    submit () {
        this.props.form.validateFields((error, value) => {
           let _this=this;
            //todo
            $.ajax({
                type: "get",
                url: "http://116.62.119.165/shop-portal/swagger/api/addAddress",
                async: true,
                data: {
                    custId:localStorage['id'],
                    regionId:_this.state.regionId,
                    addressDetail:_this.state.address,
                    postCode:_this.state.code,
                    consignee:_this.state.name,
                },
                dataType: 'json',
                beforeSend: function (XMLHttpRequest) {
                    //todo
                },

                success: function (response, textStatus) {
                    console.log(response,'response')
                    if (response.code == 1) {
                        hashHistory.push({pathname:'/AddressList'})
                        Toast.info(response.message, 2, null, false)
                    }
                },

                complete: function (XMLHttpRequest, textStatus) {

                },
                error: function () {

                }

            })
        });
    }

}

export default createForm()(Form);