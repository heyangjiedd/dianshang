/**
 * Created by zhangHeng on 17/6/10.
 * 我的分类-四个分类
 */
import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'

import {Link,hashHistory} from 'react-router'
import Carousel from 'react-zkcarousel';
import $ from 'jquery';
export default class ClassifyIndex extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentId:this.props.params.id,
            test:this.props.location.state,
            bannerArr:[],
            secondNavArr:[],
            AllProductArr:[],
            isShow: false, //立即购买下
            detailDate: {},
            goodsNumber: 0,
            spec: [],
            bannerImg: [],
        }
        this.argObj={}
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
                <header className="mui-bar mui-bar-nav">
                    <header className="mui-bar title-search mui-bar-nav">
                        <a className="mui-action-back mui-pull-left mui-icon mui-icon-bars" onClick={this.appearLoading.bind(this)}>
                        </a>&nbsp;
                        <input className="search" placeholder="请输入商品名称或品牌搜索"/>&nbsp;
                        <a className="mui-action-back mui-pull-right header-icon">
                            <img style={{width:'83%'}} src={require('../../images/icon/service.png')}/>
                        </a>
                    </header>
                </header>

                <div className="mui-content">
                    {this._render()} 
                    <div  className="">
                        <div id="sliderSegmentedControl" style={{height: '39px'}} className="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted background-white" >                                  
                             <div className="mui-scroll">
                                {
                                    this.state.secondNavArr.map((item)=>{
                                        return (
                                            <a className="mui-control-item" style={{paddingLeft:10,paddingRight:10}} key={item.itemKey} onClick={this.anewLoading.bind(this)}>
                                               {item.oneTypeName}
                                            </a>                   
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="mui-slider-group" id="mui-slider-group">
                            <div id="item1mobile" className="" style={{borderTop: "none"}}>
                                <div id="scroll1" className="" style={{ overflowY: 'auto',marginBottom:' 50px'}} >
                                    <div className="">
                                        <div className="sort-oderby">
                                            <a onClick={this.recommend.bind(this)}>推荐<span className="sort-active"></span></a>
                                            <a onClick={this.price.bind(this)}>价格</a>
                                            <a onClick={this.sale_num.bind(this)}>销量</a>
                                        </div>
                                        <ul className="search-result meiti-jianfei">
                                            {
                                                this.state.AllProductArr.map((item)=>{
                                                    return (
                                                        <li className='li' key={item.itemKey}   >
                                                            <Link className="goods-img" to={{pathname:'ProductDetails/'+item.id}}>
                                                              <img style={{width:'100%'}} src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                                            </Link>
                                                            <p className="mui-ellipsis-2 product-description" style={{lineHeight:'16px',height:'2rem'}}>{item.goodsName+' '+item.spceName}</p>
                                                            <p className="buy-price" style={{marginBottom:'0.5rem',color:'#FF0000'}}>
                                                                <span className="mui-pull-left rmb" style={{fontSize:'0.8rem'}}>￥</span>

                                                      
                                                                <span className="mui-pull-left price priceNum" >
                                                                <i style={{fontSize:'1.2rem',fontStyle:'normal',fontWeight:'bold'}}>{item.goodPriceInt}.</i>
                                                                <i style={{fontStyle:'normal',fontSize:'0.8rem'}}>{item.goodPriceFloat}</i>
                                                                </span>
                                                                <span></span>
                                                                <span className="right-now" onClick={this.handClick.bind(this,1,item.id)}>立即购买</span>
                                                            </p>
                                                        </li>                   
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Navigator/>
                <div className="classifyRelative" style={{display:'none'}}>
                    <ul className="classifyRelativeUl">
                        {
                            this.state.secondNavArr.map((item)=>{
                                return (
                                    <li style={{width:'90%',marginLeft:'5px'}} key={item.itemKey}>
                                        <div className='classifyDiv'>{item.oneTypeName}<span className='cishu' style={{float:'right'}}>v</span></div>
                                        <ul className='classifySecondUl' style={{display:'none'}}>
                                            <li>时政要闻</li>
                                            <li>远程党教</li>
                                            <li>村务管理</li>
                                        </ul>
                                    </li>                   
                                )
                            })
                        }
                    </ul>
                </div>


                <div className={this.state.isShow?'mui-popover active':'mui-popover'}>
                    <ul className="mui-table-view popover-position">
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
                                <label className="padding-left-10 mui-pull-right line-height-35">库存：999</label>
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

    componentDidMount(){
        this.classifyBanner()
        this.ClassifySecondNav()
        this.queryAllProduct()
    }


    //点击立即购买
    handClick(type,id){
       this.setState({isShow:true});
        this.argObj.type=type;
        this.getDetails(id)
    }



     //获取详情
    getDetails(id){
        var self=this
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
            success: function(data, textStatus){
                if(data.code==1){
                    var detailObj=new  Object();

                    if(data.data.spec.length!=0)
                    {
                        detailObj.spcePirce=data.data.spec[0].spcePirce
                        //默认规格
                        detailObj.specId=data.data.spec[0].id

                        detailObj.weight=data.data.spec[0].weight

                        detailObj.spceName=data.data.spec[0].spceName
                    }

                    detailObj.goodsName=data.data.goodsName
                    detailObj.referencePirce=data.data.referencePirce
                    detailObj.sendPlace=data.data.sendPlace

                    detailObj.qpgDate=data.data.qpgDate

                    detailObj.generatePlace=data.data.generatePlace
                    detailObj.applyPeople=data.data.applyPeople
                    detailObj.useMethod=data.data.useMethod
                    detailObj.goodNutritionalComposition=data.data.goodNutritionalComposition
                    detailObj.goodBrandIntroduction=data.data.goodBrandIntroduction


                    if(data.data.detailImgUrl.length!=0)
                    {
                        var detailsImgArray=[]
                        for(var i=0;i<data.data.detailImgUrl.length;i++){
                            var imgObj=new Object();
                            imgObj.src='http://116.62.119.165/fileServer/images/'+data.data.detailImgUrl[i];
                            imgObj.itemKey=i+'i'
                            detailsImgArray.push(imgObj)
                        }
                    }

                    if(data.data.goodsImgUrl.length!=0)
                    {
                        var goodsImgArray=[]
                        for(var i=0;i<data.data.goodsImgUrl.length;i++){
                            var imgObj=new Object();
                            imgObj.src='http://116.62.119.165/fileServer/images/'+data.data.goodsImgUrl[i];
                            imgObj.id=i
                            imgObj.href='http://116.62.119.165/fileServer/images/'
                            goodsImgArray.push(imgObj)
                        }
                    }

                    self.setState({
                        //detailImg:detailsImgArray,
                        detailDate:detailObj,
                        bannerImg:goodsImgArray,
                        spec:data.data.spec
                    })
                 }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
    }


    //构造参数
    getSpecId(event){
        this.argObj[event.target.name]=event.target.value;
        this.argObj['accountId']=localStorage['id'];
    }








     //设置商品数量
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


        jumpNextLink(){

            //检查是否登录
            if(localStorage['id']==undefined || localStorage['id']==null)
            {
                var isLoading=false;
               this.setState({message:'你还未登录，请登录'});
                document.getElementById('addCard').style.display='block';
                setTimeout(function () {
                    document.getElementById('addCard').style.display='none';
                    isLoading=true
                },2000)

                var timer = setInterval(function(){
                    if(isLoading)
                    {
                        clearInterval(timer);
                        hashHistory.push({pathname:'/Login'});
                    }
                },100);
            }


            if(this.state.goodsNumber==0){
                alert('商品数量不能为零');
                return false
            }
            if(this.argObj.specId==null){
                alert('请选择商品规格');
                return false
            }

            this.argObj.goodsNumber=this.state.goodsNumber


            if(this.argObj.type==1){
                hashHistory.push({
                    pathname:'/CardIndex',
                    state:this.argObj
                })
            }else{
               this.addShopCar(this.argObj)
            }
        }



























    //轮播；暂时分类的id写死了的
    classifyBanner(){
         var _this=this; //把this用_this暂代，以免找不到
         $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/categoryBanner",//请求的路径
            async:true,
            data: { 
                categoryId:'01dcd412a2e9425d9cc03b03fd28314b'
            },
            dataType: 'json',
            success: function(data, textStatus){
                if(data.code==1){
                    if(data.data.length != 0){
                        var imgArray = [];
                        for (var i = 0; i < data.data.length; i++) {
                            var dataImg = data.data[i].url;
                            var bannerObj = new Object();
                            bannerObj.src='http://116.62.119.165/fileServer/images/'+dataImg
                            imgArray.push(bannerObj)
                        };   
                    }
                    _this.setState({bannerArr:imgArray},()=>{})
                    return true;
                }
            },
             complete: function(XMLHttpRequest, textStatus){
            }
        });
    }

    handleItemClick(){
    }


    //分类ID
    // 01dcd412a2e9425d9cc03b03fd28314b 男士必备
    // 3ee76350462345259ca656857439eadf 健康宝贝
    // 7255c4ca7efa4c6eaf5acdbe16654584 综合养护
    // d9466b7cc6d143c897389ebfb6fab3c0 魅力女性

    //分类类型
    // 魅力女性：10111111
    // 男士必备：10111112
    // 健康宝贝：10111113
    // 综合养护：10111114

    //分类二级导航
    ClassifySecondNav(){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/categoryType",//请求的路径
            async:true,
            data: { 
                type:this.state.test.type
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    if(data!=''){
                        var secondNavArr = [];
                        var secondNavData = data.data;
                        for(var i=0;i<secondNavData.length;i++){
                            if(secondNavData[i].type == 'type'){
                                var  secondNavObj = new Object();
                                secondNavObj.oneTypeName = secondNavData[i].oneTypeName;//二级导航的名称
                                secondNavObj.itemKey = i +'i';
                                secondNavArr.push(secondNavObj)
                            }
                        }
                        _this.setState({secondNavArr:secondNavArr});
                        return true;
                    }else{
                        console.log('5555555')
                    }
            
                }
            }
        });

    }

    //根据条件查询商品
    queryAllProduct(){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsList",//请求的路径
            async:true,
            data: { 
                pageNum:1,
                pageSize:30,
                typeId:this.state.test.type,
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    //console.log(data,'根据条件查询商品')
                    var AllProductArr = [];//goodsName/id/goodPrice/imgUrl
                    var AllProductDataList = data.data.list;
                    for(var i=0;i<AllProductDataList.length;i++){
                        var  AllProductObj = new Object();
                        AllProductObj.itemKey = i +'i';
                        AllProductObj.goodsName = AllProductDataList[i].goodsName;
                        AllProductObj.id = AllProductDataList[i].id;
                        var priceArr = [];
                        var intPrice;
                        var ss;
                        priceArr.push(AllProductDataList[i].goodPrice)
                        for(var p=0;p<priceArr.length;p++){
                        	intPrice = Math.floor(priceArr[p]);
					        if (priceArr[p].length>2){
					            if(priceArr[p].charAt(1)==='.'){
					                ss=priceArr[p].substring(2,4)
					            }
					            if(priceArr[p].charAt(2)==='.'){
					                ss=priceArr[p].substring(3,5)
					            }
					            if(priceArr[p].charAt(3)==='.'){
					                ss=priceArr[p].substring(4,6)
					            }
					            if(priceArr[p].charAt(3)==='.'){
					                ss=priceArr[p].substring(4,5)
					            }

					            if(priceArr[p].charAt(4)==='.'){
					                ss=priceArr[p].substring(5,6)
					            }
					            if(priceArr[p].charAt(5)==='.'){
					                ss=priceArr[p].substring(6,7)
					            }
					        }
                        }
                        AllProductObj.goodPriceInt = intPrice;
                        AllProductObj.goodPriceFloat = ss;
                       
                        AllProductObj.imgUrl = AllProductDataList[i].imgUrl;
                        AllProductArr.push(AllProductObj)
                    }
                     _this.setState({AllProductArr:AllProductArr});
                     return true;
            
                }
            }
        });

    }

    //重新加载
    anewLoading(){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsList",//请求的路径
            async:true,
            data: { 
                pageNum:1,
                pageSize:30,
                typeId:this.state.test.type,
                categoryId:this.state.currentId
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                   // console.log(data,'点击加载id')
                    var clickProductArr = [];//goodsName/id/goodPrice/imgUrl
                    var clickProductDataList = data.data.list;
                    for(var i=0;i<clickProductDataList.length;i++){
                        var  clickProductObj = new Object();
                        clickProductObj.itemKey = i +'i';
                        clickProductObj.goodsName = clickProductDataList[i].goodsName;
                        clickProductObj.id = clickProductDataList[i].id;


                        var priceArr = [];
                        var intPrice;
                        var ss;
                        priceArr.push(clickProductDataList[i].goodPrice)
                        for(var p=0;p<priceArr.length;p++){
                        	intPrice = Math.floor(priceArr[p]);
					        if (priceArr[p].length>2){
					            if(priceArr[p].charAt(1)==='.'){
					                ss=priceArr[p].substring(2,4)
					            }
					            if(priceArr[p].charAt(2)==='.'){
					                ss=priceArr[p].substring(3,5)
					            }
					            if(priceArr[p].charAt(3)==='.'){
					                ss=priceArr[p].substring(4,6)
					            }
					            if(priceArr[p].charAt(3)==='.'){
					                ss=priceArr[p].substring(4,5)
					            }

					            if(priceArr[p].charAt(4)==='.'){
					                ss=priceArr[p].substring(5,6)
					            }
					            if(priceArr[p].charAt(5)==='.'){
					                ss=priceArr[p].substring(6,7)
					            }
					        }
                        }
                        clickProductObj.goodPriceInt = intPrice;
                        clickProductObj.goodPriceFloat = ss;



                        //clickProductObj.goodPrice = clickProductDataList[i].goodPrice;
                        clickProductObj.imgUrl = clickProductDataList[i].imgUrl;
                        clickProductArr.push(clickProductObj)
                    }
                     _this.setState({AllProductArr:clickProductArr});
                     return true;
            
                }
            }
        });

    }


    //点击出现加载
    appearLoading(){
       $('.classifyRelative').show(100);
        var _this = this;
        var cishu = 0;
        $('.cishu').on('click',function(){
            cishu++;
            if(cishu%2!=0){
                $('.classifySecondUl').show(260);
               $('.classifySecondUl').on('click','li',function(){
                 $(this).css({color:'red'})
                $(this).siblings().css({color:'#666'})
                _this.anewLoading()
                $('.classifyRelative').hide(260)
               });
            }else{
                $('.classifySecondUl').hide(260)
            }
        })

    }
  
    //点击销量
    sale_num(){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsList",//请求的路径
            async:true,
            data: { 
                pageNum:1,
                pageSize:30,
                typeId:this.state.test.type,
                isBig:13900001,
                orderType:'sale_num',
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                   var saleList = data.data.list;
                   var saleArr = [];
                   for(var i=0;i<saleList.length;i++){
                    var saleObj = new Object();


                    var priceArr = [];
                        var intPrice;
                        var ss;
                        priceArr.push(saleList[i].goodPrice)
                        for(var p=0;p<priceArr.length;p++){
                        	intPrice = Math.floor(priceArr[p]);
					        if (priceArr[p].length>2){
					            if(priceArr[p].charAt(1)==='.'){
					                ss=priceArr[p].substring(2,4)
					            }
					            if(priceArr[p].charAt(2)==='.'){
					                ss=priceArr[p].substring(3,5)
					            }
					            if(priceArr[p].charAt(3)==='.'){
					                ss=priceArr[p].substring(4,6)
					            }
					            if(priceArr[p].charAt(3)==='.'){
					                ss=priceArr[p].substring(4,5)
					            }

					            if(priceArr[p].charAt(4)==='.'){
					                ss=priceArr[p].substring(5,6)
					            }
					            if(priceArr[p].charAt(5)==='.'){
					                ss=priceArr[p].substring(6,7)
					            }
					        }
                        }
                        saleObj.goodPriceInt = intPrice;
                        saleObj.goodPriceFloat = ss;








                    //saleObj.goodPrice = saleList[i].goodPrice;
                    saleObj.goodsName = saleList[i].goodsName;
                    saleObj.imgUrl = saleList[i].imgUrl;
                    saleObj.id = saleList[i].id;
                    saleObj.itemKey = i + 'i';
                    saleArr.push(saleObj)
                   }
                    _this.setState({AllProductArr:saleArr});
                     return true;
            
                }
            }
        });
    }

    //点击价格
    price(){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsList",//请求的路径
            async:true,
            data: { 
                pageNum:1,
                pageSize:30,
                typeId:this.state.test.type,
                isBig:13900001,
                orderType:'reference_pirce',
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                   var priceList = data.data.list;
                   var priceArr = [];
                   for(var i=0;i<priceList.length;i++){
                    var priceObj = new Object();



                	var price1Arr = [];
                    var intPrice;
                    var ss;
                    price1Arr.push(priceList[i].goodPrice)
                    for(var p=0;p<price1Arr.length;p++){
                    	intPrice = Math.floor(price1Arr[p]);
				        if (price1Arr[p].length>2){
				            if(price1Arr[p].charAt(1)==='.'){
				                ss=price1Arr[p].substring(2,4)
				            }
				            if(price1Arr[p].charAt(2)==='.'){
				                ss=price1Arr[p].substring(3,5)
				            }
				            if(price1Arr[p].charAt(3)==='.'){
				                ss=price1Arr[p].substring(4,6)
				            }
				            if(price1Arr[p].charAt(3)==='.'){
				                ss=price1Arr[p].substring(4,5)
				            }

				            if(price1Arr[p].charAt(4)==='.'){
				                ss=price1Arr[p].substring(5,6)
				            }
				            if(price1Arr[p].charAt(5)==='.'){
				                ss=price1Arr[p].substring(6,7)
				            }
				        }
                    }
                    priceObj.goodPriceInt = intPrice;
                    priceObj.goodPriceFloat = ss;



                    //priceObj.goodPrice = priceList[i].goodPrice;
                    priceObj.goodsName = priceList[i].goodsName;
                    priceObj.imgUrl = priceList[i].imgUrl;
                    priceObj.id = priceList[i].id;
                    priceObj.itemKey = i + 'i';
                    priceArr.push(priceObj)
                   }
                  // console.log(priceArr)
                    _this.setState({AllProductArr:priceArr});
                     return true;
            
                }
            }
        });
    }

    //点击推荐
    //
    recommend(){
        var _this=this; //把this用_this暂代，以免找不到
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsList",//请求的路径
            async:true,
            data: { 
                pageNum:1,
                pageSize:30,
                typeId:this.state.test.type,
                isBig:13900001,
                orderType:'recommend',
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                   var recommendList = data.data.list;
                   var recommendArr = [];
                   for(var i=0;i<recommendList.length;i++){
                        var recommendObj = new Object(); 



                         var priceArr = [];
                        var intPrice;
                        var ss;
                        priceArr.push(recommendList[i].goodPrice)
                        for(var p=0;p<priceArr.length;p++){
                        	intPrice = Math.floor(priceArr[p]);
					        if (priceArr[p].length>2){
					            if(priceArr[p].charAt(1)==='.'){
					                ss=priceArr[p].substring(2,4)
					            }
					            if(priceArr[p].charAt(2)==='.'){
					                ss=priceArr[p].substring(3,5)
					            }
					            if(priceArr[p].charAt(3)==='.'){
					                ss=priceArr[p].substring(4,6)
					            }
					            if(priceArr[p].charAt(3)==='.'){
					                ss=priceArr[p].substring(4,5)
					            }

					            if(priceArr[p].charAt(4)==='.'){
					                ss=priceArr[p].substring(5,6)
					            }
					            if(priceArr[p].charAt(5)==='.'){
					                ss=priceArr[p].substring(6,7)
					            }
					        }
                        }
                       recommendObj.goodPriceInt = intPrice;
                        recommendObj.goodPriceFloat = ss;
                        recommendObj.goodsName = recommendList[i].goodsName;
                        recommendObj.goodPrice = recommendList[i].goodPrice;
                        recommendObj.imgUrl = recommendList[i].imgUrl;
                        recommendObj.id = recommendList[i].id;
                        recommendObj.itemKey = i + 'i';
                        recommendArr.push(recommendObj)
                   }
                    _this.setState({AllProductArr:recommendArr});
                    return true;
                }
            }
        });
    }


  
    





   
}
