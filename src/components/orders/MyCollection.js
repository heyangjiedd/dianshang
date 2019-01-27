/**
 * Created by zhangHeng on 17/11/1.
 * 我的收藏
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import $ from 'jquery'
import {Link} from 'react-router'
import { Icon, Grid } from 'antd-mobile';

export default class MyCollection extends React.Component{
    constructor(props){
        super(props);
        this.state={
            MyCollectionArr:[],
            btnShow: false,
            errorMesg:'',
            idArray:[],
            isShow:false,
            goodsDetail:{},
            goodsNumber:1,
            spec:[],
            specId:'',
            inforMessage:'',
        }
    }

    renderHeaderNav(){
        var lis=[];
        if(this.state.btnShow){

            lis.push(<a className="mui-pull-right manager-collection" key={0}
                        onClick={this.deleteCollection.bind(this)}>删除</a>);
            lis.push(<a className="mui-pull-right manager-collection" key={1}
                        onClick={this.collectionManger.bind(this)}>完成</a>);
        }else{
            lis.push(<a className="mui-pull-right manager-collection" key={1}
                        onClick={this.collectionManger.bind(this)}>管理</a>);
        }
        return lis;
    }

    render(){

        return(
            <div>

                <div style={{height:window.innerHeight,paddingTop:50,position:'relative'}}>
                    <header className="mui-bar mui-bar-nav">
                        <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
                           onClick={this.handClickhish.bind(this)}></a>
                        <h1 className="mui-title collection-nav">我的收藏</h1>
                        {this.renderHeaderNav()}
                    </header>

                    <ul className="mui-table-view">
                        {
                            this.state.MyCollectionArr.length==0?
                                <p className="mui-text-center padding-10">暂无收藏商品</p>:
                                this.state.MyCollectionArr.map((item,index)=>{
                                    return(

                                        <li className="mui-table-view-cell my-collection-item" key={index}>
                                            <div className={this.state.btnShow?'mui-checkbox box-size-checkbox':'display-none'}>

                                                <input  type="checkbox"
                                                        name="defaultAddress"
                                                        defaultChecked={item.isChecked}
                                                        checked={item.isChecked}
                                                        ref='collectionCheckbox'
                                                        onChange={this.checked.bind(this,item,index)}/>
                                            </div>
                                            <img   className="collection-goods-img"
                                                   src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                            <div className="collection-goods-right">
                                                <p className="mui-ellipsis-2 color-block">{item.goodsName+' '+item.spceName}</p>
                                                <h5 style={{lineHeight:2.8}}>
                                                    <span className="margin-right-10 color-red font-size-16">￥{item.goodPrice}</span>
                                                    <span className="font-size-14">￥{item.referencePirce} </span>
                                                    <button className="right-now"
                                                            onClick={this.handClick.bind(this,item.id)}>
                                                        <i className="icon-add-cart"></i>
                                                    </button>
                                                </h5>
                                            </div>
                                        </li>
                                    )
                            })
                        }
                    </ul>
                </div>
                <Navigator/>

                <div className={this.state.isShow?'mui-backdrop mui-active':'mui-backdrop display-none'}
                     style={{width:'100%',borderRadius:0,zIndex:999}} onClick={this.closePuop.bind(this)}>

                    <ul className="mui-table-view popover-position">
                        <li style={{textAlign:"right",padding:10}}>
                            <span onClick={this.closePuop.bind(this)}><Icon type="cross-circle" /></span>
                        </li>
                        <li className="mui-table-view-cell">
                            <div className="mui-pull-left goods-img-left">
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

                <div className="totost" id="errorMessage">
                    <p className="">{this.state.errorMesg}</p>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.myCollection()
    }

    myCollection(){
        //
        var _this=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/mineCollect",//请求的路径
            async:true,
            data: {
                custId:localStorage['id']
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(respones, textStatus){

                if(respones.code==1){

                    //构造选项
                    for(var i=0;i<respones.data.length;i++){
                        respones.data[i].isChecked=false;
                    }

                    _this.setState({
                        MyCollectionArr:respones.data,
                        idArray:[]
                    })


                }

            },
            complete: function(XMLHttpRequest, textStatus){

            }
        });
    }

    collectionManger(){

        if(this.state.btnShow){
            this.setState({btnShow:false})
        }else{
            this.setState({btnShow:true})
        }
    }

    checked(item,index){


        //this.state.MyCollectionArr[index].isChecked = !this.state.MyCollectionArr[index].isChecked;
        var boolean=item.isChecked= !item.isChecked;
        this.state.MyCollectionArr[index].isChecked = boolean;

        this.setState({MyCollectionArr:this.state.MyCollectionArr})

        if(item.isChecked){
            //选中
            this.state.idArray.push(item.collectId);
        }else{
            //未选中
            for(var i=0; i<this.state.idArray.length; i++) {
                if(this.state.idArray[i] == item.collectId) {
                    this.state.idArray.splice(i, 1);
                }
            }
        }
    }

    deleteCollection(){

        if(this.state.idArray.length==0){
            this.setState({errorMesg:'请选择要删除的商品'});
            document.getElementById('errorMessage').style.display='block';
            setTimeout(function () {
                document.getElementById('errorMessage').style.display='none';
            },2000)
        }else{
            for(var i=0;i<this.state.idArray.length;i++){
                console.log(this.state.idArray[i])
                this.deleteCollectById(this.state.idArray[i])
            }
            this.myCollection()
        }

    }

    deleteCollectById(collectId){
        var _this=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/deleteCollectById",//请求的路径
            async:true,
            data: {
                id:collectId
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(respones, textStatus){

                if(respones.code==1){

                    console.log(respones,'responseD')
                    _this.myCollection()
                }

            },
            complete: function(XMLHttpRequest, textStatus){

            }
        });
    }

    handClickhish(){
        history.go(-1)
    }

    /**Add to cart*/
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

    test(){
        console.log(11111111,'test')
    }

    closePuop(){
        this.setState({isShow:false})
    }
}
