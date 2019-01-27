/**
 * Created by zhangHeng on 17/6/10.
 * 查看物流
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import {Link} from 'react-router'
import $ from 'jquery'
import Header from './../../components/tab/Header'
export default class ViewLogistics extends React.Component{
    constructor(props){
        super(props);
        this.state={
          logisticsArr:[],
          basicInfroArr:[],
          dataD:{},
          wuliuArr:[],
          currenOrdertArr:[],
          orderId:this.props.location.query.orderId
        }

        console.log(this.state.orderId)
    }
    render(){
        return(
            <div>
              

              <Header title="查看物流"/>
              <div className="mui-content background-silvery">
                          <div>
                  <div className="mui-card">
                    <div className="mui-card-content">
                      <div className="mui-card-content-inner express-company">
                        <p>快递公司：{this.state.dataD.com}</p>
                        <p>运单编号:{this.state.dataD.nu}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mui-card">
                    <ul className="express-status">
                      <li>
                        {/*<div id='lanjian'>*/}
                        <div id='lanjian'><img  src={require('../../images/icon/xiangziT.png')}/></div>
                        <span id='www'>已揽件</span>
                      </li>
                      <li>
                        <div id='yunshu'><img  src={require('../../images/icon/feijiT.png')}/></div>
                        <span>运输中</span>
                      </li>
                      <li>
                        <div id='paijian'><img  src={require('../../images/icon/qujianT.png')}/></div>
                        <span>派件中</span>
                      </li>
                      <li>
                        <div id='qianshou'><img  src={require('../../images/icon/qianshouT.png')}/></div>
                        <span>待签收</span>
                      </li>
                    </ul>
                    
                  
                    <ul className="express-infor">
                    
                    {
                                      this.state.wuliuArr.map((item)=>{
                                          return (
                                            <li key={item.itemKey}>
                            <div className="status">
                              <span className="circular"></span>
                            </div>
                            <div className="text">
                              <p>{item.context}</p>
                              <p>{item.ftime}</p>
                            </div>
                          </li>
                                          )
                                      })
                                  }
                    </ul>
                    
                  </div>
                  <div className="mui-card">
                    <div className="mui-card-content">
                      <div className="mui-card-content-inner">
                        <ul className="mui-table-view orders">
                          {
                            this.state.currenOrdertArr.map((item)=>{
                              return (
                                <li className="mui-table-view-cell mui-media" key={item.itemKey}>
                                  <a className="goods border-none">
                                    <img className="mui-media-object mui-pull-left" src={'http://116.62.119.165/fileServer/images/'+item.imageUrl}/>
                                    <div className="mui-media-body">
                                      <p className='mui-ellipsis-2 infor margin-bttom-10'>
                                        {item.goodName}
                                      </p>
                                      <p className='mui-ellipsis'>
                                        <span className="mui-pull-left current-price">￥{item.goodPrice}</span>
                                        <span className="mui-pull-left cost-price">￥{item.goodPrice}</span>
                                      </p>
                                    </div>
                                  </a>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }

    componentDidMount(){

        this.MylogisticsJiben()
    }
    MylogisticsJiben(){
       var _this=this; //把this用_this暂代，以免找不到
         $.ajax({
            type: "get",//请求的方式为GET /swagger/api/mineOrderLogistics
            url: "http://116.62.119.165/shop-portal/swagger/api/mineOrderLogistics",//请求的路径GET
            async:true,
            data: { 
               orderId:_this.state.orderId
            },
            dataType: 'json',
            success: function(data, textStatus){
                if(data.code==1){
                  var logisticsState = data.data.kuaidi100.state;//状态 0在途中、1已揽收、2疑难、3已签收
                  if(logisticsState == 3){
                      $("#qianshou").parent().children('div').css({'background':'ff5245'})
                  }else if(logisticsState == 1){
                     $("#lanjian").css({'background':'ff5245'})
                    $("#lanjian").parent().children('div').css({'background':'#dcdcdc'})

                  }else if(logisticsState == 0){
                     $("#lanjian").css({'background':'ff5245'})
                     $("#yunshu").css({'background':'ff5245'})
                    $("#paijian").css({'background':'#dcdcdc'})
                    $("#qianshou").css({'background':'#dcdcdc'})
                  }else if(logisticsState == 2){
                    $("#qianshou").css({'background':'#ff5245'})
                    $("#qianshou").parent().children('div').css({'background':'#dcdcdc'})
                  }

                  var wuliDetail = data.data.kuaidi100.data==null?[]:data.data.kuaidi100.data;
                  var currentOrder = data.data.orderDetail;
                  var wuliuArr = []
                  var currenOrdertArr = []


                  for(var i=0;i<wuliDetail.length;i++){
                    var wuliDetailObj = new Object();
                    wuliDetailObj.itemKey = i + 'i';
                    wuliDetailObj.context = wuliDetail[i].context;//快件到哪了
                    wuliDetailObj.ftime = wuliDetail[i].ftime; //ftime快件返回的具体时间包含时分秒
                    wuliDetailObj.time = wuliDetail[i].time;//快件返回的时间年月日
                    wuliuArr.push(wuliDetailObj)
                  }
                  for(var i=0;i<currentOrder.length;i++){
                    var currentOrderObj = new Object();
                    currentOrderObj.itemKey = i +'i';
                    currentOrderObj.goodName =currentOrder[i].goodName;//商品名称
                    currentOrderObj.imageUrl =currentOrder[i].imageUrl;//当前商品的图片路劲
                    currentOrderObj.goodPrice=currentOrder[i].goodPrice;//当前商品的价格
                    currenOrdertArr.push(currentOrderObj);

                  }

                   _this.setState({dataD:data.data.kuaidi100,wuliuArr:wuliuArr,currenOrdertArr:currenOrdertArr},()=>{});
                  return true; 
                }
               
            }      
        });
    }
 
}
