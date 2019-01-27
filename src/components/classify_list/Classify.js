/**
 * Created by zhangHeng on 17/6/10.
 * 分类详情
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import $ from 'jquery'
import Carousel from 'react-zkcarousel';
import iScroll from 'iscroll/build/iscroll-probe';
import {Link,hashHistory} from 'react-router';
import { Modal, List, Button,Toast } from 'antd-mobile';
const sort=[
    {title:'人气',isSort:false},
    {title:'销量',isSort:false},
    {title:'价格',isSort:false}
]

export default class Classify extends React.Component{

    constructor(props){
        super(props);
        this.state={
            items: [],
            pullDownStatus: 3,
            pullUpStatus: 0,

            bannerArr:[],
            classifyArr:[],
            current:0,
            /**According to conditions**/
            boolean:[
                {isChecked:false},
                {isChecked:false},
                {isChecked:false}
            ],
            sortCurrent:0,
            currentCategoryId:this.props.location.state.id,
            /**Categorization and selection**/

            /**Add to cart**/
            modal2: false,
            detail:{},
            goodsNumber:1,
            defaultSpecId:''

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


    itemNav(index){
        return index===this.state.current?' active':'';
    }

    sortItemNav (index){

        if(index === this.state.sortCurrent){
            if(this.state.boolean[index].isChecked){
                return 'flex-1 sort-ace'
            }else{
                return 'flex-1 sort-active'
            }
        }

        return 'flex-1'

    }

    _renderBanner(){
        if(this.state.bannerArr.length != 0){

            if(this.state.bannerArr.length==1){
                return (<img src={this.state.bannerArr[0].src} />)
            }else{
                return (
                    <div className='height-auto'>
                        <Carousel data={this.state.bannerArr} autoplay dots='false' click={this.handleItemClick.bind(this)} />
                    </div>
                )
            }

        }else{
            return null
        }
    }

    render(){
        //to={{pathname:'ProductDetails/'+item.id}}
        const {items,classifyArr,detail,goodsNumber} = this.state;
        let lis = [];
        this.state.items.length==0?lis.push():
            this.state.items.map((item, index) => {
                lis.push(
                    <li className="classfiy-goods-list-item" key={index}>
                        <a onClick={this.toDetail.bind(this,item.id)}>
                            <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                        </a>
                        <h5 className="mui-ellipsis-2 max-height-27">{item.goodsName+' '+item.spceName}</h5>
                        <h5>
                            <span className="classify-price">￥{item.goodPrice}</span>
                            <button className="right-now"
                                    onClick={this.addToCart.bind(this,item.id)}><i className="icon-add-cart"> </i></button>
                        </h5>
                    </li>
                );
            })

        return(
            <div>
                <div style={{height:window.innerHeight,paddingTop:140,position:'relative'}}>
                    <div style={{position:'absolute',top:0,left:0,width:window.innerWidth,zIndex:10}}>
                        <div className="say-header">
                            <input placeholder="请输入商品名称或品牌搜索" onClick={this.toSearch.bind(this)}/>
                            <button className="mui-pull-right"></button>
                        </div>
                        <div style={{background:'#fff',height:44,overflowX:'auto',overflowY:'hidden',lineHeight:'44px'}}>
                            <ul style={{width:84*classifyArr.length}}>
                                {
                                    classifyArr.map((item,index)=>{
                                        return (<li key={index}
                                                    onClick={this.tabClick.bind(this,item.categoryId,index)}
                                                    className={`tab-item${this.itemNav(index)}`}>
                                            {item.oneTypeName}
                                        </li>)
                                    })
                                }
                            </ul>
                        </div>
                        <div className="goods-sort display-flex">
                            {
                                sort.map((item,index)=>{
                                    return (
                                        <button key={index}
                                                onClick={this.sortClick.bind(this,index)}
                                                className={this.sortItemNav(index)}
                                        >
                                            {item.title}
                                            <span className="goods-sort-icon"></span>
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="position-relative">
                        <div className="ListOutsite"
                             style={{top:0}}
                             onTouchStart={this.onTouchStart}
                             onTouchEnd={this.onTouchEnd}>
                            <ul className="ListInside">
                                <li><p ref="PullDown" className="mui-text-center">{this.pullDownTips[this.state.pullDownStatus]}</p></li>
                                <li>{this._renderBanner()}</li>
                                {lis}
                                <li><p ref="PullUp" className="mui-text-center">{this.pullUpTips[this.state.pullUpStatus]}</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/**Categorization and selection**/}
                {/*<div>分类筛选</div>*/}
                {/**Add to cart**/}
                <Modal
                    popup
                    visible={this.state.modal2}
                    onClose={this.onClose.bind(this)}
                    animationType="slide-up"
                >
                    <List renderHeader={() => <div>加入购物车</div>} className="popup-list">
                        <List.Item>
                            <div className="row">
                                <label><img src={detail.goodsImg} /></label>
                                <div className="row-right">
                                    <h5 className="mui-ellipsis-2 font-size-16"
                                        style={{lineHeight:1.5,color:'#000'}}>{detail.goodsName}</h5>
                                    <h5>
                                        {detail.spec==undefined?null:<span className="font-size-18 color-red">¥{detail.spec[0].spcePirce}</span>}
                                        {detail.spec==undefined?null:<span className="font-size-16 padding-left-10">¥{detail.spec[0].referencePirce}</span>}
                                        {detail.spec==undefined?null:<span className="font-size-14 padding-left-10">发货地：{detail.sendPlace}</span>}
                                    </h5>
                                </div>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="row">
                                <label className="font-size-14">数量</label>
                                <div className="row-right">
                                    <div className="mui-numbox">
                                        <button className="mui-btn mui-btn-numbox-minus" type="button"
                                                onClick={this.setGoodsNumber.bind(this,-1)}>-</button>
                                        <input className="mui-input-numbox" type="number" value={goodsNumber}/>
                                        <button className="mui-btn mui-btn-numbox-plus" type="button"
                                                onClick={this.setGoodsNumber.bind(this,1)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="row">
                                <label className="font-size-14">规格</label>
                                <div className="row-right">

                                    {
                                        detail.spec==undefined?null:
                                        detail.spec.map((item,index)=>{
                                            return (
                                                <div className="mui-radio" key={index}>
                                                    <label className="font-size-14">{item.spceName}</label>
                                                    <input name="specId"
                                                           type="radio"
                                                           defaultChecked={index==0?true:false}
                                                           value={item.id}
                                                           onClick={this.setSpace.bind(this)}
                                                    />
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="row">
                                <label className="font-size-14">备注</label>
                                <div className="row-right">
                                    <h5 className="test-world">
                                        澳洲：7-15天  美国：10-20天 香港：5-10天，如遇国内外节假日及海关查验，发货或到货时间会相应
                                        顺延或增加，请耐心等待，商品详细信息请到商品详情页查看
                                    </h5>
                                </div>
                            </div>
                        </List.Item>
                        <List.Item>
                            <Button type="primary" onClick={this.conformAdd.bind(this)}>确认</Button>
                        </List.Item>
                    </List>
                </Modal>
                <Navigator/>
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

        const pramas={
            typeId:this.props.location.state.type,
            categoryId:this.props.location.state.id,
            orderType:'recommend',
            isBig:'13900001',
        }

        this.classify();

        this.fetchItems(true,pramas);
        this.IndexHealth();
    }

    fetchItems(isRefresh,pramas) {
        if (isRefresh) {
            this.page = 1;
        }
        $.ajax({
            url: 'http://116.62.119.165/shop-portal/swagger/api/goodsList',
            data: {
                pageNum: this.page,
                pageSize:10,
                typeId:pramas.typeId,
                categoryId:pramas.categoryId,
                orderType:pramas.orderType,
                isBig:pramas.isBig
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
        const pramas={
            typeId:this.props.location.state.type,
            categoryId:this.props.location.state.id,
            orderType:'recommend',
            isBig:'13900001',
        }

        // 滑动结束后，停在刷新区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            if (this.state.pullDownStatus <= 1) {
                this.iScrollInstance.scrollTo(0, -40, 200);
            } else if (this.state.pullDownStatus == 2) {
                this.setState({pullDownStatus: 3});
                this.fetchItems(true,pramas);
            }
        }

        // 滑动结束后，停在加载区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY) {
            if (this.state.pullUpStatus == 1) {
                this.setState({pullUpStatus: 2});
                this.fetchItems(false,pramas);
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

    IndexHealth(){
        let _this=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/categoryBanner",
            async:true,
            data: {
                categoryId:_this.props.location.state.id
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(response){
                if(response.code==1){
                    if(response.data.length!=0){
                        var array=new Array();
                        for(var i=0;i<response.data.length;i++){
                            var obj=new Object();
                            obj.src='http://116.62.119.165/fileServer/images/'+response.data[i].url;
                            array.push(obj)
                        }
                        _this.setState({bannerArr:array})
                    }
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
    }

    handleItemClick(){}

    tabClick(categoryId,index){

        this.setState({
            current:index,
            items:[],
            currentCategoryId:categoryId
        });

        const pramas={
            typeId:this.props.location.state.type,
            categoryId:categoryId,
            orderType:'recommend',
            isBig:'13900001',
        }

        this.fetchItems(true,pramas);
    }

    //分类获取
    classify(){
        var _this=this
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/categoryType",
            async:true,
            data: {
                type:_this.props.location.state.type
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(response){
                if(response.code==1){
                    _this.setState({classifyArr:response.data})
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
    }
    //排序
    sortClick(index){
        let orderType,isBig;
        const {boolean}=this.state;

        let isChecked=!boolean[index].isChecked;
        boolean[index]=Object.assign({},boolean[index],{isChecked:isChecked})

        this.setState({
            sortCurrent:index,
            boolean,
            items:[]
        })

        switch (index)
        {
            case 0:
                boolean[index].isChecked?
                    (orderType='recommend',isBig='13900001'):(orderType='recommend',isBig='13900002')
                break;
            case 1:
                boolean[index].isChecked?
                    (orderType='sale_num',isBig='13900001'):(orderType='sale_num',isBig='13900002')
                break;
            case 2:
                boolean[index].isChecked?
                    (orderType='reference_pirce',isBig='13900001'):(orderType='reference_pirce',isBig='13900002')
                break;
            default:
                break;
        }

        const pramas={
            typeId:this.props.location.state.type,
            categoryId:this.state.currentCategoryId,
            orderType:orderType,
            isBig:isBig,
        }

        this.fetchItems(true,pramas);

    }
    //加入购物车
    addToCart(goodId,e){
        e.preventDefault();
        this.setState({modal2:true})
        this.goodDetails(goodId);
    }
    //关闭弹出层
    onClose(){
        this.setState({modal2:false})
    }
    //获取当前商品详情
    goodDetails(id){
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
            success: function(response){
                if(response.code==1){
                    let _detail={
                        goodsName:response.data.goodsName,
                        goodsId:response.data.goodsId,
                        spec:response.data.spec,
                        goodsImg:`http://116.62.119.165/fileServer/images/${response.data.goodsImgUrl[0]}`,
                        sendPlace:response.data.sendPlace
                    }
                    _this.setState({
                        detail:_detail,
                        defaultSpecId:response.data.spec[0].id
                    })
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
    }
    //购买商品数量
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
    //选择规格
    setSpace(e){
        this.setState({specId:event.target.value})
    }
    //加入购物车
    conformAdd(){
        var _this=this;
        const {goodsNumber,defaultSpecId}=this.state
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/addShopCar",
            async: true,
            data: {
                specId:defaultSpecId,
                num:goodsNumber,
                custId:localStorage['id']
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //todo
            },

            success: function (response) {
                Toast.info(response.message, 2, null, false);
                _this.onClose()
            },

            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function () {

            }

        })
    }
    //商品详情
    toDetail(goodsId){
     hashHistory.push({
         pathname: '/ProductDetails/'+goodsId,
     })

    }
    toSearch(){
        hashHistory.push({pathname:'/Search'})
    }

}
