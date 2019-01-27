/*
 * Created by zhangHeng on 17/6/20.
 * 产品详情
 */
import React from 'react'
import Carousel from 'react-zkcarousel';
import { Link, hashHistory } from 'react-router'
import TabController from '../tab/TabController'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll'
import { Icon, Grid } from 'antd-mobile';
export default class ProductDetails extends React.Component {
	getInitialState() {
		return {
			isOpenPostageRule: false,
			isOpenExpensesRule: false
		}
	}
	constructor(props) {
		super(props)
		this.state = {
			goodsId: this.props.params.id,
			//			custId:this.props.location.query.accountId,
			spceId: this.props.location.query.spceId,
			detailDate: {},
			detailImg: [],
			bannerImg: [],
			goodsGroup: [],
			comment: {},
			replay: [],
			isShow: false,
			spec: [],
			goodsNumber: 1,
			message: '',
			// currentPage: 1,
			// lastPage: false,
			list: [],
			currentPage: 1,
			lastPage: false,
		}
		this.argObj = {}
	}
	_render() {
		if(this.state.bannerImg.length != 0) {
			return(
				<div className="height-auto">
                    <Carousel data={this.state.bannerImg} autoplay  dots click={this.handleItemClick.bind(this)}/>
                </div>
			);
		} else {
			return null
		}
	}

	_renderImg() {
		if(this.state.bannerImg.length != 0) {
			return(
				<img src={this.state.bannerImg[0].src}/>
			);
		} else {
			return null
		}
	}

	_renderReplay() {
		if(this.state.list.length != 0) {
			return this.state.list.map((item, index) => {

				var strTime = new Date(item.parent.insertTime).toLocaleDateString()

				return(
					<li className="mui-table-view-cell conment-content-item" key={index}>
                       <a href="javascript:;">
                           <img className="mui-media-object mui-pull-left" src={require('../../images/qq.png')}/>
                           <div className="mui-media-body">
                               {item.parent.custName}
                               <p className="mui-ellipsis">
                                   {strTime}
                               </p>
                           </div>
                       </a>
                       <p className="comment-content">
                           {item.parent.wordContext}
                       </p>
                       {
                           item.secondary.map((repalyItem,repalyIndex)=>{
                               var isReplay=repalyItem.wordType=='920002'?
                               <p className="comment-content-replay" key={repalyIndex}>
                                   <a className="reply-content-up"></a>
                                   <a>{repalyItem.custName}:</a>
                                   {repalyItem.wordContext}
                               </p>:<p className="add-reply" key={repalyIndex}>追加评论:{repalyItem.wordContext}</p>

                               return isReplay
                           })
                       }
                   </li>
				)
			})
		} else {
			return(<li className="mui-text-center">暂无数据</li>);
		}
	}

	//加载更多计算分页页数
	handleRefresh(downOrUp, callback) {
		let {
			currentPage,
			lastPage
		} = this.state;
		if(downOrUp === 'up') { // 加载更多

			alert('刷新')
			if(currentPage === 5) {
				lastPage = true;
			} else {
				currentPage++;
			}
		} else { // 刷新
			lastPage = false;
			currentPage = 1;
		}
		this.setState({
			currentPage,
			lastPage
		}, () => {
			this.loadData(downOrUp, callback);
		});
	}

