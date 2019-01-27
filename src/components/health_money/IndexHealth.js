/**
 * Created by zhangHeng on 17/6/10.
 * 健康比商城
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import $ from 'jquery'
import {Link} from 'react-router'
import Carousel from 'react-zkcarousel';

const nvaBar=[
    {
        content:'热门商品兑换',
        type:10111201,
        sortType:'change_num'
    },
    {
        content:'最新商品兑换',
        type:10111202,
        sortType:'insert_date'
    },
    {
        content:'全部商品兑换',
        type:10111203,
        sortType:''
    },
]


export default class IndexHealth extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bannerArr:[],
            goodsArray:[],
            currentIndex:0,
            error:''
        }
    }

    itemNav(index){
        return index===this.state.currentIndex?'active':''
    }

    _render(){
        if(this.state.bannerArr.length != 0){
            return (
                <div className='height-auto'>
                    <Carousel data={this.state.bannerArr} autoplay dots='false' click={this.handleItemClick.bind(this)} />
                </div>
            )
        }else{
            return null
        }
    }

    _renderListItem(){
        if(this.state.goodsArray.length!=0){
            return this.state.goodsArray.map((item,index)=>{
                        return (
                            <li key={index}>
                                <Link><img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl} /></Link>
                                <p className="mui-ellipsis product-description">{item.giftName}</p>
                                <p className="buy-price">
                                    <a className="color-orange">
                                        <span className="price font-size-16">{item.healthCode}</span>
                                        <span className="font-size-12">健康币</span>
                                    </a>
                                    <a className="duihuan-now" onClick={this.redeemNow.bind(this,item)}>直接兑换</a>
                                </p>
                            </li>
                        )
                    })
        }
        else {
            return null
        }
    }

    render(){
        return(
            <div>
                <header className="title-search mui-bar-nav">
                    <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                     <input className="search" placeholder="输入商品名称"/>
                     <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-right"></a>
                </header>
                <Navigator/>
                <div className="mui-content">

                    <div>{this._render()}</div>
                    <ul className="healthy-money-bar">
                        {
                            nvaBar.map((item,index)=>{
                                return (<li key={index} className={this.itemNav(index)}
                                            onClick={this.handClick.bind(this,index,item)}>{item.content}</li>)
                            })
                        }
                    </ul>
                    <ul className="healthy-money-ul">{this._renderListItem()}</ul>
                </div>
                <div className="totost" id="result">
                    <p className="">{this.state.error}</p>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.healthMallBanner()
        this.healthCommodity('change_num')
    }

    //轮播图
    healthMallBanner(){
         var _this=this;
         $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/healthMallBanner",//请求的路径
            async:true,
            data: { 
                categoryId:'326e8953db684644954e6d11777632df'

            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
              
                if(data.code==1){
                    if(data.data.length != 0){
                         var imgArray = []
                        for (var i = 0; i < data.data.length; i++) {
                            var dataImg = data.data[i];
                            var bannerObj = new Object();
                            bannerObj.src='http://116.62.119.165/fileServer/images/'+dataImg
                             imgArray.push(bannerObj)
                        };   
                    }
                    _this.setState({bannerArr:imgArray},()=>{})
                    return true;
                }
            },
             complete: function(XMLHttpRequest, textStatus){
            }
        });
    }

    //
    handleItemClick(){
    }

    /*健康币商品*/
    healthCommodity(sortKey){
         var _this=this;
         $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/healthMallList",//请求的路径
            async:true,
            data: { 
                page:1,
                rows:10,
                sidx:sortKey,
                sord:'ASC'
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(respones, textStatus){

                if(respones.code==1 && respones.data.length!=0){
                    _this.setState({goodsArray:respones.data},()=>{console.log(_this.state.goodsArray.length)})
                }
            },
             complete: function(XMLHttpRequest, textStatus){
            }
        });
    }

    //tab切换
    handClick(index,item){
        this.setState({currentIndex:index});
        this.healthCommodity(item.sortType)
    }

    //直接兑换,默认兑换一件
    redeemNow(item){

        var _this=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/healthMallCodeChange",//请求的路径
            async:true,
            data: {
                giftId:item.id,
                custId:localStorage['id'],
                num:1,
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(respones, textStatus){

                console.log(JSON.stringify(respones))

                if(respones.code==1){
                    _this.healthCommodity(nvaBar[_this.state.currentIndex].sortType)
                    _this.setState({error:respones.message})
                }else{
                    _this.setState({error:respones.message})
                }
                document.getElementById('result').style.display='block';
                setTimeout(function () {
                    document.getElementById('result').style.display='none';
                },2000)
            },
            complete: function(XMLHttpRequest, textStatus){
            }
        });
    }

}
