/**
 * Created by zhangHeng on 17/11/16.
 * 我的-头像上传
 */
import React from 'react'
import Header from './../../components/tab/Header'
import {Link,hashHistory} from 'react-router';
import {Toast,List} from 'antd-mobile'


export default class HeadUpload extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            photoUrl:''
        }
    }

    render() {
        const { files } = this.state;
        return (
            <div>
                <Header title="头像上传"/>
                <div style={{height:window.innerHeight,paddingTop:50}}>
                    <form method= "get"
                          encType="multipart/form-data"
                          name="uploading"
                          className="uploading">
                        <List>
                            <List.Item>
                                <div>
                                    <input name="file" type="file"/>
                                </div>
                            </List.Item>
                            <List.Item>
                                    <button type="button" className="btnSave" onClick={this.fsubmit.bind(this)}>提交</button>
                            </List.Item>
                        </List>
                    </form>
                    <div className="test">
                        <img src={this.state.photoUrl}/>
                    </div>
                </div>
            </div>
        );
    }


    fsubmit(){
        var data = new FormData(document.querySelector('.uploading')),_this=this;
        data.append('busiNo',localStorage['id'])
        data.append('busiTyp',30300001)

        $.ajax({
            url: 'http://116.62.119.165/shop-portal/sysAtt/uploadPhoto',
            type: 'post',
            async:false,
            data: data,
            dataType: 'JSON',
            cache: false,
            processData: false,
            contentType: false,
            success: function(response) {

                if(response.success){

                    hashHistory.push({
                        pathname:'/PersonInfor'
                    })
                    Toast.info(response.message, 2, null, false);

                    //_this.setState({photoUrl:response.object.url});

                }else{
                    console.log(response.message)
                }
            },
            error: function(xhr, status) {
                console.log(status,'status')
            },
            complete: function(XMLHttpRequest, textStatus){
            }
        })

    }




}