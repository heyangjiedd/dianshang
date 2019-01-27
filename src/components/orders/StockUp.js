/**
 * Created by zhangHeng on 17/6/10.
 * 备货中
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import $ from 'jquery'
import {Link} from 'react-router'

export default class StockUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            stockUpArr:[]
        }
    }

    render(){

        return(
            <div>
               <ul className="mui-bar mui-bar-nav order-search" style={{padding:'0'}}>
                    <li className="flex-two">
                        <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                        <h1 className="mui-title">备货中</h1>
                    </li>
                </ul>
                <div className="mui-content background-silvery margin-100" style={{paddingTop:10}}>
                    <div className="title-search-orderIndex">
                        <input className="search" placeholder="搜索全部订单"/>
                    </div>
                    <ul className="mui-table-view orders background-none">
               
                        {
                            this.state.stockUpArr.map((item,index)=>{
                                var totalNumber=0;
                                return(
                                    <li  className="mui-table-view-cell" key={index}>
                                        <p className="order-number">
                                            <span className="mui-pull-left">订单编号：{item.orderNo}</span>
                                            <span className="mui-pull-right logistics-status">{this.formatStatus(item.orderStatus).statusStr}</span>
                                        </p>

                                        {
                                            item.orderDetailList.map((child,childIndex)=>{
                                                totalNumber+=parseInt(child.goodNumber)
                                                return (
                                                    <a  className="goods" key={childIndex}>
                                                        <img className="mui-media-object mui-pull-left" style={{maxWidth:76,height:76,lineHeight:76}}
                                                             src={'http://116.62.119.165/fileServer/images/'+child.imageUrl}/>

                                                        <div className="mui-media-body">
                                                            <p className='mui-ellipsis-2 item-good-name'>{child.goodName+' '+item.spceName}</p>
                                                            <p className='mui-ellipsis'>
                                                                <span className="mui-pull-left current-price">￥{child.goodPrice}</span>
                                                                {/*<span className="mui-pull-left cost-price">￥{item.goodPrice}</span>*/}
                                                                <span className="mui-pull-right goods-number">{child.goodNumber}</span>
                                                            </p>
                                                        </div>
                                                    </a>
                                                )
                                            })
                                        }

                                        <div className="order-number">
                                            <div className="mui-pull-left">
                                                <h5>共{totalNumber}件商品，总价<span className="logistics-status">￥{item.orderPayPrice}</span></h5>
                                                <h6>(运费：<span className="logistics-status">{item.orderPostage}</span>
                                                     税费：<span className="logistics-status">{item.orderTaxesPrice}</span>)</h6>
                                            </div>
                                            <div className="mui-pull-right receive" >
                                                {this.formatStatus(item.orderStatus,item.id).btnArray}
                                                {/*<a className="mui-btn mui-btn-danger mui-btn-outlined">提醒发货</a>*/}
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
        this.MyIndex()
    }

    MyIndex(){
         var _this=this;
         $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/mineOrder",
            async:true,
            data: { 
                pageNum:1,
                pageSize:5,
                custId:localStorage['id']
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(response, textStatus){
                if(response.code==1){
                    var reStocUpArr = []
                    if(response.data.length!=0){
                         for(var i=0;i<response.data.length;i++){
                             if(response.data[i].orderStatus === '10012'){
                                 reStocUpArr.push(response.data[i])
                                  _this.setState({stockUpArr:reStocUpArr})
                             }
                         }
                       // _this.setState({stockUpArr:response.data})
                    }else{
                       //提示暂无订单
                        Toast.info(response.message, 2, null, false);
                    }
                }
            },
             complete: function(XMLHttpRequest, textStatus){
               
            }
        });
    }

    formatStatus(statusNum,_orderId){

        var object=new Object();

        var statusStr=''
        var btnArray=[];
        switch(parseInt(statusNum))
        {
            case 10011:
                statusStr='未付款'
                break;
            case 10012:
                statusStr='备货中'
                btnArray.push(<a className="mui-btn mui-btn-danger mui-btn-outlined" key={parseInt(statusNum)} onClick={this.warnShipments.bind(this)}>提醒发货</a>)
                break;
            case 10013:
                statusStr='已发货'
                btnArray.push(<Link className="mui-btn mui-btn-danger mui-btn-outlined" key={parseInt(statusNum)}
                                 to={{pathname:'/ViewLogistics',query:{orderId:_orderId}}}>查看物流</Link>)
                btnArray.push(<Link className="mui-btn mui-btn-danger mui-btn-outlined" key={parseInt(statusNum)+1}
                                 onClick={this.showAlert.bind(this,_orderId)}>确认收货</Link>)
                break;
            case 10014:
                statusStr='已收货'
                btnArray.push(<Link className="mui-btn mui-btn-danger mui-btn-outlined" key={parseInt(statusNum)}
                                 to={{pathname:'/WritingEvaluation',query:{orderId:_orderId}}}>去评价</Link>)
                break;
            case 10015:
                 statusStr='已评价'
                break;
            default:
                break;
        }
        object.statusStr=statusStr;


        object.btnArray=btnArray
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

    warnShipments(){
        //Toast.info(response.message, 2, null, false);
        document.getElementById('message').style.display='block';
        setTimeout(function () {
          document.getElementById('message').style.display='none';
        },2000)
    }


}
