/**
 * Created by zhangHeng on 17/6/10.
 * 写评价
 */

import React from 'react';
import Header from './../../components/tab/Header'
import {Button,Toast} from 'antd-mobile'


const evaluation=[
    {label:'强推',value:'30400001',isChecked:true},
    {label:'推荐',value:'30400002',isChecked:false},
    {label:'一般',value:'30400003',isChecked:false},
    {label:'不推荐',value:'30400004',isChecked:false},
]

export default class WritingEvaluation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            orderId:this.props.location.query.orderId,
            orderDetail:[],
            evaluationContent:'',
        }
    }


    renderGoods(){
        if(this.state.orderDetail.length!=0){
            {
                return this.state.orderDetail.map((item,index)=>{
                    return(
                        <div key={index}>
                            <ul className="mui-table-view">
                                {
                                    this.state.orderDetail[index].orderDetailList.length==0?null:
                                        this.state.orderDetail[index].orderDetailList.map((child,childIndex)=>{
                                            return (
                                                <li className="mui-table-view-cell goods" key={childIndex}>
                                                    <img className="mui-media-object mui-pull-left" style={{maxWidth:76,height:76,lineHeight:76}}
                                                    src={'http://116.62.119.165/fileServer/images/'+child.imageUrl}/>
                                                    <div className="mui-media-body">
                                                        <p className='mui-ellipsis-2 item-good-name'>{child.goodName}</p>
                                                        <p className='mui-ellipsis'>
                                                        <span className="mui-pull-left current-price">￥{child.goodPrice}</span>
                                                        <span className="mui-pull-right goods-number">{child.goodNumber}</span>
                                                        </p>
                                                    </div>
                                                </li>
                                            )
                                        })
                                }

                            </ul>
                            <div className="mui-content-padded">
                                {
                                    item.evaluation.map((evaluationItem,evaluationIndex)=>{
                                        return(<span className={evaluationItem.isChecked?'evaluation-item active':'evaluation-item'}
                                                     key={evaluationIndex}
                                                     onClick={this.handClick.bind(this,item,evaluationIndex,index)}>
                                                {evaluationItem.label}
                                                </span>)
                                    })

                                }
                            </div>

                            <div className="mui-content-padded">
                                <textarea placeholder="意见反馈"
                                 name="wordContext"
                                 className="margin-bottom-zero border-none textarea-min-height"
                                 value={this.state.evaluationContent}
                                 onChange={this.handChange.bind(this)}>312312</textarea>
                            </div>
                            <div className="mui-content-padded">
                                <Button type="warning" onClick={this.saveEvaluation.bind(this,item)}>提交评价</Button>
                            </div>
                        </div>
                    )
                })
            }

        }else {
            return null;
        }
    }

    render(){
        return(
            <div>
                <Header title="写评价"/>
                <div className="mui-content">
                    {this.renderGoods()}
                </div>

                <div className="totost" id="message">
                    <p className="">亲，写点什么吧！</p>
                </div>




            </div>
        )
    }

    componentDidMount(){
        this.orderDetail(this.state.orderId) //获取订单详情
    }

    saveEvaluation(item){

        if(this.state.evaluationContent==''){
            Toast.info('评价内容不能为空', 2, null, false);
            return false;
        }

        var arrayId=new Array(),scoreValue;

        for(var i=0;i<item.orderDetailList.length;i++){
            arrayId.push(item.orderDetailList[i].goodId)
        }

        item.evaluation.map((item)=>{
            if(item.isChecked){
                scoreValue=item.value
            }
        })

        let pramas={
            wordContext:this.state.evaluationContent,
            custScore:scoreValue,
            goodsId:arrayId.join(','),
            orderId:item.id,
            custId:localStorage['id']
        }

        var _this=this;
         $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/saveGoodsWord",//请求的路径
            async:true,
            data: pramas,
            dataType: 'json',
            success: function(response, textStatus){
                if(response.code==1){
                    _this.orderDetail()
                    Toast.info(response.message, 2, null, false);
                }else {
                    Toast.info(response.message, 2, null, false);
                }
            }
        })

    }
    
    orderDetail(){
        var _this=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/mineOrder",
            async:true,
            data: {
                pageNum:1,
                pageSize:20,
                custId:localStorage['id'],
                orderStatus:'10014'
            },
            dataType: 'json',
            success: function(response, textStatus){
                console.log(response,'////')
                if(response.code==1){

                    if(response.data.length!=0){


                        response.data.map((item,index)=>{
                            item.evaluation=evaluation
                        })
                        console.log(response.data)
                        _this.setState({orderDetail:response.data},)
                    }else{
                        Toast.info('糟糕！没有更多数据无法评价了', 2, null, false);
                        return false;

                    }
                }
            }
        })
    }

    handChange(e){
        this.setState({evaluationContent:e.target.value})
    }

    /**评价等级处理**/
    handClick(item,_index,index){


        //console.log(item,'item')
        console.log(_index,'_index')

        const {orderDetail}=this.state

        item.evaluation.map((item,evIndex)=>{
            if(_index==evIndex){
                item.isChecked=true
            }else{
                item.isChecked=false
            }
        })

        // console.log(item,'item1111')
        //
        // console.log(orderDetail[index],'test')

        orderDetail[index].evaluation=item.evaluation;

        console.log(orderDetail)

        this.setState({
            orderDetail:orderDetail
        })


      //   orderDetail[index].evaluation=objArray
      //
      //
      // this.setState({
      //     orderDetail:orderDetail
      // },()=>{console.log(orderDetail)})
    }
}
