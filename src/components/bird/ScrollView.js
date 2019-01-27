/**
 * Created by zhangHeng on 18/1/12.
 */

import React from 'react';
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';
import {Link,hashHistory} from 'react-router';

export default class ScrollView extends React.Component{
    constructor(props){
       super(props)
       this.state={
           items:[],
           pullDownStatus:3,
           pullUpStatus:0,
           sayType:this.props.type
       }

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

    render(){
        const {items} = this.state;
        let lis = [];
        items.length==0?lis.push():
            items.map((item, index) => {
                lis.push(
                    <li key={index} onClick={this.toDetail.bind(this,item.id)}>
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
                                    <Link className="font-size-14" to={{pathname:'/WritNote/'+item.id}}>阅读全文</Link>
                                </h5>
                                <p className="margin-bottom-zero font-size-12">
                                    <span className="margin-right-10">创建时间:{new Date(item.createTime).toLocaleDateString()}</span>
                                    <span className="margin-right-10">阅读:{item.reading}</span>
                                    <span className="margin-right-10">评论:{item.praise}</span>
                                </p>
                            </div>
                        </div>
                    </li>
                );
            })
        return (
            <div>
                <div style={{height:window.innerHeight,position:'relative'}}>
                    <div className="position-relative">
                        <div className="ListOutsite"
                             style={{top:0}}
                             onTouchStart={this.onTouchStart}
                             onTouchEnd={this.onTouchEnd}>
                            <ul className="ListInside">
                                <li ref="PullDown" className="mui-text-center font-size-12">{this.pullDownTips[this.state.pullDownStatus]}</li>
                                {lis}
                                <li ref="PullUp" className="mui-text-center font-size-12">{this.pullUpTips[this.state.pullUpStatus]}</li>
                                <li style={{height:116}}></li>
                            </ul>
                        </div>
                    </div>
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
            fadeScrollbars:true,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/ },
            click:true
        };
        this.iScrollInstance = new iScroll(document.querySelector('.ListOutsite'), options);
        this.iScrollInstance.on('scroll', this.onScroll);
        this.iScrollInstance.on('scrollEnd', this.onScrollEnd);

        this.fetchItems(true,this.state.sayType);
    }

    fetchItems(isRefresh,sayType) {
        if (isRefresh) {
            this.page = 1;
        }
        $.ajax({
            url: 'http://116.62.119.165/shop-portal/swagger/api/getSayList',
            data: {
                pageNum: this.page,
                pageSize:10,
                sayType:sayType,
                sidx:'create_time',
                sord:'desc'
            },
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                if (isRefresh) {    // 刷新操作
                    if (this.state.pullDownStatus == 3) {
                        this.setState({pullDownStatus: 4,});
                    }
                    this.setState({
                        items: response.data.list
                    });
                    this.iScrollInstance.scrollTo(0, -40, 500);
                } else {    // 加载操作
                    if (this.state.pullUpStatus == 2) {
                        this.setState({
                            pullUpStatus: 0,
                            items: this.state.items.concat(response.data.list)
                        },()=>{});
                    }
                }
                ++this.page;
            }
        });
    }

    onTouchStart(ev) {
        this.isTouching = true;
    }

    onTouchEnd(ev) {
        this.isTouching = false;
    }

    onPullDown() {
        // 手势
        if (this.isTouching) {
            if (this.iScrollInstance.y > 5) {
                this.state.pullDownStatus != 2 && this.setState({pullDownStatus: 2});
            } else {
                this.state.pullDownStatus != 1 && this.setState({pullDownStatus: 1});
            }
        }
    }

    onPullUp() {
        // 手势
        if (this.isTouching) {
            if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY - 5) {
                this.state.pullUpStatus != 1 && this.setState({pullUpStatus: 1});
            } else {
                this.state.pullUpStatus != 0 && this.setState({pullUpStatus: 0});
            }
        }
    }

    onScroll() {
        let pullDown = $(this.refs.PullDown);

        // 上拉区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            this.onPullDown();
        } else {
            this.state.pullDownStatus != 0 && this.setState({pullDownStatus: 0});
        }

        // 下拉区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY + 5) {
            this.onPullUp();
        }
    }

    onScrollEnd() {

        let pullDown = $(this.refs.PullDown);

        // 滑动结束后，停在刷新区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            if (this.state.pullDownStatus <= 1) {
                this.iScrollInstance.scrollTo(0, -40, 200);
            } else if (this.state.pullDownStatus == 2) {
                this.setState({pullDownStatus: 3});
                this.fetchItems(true);
            }
        }

        // 滑动结束后，停在加载区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY) {
            if (this.state.pullUpStatus == 1) {
                this.setState({pullUpStatus: 2});
                this.fetchItems(false);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.itemsChanged = nextState.items !== this.state.items;
        return true;
    }

    componentDidUpdate() {
        if (this.itemsChanged) {
            this.iScrollInstance.refresh();
        }
        return true;
    }

    toDetail(sayId){
        hashHistory.push({
            pathname: '/WritNote/'+sayId,
        })
    }


}

