/**
 * Created by zhangHeng on 17/6/10.
 */

import React from 'react';
import Navigator from './../tabNavigator/NavigatorMain.js'

export default class LineIndex extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <div>
                <div>this is OnLine</div>
                <Navigator/>
            </div>
        )
    }
}
