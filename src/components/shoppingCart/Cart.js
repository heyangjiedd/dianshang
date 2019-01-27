/**
 * Created by zhangHeng on 17/11/3.
 */
/**
 * Created by zhangHeng on 17/7/5.
 */

import React from 'react';
import {hashHistory} from 'react-router'
import NavigatorMain from './../tabNavigator/NavigatorMain'
import Header from './../../components/tab/Header'

export default class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            custId: this.props.location.query.accountId,
            list: [],
            postageAndTaxes:{},
            checkedArray:[]
        }
    }

    _render(){

        if(this.state.list.length!=0){

            return this.state.list.map((item,index)=>{
                return(
                    <ul className="mui-table-view" key={index}>
                        <li className="mui-table-view-cell">{item.areaName}</li>
                        {
                            item.list.map((itemOne,itemKey)=>{
                                return(
                                    <li className="mui-table-view-cell" key={itemKey}>
                                        <div className="display-flex">
                                            <div className="mui-checkbox box-size-checkbox">
                                                <input type="checkbox" name="defaultAddress"
                                                       defaultChecked={itemOne.isChecked}
                                                       checked={itemOne.isChecked}
                                                       value={itemOne.isChecked}
                                                       onChange={this.itemCheck.bind(this,index,itemKey)}
                                                />
                                            </div>
                                            <div className="item-good-img">
                                                <img src={'http://116.62.119.165/fileServer/images/'+itemOne.goodsImgUrl}/>
                                            </div>
                                            <div className="goods-infor">
                                                <h5 className="mui-ellipsis-2 lin-height-17 color-block">
                                                    {itemOne.goodsName}
                                                </h5>
                                                <span className="fontSize-12">
                                                <span className="font-size-12">￥</span>
                                                <span className="font-size-16 color-red">{parseInt(itemOne.goodsPrice)*parseInt(itemOne.goodsCcount)}</span>
                                                <small className="color-red">
                                                    {this.getnum((itemOne.goodsPrice*itemOne.goodsCcount)+'')}
                                                </small>
                                            </span>
                                                <div className="mui-numbox">
                                                    <button className="mui-btn mui-btn-numbox-minus" type="button"
                                                            onClick={this.numberChange.bind(this,-1,itemOne)}
                                                    >-</button>
                                                    <input className="mui-input-numbox" type="number" value={itemOne.goodsCcount}/>
                                                    <button className="mui-btn mui-btn-numbox-plus" type="button"
                                                            onClick={this.numberChange.bind(this,1,itemOne)}
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mui-text-right margin-top-10">
                                            <a className="btn-deletle" onClick={this.deletelGood.bind(this,itemOne.id)}></a>
                                        </div>

                                    </li>
                                )
                            })
                        }

                        <li className="position-relative">
                            <div className="good-check-all">
                                <label className="check-all">
                                    <input type="checkbox"
                                           defaultChecked={item.isChecked}
                                           checked={item.isChecked}
                                           value={item.isChecked}
                                           onChange={this.handChange.bind(this,item,index)}/>
                                    全选
                                </label>
                            </div>

                            <div className="goods-total-price">
                                <h5>已选<span>{item.totalNumber}</span>件商品(运费
                                    <span>
                                        {this.state.postageAndTaxes.index!=null
                                        &&this.state.postageAndTaxes.index==index?this.state.postageAndTaxes.postage.toFixed(2):0}
                                    </span>,
                                    税费
                                    <span>
                                         {this.state.postageAndTaxes.index!=null
                                         &&this.state.postageAndTaxes.index==index?this.state.postageAndTaxes.taxes.toFixed(2):0}
                                    </span>)
                                </h5>
                                <h5>合计：
                                    <span>
                                        {item.totalPrice}
                                        <small>{this.getnum(item.totalPrice+'')}</small>
                                    </span>
                                </h5>
                            </div>
                            <div className="pay-money-now" onClick={this.settleAccounts.bind(this,item)}>结算</div>
                        </li>
                    </ul>
                )
            })

        }else{
            return (<p className="mui-text-center padding-10">你的购物车空空如也，赶快去添砖加瓦吧</p>)
        }
    }

    render(){
        return(
            <div>

                <Header title="购物车"/>

                <NavigatorMain/>
                <div className="mui-content shopping-cart"
                     style={{paddingTop:44,paddingBottom:50,height:window.innerHeight,overflowY:'auto'}}>
                    {
                        this._render()
                    }
                </div>
                <div className="totost" id="errorMesg">
                    <p className="">请选择商品在结算</p>
                </div>


                <div className="totost" id="message">
                    <p className="" style={{width:'90%'}}>您还未登录，请到登录页进行登录</p>
                </div>

            </div>
        )
    }

    componentDidMount(){

        //判断用户是否登录
        if(localStorage['id']==undefined || localStorage['id']==null){
          var isLoading=false;
          document.getElementById('message').style.display='block';
          setTimeout(function () {
              document.getElementById('message').style.display='none';
              isLoading=true
          },200)

          var timer = setInterval(function(){
             if(isLoading){
                  clearInterval(timer);
                  hashHistory.push({pathname:'/Login'});
              }
          },100);
        }

        //获取列表
        this.shopCarList();
    }

    shopCarList(){
        var self=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/shopCar",
            async: true,
            data: {
                custId:localStorage['id']
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //todo
            },

            success: function (data, textStatus) {
                if (data.code == 1) {
                    //税费查询构造参数
                    var Alist=new Array();

                    for (var i=0;i<data.data.length;i++)
                    {
                        data.data[i].totalNumber=0;
                        data.data[i].totalPrice=0;
                        data.data[i].isChecked=false;

                        for(var j=0; j<data.data[i].list.length;j++)
                        {
                            var params=new Object()

                            params.id= data.data[i].list[j].specId;
                            params.number= data.data[i].list[j].goodsCcount;
                            data.data[i].list[j].isChecked=false

                            Alist.push(params)
                        }
                    }

                    self.setState({list:data.data})
                    //self.queryTaxesAndPostage(Alist)
                }
            },

            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function () {

            }

        })
    }

    //去float后两位
    getnum(float){
        var array = float.split('.',2)
        if(array.length==1){
            return '.00';
        }
        return array[array.length-1]
    }

    //删除商品
    deletelGood(id,event){
        var self=this;
        const custId=localStorage['id']
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/deleteGoodsById",
            async: true,
            data: {
                id:id
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //todo
            },

            success: function (data, textStatus) {
                console.log(data.code)
                if (data.code == 1) {
                    self.shopCarList()
                }
            },

            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function () {

            }

        })
    }

    //商品数量加减
    numberChange(type,obj,event){

        var defaultNumber=obj.goodsCcount
        if(type==-1){
            if(defaultNumber==1) {
                console.log('商品数量不能小于1')
                return
            }
            defaultNumber--;
            this.updateNum(obj.id,defaultNumber)
        }
        else{
            defaultNumber++;
            this.updateNum(obj.id,defaultNumber)
        }

    }

    //更新商品数量
    updateNum(cardId,goodsNumber){
        var self=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/updateNum",
            async: true,
            data: {
                id:cardId,
                num:goodsNumber
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //todo
            },

            success: function (data, textStatus) {
                if (data.code == 1) {
                    self.shopCarList()
                }
            },

            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function () {

            }

        })
    }

    //全选或去掉全选
    handChange(item,index,event){

        var defaultObj=this.state.list
        var goodsNumber=0;
        var itemGoodsPrice=0;
        var array=new Array();

        this.state.list[index].isChecked=!this.state.list[index].isChecked;

        for(var i=0;i<defaultObj[index].list.length;i++){

            defaultObj[index].list[i].isChecked = this.state.list[index].isChecked;

            if(defaultObj[index].list[i].isChecked==true)
            {
                var object=new Object();
                goodsNumber+=parseInt(defaultObj[index].list[i].goodsCcount);

                itemGoodsPrice+=parseInt(defaultObj[index].list[i].goodsCcount)*
                    parseInt(defaultObj[index].list[i].goodsPrice);

                object.id=defaultObj[index].list[i].specId;
                object.number=defaultObj[index].list[i].goodsCcount;

                array.push(object)
            }
        }

        this.queryTaxesAndPostage(array,index);

        defaultObj[index].totalNumber=goodsNumber;
        defaultObj[index].totalPrice=itemGoodsPrice;

        this.setState({list:defaultObj})
    }

    //每个商品选择
    itemCheck(index,itemKey,item){

        var array=new Array();
        var object=new Object();
        var defaultData=this.state.list;
        var checked=defaultData[index].list[itemKey].isChecked;
        checked = !checked;
        defaultData[index].list[itemKey].isChecked=checked
        if(defaultData[index].list[itemKey].isChecked==true){

            var a = false;
            var lengths = this.state.list[index].list;
            for(let i = 0; i < lengths.length;i++){
                if(lengths[i].isChecked !==true ){
                    break;
                }else if(lengths.length - 1 === i){
                    a = true;
                }
            }
            console.log(a);
            this.state.list[index].isChecked = a;


            defaultData[index].totalNumber+= parseInt(defaultData[index].list[itemKey].goodsCcount);
            defaultData[index].totalPrice+=parseInt(defaultData[index].list[itemKey].goodsCcount)*
                parseInt(defaultData[index].list[itemKey].goodsPrice)

            //查询商品邮费和税费
            object.id=defaultData[index].list[itemKey].specId;
            object.number=defaultData[index].list[itemKey].goodsCcount;

            array.push(object)

            this.queryTaxesAndPostage(array,index);


        }else{
            //去掉全选
            this.state.list[index].isChecked=false;

            defaultData[index].totalNumber-= parseInt(defaultData[index].list[itemKey].goodsCcount);
            defaultData[index].totalPrice-=parseInt(defaultData[index].list[itemKey].goodsCcount)*
                parseInt(defaultData[index].list[itemKey].goodsPrice)

            this.queryTaxesAndPostage(array,index);

        }

        this.setState({list:defaultData})
    }

    //结算
    settleAccounts(item){

        //参数拼接
        var idArray=new Array();
        for (var i=0;i<item.list.length;i++){
            if(item.list[i].isChecked==true){

                var object=new Object();
                object.id=item.list[i].id;
                object.specId=item.list[i].specId;
                object.number=item.list[i].goodsCcount;
                idArray.push(object)
            }
        }

        if(idArray.length==0){
            document.getElementById('errorMesg').style.display='block';
            setTimeout(function () {
                document.getElementById('errorMesg').style.display='none'
            },2000);

            return false;
        }

        hashHistory.push({pathname:'/CardIndex',
            state:{
                accountId:localStorage['id'],
                shopCarIds:idArray,
                type:-1
            }
        })
    }

    //获取商品税费
    queryTaxesAndPostage(array,index){

        if(array.length==0){
            var defaultData={
                postage:0,
                taxes:0
            }
            this.setState({postageAndTaxes:defaultData})
            return false;
        }

        var self=this;
        $.ajax({
            url: "http://116.62.119.165/shop-portal/shopcar/queryTaxesAndPostage",
            type: "POST",
            contentType :'application/json;charset=utf-8',
            dataType:"json",
            async:false,
            data:JSON.stringify(array),
            complete: function() {

            },
            success: function(data) {

                data.index=index
                self.setState({postageAndTaxes:data},()=>{})
            }
        });
    }

    //支付
}