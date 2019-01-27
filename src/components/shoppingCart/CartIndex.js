/**
 * Created by zhangHeng on 17/6/10.
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import { Link } from 'react-router'
import Header from './../../components/tab/Header'

export default class CartIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			queryObj: this.props.location.state,
			personData: {},
			specGoodsDetail: {},
			defaultAddress: {},
			isShow: false,
			isUp: false,
			over: 0,
			postageAndTaxes: {},
			isPay: false
		}
	}

	_render() {

		if(this.state.queryObj.type != null && this.state.queryObj.type == -1) {

			if(this.state.specGoodsDetail.order != null) {
				return this.state.specGoodsDetail.order.map((item, index) => {

					return(
						<li className="mui-table-view-cell display-flex" key={index}>
                            <div className="goods-img-left">
                                <img src={'http://116.62.119.165/fileServer/images/'+item.goodsImgUrl}/>
                            </div>
                            <div className="goods-content-right">
                                <p className="mui-ellipsis-2 font-size-16 color-block">
                                    {item.goodsName}
                                </p>
                                <h5>
                                    <span className="color-red font-size-16">
                                        ￥
                                        {item.goodsPrice}
                                        <small>{this.getnum(item.goodsPrice+'')}</small>
                                    </span>
                                    <span className="color-block mui-pull-right">
                                        x{item.goodsCcount}
                                    </span>
                                </h5>
                            </div>
                        </li>
					)
				})
			}
		} else {
			if(this.state.specGoodsDetail != null && this.state.specGoodsDetail.goodsImgUrl != null) {
				return(
					<li className="mui-table-view-cell display-flex">
                        <div className="goods-img-left">

                            {
                               this.state.specGoodsDetail.goodsImgUrl.map((item,index)=>{
                                    return (
                                        <img  key={index}  src={'http://116.62.119.165/fileServer/images/'+item}/>
                                    )
                                })
                            }

                        </div>
                        <div className="goods-content-right">
                            <p className="mui-ellipsis-2 font-size-16 color-block">
                                {this.state.specGoodsDetail.goodsName}
                            </p>
                            <h5>
                            <span className="color-red font-size-16">
                                ￥{this.state.specGoodsDetail.referencePirce}
                                <small>{this.getnum(this.state.specGoodsDetail.referencePirce+'')}</small>
                            </span>
                                <span className="color-block mui-pull-right">
                                x{this.state.queryObj.goodsNumber}
                            </span>
                            </h5>
                        </div>
                    </li>
				)
			}
		}

	}

	render() {
		return(
			<div>
                <Header title="订单支付"/>

                <div className="mui-content order-finish">
                    <ul className="mui-table-view">
                        <li className="mui-table-view-cell">
                            <Link className="mui-navigate-right shopping-cart-address"
                                  to={{pathname:'/MangerAddress',query:this.state.queryObj}}>
                                <h5 className="font-size-16 color-block">
                                    {this.state.defaultAddress.consignee}
                                   {/*<span className="padding-left-10">{this.state.defaultAddress.consigneePhone}</span>*/}
                                    <span className="mui-pull-right font-size-12">默认地址</span>
                                </h5>
                                <p>{this.state.defaultAddress.regionText+this.state.defaultAddress.addressDetail}</p>
                            </Link>
                        </li>
                        <li className="mui-table-view-cell color-blue background-yin font-size-14">
                            根据国家海关总署要求,遵循海外商品合理自用的原则,请务必填写真实的个人的姓名与身份证号码.
                            一个账号只能绑定一个身份信息,不可修改.多多鸟将为你的身份信息严格保密.
                        </li>
                        <li className="mui-table-view-cell">
                            <Link to={{pathname:'/Name',query:this.state.queryObj}}>
                                收货人
                                <h5 className="mui-pull-right">
                                    {this.state.personData.custRealName}
                                </h5>
                            </Link>

                        </li>
                        <li className="mui-table-view-cell">
                            <Link to={{pathname:'/CardId',query:this.state.queryObj}}>
                                身份证号码
                                <h5 className="mui-pull-right">
                                    {this.state.personData.custId}
                                </h5>
                            </Link>

                        </li>
                        <li className="mui-table-view-cell">
                            <Link to={{pathname:'/Telephone',query:this.state.queryObj}}>
                                电话号码
                                <h5 className="mui-pull-right">
                                    {this.state.personData.custPhone}
                                </h5>
                            </Link>
                        </li>
                        <li className="mui-table-view-cell">
                            <Link className="mui-navigate-right" to={{pathname:'/FormData',query:this.state.queryObj}}>
                                上传身份证
                            </Link>
                        </li>
                        <li className="mui-table-view-cell color-blue background-yin font-size-14">
                            请确保手机号码为本人使用且能正常通话与收发短信,我们将以短信的形式通知你上传身份证图片信息进行清关.
                        </li>
                    </ul>
                    <ul className="mui-table-view">
                        <li className="mui-table-view-cell">
                            订单信息
                            <span className="mui-pull-right fontSize-12">
                                共<span className="color-red">{this.state.specGoodsDetail.totalNumber}</span>件商品
                            </span>
                        </li>
                        {this._render()}
                        <li className="mui-table-view-cell mui-text-center"
                            style={{display:this.state.isShow?'block':'none'}}>
                            <button className="mui-icon mui-icon-arrowdown font-size-12"
                                onClick={this.isMore.bind(this)} value={this.state.isUp}>
                                查看全部{(this.state.specGoodsDetail.totalNumber-2)}
                            </button>
                        </li>
                    </ul>
                    <ul className="mui-table-view last-ul">
                        <li className="mui-table-view-cell">
                            <Link className="mui-navigate-right"
                                  to={{pathname:'/Coupon',state:this.state.queryObj}}>
                                我的优惠券
                                <span className="mui-pull-right">使用优惠券</span>
                            </Link>
                        </li>
                        <li className="mui-table-view-cell">
                            支付方式
                            <span className="mui-pull-right margin-right-10">
                                <img src={require('../../images/icon/weixin-pay.png')}/>
                            </span>
                            <span className="mui-pull-right margin-right-10">
                                <img src={require('../../images/icon/zhifubao-pay.png')}/>
                            </span>
                        </li>
                        <li className="mui-table-view-cell">
                            <h5 className="margin-bottom-10">
                                商品总额
                                <span className="mui-pull-right">
                                    ￥{this.state.specGoodsDetail.totalPrice}
                                    <smal>{ this.getnum(this.state.specGoodsDetail.totalPrice+'')}</smal>
                                </span>
                            </h5>
                            <h5 className="margin-bottom-10">
                                运费
                                <span className="mui-pull-right">{this.state.postageAndTaxes.postage}</span>
                            </h5>
                            <h5 className="margin-bottom-10">
                                税费
                                <span className="mui-pull-right">{this.state.postageAndTaxes.taxes}</span>
                            </h5>
                            <h5>
                                优惠券
                                <span className="mui-pull-right">￥0.00</span>
                            </h5>
                        </li>
                    </ul>
                </div>
                <div className="flex-space-between background-white">
                    <div className="pay-money-total">
                        <h5>应付总额</h5>
                        <h5 className="font-size-18 color-red">
                        ￥
                            {
                                parseInt(this.state.specGoodsDetail.totalPrice)+
                                parseInt(this.state.postageAndTaxes.postage)+
                                parseInt(this.state.postageAndTaxes.taxes)
                            }
                            <small>
                                {
                                    this.getnum(
                                        parseInt(this.state.specGoodsDetail.totalPrice)+
                                        parseInt(this.state.postageAndTaxes.postage)+
                                        parseInt(this.state.postageAndTaxes.taxes)+''
                                    )
                                }
                            </small>
                        </h5>
                    </div>
                    <a className="btn-pay" onClick={this.pay.bind(this)}>支付</a>
                </div>

                {/*支付弹出层*/}
                <div className={this.state.isPay?'mui-bar-backdrop mui-backdrop mui-active':'mui-bar-backdrop mui-backdrop display-none'}
                     style={{width:'100%',borderRadius:0,zIndex:999}}>
                    <div className="type-pay-content">
                        <div className="mui-card">
                            <ul className="mui-table-view">
                                <li className="mui-table-view-cell">
                                    <a onClick={this.handClick.bind(this,-1)}>
                                        <span className="pay-icon zhifubao"></span>支付宝支付
                                    </a>
                                </li>
                                <li className="mui-table-view-cell">
                                    <a onClick={this.handClick.bind(this,1)}>
                                        <span className="pay-icon weixin weixin-pay"></span>微信支付
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div onClick={this.cancel.bind(this)} className="mui-btn-block cancel padding-10">
                            取消
                        </div>
                    </div>
                </div>
                <div className={this.state.isPay?'mui-backdrop mui-active':''}></div>

                <div className="totost" id="addCard">
                    <p className="">你还未登录,请登录</p>
                </div>

            </div>
		)
	}

	componentDidMount() {

		if(localStorage['id'] == undefined || localStorage['id'] == null) {
			var isLoading = false;
			self.setState({
				message: '你还未登录，请登录'
			});
			document.getElementById('addCard').style.display = 'block';
			setTimeout(function() {
				document.getElementById('addCard').style.display = 'none';
				isLoading = true
			}, 2000)

			var timer = setInterval(function() {
				if(isLoading) {
					clearInterval(timer);
					hashHistory.push({
						pathname: '/Login'
					});
				}
			}, 100);
		}

		this.personInfor(localStorage['id'])
		this.defaultAddress(localStorage['id'])
		this.getGoodsList();
	}

	//获取个人信息
	personInfor(accountId) {
		var self = this;
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/custDetails",
			async: true,
			data: {
				custId: accountId
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},

			success: function(data, textStatus) {

				if(data.code == 1) {

					if(data.data != null) {
						self.setState({
							personData: data.data
						})
						return true;
					}
				}
			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}

		})
	}

	//默认地址
	defaultAddress(accountId) {
		var self = this;
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/queryDefaultAddress",
			async: true,
			data: {
				custId: accountId
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},

			success: function(response, textStatus) {
				console.log(response, 'response')
				if(response.code == 1) {
					if(response.data != null) {
						self.setState({
							defaultAddress: response.data
						})
					}
				}
			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}

		})
	}

	//渲染商品
	getGoodsList() {
		if(this.state.queryObj.type != null && this.state.queryObj.type == -1) {
			this.orderCheck()
			return true;
		}

		this.goodsDetailBySpceId();
		this.queryTaxesAndPostage()
	}

	//获取商品信息
	goodsDetailBySpceId() {
		var self = this;
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/goodsDetailBySpceId",
			async: true,
			data: {
				spceId: self.state.queryObj.specId
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},

			success: function(data, textStatus) {

				if(data.code == 1) {

					if(data.data != null) {

						data.data.totalPrice = parseInt(self.state.queryObj.goodsNumber) *
							parseInt(data.data.referencePirce);
						data.data.totalNumber = self.state.queryObj.goodsNumber

						self.setState({
							specGoodsDetail: data.data
						})
						return true;
					}
				}
			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}

		})
	}

	//购物车点击进入订单核对页
	orderCheck() {
		var self = this;

		var idArray = new Array();
		for(var i = 0; i < this.state.queryObj.shopCarIds.length; i++) {
			idArray.push(this.state.queryObj.shopCarIds[i].id)
		}
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/orderCheck",
			async: true,
			data: {
				shopCarIds: idArray.join(',')
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},

			success: function(data, textStatus) {

				if(data.code == 1) {

					if(data.data != null) {
						var totalPrice = 0;
						var totalNumber = 0;
						var postTaxes = new Object();
						for(var i = 0; i < data.data.order.length; i++) {

							totalPrice += parseInt(data.data.order[i].goodsPrice);
							totalNumber += parseInt(data.data.order[i].goodsCcount)
						}

						data.data.totalPrice = totalPrice;
						data.data.totalNumber = totalNumber;
						postTaxes.postage = data.data.postage;
						postTaxes.taxes = data.data.taxes;

						if(data.data.order.length > 2) {
							var newArray = data.data.order.slice(0, 2)
							data.data.order = newArray;
							self.setState({
								specGoodsDetail: data.data,
								isShow: true,
								over: data.data.order.length - 2,
								postageAndTaxes: postTaxes
							}, () => {
								console.log(self.state.postageAndTaxes + '////')
							})
						} else {
							self.setState({
								specGoodsDetail: data.data,
								postageAndTaxes: postTaxes
							})
						}
					}
				}
			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}

		})
	}

	//查询邮费税费
	queryTaxesAndPostage() {
		var self = this;
		var Alist = new Array();

		var params = new Object()
		params.id = this.state.queryObj.specId;
		params.number = parseInt(this.state.queryObj.goodsNumber);

		Alist.push(params)

		var self = this;
		$.ajax({
			url: "http://116.62.119.165/shop-portal/shopcar/queryTaxesAndPostage",
			type: "POST",
			contentType: 'application/json;charset=utf-8',
			dataType: "json",
			async: false,
			data: JSON.stringify(Alist),
			beforeSend() {

			},
			complete: function() {},
			success: function(data) {
				self.setState({
					postageAndTaxes: data
				})
			}
		});
	}

	getnum(float) {
		var array = float.split('.', 2)
		if(array.length == 1) {
			return '.00';
		}
		return array[array.length - 1]
	}

	isMore() {
		this.state.isUp = !this.state.isUp
		this.setState({
			isUp: this.state.isUp
		}, () => {
			this.trigger(this.state.isUp)
		})
	}

	trigger(boolean) {

		var self = this;
		var idArray = new Array();
		for(var i = 0; i < this.state.queryObj.shopCarIds.length; i++) {
			idArray.push(this.state.queryObj.shopCarIds[i].id)
		}

		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/orderCheck",
			async: true,
			data: {
				shopCarIds: idArray.join(',')
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},

			success: function(data, textStatus) {

				if(data.code == 1) {

					if(data.data != null) {
						var totalPrice = 0;
						var totalNumber = 0
						for(var i = 0; i < data.data.order.length; i++) {

							totalPrice += parseInt(data.data.order[i].goodsPrice);
							totalNumber += parseInt(data.data.order[i].goodsCcount)
						}

						data.data.totalPrice = totalPrice;
						data.data.totalNumber = totalNumber;

						if(boolean) {
							var newArray = data.data.order.slice(0, 2)
							data.data.order = newArray;
							self.setState({
								specGoodsDetail: data.data
							})
						} else {
							self.setState({
								specGoodsDetail: data.data
							})
						}
					}
				}
			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}

		})
	}

	pay() {
		this.setState({
			isPay: true
		})
	}
	cancel() {
		this.setState({
			isPay: false
		})
	}
	handClick(type) {

		var self = this;
		var shopCarIdsArray = new Array();
		var object = new Object();
		//购物车支付宝结算
		if(this.state.queryObj.type == -1 && type == -1) {
			var shopCarIds = this.state.queryObj.shopCarIds
			for(var i = 0; i < shopCarIds.length; i++) {
				shopCarIdsArray.push(shopCarIds[i].id)
			}
			object.shopCarIds = shopCarIdsArray.join(',')
			object.custId = localStorage['id'],
				object.addressId = this.state.defaultAddress.id,

				this.saveOrder(object, 1)
		} else {

			object.custId = localStorage['id'],
				object.addressId = this.state.defaultAddress.id,
				object.spceId = this.state.queryObj.specId,
				object.goodsNumber = this.state.queryObj.goodsNumber,

				this.saveOrder(object, -1)
		}

	}

	saveOrder(obj, type) {
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/orderSave",
			async: true,
			data: obj,
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},

			success: function(data, textStatus) {
				if(type == 1) {
					if(data.code == 1) {
						window.location.href = 'http://116.62.119.165/shop-portal/alipay/mobilePay?orderId=' + data.data
					}
				} else {
					if(data.code == 1) {
						$.ajax({
							type: "get",
							url: "http://116.62.119.165//weixin/wxAppH5pay?orderId="+ data.data,
							async: true,
							dataType: 'json',
							success: function(data) {
								window.location.href = data;
							},
							complete:function(data){
								window.location.href = data.responseText;
							}
						})
//						window.location.href = 'http://116.62.119.165//weixin/wxAppH5pay?orderId=' + data.data
					}
				}

			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}

		})
	}
}