	render() {

		const {
			list
		} = this.state;
		let lis = [];
		this.state.list.length == 0 ? lis.push() :
			this.state.list.map((item, index) => {

				var strTime = new Date(item.parent.insertTime).toLocaleDateString()

				lis.push(
					<li className="mui-table-view-cell conment-content-item" key={index}>
                        <a href="javascript:;">
                            <img className="mui-media-object mui-pull-left" src={require('../../images/qq.png')}/>
                            <div className="mui-media-body">
                                {item.parent.custName}
                                <p className="mui-ellipsis">
                                    {strTime}
                                </p>
                            </div>
                        </a>
                        <p className="comment-content">
                            {item.parent.wordContext}
                        </p>
                        {
                            item.secondary.map((repalyItem,repalyIndex)=>{
                                var isReplay=repalyItem.wordType=='920002'?
                                    <p className="comment-content-replay" key={repalyIndex}>
                                        <a className="reply-content-up"></a>
                                        <a>{repalyItem.custName}:</a>
                                        {repalyItem.wordContext}
                                    </p>:<p className="add-reply" key={repalyIndex}>追加评论:{repalyItem.wordContext}</p>

                                return isReplay
                            })
                        }
                    </li>
				);
			})
		return(
			<div className="margin-bottom-44 fixed-top-44">
                <TabController>
                    <div name="商品详情" className="background-qianhui">
                        <ul className="mui-table-view background-white">
                            <li>
                                {
                                    this._render()
                                }
                            </li>
                            <li className="mui-table-view-cell">
                                <h5 className="font-size-16 color-block">
                                    {this.state.detailDate.goodsName}
                                </h5>
                                <h5>
                                    <span className="margin-right-10 font-size-16 color-red">价格</span>
                                    <span className="font-size-16 color-red margin-right-10">
                                        ￥{this.state.detailDate.spcePirce}
                                        <small>.00</small>
                                    </span>
                                </h5>
                                    <h5>
                                        <span className="margin-right-10 font-size-12">参考价</span>
                                        <span className="font-size-14">
                                            ￥{this.state.detailDate.referencePirce}<small>.00</small>
                                        </span>
                                    </h5>
                                <div>
                                        <span className="font-size-16">
                                            发货地：{this.state.detailDate.sendPlace}
                                        </span>
                                    <p className="mui-pull-right">
                                        <span className="margin-right-10 index-icon icon-share width-auto">分享</span>
                                        <span className="index-icon width-auto"
                                              onClick={this.queryCollectGoods.bind(this)}>收藏商品</span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <ul className="mui-table-view margin-top-10 border-bottom-postion">
                            <li className="mui-table-view-cell mui-collapse">
                                <a className={this.state.isOpenExpensesRule?'mui-navigate-right active':'mui-navigate-right'}>
                                    税费(小渡已为你承担税费)
                                    <span className="font-size-12 mui-pull-right margin-right-12" onClick={this.lookRule.bind(this,0)}>税费计算规则</span>
                                </a>
                            </li>
                            <li className={this.state.isOpenExpensesRule?'active mui-table-view-cell mui-collapse':'mui-table-view-cell mui-collapse display-none'}>
                                根据跨境综合税相关规定，此商品保税综合税率约为11.9% 。小渡将会在结算时为您自动计算税费，包税商品不计在内。
                                <p className="color-red">注：不同商品的适用税负率不同，了解税率</p>
                            </li>
                            <li className="mui-table-view-cell mui-collapse">
                                <a className={this.state.isOpenPostageRule?'mui-navigate-right active':'mui-navigate-right'}>
                                    邮费(小渡已为你承担邮费)
                                    <span className="font-size-12 mui-pull-right margin-right-12" onClick={this.lookRule.bind(this,1)}>邮费计算规则</span>
                                </a>
                            </li>
                            <li className={this.state.isOpenPostageRule==true?'active mui-table-view-cell mui-collapse':'mui-table-view-cell mui-collapse display-none'}>
                                单个包裹5元 ，包邮商品不计算邮费，小渡将会在结算时为您自动计算邮费。
                                <p className="color-red">注：不同商品的适用税负率不同，了解税率</p>
                            </li>
                        </ul>

                        <ul className="mui-table-view margin-top-10 border-bottom-postion">
                            <li className="mui-table-view-cell">产品参数</li>
                            <li className="mui-table-view-cell">
                                <p>
                                    品名：{this.state.detailDate.goodsName}
                                </p>
                                <p>
                                    规格：{this.state.detailDate.spceName}
                                </p>
                                <p>
                                    保质期：{this.state.detailDate.qpgDate}
                                </p>
                                <p>
                                    原产地：{this.state.detailDate.generatePlace}
                                </p>
                                <p>
                                    适用人群：{this.state.detailDate.applyPeople}
                                </p>
                            </li>
                        </ul>
                        <ul className="mui-table-view margin-top-10 border-bottom-postion">
                            <li className="mui-table-view-cell">使用方法</li>
                            <li className="mui-table-view-cell">
                                <p>{this.state.detailDate.useMethod}</p>
                            </li>
                        </ul>
                        <ul className="mui-table-view margin-top-10 border-bottom-postion">
                            <li className="mui-table-view-cell">图文详情</li>
                            {
                                this.state.detailImg.map((item)=>{
                                    return (<li key={item.itemKey}><img src={item.src}/></li>)
                                })
                            }
                        </ul>
                    </div>
                    <div name="商品口碑">

                        <div className="position-relative">
                            <div style={{paddingTop:13}}>
                                <button className="moment-targ">
                                    强推<span className="color-red">{'('+this.state.comment.strongPush+')'}</span>
                                </button>
                                <button className="moment-targ">
                                    推荐<span className="color-red">{'('+this.state.comment.ordinary+')'}</span>
                                </button>
                                <button className="moment-targ">
                                    一般<span className="color-red">{'('+this.state.comment.recommend+')'}</span>
                                </button>
                                <button className="moment-targ">
                                    不推荐<span className="color-red">{'('+this.state.comment.notRecommend+')'}</span>
                                </button>
                                <button className="moment-targ">
                                    有图<span className="color-red">{'('+this.state.comment.havaPicture+')'}</span>
                                </button>
                            </div>
                            <div className="position-relative">
                                {lis}
                            </div>
                        </div>
                    </div>
                    <div name="小渡百科" className="background-qianhui">
                        <div className="baike-xiaodu">
                            <h4  className="mui-text-center">营养成分</h4>
                            <div dangerouslySetInnerHTML={{__html: this.state.detailDate.goodNutritionalComposition}} />
                        </div>
                    </div>
                </TabController>
                <nav className="mui-bar mui-bar-tab">
                    <Link className="mui-tab-item width-2"  to={{pathname:'/Cart',query:{accountId:localStorage['id']}}}>
                        <img className="nav-img" src={require('../../images/icon/shopping.png')} />
                    </Link>
                    <a className="mui-tab-item right-now-by" onClick={this.handClick.bind(this,1)}>
                        立即购买
                    </a>
                    <Link className="mui-tab-item add-to-card" onClick={this.handClick.bind(this,-1)}>
                        加入购物车
                    </Link>
                    <Link className="mui-tab-item width-2">
                        <img className="nav-img" src={require('../../images/icon/service.png')}/>
                    </Link>
                </nav>

               <div className={this.state.isShow?'mui-backdrop mui-active':'mui-backdrop display-none'}
                     style={{width:'100%',borderRadius:0,zIndex:999}} onClick={this.closePuop.bind(this)}>
                </div>

                <div className={this.state.isShow?'mui-backdrop mui-active':'mui-backdrop display-none'}
                     style={{width:'100%',borderRadius:0,zIndex:1000,height:'63%',top:'37%'}} >
                    <ul className="mui-table-view popover-position">
                        <li style={{textAlign:"right",padding:10}}>
                            <span onClick={this.closePuop.bind(this)}><Icon type="cross-circle" /></span>
                        </li>
                        <li className="mui-table-view-cell">
                            <div className="mui-pull-left goods-img-left">
                                {this._renderImg()}
                            </div>
                            <div className="goods-content-right mui-pull-left">
                                <h5 className="mui-ellipsis-2 font-size-16 color-block">
                                    {this.state.detailDate.goodsName}
                                </h5>
                                <h5 className="">
                                    <span className="color-red font-size-16">
                                        {this.state.detailDate.spcePirce}
                                        <small>.00</small>
                                    </span>
                                    <span className="padding-left-10">
                                        {this.state.detailDate.referencePirce}
                                        <small>.00</small>
                                    </span>
                                    <span className="color-block padding-left-10">发货地：{this.state.detailDate.sendPlace}</span>
                                </h5>
                            </div>
                        </li>
                        <li className="mui-table-view-cell">
                            <label className="mui-pull-left buy-number line-height-35">购买数量</label>
                            <div className="padding-left-10">
                                <div className="mui-numbox">
                                    <button className="mui-btn mui-btn-numbox-minus" type="button"
                                                onClick={this.setGoodsNumber.bind(this,-1)}>-</button>
                                    <input className="mui-input-numbox" type="number" value={this.state.goodsNumber}/>
                                    <button className="mui-btn mui-btn-numbox-plus" type="button"
                                                onClick={this.setGoodsNumber.bind(this,1)}>+</button>
                                </div>
                            </div>
                        </li>
                        <li className="mui-table-view-cell">
                            <label className="mui-pull-left buy-number">规格</label>
                            <label className="padding-left-10">
                                {
                                    this.state.spec.map((item,index)=>{
                                        return (
                                            <div className="mui-radio spec-radio" key={index}>
                                                <label>{item.spceName}</label>
                                                <input name="specId" type="radio" value={item.id}
                                                       defaultChecked={index==0?true:false}
                                                       onClick={this.getSpecId.bind(this)}/>
                                            </div>
                                        )
                                    })
                                }
                            </label>
                        </li>
                        <li className="mui-table-view-cell">
                            <label className="send-time">配送时间</label>
                            <p>
                                澳洲：7-15天  美国：10-20天 香港：5-10天，如遇国内外节假日及海关查验，发货或到货时间会相应
                                顺延或增加，请耐心等待，商品详细信息请到商品详情页查看
                            </p>
                        </li>
                        <li className="padding-10 mar">
                            <Link className="mui-btn mui-btn-block mui-btn-danger padding-10 margin-bottom-0"
                              onClick={this.jumpNextLink.bind(this)}>确定</Link>
                        </li>
                    </ul>
                </div>
               




                <div className="totost" id="addCard">
                    <p className="">{this.state.message}</p>
                </div>
            </div>
		)
	}

