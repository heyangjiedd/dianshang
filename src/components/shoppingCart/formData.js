/**
 * Created by zhangHeng on 17/7/10.
 */
/**
 * Created by zhangHeng on 17/7/8.
 */
import React from 'react';
import FileInput from './../FileUp/FileInput'
import {hashHistory} from 'react-router'

export default class CardUpload extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data:this.props.location.query,
        }
    }

    render() {
        return (
            <div>
                <header className="mui-bar mui-bar-nav">
                    <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                    <h1 className="mui-title">身份证上传</h1>
                </header>
                <div className="mui-content">
                    <form className="forgetPass-code-march" action={this.fsubmit.bind(this)} id="form1">
                        <ul className="mui-table-view">
                            <li className="mui-table-view-cell">
                                <input name="busiNo" type="hidden" value={this.state.data.accountId}/>
                            </li>
                            <li className="mui-table-view-cell">
                                <input name="back_file" type="file"/>
                            </li>
                            <li className="mui-table-view-cell">
                                <input name="front_file" type="file"/>
                            </li>
                            <li className="padding-11-15">
                                <button className="mui-btn mui-btn-block mui-btn-danger padding-10 upload-submit"
                                        type="submit">提交</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        )
    }


    componentDidMount(){
        console.log(this.state.data)
    }

    fsubmit() {

        console.log('/////')
        var form=document.getElementById("form1");
        var fd =new FormData(form);
        $.ajax({
            url: "http://116.62.119.165/shop-portal/swagger/api/uploadPhoto",
            type: "get",
            data: fd,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success: function(response,status,xhr){
                console.log(xhr);
                // var json=$.parseJSON(response);
                // var result = '';
                // result +="个人信息：<br/>name:"+json['name']+"<br/>gender:"+json['gender']+"<br/>number:"+json['number'];
                // result += '<br/>头像：<img src="' + json['photo'] + '" height="100" style="border-radius: 50%;" />';
                // $('#result').html(result);
            }
        });
        return false;
    }
}