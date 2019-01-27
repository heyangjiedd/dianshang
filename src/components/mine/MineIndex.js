/**
 * Created by zhangHeng on 17/6/10.
 * 我的-基本信息
 */

import React from 'react';
// import Navigator from './../tabNavigator/NavigatorMain.js'
import {Link,hashHistory} from 'react-router';
import $ from 'jquery'
import Header from './../../components/tab/Header'
import Navigator from "../tabNavigator/NavigatorMain";
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';


export default class MineIndex extends React.Component{
    constructor(props){
        super(props);
        this.state={
          accountObj:{},
        }
    }

    render(){
        return(
           <div className='myCenterBigBox'>

               <div>
                   <Header title="个人中心"/>
                   <Navigator/>
                   <div className="mui-content">
                       <ul className="mui-table-view  border-bottom-postion">
                           <li className="mui-table-view-cell display-flex flex-direction-column">

                               {
                                   this.state.accountObj.custImgUrl==null?
                                       <img className="person-center-photo" src={require('./../../images/default-photo.png')} />:
                                       <img className="person-center-photo" src={'http://116.62.119.165/fileServer/images/'+this.state.accountObj.custImgUrl} />
                               }
                               <p>{this.state.accountObj.custNickName}</p>

                           </li>
                       </ul>
                       <ul className="mui-table-view  border-bottom-postion margin-top-10 ">
                          <li className="mui-table-view-cell">
                               <Link className="mui-navigate-right" to={{pathname:'/Index'}}>
                                   我的订单
                                   <span className="navigate-right-text">查看订单</span>
                               </Link>
                             
                          </li>
                           <li className="mui-table-view-cell display-flex">
                                <Link className="flex-1 order-img-width" to={{pathname:'/StockUp'}}>
                                  <img src={require('../../images/icon/bh.png')}/>
                                   <span>备货中</span>
                              </Link>

                              <Link className="flex-1 order-img-width" to={{pathname:'/YetSendGoods'}}>
                                   <img src={require('../../images/icon/dfh.png')}/>
                                   <span>已发货/查看物流</span>
                              </Link>

                              <Link className="flex-1 order-img-width" to={{pathname:'/WritingEvaluation'}}>
                                  <img src={require('../../images/icon/jy.png')}/>
                                  <span>去评价</span>
                              </Link>
                           </li>
                       </ul>
                       <ul className="mui-table-view margin-top-10 border-bottom-postion">

                           <li className="mui-table-view-cell">
                             <Link className="mui-navigate-right" to={{pathname:'/myCoupon'}}>
                               我的优惠券 
                            </Link>
                           </li>
                           <li className="mui-table-view-cell">
                               <Link className="mui-navigate-right" to={{pathname:'/myCollection'}}>
                               我的收藏 
                                </Link>
                           </li>
                           <li className="mui-table-view-cell">
                               <Link className="mui-navigate-right" to={{pathname:'/IndexHealth'}}>
                                   我的健康币
                                   <span className="navigate-right-text">进入健康币商城</span>
                               </Link>
                           </li>
                       </ul>
                       <ul className="mui-table-view margin-top-10 border-bottom-postion">

                           <li className="mui-table-view-cell">
                               <Link className="mui-navigate-right" to="/PersonInfor">
                                   基本信息
                               </Link>
                           </li>
                            <li className="mui-table-view-cell">
                               <Link className="mui-navigate-right" to={{pathname:'/AddressList'}}>
                               收货地址管理
                                </Link>
                           </li>
                           <li className="mui-table-view-cell">
                                <Link className="mui-navigate-right" to="/Written">
                                  书写健康笔记
                               </Link>
                           </li>
                       </ul>
                       <div style={{padding:15}}>
                           <Button type="warning" onClick={this.loginOut.bind(this)}>退出登陆</Button><WhiteSpace />
                       </div>
                   </div>
               </div>
               <div className="totost" id="message">
                    <p className="" style={{width:'57%'}}>您还未登录，请到登录页进行登录</p>
               </div>
           </div>
        )
    }

    componentDidMount(){
      //判断用户是否登录
      if(localStorage['id']==undefined || localStorage['id']==null){
          var isLoading=false;
          document.getElementById('message').style.display='block';
          setTimeout(function () {
              document.getElementById('message').style.display='none';
              isLoading=true
          },2000)

          var timer = setInterval(function(){
              if(isLoading){
                  clearInterval(timer);
                  hashHistory.push({pathname:'/loginByAccount'});
              }
          },100);
      }

      this.accountInformation()
    }

    //头像接口
    accountInformation(){
         var _this=this;
        $.ajax({
            url: 'http://116.62.119.165/shop-portal/swagger/api/custInfoDto',
            type: "GET",
            async:true,
            dataType: 'json',
            data: {
                custId:localStorage['id'],
            },
            success: function(data) {

                if(data.code == 1){
                     _this.setState({accountObj:data.data})
               }
            },
            error: function(xhr, status, err) {
            },
            complete: function(XMLHttpRequest, textStatus){
            }
        });
      }

    loginOut(){
        localStorage.clear();
        hashHistory.push({
            pathname:'/loginByAccount'
        })
    }

}
