/**
 * Created by zhangHeng on 17/6/10.
 * 我的优惠券
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import $ from 'jquery'
import {Link} from 'react-router'
import Header from './../../components/tab/Header'

export default class MyCoupon extends React.Component{
    constructor(props){
        super(props);
        this.state={
        	FullReduceArr:[],
        	deductionArr:[],
        	ReducePostArr:[],
        	ReduceTaxArr:[]
        }
    }

    render(){
        return(
            <div>

                <Header title="使用优惠券"/>

	            <div className="mui-content background-none">
	                <div className="use-coupon">
	                	{
	                        this.state.FullReduceArr.map((item)=>{
	                            return(
	                            	<a className="background-red" key={item.itemKey}>
				                        <p className="coupon-type"></p>
				                        <h1><span>￥</span>{item.reducePrice}</h1>
				                        <h5 style={{fontSize:13}}>单笔满{item.priceLimit}使用，不可叠加使用</h5>
				                        <h5>有效期：{item.expireTime}</h5>
				                    </a>

	                            )
	                        })
                        }
                        {
	                        this.state.deductionArr.map((item)=>{
	                            return(
	                            	<a className="background-cyan" key={item.itemKey}>
				                        <p className="coupon-type"></p>
				                        <h1><span>￥</span>{item.reducePrice}</h1>
				                        <h5 style={{fontSize:13}}>单笔满{item.priceLimit}使用，不可叠加使用</h5>
				                        <h5>有效期：{item.expireTime}</h5>
				                    </a>

	                            )
	                        })
                        }
                        {
	                        this.state.ReduceTaxArr.map((item)=>{
	                            return(
	                            	<a className="background-postGreen" key={item.itemKey}>
				                        <p className="coupon-type"></p>
				                        <h1><span>￥</span>{item.reducePrice}</h1>
				                        <h5 style={{fontSize:13}}>单笔满{item.priceLimit}使用，不可叠加使用</h5>
				                        <h5>有效期：{item.expireTime}</h5>
				                    </a>

	                            )
	                        })
                        }
	                    {
	                        this.state.ReducePostArr.map((item)=>{
	                            return(
	                            	<a className="background-purple" key={item.itemKey}>
				                        <p className="coupon-type"></p>
				                        <p className="is-selected is-selected-active"></p>
				                        <h1><span>￥</span>{item.reducePrice}</h1>
				                        <h5 style={{fontSize:13}}>单笔满{item.priceLimit}使用，不可叠加使用</h5>
				                        <h5>有效期：{item.expireTime}</h5>
				                    </a>
	                            )
	                        })
                        }
	                </div>
	            </div>
	            <Navigator/>

                <div className="totost" id="message" style={{}}>
                    <p className="" style={{width:'57%'}}>暂时没有数据呀</p>
               </div>
            </div>
        )
    }

    componentDidMount(){
        this.MyCoupon()
    }
    MyCoupon(){
         var _this=this; //把this用_this暂代，以免找不到
         $.ajax({
            type: "get",//请求的方式为GET /swagger/api/mineOrderLogistics
            url: "http://116.62.119.165/shop-portal/swagger/api/mineCoupon",//请求的路径GET 
            async:true,
            data: { 
               custId:localStorage['id']
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                console.log(data,'myCoupon')
               
                if(data.code==1){
                    if(data.data.canUse != 0){
                        var FullReduceArr = [];//满减
                        var deductionArr = [];//抵扣
                        var ReducePostArr = [];//减邮
                        var ReduceTaxArr = [];//减税
                        var FullReduceData = data.data.canUse;
                         // console.log(FullReduceData)
                        for(var i=0;i<FullReduceData.length;i++){
                            var couponType = FullReduceData[i].couponType;
                            if(couponType == '10001'){
                                //满减
                                var FullReduceObj = new Object();
                                FullReduceObj.itemKey = i+'i'
                                 FullReduceObj.reducePrice = FullReduceData[i].reducePrice;//立减的价格
                                 FullReduceObj.priceLimit = FullReduceData[i].priceLimit;//满多少减
                                  FullReduceObj.expireTime = new Date(FullReduceData[i].expireTime).toLocaleDateString();//截止的时间
                                 FullReduceArr.push(FullReduceObj) 
                            }else if(couponType == '10002'){
                                //抵扣
                                var deductioObj = new Object();
                                deductioObj.itemKey = i+'i';
                                deductioObj.reducePrice = FullReduceData[i].reducePrice;//立减的价格
                                deductioObj.priceLimit = FullReduceData[i].priceLimit;//满多少减
                                deductioObj.expireTime = new Date(FullReduceData[i].expireTime).toLocaleDateString();
                                deductionArr.push(deductioObj)
                            }else if(couponType == '10003'){
                                //减邮
                                var ReducePostObj = new Object();
                                 ReducePostObj.itemKey = i+'i';
                                ReducePostObj.reducePrice = FullReduceData[i].reducePrice;//立减的价格
                                ReducePostObj.priceLimit = FullReduceData[i].priceLimit;//满多少减
                                ReducePostObj.expireTime = new Date(FullReduceData[i].expireTime).toLocaleDateString();
                                ReduceTaxArr.push(ReducePostObj)
                            }else if(couponType == '10004'){
                                //减税
                                var ReduceTaxObj = new Object();
                                 ReduceTaxObj.itemKey = i+'i';
                                ReduceTaxObj.reducePrice = FullReduceData[i].reducePrice;//立减的价格
                                ReduceTaxObj.priceLimit = FullReduceData[i].priceLimit;//满多少减
                                ReduceTaxObj.expireTime = new Date(FullReduceData[i].expireTime).toLocaleDateString();
                                ReducePostArr.push(ReduceTaxObj)
                            }
                        }
                        _this.setState({FullReduceArr:FullReduceArr,deductionArr:deductionArr,ReducePostArr:ReducePostArr,ReduceTaxArr:ReduceTaxArr});
                    }else{
                        document.getElementById('message').style.display='block';
                        setTimeout(function () {
                          document.getElementById('message').style.display='none';
                        },2000)





                    }
                }
            }
        });
    }
}
