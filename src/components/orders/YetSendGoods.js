/**
 * Created by zhangHeng on 17/6/10.
 * 查看物流
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import $ from 'jquery'
import {Link} from 'react-router'
import {hashHistory} from 'react-router'
import { Modal, Toast } from 'antd-mobile';
const alert = Modal.alert;


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


    _renderGoods(){
        if(this.state.shipmentsArr!=0){
            return this.state.shipmentsArr.map((item,index)=>{
                return (
                    <li  className="mui-table-view-cell mui-media" key={index} style={{background:'#fefefe'}}>
                        <p className="order-number">
                            <span className="mui-pull-left">订单编号：{item.orderNo}</span>
                            <span className="mui-pull-right logistics-status">{this.statusFormat(item.orderStatus,item.id).label}</span>
                        </p>

                        {
                            item.orderDetailList.map((itemOne,oneIndex)=>{
                                return (
                                    <a  className="goods" key={oneIndex}>
                                        <img className="mui-media-object mui-pull-left" style={{maxWidth:76,height:76,lineHeight:76}}  src={'http://116.62.119.165/fileServer/images/'+itemOne.imageUrl}/>
                                        <div className="mui-media-body">
                                            <p className='mui-ellipsis-2 infor margin-bttom-10'>{itemOne.goodName+'  '+item.spceName}</p>
                                            <p className='mui-ellipsis'>
                                                <span className="mui-pull-left current-price">￥{itemOne.goodPrice}</span>
                                                <span className="mui-pull-right goods-number">x{itemOne.goodNumber}</span>
                                            </p>
                                        </div>
                                    </a>
                                )
                            })
                        }
                        <div className="order-number">
                            <div className="mui-pull-left">
                                <h5>共{item.orderDetailList.length}件商品，总价 <span className="logistics-status">￥{item.orderPayPrice}</span></h5>
                                <h6>(运费：<span className="logistics-status">￥{item.orderPostage}</span>，
                                    税费<span className="logistics-status">￥{item.orderTaxesPrice}</span>)
                                </h6>
                            </div>
                            <div className="mui-pull-right receive">

                                {this.statusFormat(item.orderStatus,item.id).value}
                            </div>
                        </div>
                    </li>
                )
            })
        }else{
            return <div className="mui-text-center">暂无记录</div>
        }
    }

    render(){

        return(
            <div>
               <ul className="mui-bar mui-bar-nav order-search" style={{padding:'0',background:'transparent'}}>
                    <li className="flex-two">
                        <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" onClick={this.handClick.bind(this)}></a>
                        <h1 className="mui-title">订单/物流</h1>
                    </li>
                </ul>
                <div className="mui-content background-silvery margin-100" style={{paddingTop:10}}>
                    <div className="title-search-orderIndex">
                        <input className="search" placeholder="在18425个商品中搜索"/>
                    </div>
                    <ul className="mui-table-view orders" style={{background:'transparent'}}>
                        {
                            this._renderGoods()
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
        //
         var _this=this;
         $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/mineOrder",
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
            success: function(response, textStatus){
                if(response.code==1){
                    console.log(response.data,'页面只能显示已发货')
                    var reStocUpArr = []
                    for(var i=0;i<response.data.length;i++){
                        if(response.data[i].orderStatus === '10013'){
                            reStocUpArr.push(response.data[i])
                            _this.setState({shipmentsArr:reStocUpArr})
                        }
                    }
                     //_this.setState({shipmentsArr:response.data})
                }
              
            },
             complete: function(XMLHttpRequest, textStatus){
               
            }
        });
    }

    handClick(){
        history.go(-1)
    }

    /**status**/
    statusFormat(statusCode,orderNo){
        let object=new Object();
        object.label='';
        object.value=new Array();

        switch (parseInt(statusCode))
        {
            case 10011:
                object.label="未付款";
                break;
            case 10012:
                object.label="备货中";
                break;
            case 10013:
                object.label="已发货";
                object.value.push(<Link className="mui-btn mui-btn-danger mui-btn-outlined" key="0"
                                        to={{pathname:'/ViewLogistics',query:{orderId:orderNo}}}>查看物流</Link>
                )
                object.value.push(<Link className="mui-btn mui-btn-danger mui-btn-outlined" key="1"
                                        onClick={this.showAlert.bind(this,orderNo)}>确认收货</Link>)
                break;
            case 10014:
                object.label="已收货";
                object.value.push(<Link className="mui-btn mui-btn-danger mui-btn-outlined" key="0"
                                        to={{pathname:'/WritingEvaluation',query:{orderId:orderNo}}}>去评价</Link>)
                break;
            case 10015:
                object.label="已评论";
                break;
            default:
                break
        }

        return object;
    }

    /**confirmReceipt**/
    showAlert (orderId) {
        let _this=this;
        const alertInstance = alert('确认收货', '是否确认收货?', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: '确认',
                onPress: () => {
                    $.ajax({
                        type: "get",
                        url: "http://116.62.119.165/shop-portal/swagger/api/affirm",
                        async:true,
                        data: {
                            orderId:orderId
                        },
                        dataType: 'json',
                        beforeSend: function(XMLHttpRequest){
                            //todo
                        },
                        success: function(response){
                            console.log(response.message,'message')
                            if(response.success){
                                Toast.info(response.message, 2, null, false);
                                _this.MyIndex()
                            }

                        },
                        complete: function(XMLHttpRequest, textStatus){

                        }
                    })
                }
            },
        ]);
        setTimeout(() => {
            console.log('auto close');
            alertInstance.close();
        }, 500000);
    };

}
