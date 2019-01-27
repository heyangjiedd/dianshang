/**
 * Created by zhangHeng on 17/7/12.
 */
/**
 * Created by zhangHeng on 17/6/10.
 */

import React from 'react';

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:this.props.title
        }
    }

    render(){
        return(
            <header className="mui-bar mui-bar-nav">
                <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
                                                            onClick={this.handClick.bind(this)}>
                </a>
                <h1 className="mui-title">{this.state.title}</h1>
            </header>
        )
    }

    handClick(){
        history.go(-1);
    }
}
