/**
 * Created by zhangHeng on 17/12/18.
 * 超值组合
 */

import React from "react";
import iScroll from "iscroll/build/iscroll-probe"; // 只有这个库支持onScroll,从而支持bounce阶段的事件捕捉
import {Link,hashHistory} from 'react-router';
import Header from "../tab/Header";
import Navigator from "../tabNavigator/NavigatorMain";
import { Icon, Grid } from 'antd-mobile';

export default class MsgListPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: [],
            pullDownStatus: 3,
            pullUpStatus: 0,

            message:'',
            isShow:false,
            goodsDetail:{},
            goodsNumber:1,
            spec:[],
            specId:'',
            inforMessage:'',
        };

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

        this.onItemClicked = this.onItemClicked.bind(this);

        this.onScroll = this.onScroll.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    componentDidMount() {
        const options = {
            preventDefault:true,
            zoom: false,
            mouseWheel: true,
            probeType: 3,
            bounce: true,
            scrollbars: true,
            fadeScrollbars:true,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/ },
            click:true,
        };
        this.iScrollInstance = new iScroll(document.getElementById('ListOutsite'), options);
        this.iScrollInstance.on('scroll', this.onScroll);
        this.iScrollInstance.on('scrollEnd', this.onScrollEnd);

        this.fetchItems(true);
    }

    fetchItems(isRefresh) {
        if (isRefresh) {
            this.page = 1;
        }
        $.ajax({
            url: 'http://116.62.119.165:8080/shop-portal/swagger/api/activityBundle',
            data: {
                page: 0,
                rows:10
            },
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                if (isRefresh) {    // 刷新操作
                    if (this.state.pullDownStatus == 3) {
                        this.setState({
                            pullDownStatus: 4,
                            items: response.data
                        });
                        this.iScrollInstance.scrollTo(0, -40, 500);
                    }
                } else {    // 加载操作
                    if (this.state.pullUpStatus == 2) {
                        this.setState({
                            pullUpStatus: 0,
                            items: this.state.items.concat(response.data)
                        },()=>{});
                    }
                }
                ++this.page;
            }
        });
    }

    /**
     * 点击跳转详情页
     */
    onItemClicked(ev) {

        // 获取对应的DOM节点, 转换成jquery对象
        // let item = $(ev.target);
        // // 操作router实现页面切换
        // this.context.router.push(item.attr('to'));
        // this.context.router.goForward();
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

    //'http://116.62.119.165/fileServer/images/'+item.imgUrl

    render() {
        let lis = [];
        this.state.items.map((item, index) => {
            lis.push(
                <li className="classfiy-goods-list-item" key={index}>
                    <Link to={{pathname:'ProductDetails/'+item.id}}>
                        <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                    </Link>
                    <h5 className="mui-ellipsis-2 max-height-27">{item.goodsName+' '+item.spceName}</h5>
                    <h5>
                        <span className="classify-price">￥{item.goodPrice}</span>
                        <button className="right-now" onClick={this.handClick.bind(this,item.id)}><i className="icon-add-cart"></i></button>
                    </h5>
                </li>
            );
        })

        // 外层容器要固定高度，才能使用滚动条
        return (
            <div>
                <div className="ScrollContainer">
                    <Header title="超值组合"/>
                    <Navigator/>
                    <div className="ListOutsite"
                         id="ListOutsite"
                         style={{height: window.innerHeight-90}}
                         onTouchStart={this.onTouchStart}
                         onTouchEnd={this.onTouchEnd}>
                        <ul className="ListInside classfiy-goods-list">
                            <li><p ref="PullDown" className="mui-text-center">{this.pullDownTips[this.state.pullDownStatus]}</p></li>
                            <li><div className="classify-banner"></div></li>
                            {lis}
                            <li><p ref="PullUp" className="mui-text-center">{this.pullUpTips[this.state.pullUpStatus]}</p></li>
                            <li><div style={{height:100,width:'100%'}}></div></li>
                        </ul>
                    </div>
                </div>

                <div className={this.state.isShow?'mui-backdrop mui-active':'mui-backdrop display-none'}
                     style={{width:'100%',borderRadius:0,zIndex:999}} onClick={this.closePuop.bind(this)}>
                </div>

                <div className={this.state.isShow?'mui-backdrop mui-active':'mui-backdrop display-none'}
                     style={{width:'100%',borderRadius:0,zIndex:1000,height:'63%',top:'37%'}}>
                    <ul className="mui-table-view popover-position">
                        <li style={{textAlign:"right",padding:10}}>
                            <span onClick={this.closePuop.bind(this)}><Icon type="cross-circle" /></span>
                        </li>
                        <li className="mui-table-view-cell">
                            <div className="mui-pull-left goods-img-left margin-top-10">
                                <img src={this.state.goodsDetail.thumbnail}/>
                            </div>
                            <div className="goods-content-right mui-pull-left">
                                <h5 className="mui-ellipsis-2 font-size-16 color-block">
                                    {this.state.goodsDetail.goodsName}
                                </h5>
                                <h5 className="">
                                    <span className="color-red font-size-16">
                                        {this.state.goodsDetail.spcePirce}
                                        <small>.00</small>
                                    </span>
                                    <span className="padding-left-10">
                                        {this.state.goodsDetail.referencePirce}
                                        <small>.00</small>
                                    </span>
                                    <span className="color-block padding-left-10">发货地：{this.state.goodsDetail.sendPlace}</span>
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
                                                <input name="specId"
                                                       type="radio"
                                                       value={item.id}
                                                       defaultChecked={index==0?true:false}
                                                       onClick={this.setSpecId.bind(this)}/>
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
                                  onClick={this.addShopCar.bind(this)}>确定</Link>
                        </li>
                    </ul>
                </div>

                <div className="totost" id="addCard">
                    <p className="">{this.state.inforMessage}</p>
                </div>

            </div>
        );
    }

    handClick(id){
        this.setState({isShow:true});
        this.getDetails(id)
    }

    getDetails(id){
        var _this=this
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsDetail",
            async:true,
            data: {
                goodsId:id
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(response, textStatus){
                if(response.code==1){

                    response.data.thumbnail='http://116.62.119.165/fileServer/images/'+response.data.goodsImgUrl[0]
                    response.data.spcePirce=response.data.spec[0].spcePirce
                    response.data.referencePirce=response.data.spec[0].referencePirce

                    _this.setState({
                        goodsDetail:response.data,
                        spec:response.data.spec,
                        specId:response.data.spec[0].id
                    })
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
    }

    setGoodsNumber(type){
        var defaultNumber=this.state.goodsNumber
        if(type==-1){
            if(defaultNumber==0) {
                this.setState({goodsNumber:defaultNumber})
                return
            }
            defaultNumber--;
            this.setState({goodsNumber:defaultNumber})
        }
        else{
            defaultNumber++;
            this.setState({goodsNumber:defaultNumber})
        }
    }

    setSpecId(event){
        // this.state[event.target.name]=event.target.value;

        // this.setState({specId:event.target.value})

        for(let i=0;i<this.state.spec.length;i++){
            if(event.target.value==this.state.spec[i].id){
                this.state.goodsDetail.spcePirce=this.state.spec[i].spcePirce;
                this.state.goodsDetail.referencePirce=this.state.spec[i].referencePirce;
                this.setState({
                    goodsDetail:this.state.goodsDetail,
                    specId:event.target.value
                })
            }
        }

    }

    addShopCar(){

        var self=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/addShopCar",
            async: true,
            data: {
                specId:self.state.specId,
                num:self.state.goodsNumber,
                custId:localStorage['id']
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //todo
                console.log(self.state.specId)
            },

            success: function (data, textStatus) {

                console.log(data)
                if (data.code == 1) {
                    self.setState({isShow:false,inforMessage:'添加购物车成功'});
                    document.getElementById('addCard').style.display='block';
                    setTimeout(function () {
                        document.getElementById('addCard').style.display='none'
                    },2000)
                }
            },

            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function () {

            }

        })
    }

    closePuop(){
        this.setState({isShow:false})
    }
}

