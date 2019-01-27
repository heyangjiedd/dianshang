/**
 * Created by zhangHeng on 17/6/10.
 * 多多鸟说
 */

import React from 'react';
import MeScroll from 'mescroll.js'
import Navigator from './../tabNavigator/NavigatorMain.js'
import Header from "../tab/Header";
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery'
import { Link, hashHistory } from 'react-router';
const classifys = [{
		title: '小渡有话说',
		sayType: '90000'
	},
	{
		title: '这就是生活',
		sayType: '90001'
	},
	{
		title: '健康体验馆',
		sayType: '90002'
	},
	{
		title: '健康笔记',
		sayType: '90003'
	},
]
export default class BirdIndex extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			current: 0,
			pullDownStatus: 3,
			pullUpStatus: 0,
			sayType: '90000'
		}

		this.mescroll;
		this.page = 1;

		this.itemsChanged = false;

		this.pullDownTips = {
			// 下拉状态
			0: '下拉发起刷新',
			1: '继续下拉刷新',
			2: '松手即可刷新',
			3: '正在刷新',
			4: '刷新成功',
		};

		this.pullUpTips = {
			// 上拉状态
			0: '上拉发起加载',
			1: '松手即可加载',
			2: '正在加载',
			3: '加载成功',
		};

		this.isTouching = false;

		this.onScroll = this.onScroll.bind(this);
		this.onScrollEnd = this.onScrollEnd.bind(this);

		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
	}
	itemNav(index) {
		return index === this.state.current ? 'active' : '';
	}
	handClick(index, sayType) {
		this.setState({
			current: index,
			items: [],
			sayType: sayType
		}, () => {
			console.log(this.state.sayType, 'type')
		});
		this.fetchItems(sayType);
	}
	fetchItems(isRefresh, sayType) {
		if(isRefresh) {
			this.page = 1;
		}
		$.ajax({
			url: 'http://116.62.119.165/shop-portal/swagger/api/getSayList',
			data: {
				pageNum: this.page,
				pageSize: 10,
				sayType: sayType,
				sidx: 'create_time',
				sord: 'desc'
			},
			type: 'GET',
			dataType: 'json',
			success: (response) => {
				if(isRefresh) { // 刷新操作
					if(this.state.pullDownStatus == 3) {
						this.setState({
							pullDownStatus: 4,
						});
					}
					this.setState({
						items: response.data.list
					});
					this.iScrollInstance.scrollTo(0, -30, 500);
				} else { // 加载操作
					if(this.state.pullUpStatus == 2) {
						this.setState({
							pullUpStatus: 0,
							items: this.state.items.concat(response.data.list)
						}, () => {});
					}
				}
				++this.page;
			}
		});
	}
	render() {
		const {
			items
		} = this.state;
		let lis = [];
		items.length == 0 ? lis.push() :
			items.map((item, index) => {
				lis.push(
					<li key={index}>
                        <Link className="font-size-14" to={{pathname:'/WritNote/'+item.id}}>
                            <div className="birdSay-item">
                                <div className="say-left-img">
                                    {
                                        item.imgUrl==null?<img src={require('./../../images/background/defaultBird.jpg')}/>
                                            :<img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                    }
                                </div>
                                <div className="say-right-content">
                                    <p className="font-size-16 color-block" style={{fontWeight:500}}>
                                        {item.title}
                                        {
                                            item.isHot=='13900002'?null:<span className="icon-hot"></span>
                                        }
                                    </p>
                                    <h5 className="mui-ellipsis-2 say-introduction">
                                        <span className="margin-right-10">{item.introduction}.....</span>
                                    </h5>
                                    <p className="margin-bottom-zero font-size-12">
                                        <span className="margin-right-10">创建时间:{new Date(item.createTime).toLocaleDateString()}</span>
                                        <span className="margin-right-10">阅读:{item.reading}</span>
                                        <span className="margin-right-10">评论:{item.praise}</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </li>
				);
			})

		return(
			<div>
			<Header title="多多鸟说"/>
            	<ul className="birdSay" style={{marginTop:45}}>
                            {
                                classifys.map((item,index)=>{
                                    return (
                                        <li key={index}
                                            className={ this.itemNav(index)}
                                            onClick={this.handClick.bind(this,index,item.sayType)}>
                                            {item.title}
                                        </li>
                                    )
                                })
                            }
                </ul>
                <div className="ListOutsite"
                			style={{bottom:0,top:90}}
                             onTouchStart={this.onTouchStart}
                             onTouchEnd={this.onTouchEnd}>
                            <ul className="ListInside">
                                <li ref="PullDown" className="mui-text-center font-size-12">{this.pullDownTips[this.state.pullDownStatus]}</li>
                                {lis}
                                <li ref="PullUp" className="mui-text-center font-size-12">{this.pullUpTips[this.state.pullUpStatus]}</li>
                            </ul>
                        </div>
            </div>
		)
	}

	componentDidMount() {
		const options = {
			preventDefault: true,
			zoom: false,
			mouseWheel: true,
			probeType: 3,
			bounce: true,
			scrollbars: true,
			fadeScrollbars: true,
			preventDefaultException: {
				tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/
			},
			click: true
		};
		this.iScrollInstance = new iScroll(document.querySelector('.ListOutsite'), options);
		this.iScrollInstance.on('scroll', this.onScroll);
		this.iScrollInstance.on('scrollEnd', this.onScrollEnd);

		this.fetchItems(true, this.state.sayType);
	}

	onTouchStart(ev) {
		this.isTouching = true;
	}

	onTouchEnd(ev) {
		this.isTouching = false;
	}

	onPullDown() {
		// 手势
		if(this.isTouching) {
			if(this.iScrollInstance.y > 5) {
				this.state.pullDownStatus != 2 && this.setState({
					pullDownStatus: 2
				});
			} else {
				this.state.pullDownStatus != 1 && this.setState({
					pullDownStatus: 1
				});
			}
		}
	}

	onPullUp() {
		// 手势
		if(this.isTouching) {
			if(this.iScrollInstance.y <= this.iScrollInstance.maxScrollY - 5) {
				this.state.pullUpStatus != 1 && this.setState({
					pullUpStatus: 1
				});
			} else {
				this.state.pullUpStatus != 0 && this.setState({
					pullUpStatus: 0
				});
			}
		}
	}

	onScroll() {
		let pullDown = $(this.refs.PullDown);

		// 上拉区域
		if(this.iScrollInstance.y > -1 * pullDown.height()) {
			this.onPullDown();
		} else {
			this.state.pullDownStatus != 0 && this.setState({
				pullDownStatus: 0
			});
		}

		// 下拉区域
		if(this.iScrollInstance.y <= this.iScrollInstance.maxScrollY + 5) {
			this.onPullUp();
		}
	}

	onScrollEnd() {
		let pullDown = $(this.refs.PullDown);

		// 滑动结束后，停在刷新区域
		if(this.iScrollInstance.y > -1 * pullDown.height()) {
			if(this.state.pullDownStatus <= 1) {
				this.iScrollInstance.scrollTo(0, -30, 200);
			} else if(this.state.pullDownStatus == 2) {
				this.setState({
					pullDownStatus: 3
				});
				this.fetchItems(true);
			}
		}

		// 滑动结束后，停在加载区域
		if(this.iScrollInstance.y <= this.iScrollInstance.maxScrollY) {
			if(this.state.pullUpStatus == 1) {
				this.setState({
					pullUpStatus: 2
				});
				this.fetchItems(false);
			}
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		this.itemsChanged = nextState.items !== this.state.items;
		return true;
	}

	componentDidUpdate() {
		if(this.itemsChanged) {
			this.iScrollInstance.refresh();
		}
		return true;
	}
}