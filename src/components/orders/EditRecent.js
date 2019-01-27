/**
 * Created by zhangHeng on 17/6/10.
 * 我的收藏
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import $ from 'jquery'
import {Link} from 'react-router'
export default class areaGuan extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <div>
                <header className="mui-bar mui-bar-nav">
                    <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                    <h1 className="mui-title">最近浏览</h1>
                    <a className="mui-pull-right manager-collection">删除</a>
                    <a className="mui-pull-right manager-collection">取消</a>
                </header>
                <div className="mui-content deletle-receent">
                    <ul className="mui-table-view">
                        <li className="mui-media mui-table-view-cell">
                            <san className='receive-time'>2017.01.23</san>
                            <span className="btn-select btn-select-active"></span>
                        </li>
                        <li className="mui-media mui-table-view-cell">
                            <a className="evaluation-goods">
                                 {/*<img className="mui-media-object mui-pull-left" src="">*/}
                                <div className="shopping-cart">
                                    <p className='mui-ellipsis-2 infor margin-bttom-10'>反对方的身份大哥放个地方广泛的个地方的规定风格和奋斗,的规定官方官方的回答更好的化工股份</p>
                                    <p className='mui-ellipsis'>
                                        <span className="mui-pull-left current-price">￥524.25</span>
                                        <span className="mui-pull-left cost-price">￥524.25</span>
                                        <span className="btn-select"></span>
                                    </p>
                                </div>
                            </a>                
                        </li>
                        <li className="mui-media mui-table-view-cell">
                            <a  className="evaluation-goods">
                                {/*<img className="mui-media-object mui-pull-left" src="">*/}
                                <div className="shopping-cart">
                                    <p className='mui-ellipsis-2 infor margin-bttom-10'>反对方的身份大哥放个地方广泛的个地方的规定风格和奋斗,的规定官方官方的回答更好的化工股份</p>
                                    <p className='mui-ellipsis'>
                                        <span className="mui-pull-left current-price">￥524.25</span>
                                        <span className="mui-pull-left cost-price">￥524.25</span>
                                        {/*<!--<span className="mui-pull-right add-shopping-car">加入购物车</span>-->*/}
                                        <span className="btn-select active"></span>
                                    </p>
                                </div>
                            </a>                
                        </li>
                    </ul>
                    
                    <ul className="mui-table-view">
                        <li className="mui-media mui-table-view-cell">
                            <san className='receive-time'>2017.01.23</san>
                            <span className="btn-select"></span>
                        </li>
                        <li className="mui-media mui-table-view-cell">
                            <a  className="evaluation-goods">
                                {/*<img className="mui-media-object mui-pull-left" src="">*/}
                                <div className="shopping-cart">
                                    <p className='mui-ellipsis-2 infor margin-bttom-10'>反对方的身份大哥放个地方广泛的个地方的规定风格和奋斗,的规定官方官方的回答更好的化工股份</p>
                                    <p className='mui-ellipsis'>
                                        <span className="mui-pull-left current-price">￥524.25</span>
                                        <span className="mui-pull-left cost-price">￥524.25</span>
                                        <span className="btn-select"></span>
                                    </p>
                                </div>
                            </a>                
                        </li>
                        <li className="mui-media mui-table-view-cell">
                            <a  className="evaluation-goods">
                                {/*<img className="mui-media-object mui-pull-left" src="">*/}
                                <div className="shopping-cart">
                                    <p className='mui-ellipsis-2 infor margin-bttom-10'>反对方的身份大哥放个地方广泛的个地方的规定风格和奋斗,的规定官方官方的回答更好的化工股份</p>
                                    <p className='mui-ellipsis'>
                                        <span className="mui-pull-left current-price">￥524.25</span>
                                        <span className="mui-pull-left cost-price">￥524.25</span>
                                        {/*<!--<span className="mui-pull-right add-shopping-car">加入购物车</span>-->*/}
                                        <span className="btn-select active"></span>
                                    </p>
                                </div>
                            </a>                
                        </li>
                    </ul>
                </div>
                <Navigator/>
            </div>
        )
    }
}
