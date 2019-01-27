/**
 * Created by zhangHeng on 17/6/20.
 * 设置性别
 */
import React from 'react';
import $ from 'jquery';
import Header from './../../components/tab/Header'
import {Link,hashHistory} from 'react-router';

export default class CustSex extends React.Component{
    constructor(props){
        super(props);
        this.state={
            sex:this.props.location.query.sex,
        }
    }

   render(){
        return(
            <div>
                <Header title="选择性别"/>
                <div className="mui-content">
                    <form className="mui-input-group">
                        <div className="mui-input-row mui-radio">
                            <label>男</label>
                            <input name="radio1" type="radio"
                                   defaultChecked={this.state.sex==1?true:false}
                                   onChange={this.handChange.bind(this,1)}/>
                        </div>
                        <div className="mui-input-row mui-radio">
                            <label>女</label>
                            <input name="radio1" type="radio"
                                   defaultChecked={this.state.sex==2?true:false}
                                   onChange={this.handChange.bind(this,-1)}/>
                        </div>
                    </form>

                    <div>

                        {/*<div className="sex-item">*/}
                            {/*<input type="radio" name="sex" id="man" onChange={this.savaSex.bind(this,1)}/>*/}
                            {/*<label htmlFor="man">男</label>*/}
                        {/*</div>*/}
                        {/*<div className="sex-item">*/}
                            {/*<input type="radio" name="sex" id="woman" onChange={this.savaSex.bind(this,-1)}/>*/}
                            {/*<label htmlFor="woman">女</label>*/}
                        {/*</div>*/}
                    </div>
				</div>
            </div>
        )
    }
    componentDidMount(){
        console.log(this.state.sex)
    }

    handChange(type,e){

        var sex=type==1?1:2
        $.ajax({
            type: "get",//请求的方式为get
            url: "http://116.62.119.165/shop-portal/swagger/api/updateCust",//请求的路径
            async:true,
            data: {
                id:localStorage['id'],
                custSex:sex,
            },
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(data, textStatus){
                if(data.code==1){
                    hashHistory.push({
                        pathname:'/PersonInfor'
                    })
                }
            }
        });
    }

}