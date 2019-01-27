/**
 * Created by zhangHeng on 17/10/16.
 * 商品搜索
 */

import React from 'react'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll'
import {Link,hashHistory} from 'react-router';
import Header from "../tab/Header";
import Navigator from "../tabNavigator/NavigatorMain";
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';

export default class Search extends React.Component{

    constructor(props){
        super(props)
        this.state={
            list: [],
            currentPage: 1,
            lastPage: false,
            message:'',
            isShow:false,
            goodsDetail:{},
            goodsNumber:1,
            spec:[],
            specId:'',
            inforMessage:'',

            value:''
        }
    }



    render(){

        const {list} = this.state;
        let lis = [];
        this.state.list.length==0?lis.push():
            this.state.list.map((item, index) => {
                lis.push(
                    <li className="classfiy-goods-list-item" key={index}>
                        <Link to={{pathname:'ProductDetails/'+item.id}}>
                            <img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                        </Link>
                        <h5 className="mui-ellipsis-2 max-height-27">{item.goodsName}</h5>
                        <h5>
                            <span className="classify-price">￥{item.goodPrice}</span>
                            <button className="right-now"  onClick={this.handClick.bind(this,item.id)}><i className="icon-add-cart"></i></button>
                        </h5>
                    </li>
                );
            })

        return (
            <div>
                <div   style={{height:window.innerHeight,paddingTop:44,paddingBottom:50}}>
                    <header className="title-search mui-bar-nav">
                        <input className="search margin-right-10" placeholder="请输入商品名称或品牌搜索"
                               value={this.state.value}
                               onChange={this.onChange.bind(this)}
                                style={{borderRadius:2,background:'none'}}/>
                        <button className="title-ico" onClick={this.loadData.bind(this)} style={{background:'#FF0000',color:'#fff'}}>搜索</button>
                    </header>
                    <Navigator/>
                    <div className="position-relative bac-qianhuang">
                        {
                            this.state.list.length>20?
                                <ReactIScroll iScroll={iScroll}
                                              options={this.props.options}
                                              handleRefresh={this.handleRefresh.bind(this)}
                                              className="example">
                                    <ul className="classfiy-goods-list">
                                        {lis}
                                    </ul>
                                </ReactIScroll>
                                :
                                <ul className="classfiy-goods-list" style={{overflowY:'scroll'}}>
                                    {lis}
                                </ul>
                        }

                    </div>
                </div>
                <div className={this.state.isShow?'mui-bar-backdrop mui-backdrop mui-active':'mui-bar-backdrop mui-backdrop display-none'}
                     style={{width:'100%',borderRadius:0,zIndex:999}}>

                    <ul className="mui-table-view popover-position">
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
                <div className={this.state.isShow?'mui-backdrop mui-active':''}></div>

            </div>
        )
    }

    componentWillMount() {
//      this.loadData();
    }


    handleRefresh(downOrUp, callback) {
        //真实的世界中是从后端取页面和判断是否是最后一页
        let {currentPage, lastPage} = this.state;
        if (downOrUp === 'up') { // 加载更多
            if (currentPage === 5) {
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
        }, () => {this.loadData(downOrUp, callback);});
    }

    loadData(downOrUp, callback) {
        const currentPage = this.state.currentPage;
        var _this=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/goodsList",
            async:true,
            data: {
                search:_this.state.value,
                pageNum:currentPage,
                pageSize:40,
                isBig:'13900001'
            },
            dataType: 'json',
            success:(response)=>{
                setTimeout(()=>{
                    const {list} = this.state;
                    this.setState({list: downOrUp === 'up' ? _this.state.list.concat(response.data.list) : response.data.list}
                        ,()=>{_this.state.list});
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                })
            },
            error:()=>{
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }
        })

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

    onChange(e){
        this.setState({
            value:e.target.value
        })
    }

}

Search.defaultProps={
    options:{
        scrollbars: true,
        mouseWheel: false,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        scrollY: true,
        probeType: 2,
        bindToWrapper: true,
        click: true,
        taps:true,
    }
}


