/**
 * Created by zhangHeng on 18/1/7.
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import $ from 'jquery'
import {Link,hashHistory} from 'react-router';
import Carousel from 'react-zkcarousel';
import {Toast} from 'antd-mobile'
import { Icon, Grid } from 'antd-mobile';
import TabController from '../tab/TabController';

export default class AreaGuan extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bannerArr:[],
            areaId:this.props.params.id,
            ChoicenessArr:[], //精选
            topOneHundredArr:[], //top100
            chengFenArr:[],
            bannerImg: [],

            isShow:false,
            goodsDetail:{},
            goodsNumber:1,
            spec:[],
            specId:'',

        }
    }
    _render(){
        if(this.state.bannerArr.length != 0){
            return (
                <div className='height-auto'>
                    <Carousel data={this.state.bannerArr} autoplay dots='false' click={this.handleItemClick.bind(this)} />
                </div>
            )
        }else{
            return null
        }
    }
    _renderImg(){
        if(this.state.bannerImg.length!=0){
            return (
                <img src={this.state.bannerImg[0].src}/>
            );
        }else{
            return null
        }
    }

    render(){
        return(
            <div>
                <header className="title-search mui-bar-nav">
                    <a className="mui-icon mui-icon-left-nav mui-pull-left areaThreeText" style={{fontSize:'1.01rem',color:'#333333',fontWeight:'500'}} onClick={this.handClickhish.bind(this)}><span>地区馆&nbsp;</span></a>
                    <input className="searchArea" style={{width:'86%'}} placeholder="输入商品名称"/>
                    <a className="title-icon right-icon" style={{backgroundSize:'93%'}}>
                        <span></span>
                    </a>
                </header>
                <div className="mui-content">
                    <div id="tabbar" className="mui-control-content mui-active">
                        <div id="slider" className="mui-slider" >
                            {
                                this._render()
                            }
                        </div>
                    </div>
                    <TabController tabClass='test' >
                        <div name="澳洲精选" className="bac-qianhuang">
                            <ul className="mui-table-view">
                                <li className="mui-table-view-cell item1-li item2-li" style={{padding: '1px 0'}}>
                                    <a className="goods-class pinPai1" style={{color:'#7F7F7F'}}>
                                        品牌&nbsp;
                                        <span className="icon-up" style={{width:'10px'}}><img src={require('../../images/icon/des.png')} /></span>
                                    </a>
                                    <a className="goods-class gongXiao1" style={{color:'#7F7F7F'}}>
                                        功效&nbsp;
                                        <span className="icon-up" style={{width:'10px'}}><img src={require('../../images/icon/des.png')} /></span>
                                    </a>
                                    <a className="goods-class chengFen1" style={{color:'#7F7F7F'}} >
                                        成分&nbsp;
                                        <span className="icon-up"  style={{width:'10px'}}><img src={require('../../images/icon/des.png')} /></span>
                                    </a>
                                </li>
                            </ul>
                            <ul className="classfiy-goods-list">
                                {
                                    this.state.topOneHundredArr.map((item,index)=>{
                                        return (
                                            <li className="classfiy-goods-list-item" key={index}>
                                                <Link to={{pathname:'ProductDetails/'+item.id}}>
                                                    <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                                </Link>
                                                <h5 className="mui-ellipsis-2">{item.goodsName}</h5>
                                                <h5>
                                                    <span className="classify-price">{item.goodPrice}</span>
                                                    <button className="right-now" onClick={this.handClick.bind(this,item.id)}><i className="icon-add-cart"></i></button>
                                                </h5>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div name="TOP20" className="background-qianhui">
                            <ul className="mui-table-view background-none">
                                {
                                    this.state.ChoicenessArr.map((item)=>{
                                        return (
                                            <li className="item1-li background-white" key={item.itemKey} >
                                                <Link  className="item1-li-left" style={{width: '40%'}} to={{pathname:'ProductDetails/'+item.id}}>
                                                    <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl} />
                                                    <p className="sell-hot-orea"><img src={require('../../images/background/sellhot.png')} /></p>
                                                </Link >
                                                <div className="item1-li-right" style={{width:'59%',height:'132px'}}>
                                                    <h5 className="mui-ellipsis-2" style={{color:'#333'}}>{item.goodsName}</h5>
                                                    <div className="top20-price-add">
                                                        <span className="color-red font-size-14">￥{item.goodPrice}</span>
                                                        <button className="top20-add-car mui-pull-right" onClick={this.handClick.bind(this,item.id)}>
                                                            <img src={require('../../images/icon/shopping-cart.png')} />加入购物车
                                                        </button>
                                                    </div>

                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </TabController>
                </div>
                <Navigator/>
                <div className="mask regionalPavilions" style={{top:0}}>
                    <ul className="mui-table-view proper">
                        <li className="mui-table-view-cell item1-li item2-li" >
                            <a className="goods-class pinPai1">
                                品牌
                                <span className="icon-up"><img src={require('../../images/icon/des.png')} /></span>

                            </a>
                            <a className="goods-class gongXiao1">
                                功效
                                <span className="icon-up"><img src={require('../../images/icon/des.png')} /></span>

                            </a>
                            <a className="goods-class chengFen1">
                                成分
                                <span className="icon-up"><img src={require('../../images/icon/des.png')} /></span>
                            </a>
                        </li>
                        <ul className='tabName' id='tabName'>
                            {
                                this.state.chengFenArr.map((item)=>{
                                    return (
                                        <li className="mui-table-view-cell tabNameLi"  key={item.itemKey} onClick={this.elementName.bind(this,item.id)}>
                                            {item.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </ul>
                </div>

                {/*--------------------*/}

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
                                {/*<label className="padding-left-10 mui-pull-right line-height-35">库存：999</label>*/}
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
            </div>
        )
    }
    componentDidMount(){
        this.AreaGuanChoiceness() //当前地区下的精选
        this.AreaGuanBanner() //图片轮播的ajax
        this.clickFunction() //点击进行显示品牌
        this.topOneHundred() //top100下的商品

        console.log(this.state.areaId+'当前地区的id')
    }

    //返回上一页
    handClickhish(){
        history.go(-1);
    }

    AreaGuanChoiceness(){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsList",//请求的路径
            async:true,
            data: {
                pageNum:'1',
                pageSize:'30',
                areaId:this.state.areaId,
                //top100需要传的参数
                // isBig:
                // orderType:
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){

                if(data.code==1){
                    var ChoicenessArr = [];
                    var areaGuanDataList = data.data.list;
                    console.log(data.data.list,'data.data.list')
                    for(var i=0;i<areaGuanDataList.length;i++){
                        var ChoicenessObj = new Object();
                        ChoicenessObj.imgUrl = areaGuanDataList[i].imgUrl;//图片
                        ChoicenessObj.goodsName  = areaGuanDataList[i].goodsName ;//名称
                        ChoicenessObj.goodPrice  = areaGuanDataList[i].goodPrice ;//价格
                        ChoicenessObj.id  = areaGuanDataList[i].id ;//价格
                        ChoicenessObj.itemKey = i +'i'
                        ChoicenessArr.push(ChoicenessObj)
                    }
                    _this.setState({ChoicenessArr:ChoicenessArr})

                }
            }
        });
    }
    AreaGuanBanner(){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/areBanner",//请求的路径
            async:true,
            data: {
                areaId:this.state.areaId

            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){

                if(data.code==1){
                    console.log(data.data.showUrl)
                    var imgArray = []
                    var dataImg = data.data.showUrl
                    var bannerObj = new Object();
                    bannerObj.src='http://116.62.119.165:8080/fileServer/images/'+dataImg;
                    imgArray.push(bannerObj)
                    _this.setState({bannerArr:imgArray},()=>{})
                }
            },
            complete: function(XMLHttpRequest, textStatus){
            }
        });
    }
    handleItemClick(){
    }
    clickFunction(){
        var _this=this; //把this用_this暂代，以免找不到
        //var tabItemFirst=$(window).height()-$('.mui-slider').height();
        // $('#item1').height(tabItemFirst)
        $('.item2-li').on('click','a',function (event){
            if(event.target.nodeName=='A'){
                $(this).css({'color':'red'})
                $(this).siblings().css({'color':'#333'})
                $('.mask').show(100)
                var text = event.target.innerHTML;
                if(text.indexOf("成分") != -1){
                    text = '成分'
                    console.log(text)
                    _this.chengFen()
                    $('#tabName .tabNameLi').css({'text-align':'right','margin-right':'2rem'})
                    $('.chengFen1').css({'color':'red'})
                    $('.chengFen1').siblings().css({'color':'#333'})


                }
                else if(text.indexOf("品牌") != -1){
                    text = '品牌'
                    $('.namePP').css({'color':'red'})
                    _this.pinPai()
                    $('#tabName .tabNameLi').css({'text-align':'left'})
                    $('.pinPai1').css({'color':'red'})
                    $('.pinPai1').siblings().css({'color':'#333'})
                }
                else if(text.indexOf("功效") != -1){
                    text = '功效'
                    $('.nameGX').css({'color':'red'})
                    $('.gongXiao1').css({'color':'red'})
                    $('.gongXiao1').siblings().css({'color':'#333'})
                    _this.gongXiao()
                    $('#tabName .tabNameLi').css({'text-align':'center'})
                }

            }
        })
    }


    //点击弹出元素进行值切换
    elementName(event,id){
        var _this = this;
        var currentElementId = event;
        console.log(currentElementId,'currentElementId')
        if(id.target.nodeName == 'LI'){
            $(id.target).css({'color':'red'})
            $(id.target).siblings().css({'color':'#333'})
            var prentText = $(id.target).parent().siblings().children('a')[0].innerText;
            var prentText1 = $(id.target).parent().siblings().children('a')[1].innerText;
            var prentText2 = $(id.target).parent().siblings().children('a')[2].innerText;
            if(prentText){
                _this.elementAddData(currentElementId);
                $('.mask').hide(500)
            }
            if(prentText1){
                _this.elementAddData1(currentElementId);
                $('.mask').hide(500)
            }
            if(prentText2){
                _this.elementAddData2(currentElementId);
                $('.mask').hide(500)
            }


        }
    }

    //TOP100的时候加载的
    topOneHundred(){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsList",//请求的路径
            async:true,
            data: {
                pageNum:'1',
                pageSize:'30',
                areaId:this.state.areaId,
                isBig:13900001,
                orderType:'sale_num'
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(response, textStatus){
                if(response.code==1){
                    _this.setState({topOneHundredArr:response.data.list})
                }
            }
        });
    }
    chengFen(){

        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsComponentList",//请求的路径
            async:true,
            data: {
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    var chengFenArr = []
                    for(var c=0;c<data.data.length;c++){
                        var chengFenObj = new Object()
                        chengFenObj.itemKey = c +'c'
                        chengFenObj.name =data.data[c].name;
                        chengFenObj.id = data.data[c].id;
                        chengFenArr.push(chengFenObj)
                    }
                    _this.setState({chengFenArr:chengFenArr})
                    return true;
                }
            },
            complete: function(XMLHttpRequest, textStatus){
            }
        });
    }
    pinPai(){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsBrandList",//请求的路径
            async:true,
            data: { },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
            },
            success: function(data, textStatus){

                if(data.code==1){
                    //console.log(data.data)
                    var chengFenArr = []
                    for(var c=0;c<data.data.length;c++){
                        var chengFenObj = new Object()
                        chengFenObj.itemKey = c +'c'
                        chengFenObj.name =data.data[c].name;
                        chengFenObj.id = data.data[c].id;
                        chengFenArr.push(chengFenObj)
                    }
                    _this.setState({chengFenArr:chengFenArr},()=>{})
                    return true;
                }
            },
            complete: function(XMLHttpRequest, textStatus){
            }
        });
    }
    gongXiao(){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsEffectList",//请求的路径
            async:true,
            data: {
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
            },
            success: function(data, textStatus){
                if(data.code==1){
                    var chengFenArr = []
                    for(var c=0;c<data.data.length;c++){
                        var chengFenObj = new Object()
                        chengFenObj.itemKey = c +'c'
                        chengFenObj.name =data.data[c].name;
                        chengFenObj.id = data.data[c].id;
                        chengFenArr.push(chengFenObj)
                    }

                    _this.setState({chengFenArr:chengFenArr},()=>{})
                    return true;
                }
            },
            complete: function(XMLHttpRequest, textStatus){
            }
        });
    }


    //点击弹出框重新加载页面数据
    elementAddData(currentElementId){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsList",//请求的路径
            async:true,
            data: {
                pageNum:'1',
                pageSize:'30',
                areaId:this.state.areaId,
                isBig:13900001,
                orderType:'sale_num',
                brandId:currentElementId
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    var elementData = data.data.list;
                    var elementArr = [];
                    for(var i=0;i<elementData.length;i++){
                        var elementObj = new Object();
                        elementObj.itemKey = i+'i';
                        elementObj.goodPrice =elementData[i].goodPrice;
                        elementObj.goodsName =elementData[i].goodsName;
                        elementObj.imgUrl =elementData[i].imgUrl;
                        elementObj.id =elementData[i].id;
                        elementArr.push(elementObj)
                    }
                    _this.setState({topOneHundredArr:elementArr})
                    return true;

                }
            }
        });
    }
    elementAddData1(currentElementId){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsList",//请求的路径
            async:true,
            data: {
                pageNum:'1',
                pageSize:'30',
                areaId:this.state.areaId,
                isBig:13900001,
                orderType:'sale_num',
                goodsEffectId:currentElementId
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    var elementData = data.data.list;
                    var elementArr = [];
                    for(var i=0;i<elementData.length;i++){
                        var elementObj = new Object();
                        elementObj.itemKey = i+'i';
                        elementObj.goodPrice =elementData[i].goodPrice;
                        elementObj.goodsName =elementData[i].goodsName;
                        elementObj.imgUrl =elementData[i].imgUrl;
                        elementObj.id =elementData[i].id;
                        elementArr.push(elementObj)
                    }
                    _this.setState({topOneHundredArr:elementArr})

                }
            }
        });
    }
    elementAddData2(currentElementId){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsList",//请求的路径
            async:true,
            data: {
                pageNum:'1',
                pageSize:'30',
                areaId:this.state.areaId,
                isBig:13900001,
                orderType:'sale_num',
                goodsComponentId:currentElementId
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    var elementData = data.data.list;
                    var elementArr = [];
                    for(var i=0;i<elementData.length;i++){
                        var elementObj = new Object();
                        elementObj.itemKey = i+'i';
                        elementObj.goodPrice =elementData[i].goodPrice;
                        elementObj.goodsName =elementData[i].goodsName;
                        elementObj.imgUrl =elementData[i].imgUrl;
                        elementObj.id =elementData[i].id;
                        elementArr.push(elementObj)
                    }
                    _this.setState({topOneHundredArr:elementArr})

                }
            }
        });
    }

    /**addShoppingCart**/
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

                    response.data.thumbnail='http://116.62.119.165:8080/fileServer/images/'+response.data.goodsImgUrl[0]
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
                    self.setState({isShow:false})
                    Toast.info('加入购物车成功', 2, null, false);
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

