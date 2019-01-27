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
            stockUpArr:[],
            shipmentsArr:[],
            deliveryArr:[],
            doneCommentsArr:[]
        }
    }



    render(){
        return(
            <div>
               <ul className="mui-bar mui-bar-nav order-search" style={{padding:'0'}}>
                    <li className="flex-two">
                        <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                        <h1 className="mui-title">我的订单/物流</h1>
                    </li>
                </ul>
                <div className="mui-content background-silvery margin-100" style={{paddingTop:10}}>
                    {/*<div className="title-search-orderIndex">
                        <input className="search" placeholder="在18425个商品中搜索"/>
                    </div>*/}
                    <ul className="mui-table-view orders">
                        {
                            this.state.stockUpArr.map((item)=>{
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
                                                    <span className="mui-pull-right goods-number">x{item.goodNumber}</span>
                                                </p>
                                            </div>
                                        </a>
                                        <div className="order-number">
                                            <div className="mui-pull-left">
                                                <h5>共{item.goodNumber}件商品，总价 <span className="logistics-status">￥{item.goodNumber*item.goodPrice}</span></h5>
                                                <h6>(运费：<span className="logistics-status">￥{item.orderPostage||0}</span>，税费<span className="logistics-status">￥{item.orderTaxesPrice||0}</span>)</h6>
                                            </div>
                                            {/*<div className="mui-pull-right receive">
                                                <a className="mui-btn mui-btn-danger mui-btn-outlined" onClick={this.tixingSendGoods.bind(this)} style={{color:'#333',borderColor:'#999'}}>提醒发货</a>
                                           </div>*/}
                                        </div>
                                     </li>
                                )
                            })
                        }
                        {
                            this.state.shipmentsArr.map((item)=>{
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
                                                    <span className="mui-pull-right goods-number">x{item.goodNumber}</span>
                                                </p>
                                            </div>
                                        </a>
                                        <div className="order-number">
                                            <div className="mui-pull-left">
                                                <h5>共{item.goodNumber}件商品，总价 <span className="logistics-status">￥{item.goodNumber*item.goodPrice}</span></h5>
                                                <h6>(运费：<span className="logistics-status">￥{item.orderPostage||0}</span>，税费<span className="logistics-status">￥{item.orderTaxesPrice||0}</span>)</h6>
                                            </div>
                                            <div className="mui-pull-right receive">
                                                <Link className="mui-btn mui-btn-danger mui-btn-outlined" to={{pathname:'/ViewLogistics'}}>
                                                   查看物流
                                               </Link>
                                                <a id="sureShouHuo" onClick={this.sureShouHuo.bind()} className="mui-btn mui-btn-danger sureShouHuo">确认收货</a>
                                            </div>
                                        </div>
                                     </li>
                                )
                            })
                        }
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
                                                    <span className="mui-pull-right goods-number">x{item.goodNumber}</span>
                                                </p>
                                            </div>
                                        </a>
                                        <div className="order-number">
                                            <div className="mui-pull-left">
                                                <h5>共{item.goodNumber}件商品，总价 <span className="logistics-status">￥{item.goodNumber*item.goodPrice}</span></h5>
                                                <h6>(运费：<span className="logistics-status">￥{item.orderPostage||0}</span>，税费<span className="logistics-status">￥{item.orderTaxesPrice||0}</span>)</h6>
                                            </div>
                                            <div className="mui-pull-right receive">
                                                <a className="mui-btn mui-btn-danger">去评价</a>
                                            </div>
                                        </div>
                                     </li>
                                )
                            })
                        }
                        {
                            this.state.doneCommentsArr.map((item)=>{
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
                                                    <span className="mui-pull-right goods-number">x{item.goodNumber}</span>
                                                </p>
                                            </div>
                                        </a>
                                        <div className="order-number">
                                            <div className="mui-pull-left">
                                                <h5>共{item.goodNumber}件商品，总价 <span className="logistics-status">￥{item.goodNumber*item.goodPrice}</span></h5>
                                                <h6>(运费：<span className="logistics-status">￥{item.orderPostage||0}</span>，税费<span className="logistics-status">￥{item.orderTaxesPrice||0}</span>)</h6>
                                            </div>
                                            <div className="mui-pull-right receive">
                                                <a className="mui-btn mui-btn-danger mui-btn-outlined" onClick={this.stroll.bind(this)}>再逛逛</a>
                                            </div>
                                        </div>
                                     </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className="totost" id="message">
                    <p className="">已提醒</p>
                </div>
                <Navigator/>
            </div>
        )
    }
     componentDidMount(){
        this.MyIndex();
        //this.sureShouHuo();
    }
    MyIndex(){
        //
         var _this=this; //把this用_this暂代，以免找不到
         console.log(localStorage['id'],'//////')
         $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/mineOrder",//请求的路径
            async:true,
            data: { 
                pageNum:'1',
                pageSize:'50',
                custId:localStorage['id']

            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                
                if(data.code==1){
                    var dataD = data.data;
                    var stockUpArr = [] //备货中
                    var shipmentsArr = [] //已发货
                    var deliveryArr = [] //已收货received
                    var doneCommentsArr = [] //已评论
                   for(var i=0;i<dataD.length;i++){
                    //console.log(dataD[i].orderStatus,'8888888')
                        if(dataD[i].orderStatus == '10012') {
                            dataD[i].orderStatus = '备货中'
                            var stockUpRrderDetailList = dataD[i].orderDetailList;
                            for(var j=0;j<stockUpRrderDetailList.length;j++){
                                  
                                var stockUpObj = new Object();
                                 stockUpObj.itemKey = stockUpRrderDetailList[j].id;
                                 stockUpObj.imageUrl = stockUpRrderDetailList[j].imageUrl;//图片
                                 stockUpObj.goodName = stockUpRrderDetailList[j].goodName;//订单名称
                                 stockUpObj.goodNumber = stockUpRrderDetailList[j].goodNumber //商品数量
                                 stockUpObj.goodSku = dataD[i].orderNo; //订单编号
                                 stockUpObj.goodPrice = stockUpRrderDetailList[j].goodPrice;//商品的价格
                                 stockUpObj.orderStatus = dataD[i].orderStatus;
                                stockUpArr.push(stockUpObj)
                            }
                        }
                        else if(dataD[i].orderStatus == '10013'){
                            dataD[i].orderStatus = '卖家已发货'
                            var shipmentDataList = dataD[i].orderDetailList;
                            for(var y=0;y<shipmentDataList.length;y++){
                                //console.log(shipmentDataList[y],'///////////wuliu')
                                var shipmentsObj = new Object();
                                shipmentsObj.itemKey = shipmentDataList[y].id;
                                 shipmentsObj.imageUrl = shipmentDataList[y].imageUrl;//图片
                                 shipmentsObj.goodName = shipmentDataList[y].goodName;//订单名称
                                 shipmentsObj.goodNumber = shipmentDataList[y].goodNumber //商品数量
                                 shipmentsObj.goodSku = dataD[i].orderNo; //订单编号
                                 shipmentsObj.goodPrice = shipmentDataList[y].goodPrice;//商品的价格
                                 shipmentsObj.orderStatus = dataD[i].orderStatus;
                                shipmentsArr.push(shipmentsObj)
                            }
                        }
                        else if(dataD[i].orderStatus == '10014'){
                            dataD[i].orderStatus = '已收货'
                            var receivedDataList = dataD[i].orderDetailList;
                            for(var y=0;y<receivedDataList.length;y++){
                               console.log(receivedDataList[y],'/////////456')
                                var receivedObj = new Object();
                                // receivedObj.itemKey = y + 'y';
                                receivedObj.itemKey= receivedDataList[y].id;
                                 receivedObj.imageUrl = receivedDataList[y].imageUrl;//图片
                                 receivedObj.goodName = receivedDataList[y].goodName;//订单名称
                                 receivedObj.goodNumber = receivedDataList[y].goodNumber //商品数量
                                 receivedObj.goodSku = dataD[i].orderNo; //订单编号
                                 receivedObj.goodPrice = receivedDataList[y].goodPrice;//商品的价格
                                 receivedObj.orderStatus = dataD[i].orderStatus;
                                deliveryArr.push(receivedObj)
                            }
                        }
                        else if(dataD[i].orderStatus == '10015'){
                            dataD[i].orderStatus = '已评论'
                            var doneCommentsDataList = dataD[i].orderDetailList;
                            for(var y=0;y<doneCommentsDataList.length;y++){
                                var doneCommentsObj = new Object();
                                doneCommentsObj.itemKey = doneCommentsDataList[y].id;
                                 doneCommentsObj.imageUrl = doneCommentsDataList[y].imageUrl;//图片
                                 doneCommentsObj.goodName = doneCommentsDataList[y].goodName;//订单名称
                                 doneCommentsObj.goodNumber = doneCommentsDataList[y].goodNumber //商品数量
                                 doneCommentsObj.goodSku = dataD[i].orderNo; //订单编号
                                 doneCommentsObj.goodPrice = doneCommentsDataList[y].goodPrice;//商品的价格
                                 doneCommentsObj.orderStatus = dataD[i].orderStatus;
                                doneCommentsArr.push(doneCommentsObj)
                            }
                        }
                    }
                    _this.setState({stockUpArr:stockUpArr,shipmentsArr:shipmentsArr,deliveryArr:deliveryArr,doneCommentsArr:doneCommentsArr})
                    return true;
                }
              
            },
             complete: function(XMLHttpRequest, textStatus){
               
            }
        });
    }
    sureShouHuo(){
      var r=confirm('确定收货?')
        if(r==true){
            //这是确认收货
            hashHistory.push(
                {pathname:'/WritingEvaluation',
                state:{
                       accountId:'123456789',
                }
                // to={{pathname:'ProductDetails/'+item.id,query:{itemGoodsName:item.name}}}
            })
        }
        else{
           console.log('取消收货')
       }     
    }


    /*点击提醒发货的操作*/
    tixingSendGoods(){
        document.getElementById('message').style.display='block';
        setTimeout(function () {
            document.getElementById('message').style.display='none'
        },2000)
    }


    /*点击再逛逛*/
    stroll(){
        hashHistory.push(
                {pathname:'/Home'})
    }
}
