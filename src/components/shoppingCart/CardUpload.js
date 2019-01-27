/**
 * Created by zhangHeng on 17/7/8.
 */
import React from 'react';
import FileInput from './../FileUp/FileInput'
import {hashHistory} from 'react-router'
import Header from './../../components/tab/Header'

export default class CardUpload extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data:this.props.location.state,
            files: []
        }
    }

    _render(){
        if(this.state.files.length!=0)
        {
            return (
                <div className="thumbs-box">
                    {
                        this.state.files.map((file,index)=>{
                            return (<img key={index} src={file.thumb}/>)
                        })
                    }
                </div>
            )
        }else
        {
            return null;
        }
    }



    render() {
        return (
            <div>

                <Header title="身份证上传"/>

                <div className="mui-content">
                    <form className="forgetPass-code-march">
                        <ul className="mui-table-view">
                            <li className="mui-table-view-cell">
                                <FileInput onChange={this.handChange.bind(this)} multiple={false}
                                           className="upload-button" btnValue=""/>
                                {this._render()}
                            </li>
                            <li className="mui-table-view-cell">
                                <FileInput onChange={this.handChange.bind(this)} multiple={false}
                                           className="upload-button" btnValue=""/>
                                {this._render()}
                            </li>
                            <li className="padding-11-15">
                               <button className="mui-btn mui-btn-block mui-btn-danger padding-10 upload-submit">提交</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        )
    }


    componentDidMount(){

    }

    handChange(files) {
        this.setState({files: this.state.files.concat(files)},()=>{

        })
    }

    updateNum(cardId,goodsNumber){
        var self=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/uploadPhoto",
            async: true,
            data: {
                busiNo:self.state.data.accountId,
                back_file:self.state.files[0],
                front_file:self.state.files[1]
            },
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                //todo
            },

            success: function (data, textStatus) {
                if (data.code == 1) {
                    self.shopCarList(self.state.custId)
                }
            },

            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function () {

            }

        })
    }

}