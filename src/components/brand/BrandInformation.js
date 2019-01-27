/**
 * Created by zhangHeng on 17/9/2.
 * 品牌详情
 */

import React from 'react'
import Header from "../tab/Header";
import Navigator from './../tabNavigator/NavigatorMain.js'
import {Link,hashHistory} from 'react-router'

export default class BrandInformation extends React.Component{

    constructor(props){
        super(props)
        this.state={
            brandId:this.props.location.query.brandId,
            brandDetail:new Object(),
        }
    }

    render(){
        return (
            <div>
                <Header title="品牌详情"/>
                <Navigator/>
                <div className="mui-content">
                    <div className="background-white">
                        <div className="brand-img-name">
                            <img src={'http://116.62.119.165:8080/fileServer/images/'+this.state.brandDetail.logoUrl}/>
                            <h4 className="mui-text-center">{this.state.brandDetail.name}</h4>
                            <h5 className="about-brand">
                                <Link to={{pathname:'/Refresh',query:{brandId:this.state.brandId}}}>
                                    <span className="mui-ellipsis about-brand-history">关于{this.state.brandDetail.name}</span>
                                    <i className="mui-icon mui-icon-arrowdown"></i>
                                </Link>
                                <Link to={{pathname:'/BrandIndex'}}>查看更多品牌<i className="mui-icon mui-icon-arrowright"></i></Link>
                            </h5>
                        </div>
                    </div>
                    <ul className="mui-table-view">
                        <li className="mui-table-view-cell brand-information">
                            <h4>品牌简介<span> Introduction To The Brand</span></h4>
                            <p>{this.state.brandDetail.brandHonourDesc}</p>
                        </li>
                        <li className="mui-table-view-cell brand-information">
                            <h4>{this.state.brandDetail.name}之最<span> Now The Most</span></h4>
                            <p>品牌之最</p>
                        </li>
                        <li className="mui-table-view-cell brand-information">
                            <h4>专家团队<span> Team Of Exeperts</span></h4>
                            <p>专家团队</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    componentWillMount() {
       console.log(this.state.brandId)
       this.detail(this.state.brandId)
    }

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
}