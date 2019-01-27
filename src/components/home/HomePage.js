/**
 * Created by zhangHeng on 17/6/10.
 * 我的
 */

import Navigator from '../tabNavigator/NavigatorMain.js'
import Swiper from "../Swpier/Swiper.js";
import Notice from '../Swpier/Notice.js';
import $ from 'jquery'
import {Link,hashHistory} from 'react-router';
import {Icon, Modal, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Lottery from './welfare.js';


export default class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            //account:this.props.location.state==null?'':this.props.location.state.custId,
            time:null,
            goodsList:[],
            globalGoods:[],
            newGoods:[],
            shoppingGuide:[],
            groupList:[],
            areaList:[],
            brandList:[],
            classifyList:[],
            classifyGoodsList:[],
            defaultId:null,
            currentIndex:0,
            isLoadingMore:false,
            moreDate:[],
            isRoll:false,
            coupon:[]
        }
    }

    //健康精选当前选中项
    itemIndex(index){
        return index===this.state.currentIndex?'active':''
    }

    _loadingMore(){
        let length=this.state.classifyGoodsList.length
        if(this.state.isLoadingMore)
        {
            return this.state.classifyGoodsList.slice(6,length).map((item,index)=>{
                    return (
                        <div className="item1content-item"  key={index}>
                            <Link to={{pathname:'ProductDetails/'+item.autoId,query:{accountId:'custId'}}}>
                                <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                            </Link>
                            <h5 className="mui-ellipsis-2 mui-text-center color-block max-height-27">{item.goodsName}</h5>
                            <h5 className="mui-text-center">￥{item.goodPrice}</h5>
                        </div>
                    )
            })
        }else{
            return null
        }
    }


    render(){

        return (
            <div>
                <header className="title-search mui-bar-nav">
                    <input className="search" placeholder="请输入商品名称或品牌搜索" onClick={this.toSearch.bind(this)}/>
                    <a className="title-icon right-icon">
                        <span></span>
                    </a>
                </header>
                <Navigator/>
                <div className="mui-content position-relative">
                    <Swiper/>
                    {/**商城分类*/}
                    <div className="classification">
                        <div className='shouyeBackground1'></div>
                        <ul>
                            <li>
                                <Link onClick={this.roll.bind(this)}>
                                    <div className='shouyeBackground2'></div>
                                    <h5 className="mui-text-center">天天福利</h5>
                                </Link>

                                <Link to={{pathname:'/BrandIndex',query:{accountId:this.state.accountId}}}>
                                    <div className='shouyeBackground3'></div>
                                    <h5 className="mui-text-center">品牌馆</h5>
                                </Link>

                                <Link to={{pathname:'/Bird',query:{accountId:this.state.accountId}}}>
                                    <div className='shouyeBackground4'></div>
                                    <h5 className="mui-text-center">多多鸟说</h5>
                                </Link>

                                <Link to={{pathname:'/TotalClassify',query:{accountId:this.state.accountId}}}>
                                    <div className='shouyeBackground5'></div>
                                    <h5 className="mui-text-center">分类</h5>
                                </Link>
                                
                                <Link to={{pathname:'/Classify',state:{id:'d9466b7cc6d143c897389ebfb6fab3c0',type:'10111111'}}}>
                                    <div className='shouyeBackground5A'></div>
                                    <h5 className="mui-text-center">魅力女性</h5>
                                </Link>

                                <Link to={{pathname:'/Classify',state:{id:'01dcd412a2e9425d9cc03b03fd28314b',type:'10111112'}}}>
                                    <div className='shouyeBackground5B'></div>
                                    <h5 className="mui-text-center">男士必备</h5>
                                </Link>

                                <Link to={{pathname:'/Classify',state:{id:'3ee76350462345259ca656857439eadf',type:'10111113'}}}>
                                    <div className='shouyeBackground5C'></div>
                                    <h5 className="mui-text-center">健康宝贝</h5>
                                </Link>

                                <Link  to={{pathname:'/Classify',state:{id:'7255c4ca7efa4c6eaf5acdbe16654584',type:'10111114'}}}>
                                    <div className='shouyeBackground5D'></div>
                                   
                                    <h5 className="mui-text-center">综合保养</h5>
                                </Link>
                            </li>
                            <Notice/>
                        </ul>
                    </div>
                    {/**限时抢购*/}
                    <div className="flash-sale">
                        <div className="fieldset-content">
                            <fieldset className="index-fieldset">
                                <legend>
                                    <span className="index-icon icon-flash-sale"></span>
                                    <span className="xianshi">限时</span>.
                                    <span className="qianggou">抢购</span>
                                </legend>
                                <h6>众多国际好货，限时抢购</h6>
                            </fieldset>
                        </div>
                        <div className="position-relative">
                            
                            <div className='shouyeBackground6'></div>
                            <div className="countdown flex-direction-column">
                                <div className="countdown-time">
                                    {/*<Countdown data={this.state.time}/>*/}

                                    <p className="margin-bottom-zero font-size-16">
                                        进入会场<span className="enter-prefecture index-icon"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="scroll-left-right">
                            <div className="width-1000"id="itemFlashSale">
                                {
                                    this.state.goodsList.map((item,index)=>{
                                        return (
                                            <Link  className="scroll-item-good" key={index}
                                                   to={{pathname:'ProductDetails/'+item.id,query:{accountId:'custId',spceId:item.itemKey}}}>
                                                <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                                <h5 className="color-block mui-ellipsis-2 font-size-14">{item.name}</h5>
                                                <h5 className="mui-text-center color-red">
                                                    抢购价:<span>￥</span>{item.price}
                                                </h5>
                                                <span className="sell-hot"><img src={require('../../images/background/sellhot.png')}/></span>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {/**全球尖货*/}
                    <div className="">
                        <div className="fieldset-content position-relative background-white">
                            <fieldset className="index-fieldset">
                                <legend>
                                    <span className="index-icon index-icon-world"></span>
                                    <span className="qianggou">全球尖货</span>
                                </legend>
                                <h6>汇聚全球抢手尖货,让你买不停</h6>
                            </fieldset>
                            <Link className="look-more" to="/NewProducet">更多<span className="index-icon enter-prefecture "></span></Link>
                        </div>
                        <ul className="tabnavigator-content background-white">
                            {
                                this.state.globalGoods.map((item,index)=>{
                                    return  (
                                        <li key={index} className="item1content-item">
                                            <Link to={{pathname:'ProductDetails/'+item.id,query:{accountId:'custId'}}}
                                                    style={{border:'none'}}>
                                                <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                            </Link>
                                            <h5 className="mui-ellipsis-2 color-block max-height-27">{item.name}</h5>
                                            <h5 className="mui-text-center mui-ellipsis">
                                                <span>￥</span>{item.price}
                                            </h5>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                    {/**新品推荐*/}
                    <div className="new-product">
                        <div className="fieldset-content">
                            <fieldset className="index-fieldset">
                                <legend>
                                    <span className="index-icon index-icon-good"></span>
                                    <span className="qianggou">新品推荐</span>
                                </legend>
                                <h6>每日众多新品,根本停不下来</h6>
                            </fieldset>
                        </div>
                        <div style={{position:'relative'}}>
                            
                        <div className='shouyeBackground7'></div>
                            <div className="countdown">
                                <div className="countdown-time">
                                    <p style={{fontSize:19,margin:0,textAlign:'center'}}>全球新品等你来</p>
                                    <h5 className="font-size-14 margin-top-10">
                                        进入新品专场<span className="enter-prefecture index-icon"></span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="width-1000" id="newProductXWidth">

                                {
                                    this.state.newGoods.map((item,index)=>{
                                        return (
                                            <Link key={index}
                                                 to={{pathname:'ProductDetails/'+item.id,query:{accountId:'custId'}}}>
                                                <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                                <h5 className="mui-text-center mui-ellipsis-2 color-block max-height-27">{item.name}</h5>
                                                <h5 className="mui-text-center mui-ellipsis">
                                                    <span>￥</span>{item.price}<small>.00</small></h5>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    {/**主题导购*/}
                    <div className="theme-shopping-guide" style={{marginTop:10}}>
                        <div className="fieldset-content">
                            <fieldset className="index-fieldset">
                                <legend>
                                    <span className="index-icon index-icon-daogou"></span>
                                    <span className="qianggou">主题导购</span>
                                </legend>
                                <h6>众多分类，想买啥就买啥</h6>
                            </fieldset>
                        </div>
                        {
                            this.state.shoppingGuide.map((item,index)=>{
                                return(
                                <Link to={{pathname:'/ShoppingGuide',state:{id:item.id}}} key={index}>
                                    <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                </Link>

                                )
                            })
                        }
                    </div>
                    {/**超值组合*/}
                    <div className="product-portfolio">
                        <div className="fieldset-content position-relative">
                            <fieldset className="index-fieldset">
                                <legend>
                                    <span className="index-icon index-icon-zuhe"></span>
                                    <span className="qianggou">超值组合</span>
                                </legend>
                                <h6>组合商品一起买，更划算哦</h6>
                            </fieldset>
                            <Link className="look-more" to="/moreGroup">更多<span className="index-icon enter-prefecture "></span></Link>
                        </div>
                        <div>
                            {
                                this.state.groupList.slice(0,6).map((item,index)=>{
                                    return(
                                        <Link  className={index==1 || item.index==4?'':''}
                                              key={index} to={{pathname:'ProductDetails/'+item.id,query:{accountId:'custId'}}}>
                                            <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                            <h5 className="mui-ellipsis-2 mui-text-center color-block max-height-27">{item.goodsName}</h5>
                                            <h5 className="mui-text-center">￥{item.goodPrice}</h5>
                                        </Link>
                                    )
                                })
                            }

                        </div>
                    </div>
                    {/**健康精选*/}
                    <div className="health-culling">
                        <div className="fieldset-content">
                            <fieldset className="index-fieldset">
                                <legend>
                                    <span className="index-icon index-icon-zuhe"></span>
                                    <span className="qianggou">健康精选</span>
                                </legend>
                                <h6>优质货源，把健康带回家</h6>
                            </fieldset>
                        </div>
                        <div className="tabnavigator">
                            <div style={{height:31,overflow:'hidden'}}>
                                <div className="tabnavigator-tab">
                                    <div className="width-1000" id="classifyList">

                                        {
                                            this.state.classifyList.map((item,index)=>{
                                                return(
                                                    <a key={index}
                                                       className={this.itemIndex(index)}
                                                       onClick={this.getGoods.bind(this,item.id,index)}>
                                                        <span>{item.classifyName}</span>
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="tabnavigator-content">
                                {

                                    this.state.classifyGoodsList.length>6?
                                        <div>
                                            {
                                                this.state.classifyGoodsList.slice(0,6).map((item,index)=>{
                                                    return (
                                                        <div className="item1content-item"  key={index}>
                                                            <Link to={{pathname:'ProductDetails/'+item.autoId,query:{accountId:'custId'}}}>
                                                                <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                                            </Link>
                                                            <h5 className="mui-ellipsis-2 mui-text-center color-block max-height-27">{item.goodsName}</h5>
                                                            <h5 className="mui-text-center">￥{item.goodPrice}</h5>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {this._loadingMore()}
                                            <div className="mui-text-center" onClick={this.loadingMore.bind(this)}>加载更多</div>
                                        </div>
                                        :
                                        <div>
                                            {
                                                this.state.classifyGoodsList.map((item,index)=>{
                                                    return (
                                                        <div className="item1content-item" key={index}>
                                                            <Link to={{pathname:'ProductDetails/'+item.autoId,query:{accountId:'custId'}}}>
                                                                <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                                            </Link>
                                                            <h5 className="mui-ellipsis-2 mui-text-center color-block max-height-27">{item.goodsName}</h5>
                                                            <h5 className="mui-text-center">￥{item.goodPrice}</h5>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    {/**地区馆*/}
                    <div className="area-list">
                        <div className="fieldset-content">
                            <fieldset className="index-fieldset">
                                <legend>
                                    <span className="index-icon index-icon-diqu"></span>
                                    <span className="qianggou">地区馆</span>
                                </legend>
                                <h6>国外各地地区精品，买到手软</h6>
                            </fieldset>
                        </div>
                        <div className="area-list-item">
                            {
                                this.state.areaList.map((item,index)=>{
                                   
                                    return (<Link key={index} to={{pathname:'AreaGuan/'+item.id}}>
                                                <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                            </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/**品牌馆*/}
                    <div className="brand-list">
                        <div className="fieldset-content">
                            <fieldset className="index-fieldset">
                                <legend>
                                    <span className="index-icon index-icon-pinpai"></span>
                                    <span className="qianggou">品牌馆</span>
                                </legend>
                                <h6>全球各大品牌，等你来挑</h6>
                            </fieldset>
                        </div>
                        <div className="brand-list-item" style={{overflow:'hidden',width:'100%'}}>

                            {
                                this.state.brandList.map((item,index)=>{
                                    return (
                                        <Link key={index} to={{pathname:'/Detail',state:{brandId:item.itemKey}}}>
                                            <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                        </Link>
                                    )
                                })
                            }
                            <Link to={{pathname:'/BrandIndex',query:{accountId:this.state.accountId}}}
                                  className="go-brand-more"
                                  style={{height:'auto',lineHeight:'37px'}}>更多品牌>></Link>
                        </div>

                    </div>
                </div>
                <div className={this.state.isRoll?'mui-bar-backdrop mui-backdrop mui-active':'mui-bar-backdrop mui-backdrop display-none'}
                     style={{width:'100%',borderRadius:0,zIndex:999,backgroundColor:'#0000004d'}}>
                    <div className="type-pay-content">
                    <li style={{textAlign:"right",padding:10,color:'white'}}>
                            <span onClick={this.closePuop.bind(this)}><Icon type="cross-circle" /></span>
                        </li>
                        <Lottery duration={5000} angle={3} ref="getSwordButton"/>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {

        var self=this;
        // this.getGoods();
        //限时抢购
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/activityPanic",
            async:true,
            data: {},
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1 && data.data!= null){
                    var _goodsList=[];
                    var dataTime={}
                    for(var i=0;i<data.data.list.length;i++){
                        var obj=new Object();
                        obj.imgUrl=data.data.list[i].imgUrl;
                        obj.name=data.data.list[i].goodsName;
                        obj.itemKey=data.data.list[i].spceId;
                        obj.synopsis=data.data.list[i].panicSlogan;
                        obj.price=data.data.list[i].panicPrice;
                        obj.id=data.data.list[i].autoId;
                        _goodsList.push(obj);
                    }

                    dataTime.start=data.data.startTime
                    dataTime.end=data.data.endTime
                    dataTime.now=data.data.newTime

                    self.setState({goodsList:_goodsList,time:dataTime});

                    return true;
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
        //全球尖货
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/activityQuality",
            async:true,
            data: {
                page:1,
                rows:8
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){

                if(data.code==1){
                    var _goodsList=[];
                    for(var i=0;i<data.data.length;i++){
                        var obj=new Object();
                        obj.imgUrl=data.data[i].imgUrl;
                        obj.name=data.data[i].goodsName;
                        obj.id=data.data[i].id;
                        obj.price=data.data[i].goodPrice

                        _goodsList.push(obj);
                    }
                    self.setState({globalGoods:_goodsList})
                    return true;
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
        //新品推荐
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/activityNew",
            async:true,
            data: {},
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){

                if(data.code==1){
                    var _goodsList=[];
                    for(var i=0;i<data.data.length;i++){
                        var obj=new Object();
                        obj.imgUrl=data.data[i].imgUrl;
                        obj.name=data.data[i].goodsName;
                        obj.id=data.data[i].id;
                        obj.price=data.data[i].goodPrice

                        _goodsList.push(obj);
                    }
                    self.setState({newGoods:_goodsList})

                    var element=document.getElementById('newProductXWidth');
                    var scrollXWidth=element.childNodes[0].clientWidth*(_goodsList.length);
                    element.style.width=scrollXWidth+'px'

                    return true;
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
        //主题导购
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/activityGuide",
            async:true,
            data: {},
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    var _goodsList=[];
                    for(var i=0;i<data.data.length;i++){
                        var obj=new Object();

                        obj.imgUrl=data.data[i].imgUrl;
                        obj.itemKey=data.data[i].id;
                        obj.id=data.data[i].id;
                        _goodsList.push(obj);

                    }
                    console.log(data.data,'主题导购的数据')
                    self.setState({shoppingGuide:_goodsList})
                    return true;
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
        //超值组合
        $.ajax({
            type: "get",
//          url: "http://116.62.119.165/shop-portal/swagger/api/activityBundle", 
            url: "http://116.62.119.165/shop-portal/active/goodsGroup", 
            async:true,
            data: {
                page:1,
                rows:6
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.success){
                    var _goodsList=[];
                    for(var i=0;i<data.object.length;i++){
                        var obj=new Object();

                        obj.imgUrl=data.object[i].imgUrl;
                        obj.id=data.object[i].id;
                        obj.index=i;
                        obj.goodsName=data.object[i].goodsName;
                        obj.goodPrice=data.object[i].bundlePrice;

                        _goodsList.push(obj);
                    }
                    self.setState({groupList:_goodsList},()=>{})
                    return true;
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
        //地区馆
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsArea",
            async:true,
            data: {
                page:1,
                rows:6
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){

                if(data.code==1){
                    var _areaList=[];
                    for(var i=0;i<data.data.length;i++){
                        var obj=new Object();

                        obj.imgUrl=data.data[i].imgUrl;
                        obj.id=data.data[i].id;
                        obj.index=i;
                        obj.name=data.data[i].name;
                        obj.showUrl=data.data[i].showUrl;

                        _areaList.push(obj);
                    }
                    self.setState({areaList:_areaList})
                    return true;
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
        //品牌馆
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsBrand",
            async:true,
            data: {
                page:1,
                rows:6
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){

                if(data.code==1){
                    var _brandList=[];
                    for(var i=0;i<data.data.length;i++){
                        var obj=new Object();

                        obj.imgUrl=data.data[i].logoImg;
                        obj.itemKey=data.data[i].id;
                        obj.index=i;

                        _brandList.push(obj);
                    }
                    self.setState({brandList:_brandList})
                    return true;
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
        //健康精选分类
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/activityHealth/getComponent",
            async:true,
            data: {
                page:1,
                rows:20
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){

                if(data.code==1 && data.data.length!=0){
                    var _classifyList=[];
                    for(var i=0;i<data.data.length;i++){
                        var obj=new Object();

                        obj.classifyName=data.data[i].name;
                        obj.id=data.data[i].id;
                        _classifyList.push(obj);
                    }
                    self.setState({
                        classifyList:_classifyList,
                        defaultId:_classifyList[0].id
                    },self.getGoods(_classifyList[0].id,0))
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
    }

    //根据分类加载商品
    getGoods(classifyId,index){
        var _this=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/activityHealth",
            async:true,
            data: {
                componentId:classifyId
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(response){
                if(response.code==1){
                   _this.setState({
                       classifyGoodsList:response.data,
                       currentIndex:index
                   },()=>{console.log(_this.state.classifyGoodsList.length,'????')})
                }
            },

            complete: function(XMLHttpRequest, textStatus){
            },
            error: function(){

            }
        });
    }

    loadingMore(){
        this.setState({isLoadingMore:!this.state.isLoadingMore})
    }
    toSearch(){
        hashHistory.push({pathname:'/Search'})
    }
    roll(){
        this.setState({isRoll:true})
    }

    closePuop(){
        this.setState({isRoll:false})
        this.refs.getSwordButton.getDragonKillingSword();
    }
}