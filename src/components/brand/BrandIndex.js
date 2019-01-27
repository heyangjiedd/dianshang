/**
 * Created by zhangHeng on 17/8/1.
 * 品牌列表
 */

import React, { Component } from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js';
import {Link,hashHistory} from 'react-router'


export default class  BrandIndex extends React.Component {

    constructor(props){
        super(props)
        this.state={
            goodsAreaList:[],
            brandList:[],
            current:0
        }
    }

    //选中当前项处理
    itemNav(index){
        return index===this.state.current?'font-size-16 active':'font-size-16'
    }

    _renderArea(){
        if(this.state.goodsAreaList.length!=0){
            return (
                this.state.goodsAreaList.map((item,index)=>{
                    return (
                        <button className={this.itemNav(index)} key={index}
                                onClick={this.handClick.bind(this,index,item.id)}>
                            <span>{item.name}</span>
                        </button>
                    )
                })
            )
        }
    }

    _renderBrand(){
        if(this.state.brandList.length!=0){
            return (
                this.state.brandList.map((item,index)=>{
                    return (
                        <Link key={index} to={{pathname:'/Detail',state:{brandId:item.id}}}>
                            <img src={'http://116.62.119.165/fileServer/images/'+item.logoImg}/>
                        </Link>
                    )
                })
            )
        }
    }

    render(){
        return (
            <div>
                <header className="mui-bar title-search mui-bar-nav">
                    <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" onClick={this.goBack.bind(this)}></a>
                    <input className="search" placeholder="请输入商品名称或品牌搜索" onClick={this.toSearch.bind(this)}/>
                    <a className="mui-action-back mui-pull-right header-icon">
                        <img style={{width:'83%'}} src={require('../../images/icon/service.png')}/>
                    </a>
                </header>
                <Navigator/>
                <div className="mui-content background-white">
                    <div className="bac-brand-img"></div>
                    <div className="brand-tar-content">
                        <div className="brand-tar-bar" style={{width:'500px'}}>
                            {this._renderArea()}
                        </div>
                    </div>
                    <div className="brand-content-list">
                        {this._renderBrand()}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.areaList()
    }

    //获取所有地区
    areaList(){
        var self=this
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsAreaList",
            async:true,
            data: {},
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    self.setState({goodsAreaList:data.data});
                    self.brands(data.data[0].id)
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
    }

    //品牌列表
    brands(id){
        var self=this
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/brandByAreId",
            async:true,
            data: {
                areaId:id
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    self.setState({brandList:data.data});
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
    }

    //
    handClick(index,id){
        this.setState({current:index});
        this.brands(id);
    }

    goBack(){
        history.go(-1)
    }
    toSearch(){
        hashHistory.push({pathname:'/Search'})
    }
}