/**
 * Created by zhangHeng on 17/6/10.
 * 我的订单/物流
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import $ from 'jquery'
import {Link} from 'react-router'
import {hashHistory} from 'react-router'

export default class MyIndexss extends React.Component{
    constructor(props){
        super(props);
        this.state={
            deliveryArr:[],
        }
    }



    render(){
        return(
            <div>
               <ul className="mui-bar mui-bar-nav order-search" style={{padding:'0'}}>
                    <li className="flex-two">
                        <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" onClick={this.handClick.bind(this)}></a>
                        <h1 className="mui-title">我的订单/物流</h1>
                    </li>
                </ul>
                <div className="mui-content background-silvery margin-100" style={{paddingTop:10}}>
                    <div className="title-search-orderIndex">
                        <input className="search" placeholder="在18425个商品中搜索"/>
                    </div>
                    <ul className="mui-table-view orders">
                        {
                            this.state.deliveryArr.map((item)=>{
                                return(
                                    <li  className="mui-table-view-cell mui-media" key={item.itemKey}>
                                        <p className="order-number">
                                            <span className="mui-pull-left">订单编号：{item.goodSku}</span>
                                            <span className="mui-pull-right logistics-status">{item.orderStatus}</span>
                                        </p>
                                        <a  className="goods">
                                            <img className="mui-media-object mui-pull-left" style={{maxWidth:76,height:76,lineHeight:76}}  src={'http://116.62.119.165/fileServer/images/'+item.imageUrl}/>
                                            <div className="mui-media-body">
                                                <p className='mui-ellipsis-2 infor margin-bttom-10'>{item.goodName}</p>
                                                <p className='mui-ellipsis'>
                                                    <span className="mui-pull-left current-price">￥{item.goodPrice}</span>
                                                    <span className="mui-pull-left cost-price">￥{item.goodPrice}</span>
                                                    <span className="mui-pull-right goods-number">x2</span>
                                                </p>
                                            </div>
                                        </a>
                                        <div className="order-number">
                                            <div className="mui-pull-left">
                                                <h5>共{item.goodNumber}件商品，总价 <span className="logistics-status">￥452400</span></h5>
                                                <h6>(运费：<span className="logistics-status">452400</span>，税费<span className="logistics-status">452400</span>)</h6>
                                            </div>
                                            <div className="mui-pull-right receive">
                                                <a className="mui-btn mui-btn-danger">去评价</a>
                                            </div>
                                        </div>
                                     </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <Navigator/>
            </div>
        )
    }
     componentDidMount(){
        this.MyIndex();
    }
    MyIndex(){
         var _this=this; //把this用_this暂代，以免找不到
         $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/mineOrder",//请求的路径
            async:true,
            data: { 
                pageNum:'1',
                pageSize:'30',
                custId:localStorage['id']

            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                
                if(data.code==1){
                    var dataD = data.data;
                    var deliveryArr = [] //已收货received
                   for(var i=0;i<dataD.length;i++){
                        if(dataD[i].orderStatus == '10014'){
                        	dataD[i].orderStatus = '已收货'
                        	var receivedDataList = dataD[i].orderDetailList;
                            for(var y=0;y<receivedDataList.length;y++){
                              // console.log(receivedDataList[y],'/////////456')
                                var receivedObj = new Object();
                                // receivedObj.itemKey = y + 'y';
                                receivedObj.itemKey= receivedDataList[y].id;
                                 receivedObj.imageUrl = receivedDataList[y].imageUrl;//图片
                                 receivedObj.goodName = receivedDataList[y].goodName;//订单名称
                                 receivedObj.goodNumber = receivedDataList[y].goodNumber //商品数量
                                 receivedObj.goodSku = receivedDataList[y].goodSku; //订单编号
                                 receivedObj.goodPrice = receivedDataList[y].goodPrice;//商品的价格
                                 receivedObj.orderStatus = dataD[i].orderStatus;
                                deliveryArr.push(receivedObj)
                            }
                        }
                    }
                    _this.setState({deliveryArr:deliveryArr})
                    return true;
                }
              
            },
             complete: function(XMLHttpRequest, textStatus){
               
            }
        });
    }

    handClick(){
        history.go(-1)
    }
}
