/**
 * Created by zhangHeng on 17/6/30.
 */

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class TabController extends Component {
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
                <ul className="scroll-header">
                    {
                        React.Children.map(this.props.children,(element,index) => {
                            return (
                                <li onClick={ () => { this.setState({ current: index }) } } className={ this.itemNav(index) }>{ element.props.name }</li>
                            )
                        })
                    }
                </ul>
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

    }

}