/**
 * Created by zhangHeng on 17/9/12.
 */


import React from 'react'
import {Link,hashHistory} from 'react-router';
import Navigator from './../tabNavigator/NavigatorMain.js';

export default class Index extends React.Component{


    render(){
        return (

        <div>
            <header className="mui-bar title-search mui-bar-nav">
                <a className="mui-action-back mui-pull-left width-90">地区馆
                </a>&nbsp;
                <input className="search" placeholder="请输入商品名称或品牌搜索" onClick={this.toSearch.bind(this)}/>&nbsp;
                <a className="mui-action-back mui-pull-right header-icon">
                    <img style={{width:'83%'}} src={require('../../images/icon/service.png')}/>
                </a>
            </header>
            <Navigator/>
            <ul className="mui-content" style={{height:window.innerHeight}}>
                <li className="total-classify">
                    <div className="classfiy-item-one">
                        <Link to={{pathname:'/Classify',state:{id:'d9466b7cc6d143c897389ebfb6fab3c0',type:'10111111'}}}>
                            <span className="background-classify"></span>
                        </Link>
                        <h4 className="mui-text-center font-size-16">魅力女性</h4>
                    </div>
                    <div className="classfiy-item-one">
                        <Link to={{pathname:'/Classify',state:{id:'01dcd412a2e9425d9cc03b03fd28314b',type:'10111112'}}}>
                            <span className="background-classify classify-man"></span>
                        </Link>
                        <h4 className="mui-text-center font-size-16">男士必备</h4>
                    </div>
                </li>
                <li className="total-classify">
                    <div className="classfiy-item-one">
                        <Link to={{pathname:'/Classify',state:{id:'3ee76350462345259ca656857439eadf',type:'10111113'}}}>
                            <span className="background-classify classify-baby"></span>
                        </Link>
                        <h4 className="mui-text-center font-size-16">健康宝贝</h4>
                    </div>
                    <div className="classfiy-item-one">
                        <Link to={{pathname:'/Classify',state:{id:'7255c4ca7efa4c6eaf5acdbe16654584',type:'10111114'}}}>
                            <span className="background-classify classify-all"></span>
                        </Link>
                        <h4 className="mui-text-center font-size-16">综合养护</h4>
                    </div>
                </li>
            </ul>
        </div>

        )
    }

    componentWillMount() {

    }
    toSearch(){
        hashHistory.push({pathname:'/Search'})
    }
}