	componentDidMount() {
//		(function() {
//			var c = document.createElement('script');
//			c.src = '//kefu.qycn.com/vclient/?webid=133743';
//			var s = document.getElementsByTagName('script')[0];
//			s.parentNode.insertBefore(c, s);
//		})();
		this.getDetails(this.state.goodsId);
		this.commentList(this.state.goodsId)
		this.reply(this.state.goodsId);
		this.loadData(this.state.goodsId);
	}
	//获取详情
	getDetails(id) {
		var self = this;
		var data = {goodsId: id}
		if(this.state.spceId){
			data.goodsSpceId = this.state.spceId;
		}
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/goodsDetail",
			async: true,
			data: data,
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},
			success: function(data, textStatus) {
				if(data.code == 1) {

					var detailObj = new Object();

					if(data.data.spec.length != 0) {
						detailObj.spcePirce = data.data.spec[0].spcePirce;
						detailObj.referencePirce = data.data.spec[0].referencePirce
						//默认规格
						self.argObj.specId = data.data.spec[0].id

						detailObj.weight = data.data.spec[0].weight

						detailObj.spceName = data.data.spec[0].spceName
					}

					detailObj.goodsName = data.data.goodsName
					detailObj.sendPlace = data.data.sendPlace

					detailObj.qpgDate = data.data.qpgDate

					detailObj.generatePlace = data.data.generatePlace
					detailObj.applyPeople = data.data.applyPeople
					detailObj.useMethod = data.data.useMethod
					detailObj.goodNutritionalComposition = data.data.goodNutritionalComposition
					detailObj.goodBrandIntroduction = data.data.goodBrandIntroduction

					if(data.data.detailImgUrl.length != 0) {
						var detailsImgArray = []
						for(var i = 0; i < data.data.detailImgUrl.length; i++) {
							var imgObj = new Object();
							imgObj.src = 'http://116.62.119.165/fileServer/images/' + data.data.detailImgUrl[i];
							imgObj.itemKey = i + 'i'
							detailsImgArray.push(imgObj)
						}
					}

					if(data.data.goodsImgUrl.length != 0) {
						var goodsImgArray = []
						for(var i = 0; i < data.data.goodsImgUrl.length; i++) {
							var imgObj = new Object();
							imgObj.src = 'http://116.62.119.165/fileServer/images/' + data.data.goodsImgUrl[i];
							imgObj.id = i
							imgObj.href = 'http://116.62.119.165/fileServer/images/'
							goodsImgArray.push(imgObj)
						}
					}

					self.setState({
						detailImg: detailsImgArray,
						detailDate: detailObj,
						bannerImg: goodsImgArray,
						spec: data.data.spec
					}, () => {})
				}
			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}
		});
	}

	//评论列表
	commentList(id) {
		var self = this;
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/praiseNum",
			async: true,
			data: {
				goodsId: id
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},

			success: function(data, textStatus) {

				if(data.code == 1) {

					if(data.data.length != 0) {
						self.setState({
							comment: data.data
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

	//评论内容
	reply(id) {
		var self = this;
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/publicPraise",
			async: true,
			data: {
				goodsId: id,
				page: 1,
				limit: 5,
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo

			},

			success: function(data, textStatus) {

				if(data.code == 1) {

					if(data.data.length != 0) {

						var replayArray = [];

						for(var i = 0; i < data.data.length; i++) {
							replayArray.push(data.data[i])
						}

						self.setState({
							replay: data.data
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

	//
	handleItemClick() {
		console.log('init')
	}

	//点击立即购买
	handClick(type) {

		//判断是否登录
		if(localStorage['id'] == undefined || localStorage['id'] == null) {
			var isLoading = false;
			this.setState({
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

			return;
		}

		this.setState({
			isShow: true
		});
		this.argObj.type = type;
	}

	//设置商品数量
	setGoodsNumber(type) {
		var defaultNumber = this.state.goodsNumber
		if(type == -1) {
			if(defaultNumber == 0) {
				this.setState({
					goodsNumber: defaultNumber
				})
				return
			}
			defaultNumber--;
			this.setState({
				goodsNumber: defaultNumber
			})
		} else {
			defaultNumber++;
			this.setState({
				goodsNumber: defaultNumber
			})
		}
	}

	//构造参数
	getSpecId(event) {
		this.argObj[event.target.name] = event.target.value;
		this.argObj['accountId'] = localStorage['id'];
	}

	jumpNextLink() {

		//检查是否登录

		if(this.state.goodsNumber == 0) {
			alert('商品数量不能为零');
			return false
		}
		if(this.argObj.specId == null) {
			alert('请选择商品规格');
			return false
		}

		this.argObj.goodsNumber = this.state.goodsNumber

		if(this.argObj.type == 1) {
			hashHistory.push({
				pathname: '/CardIndex',
				state: this.argObj
			})
		} else {
			this.addShopCar(this.argObj)
		}
	}

	addShopCar(obj) {
		var self = this;
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/addShopCar",
			async: true,
			data: {
				specId: obj.specId,
				num: obj.goodsNumber,
				custId: localStorage['id']
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},

			success: function(data, textStatus) {
				if(data.code == 1) {
					self.setState({
						isShow: false,
						message: '添加购物车成功'
					});
					document.getElementById('addCard').style.display = 'block';
					setTimeout(function() {
						document.getElementById('addCard').style.display = 'none'
					}, 2000)
				}
			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}

		})
	}

	//是否收藏
	queryCollectGoods() {
		// console.log(localStorage['id']+'///'+this.state.goodsId)
		var self = this;
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/queryCollectGoods",
			async: true,
			data: {
				goodsId: self.state.goodsId,
				custId: localStorage['id'],
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},

			success: function(data, textStatus) {
				if(data.code == 1) {
					if(data.data != null) {
						self.deleteCollect(data.data.id)
						return;
					}
					self.collection()
				}
			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}

		})
	}

	//收藏
	collection() {
		var self = this;
		debugger
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/mineAddCollect",
			async: true,
			data: {
				custId: localStorage['id'],
				goodsId: self.state.goodsId
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},

			success: function(data, textStatus) {
				if(data.code == 1) {
					self.setState({
						message: '收藏成功'
					});
					document.getElementById('addCard').style.display = 'block';
					setTimeout(function() {
						document.getElementById('addCard').style.display = 'none'
					}, 2000)
				}
			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}

		})
	}

	//取消收藏
	deleteCollect(collectionId) {
		var self = this;
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/deleteCollectById",
			async: true,
			data: {
				id: collectionId
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},

			success: function(data, textStatus) {
				if(data.code == 1) {
					self.setState({
						message: '取消成功'
					});
					document.getElementById('addCard').style.display = 'block';
					setTimeout(function() {
						document.getElementById('addCard').style.display = 'none'
					}, 2000)
				}
			},

			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() {

			}

		})
	}

	//点击查看邮费税费计算规则
	lookRule(type) {
		if(type == 1) {
			this.state.isOpenPostageRule = !this.state.isOpenPostageRule
			this.setState({
				isOpenPostageRule: this.state.isOpenPostageRule
			})
			return;
		}

		this.state.isOpenExpensesRule = !this.state.isOpenExpensesRule
		this.setState({
			isOpenExpensesRule: this.state.isOpenExpensesRule
		})

	}

	loadData(goodsId, downOrUp, callback) {
		const currentPage = this.state.currentPage;
		var _this = this;
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/publicPraise",
			async: true,
			data: {
				goodsId: goodsId,
				page: currentPage,
				limit: 20,
			},
			dataType: 'json',

			beforeSend: () => {
				//todo
			},
			success: (response) => {
				setTimeout(() => {
					const {
						list
					} = this.state;
					this.setState({
						list: downOrUp === 'up' ? _this.state.list.concat(response.data) : response.data
					}, () => {});
					if(callback && typeof callback === 'function') {
						callback();
					}
				}, 1000)
			},
			error: () => {
				if(callback && typeof callback === 'function') {
					callback();
				}
			}
		})

	}

	closePuop() {
		this.setState({
			isShow: false
		})
	}

}

ProductDetails.defaultProps = {
	options: {
		scrollbars: true,
		mouseWheel: false,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true,
		scrollY: true,
		probeType: 2,
		bindToWrapper: true,
		click: true,
		taps: true,
	},
}