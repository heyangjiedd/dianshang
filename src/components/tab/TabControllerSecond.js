/**
 * Created by zhangHeng on 17/6/30.
 */

import React, { Component } from 'react';

export default class TabControllerSecond extends Component {
    constructor(props){
        super(props);
        this.state = {
            current: 0,
            test:this.props.tabClass,
        };
    }

    itemNav (index){
        return index === this.state.current ? 'item-title active' : 'item-title';
    }

    itemCon(index){
        return index === this.state.current ? 'con active' : 'con';
    }

    render(){
        return (
            <div className={this.props.tabClass}>
                <div className="scroll-header overflow-x-auto">
                    <ul className="scroll-content">
                        {
                            React.Children.map(this.props.children,(element,index) => {
                                return (
                                    <li onClick={ () => { this.setState({ current: index }) ,this.props.callbackFun} } className={ this.itemNav(index) }>{ element.props.name }</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="itemCon">
                    {
                        React.Children.map(this.props.children, (element,index) => {
                            return (
                                <div onClick={ () => { this.setState({ current: index }) } } className={ this.itemCon(index) }>{ element }</div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }

    componentDidMount(){
       // var ulEle=document.getElementsByClassName('scroll-content')[0];
       // var li=ulEle.getElementsByTagName('li');
       // var totalWidth=0;
       // for(var i=0;i<li.length;i++){
       //     totalWidth+=li[i].offsetWidth
       // }
       // ulEle.style.width=totalWidth+'px'
    }

}