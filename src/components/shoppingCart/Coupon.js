/**
 * Created by zhangHeng on 17/7/5.
 */

import React from 'react';
import { hashHistory } from 'react-router'
import Header from './../../components/tab/Header'

export default class Coupon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.location.state,
			cuponData: {}
		}
	}

	_render1() {

		if(this.state.cuponData.reductionMail != null) {
			return this.state.cuponData.reductionMail.map((item, index) => {
				return(
					<a className="background-postGreen" key={index}>
                        <p className="coupon-type">减邮</p>
                        <h1><span className="font-size-14">￥</span>{item.reducePrice}</h1>
                        <h5>单笔满{item.priceLimit}使用，不可叠加使用</h5>
                        <h5>有效期：{this.timeFormate(item.expireTime)}</h5>
                        <label className="select-cupon mui-input-row mui-checkbox">
                            <input style={{left:0}} type="checkbox" onChange={this.handChange1.bind(this,item,index)}
                            checked={item.checked} />
                        </label>
                    </a>
				)
			})
		} else {
			return null
		}

	}

	_render2() {

		if(this.state.cuponData.discount != null) {
			return this.state.cuponData.discount.map((item, index) => {
				return(
					<a className="background-cyan" key={index}>
                        <p className="coupon-type">折扣</p>
                        <h1><span className="font-size-14">￥</span>{item.reducePrice}</h1>
                        <h5>单笔满{item.priceLimit}使用，不可叠加使用</h5>
                        <h5>有效期：{this.timeFormate(item.expireTime)}</h5>
                        <label className="select-cupon mui-input-row mui-checkbox">
                            <input type="checkbox" style={{left:0}} onChange={this.handChange2.bind(this,item,index)}
                                                   checked={item.checked}/>
                        </label>
                    </a>
				)
			})
		} else {
			return null
		}

	}

	_render3() {

		if(this.state.cuponData.taxReduction != null) {
			return this.state.cuponData.taxReduction.map((item, index) => {
				return(
					<a className="background-purple" key={index}>
                        <p className="coupon-type">减税</p>
                        <h1><span className="font-size-14">￥</span>{item.reducePrice}</h1>
                        <h5>单笔满{item.priceLimit}使用，不可叠加使用</h5>
                        <h5>有效期：{this.timeFormate(item.expireTime)}</h5>
                        <label className="select-cupon mui-input-row mui-checkbox">
                            <input type="checkbox" style={{left:0}} onChange={this.handChange3.bind(this,item,index)}
                                                   checked={item.checked}/>
                        </label>
                    </a>
				)
			})
		} else {
			return null
		}

	}

	_render4() {

		if(this.state.cuponData.moneyOff != null) {
			return this.state.cuponData.moneyOff.map((item, index) => {
				return(
					<a className="background-red" key={index}>
                        <p className="coupon-type">满减</p>
                        <h1><span className="font-size-14">￥</span>{item.reducePrice}</h1>
                        <h5>单笔满{item.priceLimit}使用，不可叠加使用</h5>
                        <h5>有效期：{this.timeFormate(item.expireTime)}</h5>
                        <label className="select-cupon mui-input-row mui-checkbox">
                            <input type="checkbox" style={{left:0}} onChange={this.handChange4.bind(this,item,index)}
                                                   checked={item.checked}/>
                        </label>
                    </a>
				)
			})
		} else {
			return null
		}

	}
	_render5() {

		if(this.state.cuponData.frist != null) {
			return this.state.cuponData.frist.map((item, index) => {
				return(
					<a className="background-orange" key={index}>
                        <p className="coupon-type">满减</p>
                        <h1><span className="font-size-14">￥</span>{item.reducePrice}</h1>
                        <h5>单笔满{item.priceLimit}使用，不可叠加使用</h5>
                        <h5>有效期：{this.timeFormate(item.expireTime)}</h5>
                        <label className="select-cupon mui-input-row mui-checkbox">
                            <input type="checkbox" style={{left:0}} onChange={this.handChange5.bind(this,item,index)}
                                                   checked={item.checked}/>
                        </label>
                    </a>
				)
			})
		} else {
			return null
		}

	}
	render() {
		return(
			<div>
				<header className="mui-bar mui-bar-nav">
                <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
                    onClick={this.handClick.bind(this)}>
                </a>
                <h1 className="mui-title">选择优惠券</h1>
            	</header>
                <div className="use-coupon mui-content">

                    {
                        this._render1()

                    }
                    {
                        this._render2()

                    }
                    {
                        this._render3()

                    }
                    {
                        this._render4()

                    }
                    {
                        this._render5()

                    }
                </div>
            </div>
		)
	}

	componentDidMount() {
		//获取优惠券

		//console.log(JSON.stringify(this.state.data))

		var array = new Array();
		if(this.state.data.type == -1) {
			for(var i = 0; i < this.state.data.shopCarIds.length; i++) {

				var object = new Object();
				object.id = this.state.data.shopCarIds[i].specId;
				object.number = this.state.data.shopCarIds[i].number;
				object.custId = localStorage['id'];

				array.push(object)
			}
		} else {

			var object = new Object();
			object.id = this.state.data.specId;
			object.number = this.state.data.goodsNumber;
			object.custId = localStorage['id'];

			array.push(object)
		}

		this.getCoupon(array)

	}

	getCoupon(array) {
		var self = this;
		$.ajax({
			url: "http://116.62.119.165/shop-portal/shopcar/queryCouponByOrder",
			type: "POST",
			contentType: 'application/json;charset=utf-8',
			dataType: "json",
			async: false,
			data: JSON.stringify(array),
			beforeSend: function(XMLHttpRequest) {},

			success: function(data, textStatus) {
				if(data.reductionMail.length != 0) {
					for(var i = 0; i < data.reductionMail.length; i++) {
						data.reductionMail[i].checked = false
					}
				}

				if(data.discount.length != 0) {
					for(var i = 0; i < data.discount.length; i++) {
						data.discount[i].checked = false
					}
				}

				if(data.taxReduction.length != 0) {
					for(var i = 0; i < data.taxReduction.length; i++) {
						data.taxReduction[i].checked = false
					}
				}

				if(data.moneyOff.length != 0) {
					for(var i = 0; i < data.moneyOff.length; i++) {
						data.moneyOff[i].checked = false
					}
				}
				if(data.frist.length != 0) {
					for(var i = 0; i < data.frist.length; i++) {
						data.frist[i].checked = false
					}
				}
				self.setState({
					cuponData: data
				}, () => {})
			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}

		})
	}

	timeFormate(time) {
		var year = new Date(time).getFullYear();
		var month = new Date(time).getMonth() + 1;
		var date = new Date(time).getDate()

		return year + "-" + month + "-" + date;
	}

	handClick() {
		var array = [];
		this.state.cuponData.discount.forEach(function(r) {
			if(r.checked == true)
				array.push(r.id)
		});
		this.state.cuponData.reductionMail.forEach(function(r) {
			if(r.checked == true)
				array.push(r.id)
		});
		this.state.cuponData.taxReduction.forEach(function(r) {
			if(r.checked == true)
				array.push(r.id)
		});
		this.state.cuponData.moneyOff.forEach(function(r) {
			if(r.checked == true)
				array.push(r.id)
		});
		this.state.cuponData.frist.forEach(function(r) {
			if(r.checked == true)
				array.push(r.id)
		});
		hashHistory.push({
			pathname: '/CardIndex',
			state: this.props.location.state,
			query:array
		});
	}
	handChange1(object, index) {
		var _object = this.state.cuponData.reductionMail;
		var checked = _object[index].checked;
		this.handChange(object, index);
		_object[index].checked = !checked;
		this.setState({
			cuponData: this.state.cuponData
		})
	}
	handChange2(object, index) {
		var _object = this.state.cuponData.discount;
		var checked = _object[index].checked;
		this.handChange(object, index);
		_object[index].checked = !checked;
		this.setState({
			cuponData: this.state.cuponData
		})
	}
	handChange3(object, index) {
		var _object = this.state.cuponData.taxReduction;
		var checked = _object[index].checked;
		this.handChange(object, index);
		_object[index].checked = !checked;
		this.setState({
			cuponData: this.state.cuponData
		})
	}
	handChange4(object, index) {
		var _object = this.state.cuponData.moneyOff;
		var checked = _object[index].checked;
		this.handChange(object, index);
		_object[index].checked = !checked;
		this.setState({
			cuponData: this.state.cuponData
		})
	}
	handChange5(object, index) {
		var _object = this.state.cuponData.frist;
		var checked = _object[index].checked;
		this.handChange(object, index);
		_object[index].checked = !checked;
		this.setState({
			cuponData: this.state.cuponData
		})
	}
	handChange(object, index) {
		var _discount = this.state.cuponData.discount;
		var _reductionMail = this.state.cuponData.reductionMail;
		var _taxReduction = this.state.cuponData.taxReduction;
		var _moneyOff = this.state.cuponData.moneyOff;
		var _frist = this.state.cuponData.frist;
		_discount.forEach(function(r) {
			if(r.couponType == object.couponType)
				r.checked = false
		});
		_reductionMail.forEach(function(r) {
			if(r.couponType == object.couponType)
				r.checked = false
		});
		_taxReduction.forEach(function(r) {
			if(r.couponType == object.couponType)
				r.checked = false
		});
		_moneyOff.forEach(function(r) {
			if(r.couponType == object.couponType)
				r.checked = false
		});
		_frist.forEach(function(r) {
			if(r.couponType == object.couponType)
				r.checked = false
		});
	}
}