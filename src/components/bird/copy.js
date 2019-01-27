/**
 * Created by zhangHeng on 17/6/10.
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'
import $ from 'jquery'
import {Link,hashHistory} from 'react-router';
import ScrollView from './../bird/ScrollView.js'

const classifys=[
    {title:'小渡有话说',sayType:'90000'},
    {title:'这就是生活',sayType:'90001'},
    {title:'健康体验馆',sayType:'90002'},
    {title:'健康笔记',sayType:'90003'},
]

export default class BirdIndex extends React.Component{

    constructor(props){
        super(props);
        this.state={
            bannerArr:[],
            current: 0,
            sayType:'90002',
            items: [],
        }

    }


    itemNav(index){
        return index===this.state.current?'active':'';
    }

    render(){

        const {items,sayType} = this.state;
        let lis = [];
        items.length==0?lis.push():
            items.map((item, index) => {
                lis.push(
                    <li key={index}>
                        <Link className="font-size-14" to={{pathname:'/WritNote/'+item.id}}>
                            <div className="birdSay-item">
                                <div className="say-left-img">
                                    {
                                        item.imgUrl==null?<img src={require('./../../images/background/defaultBird.jpg')}/>
                                            :<img src={'http://116.62.119.165/fileServer/images/'+item.imgUrl}/>
                                    }
                                </div>
                                <div className="say-right-content">
                                    <p className="font-size-16 color-block" style={{fontWeight:500}}>
                                        {item.title}
                                        {
                                            item.isHot=='13900002'?null:<span className="icon-hot"></span>
                                        }
                                    </p>
                                    <h5 className="mui-ellipsis-2 say-introduction">
                                        <span className="margin-right-10">{item.introduction}.....</span>
                                    </h5>
                                    <p className="margin-bottom-zero font-size-12">
                                        <span className="margin-right-10">创建时间:{new Date(item.createTime).toLocaleDateString()}</span>
                                        <span className="margin-right-10">阅读:{item.reading}</span>
                                        <span className="margin-right-10">评论:{item.praise}</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </li>
                );
            })

        return(
            <div>
                <div style={{height:window.innerHeight,paddingTop:103,position:'relative'}}>
                    <div style={{position:'absolute',top:0,left:0,width:window.innerWidth,zIndex:10}}>
                        <div className="say-header">
                            <input placeholder="文章关键字查找"/>
                            <button className="mui-pull-right"></button>
                        </div>
                        <ul className="birdSay">
                            {
                                classifys.map((item,index)=>{
                                    return (
                                        <li key={index}
                                            className={ this.itemNav(index)}
                                            onClick={this.handClick.bind(this,index,item.sayType)}>
                                            {item.title}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    {
                        items.length<5?<ul>{lis}</ul>:<ScrollView type={sayType}/>
                    }
                </div>
                <Navigator/>
            </div>
        )
    }


    componentDidMount() {
        this.fetchItems(this.state.sayType);
    }

    fetchItems(sayType) {
        $.ajax({
            url: 'http://116.62.119.165/shop-portal/swagger/api/getSayList',
            data: {
                pageNum: this.page,
                pageSize:10,
                sayType:sayType,
                sidx:'create_time',
                sord:'desc'
            },
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                if(response.code==1){
                    this.setState({
                        items: response.data.list,
                    },()=>{});
                }
            }
        });
    }

    handClick(index,sayType){
        this.setState({
            current:index,
            items:[],
            sayType:sayType
        },()=>{console.log(this.state.sayType,'type')});
        this.fetchItems(sayType);
    }

}
