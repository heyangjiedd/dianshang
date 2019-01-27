/**
 * Created by zhangHeng on 17/6/19.
 * 我的-个人中心
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import $ from 'jquery'
import Header from './../../components/tab/Header'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import {Link,hashHistory} from 'react-router';

export default class PersonInfor extends React.Component{
    constructor(props){
        super(props);
        this.state={
          PersonInforArr:[],
          headImgUrl:{}
        }
    }

    render(){
        return(
           <div>

               <Header title="个人中心"/>
               <Navigator/>
               <div className="" style={{paddingTop:44,paddingBottom:50,position:'relative'}}>
                   <ul className="mui-table-view  border-bottom-postion">
                       <Link className="flex-space-between mui-table-view-cell" to="/HeadUpload">
                           头像
                           <img style={{width: '50px',height: 'inherit'}} src={this.state.headImgUrl.custImgUrl} />
                       </Link>
                       <li className="mui-table-view-cell">
                          {
                            this.state.PersonInforArr.map((item)=>{
                              return (
                                 <Link className="mui-navigate-right" key={item.itemKey+''} to="/CustNickName">
                                    昵称
                                   <span className="navigate-right-text" >{item.custNickName}</span>
                               </Link>
                              )
                            })
                          }


                       </li>
                   </ul>
                   <ul className="mui-table-view margin-top-10 border-bottom-postion">
                       <li className="mui-table-view-cell color-blue background-yin font-size-14">
                           根据海关总署要求，遵循海外商品合理自用原则。请填写真实身份信息。
                           一个账号只能绑定一个身份信息且不能修改。如需为他人购买，请重新注册账号。
                       </li>
                       <li className="mui-table-view-cell">
                        {
                          this.state.PersonInforArr.map((item)=>{
                            return (
                               <Link className="mui-navigate-right" key={item.itemKey+''} to="/RealName">
                                 真实姓名
                                 <span className="navigate-right-text" >{item.custRealName}</span>
                             </Link>
                            )
                          })
                        }

                       </li>
                       <li className="mui-table-view-cell">

                       {
                          this.state.PersonInforArr.map((item)=>{
                            return (
                              <Link className="mui-navigate-right" key={item.itemKey+''} to="/BirthDady">
                                 个人生日
                                 <span className="navigate-right-text">{item.custBirth}</span>
                             </Link>
                            )
                          })
                        }
                          
                       </li>
                       <li className="mui-table-view-cell">
                        {
                          this.state.PersonInforArr.map((item)=>{
                            return (
                              <Link className="mui-navigate-right"  key={item.itemKey+''}
                                    to={{pathname:'/CustSex',query:{sex:item.custSex=='男'?1:2}}}>
                                  性别
                                  <span className="navigate-right-text">{item.custSex}</span>
                             </Link>
                            )
                          })
                        } 
                       </li>
                       <li className="mui-table-view-cell">
                       {
                          this.state.PersonInforArr.map((item)=>{
                            return (
                               <Link className="mui-navigate-right" to="/RealID" key={item.itemKey+''}>
                                身份证号码
                                  <span className="navigate-right-text">{item.custId}</span>
                             </Link>
                            )
                          })
                        }
                       </li>
                        <li className="mui-table-view-cell">
                            {
                              this.state.PersonInforArr.map((item)=>{
                                return (
                                   <Link className="mui-navigate-right" to="/UploadCard" key={item.itemKey+''}>
                                      身份证

                                       {
                                           this.state.headImgUrl.custCardFace==null?
                                               null
                                               :
                                               <span className="navigate-right-text" style={{maxWidth:'25%',overflow:'hidden'}}>
                                                   <img src={'http://116.62.119.165/fileServer/images/'+this.state.headImgUrl.custCardFace}/>
                                               </span>

                                       }
                                       {
                                           this.state.headImgUrl.custCardCon==null?
                                               null
                                               :
                                               <span className="navigate-right-text" style={{maxWidth:'25%',overflow:'hidden'}}>
                                                   <img src={'http://116.62.119.165/fileServer/images/'+this.state.headImgUrl.custCardCon}/>
                                               </span>

                                       }
                                 </Link>
                                )
                              })
                            }
                        </li>
                   </ul>
                  
               </div>
           </div>
        )
    }
     componentDidMount(){
        this.PersonInfor()
        this.HeadUplad()
    }

    PersonInfor(){
         var custId = localStorage['id'];
         var _this=this;
         $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/custDetails",//请求的路径
            async:true,
            data: { 
               custId:custId,
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                var PersonInforArr = []
                if(data.code==1){
                  var PersonInforObj = new Object();
                  PersonInforObj.custNickName =data.data.custNickName;
                   PersonInforObj.custEmail =data.data.custEmaile;
                   PersonInforObj.custRealName =data.data.custRealName;//真实姓名
                   PersonInforObj.custBirth =new Date(data.data.custBirth).toLocaleDateString();//生日

                   var custSex = data.data.custSex;
                   if(custSex  == '1') {
                    custSex = '男'
                   }else if(custSex  == '2'){
                    custSex = '女'
                   }
                   PersonInforObj.custSex =custSex;
                   PersonInforObj.custId =data.data.custId ;//身份证号
                  PersonInforArr.push(PersonInforObj)
                }

                 _this.setState({PersonInforArr:PersonInforArr})
                    return true;
            },
             complete: function(XMLHttpRequest, textStatus){
               
            }
        });
     }

    //头像接口
    HeadUplad(){
         var _this=this;
        $.ajax({ 
            url: 'http://116.62.119.165/shop-portal/swagger/api/custInfoDto',
            type: "GET",
            async:true,
            dataType: 'json',
            data: {
                custId:localStorage['id'],
            },
            success: function(response) {
                if(response.code == 1){
                    var headImgObj =new Object(); 
                     headImgObj.custImgUrl='http://116.62.119.165/fileServer/images/'+response.data.custImgUrl;
                    headImgObj.custCardFace=response.data.custCardFace;
                    headImgObj.custCardCon=response.data.custCardCon;
                     _this.setState({headImgUrl:headImgObj})

               }
            },
            error: function(xhr, status, err) {
            },
            complete: function(XMLHttpRequest, textStatus){
            }
        });
      }

    /**loginOUt**/
    loginOut(){
        localStorage.clear();
        hashHistory.push({
            pathname:'/Login'
        })
    }
}
