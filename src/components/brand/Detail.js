/**
 * Created by zhangHeng on 17/8/4.
 * 更多品牌
 */
import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import {Link,hashHistory} from 'react-router'
import {Toast} from 'antd-mobile'
import { Icon, Grid , Accordion } from 'antd-mobile';

const sort=[
    {title:'人气',isSort:false},
    {title:'销量',isSort:false},
    {title:'价格',isSort:false}
]
export default class Detail extends React.Component{

    constructor(props){
        super(props);
        this.state={
            brandId:this.props.location.state.brandId,
            goodsList:[],
            brandDetail:new Object(),
            sortCurrent:0,
            blooeanArray:[
                {isChecked:false},
                {isChecked:false},
                {isChecked:false}
            ],

            isShow:false,
            goodsDetail:{},
            goodsNumber:1,
            spec:[],
            specId:'',
        }
    }

    sortItemNav (index){

        if(index === this.state.sortCurrent){
            if(this.state.blooeanArray[index].isChecked){
                return 'flex-1 sort-ace'
            }else{
                return 'flex-1 sort-active'
            }
        }

        return 'flex-1'

        //return index === this.state.sortCurrent ? 'flex-1 sort-active' : 'flex-1';
    }

    _renderList(){
        if(this.state.goodsList.length!=0){
            return (
                this.state.goodsList.map((item,index)=>{
                    return (
                        <div key={index} className="classfiy-goods-list-item">
                            <Link to={{pathname:'ProductDetails/'+item.id}}><img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/></Link>
                            <h5 className="title mui-ellipsis-2">{item.goodsName+''+item.spceName}</h5>
                            <h5>
                                <span className="classify-price">￥{item.goodPrice}</span>
                                <button className="right-now" onClick={this.handClick.bind(this,item.id)}><i className="icon-add-cart"></i></button>
                            </h5>
                        </div>
                    )
                })
            )

        }else{
            return <h5 className="mui-text-center">该品牌暂无商品上架！</h5>
        }
    }

    render(){
        const soltHeader=<h5 className="about-brand">
                            <Link>
                                <span className="mui-ellipsis about-brand-history">关于{this.state.brandDetail.name}</span>
                                {/*<Icon type="down"></Icon>*/}
                            </Link>
                            <Link to={{pathname:'/BrandIndex'}}>
                                查看更多品牌
                                {/*<Icon type="right"></Icon>*/}
                            </Link>
                        </h5>
        return (
            <div>
                <header className="mui-bar title-search mui-bar-nav">
                    <a className="mui-action-back mui-pull-left width-90">品牌馆
                    </a>&nbsp;
                    <input className="search" placeholder="请输入商品名称或品牌搜索" onClick={this.toSearch.bind(this)}/>&nbsp;
                    <a className="mui-action-back mui-pull-right header-icon">
                        <img style={{width:'83%'}} src={require('../../images/icon/service.png')}/>
                    </a>
                </header>
                <Navigator/>
                <div className="mui-content">
                    <div className="background-white">
                        <div className="brand-img-name">
                            {/*<img src={'http://116.62.119.165/fileServer/images/'+this.state.brandDetail.logoUrl}/>*/}
                            <h4 className="mui-text-center">{this.state.brandDetail.name}</h4>

                            <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                                <Accordion.Panel header={soltHeader} className="pad">
                                    <h5 className="padding-10 lin-height-17 margin-none font-size-16 color-block">{this.state.brandDetail.brandHonourDesc}</h5>
                                </Accordion.Panel>
                            </Accordion>
                        </div>
                    </div>
                    <div className="goods-sort display-flex">
                        {
                            sort.map((item,index)=>{
                                return (<button className={this.sortItemNav(index)} key={index} onClick={this.sort.bind(this,index)}>
                                    {item.title}<span className="goods-sort-icon"></span></button>)
                            })
                        }
                    </div>
                    <div className="classfiy-goods-list">
                        {this._renderList()}
                    </div>
                </div>

               <div className={this.state.isShow?'mui-backdrop mui-active ':'mui-backdrop display-none'}
                     style={{width:'100%',borderRadius:0,zIndex:999}} onClick={this.closePuop.bind(this)}>
                </div>
                <div className={this.state.isShow?'mui-backdrop mui-active ':'mui-backdrop display-none'}
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

            </div>
        )
    }


    componentDidMount(){
        this.detail(this.state.brandId)
        this.goods(this.state.brandId)
    }

    //品牌详情
    detail(id){
        var self=this
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/brandByBrandId",
            async:true,
            data: {
                brandId:id
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    self.setState({brandDetail:data.data});
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
    }

    //品牌供货
    goods(id,sortKey,sortValue){
        var self=this
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsList",
            async:true,
            data: {
                brandId:id,
                orderType:sortKey,
                isBig:sortValue
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    self.setState({goodsList:data.data.list});
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
    }

    //排序
    sort(index){

        var orderType='';
        var isBig='';
        var array=null;

        var boolean=this.state.blooeanArray[index].isChecked
        boolean = !boolean

        switch (index)
        {
            case 0:
                array=[
                    {isChecked:boolean},
                    {isChecked:false},
                    {isChecked:false}
                ]

                break;
            case 1:
                array=[
                    {isChecked:false},
                    {isChecked:boolean},
                    {isChecked:false}
                ]
                break;
            case 2:
                array=[
                    {isChecked:false},
                    {isChecked:false},
                    {isChecked:boolean}
                ]
                break;
            default:
                break;
        }
        this.setState({
            sortCurrent:index,
            blooeanArray:array
        });


        if(index==0){

            if(this.state.blooeanArray[index].isChecked){
                orderType='recommend';
                isBig='13900001'
            }else{
                orderType='recommend';
                isBig='13900002'
            }

        }else if(index==1){
            if(this.state.blooeanArray[index].isChecked){
                orderType='sale_num';
                isBig='13900001'
            }else{
                orderType='sale_num';
                isBig='13900002'
            }
        }else{
            if(this.state.blooeanArray[index].isChecked){
                orderType='reference_pirce';
                isBig='13900001'
            }else{
                orderType='reference_pirce';
                isBig='13900002'
            }
        }

        this.goods(
            this.state.brandId,
            orderType,
            isBig
        )
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
    toSearch(){
        hashHistory.push({pathname:'/Search'})
    }
    closePuop(){
        this.setState({isShow:false})
    }

}