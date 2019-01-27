/**
 * Created by zhangHeng on 17/11/20.
 * 上传身份证
 */

import React from 'react'
import Header from './../../components/tab/Header'
import {Link,hashHistory} from 'react-router';
import {Toast,List,Button} from 'antd-mobile'


export default class UploadCard extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isBackFile:false,
            isFrontFile:true
        }
    }

    render() {
        return (
            <div>
                <Header title="头像上传"/>
                <div style={{height:window.innerHeight,paddingTop:50}}>

                    {
                        this.state.isFrontFile?
                            <form encType="multipart/form-data"
                                  name="uploading"
                                  className="uploading">

                                <List>
                                    <List.Item>
                                        <input name="front_file" type="file"/>
                                    </List.Item>
                                    <List.Item>
                                        <Button type="ghost" inline size="small" style={{ marginRight: '4px' }}
                                                onClick={this.submit.bind(this,1)}>上传</Button>
                                    </List.Item>
                                </List>

                            </form>:null
                    }

                    {
                        this.state.isBackFile?
                            <form encType="multipart/form-data"
                                  name="uploading"
                                  className="uploading">

                                <List>
                                    <List.Item>
                                        <input name="back_file" type="file"/>
                                    </List.Item>
                                    <List.Item>
                                        <Button type="ghost" inline size="small" style={{ marginRight: '4px' }}
                                                onClick={this.submit.bind(this,-1)}>上传</Button>
                                    </List.Item>
                                </List>

                            </form>:null
                    }
                </div>
            </div>
        );
    }

    submit(type){

        var data = new FormData(document.querySelector('.uploading')),_this=this;
        data.append('busiNo',localStorage['id'])
        type==1?data.append('busiTyp',30300002):data.append('busiTyp',30300003)

        if(type==1){
            if(data.get('front_file').name==''){

                Toast.info('请选择你所需要上传的文件', 2, null, false);
                return false;
            }
        }else{
            if(data.get('back_file').name==''){

                Toast.info('请选择你所需要上传的文件', 2, null, false);
                return false;
            }
        }

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

                    alert(response.success,type)

                    if(type==1){
                        _this.setState({
                            isBackFile:true,
                            isFrontFile:false
                        })
                       Toast.info(response.message+'请上传身份证背面', 2, null, false);
                    }else{
                        hashHistory.push({
                            pathname:'/PersonInfor'
                        })
                        Toast.info(response.message, 2, null, false);
                    }
                }else{
                    Toast.info(response.message+'请上传身份证背面', 2, null, false);
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