import React from 'react'
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';

export default class Notice extends React.Component{
    constructor(props){
        super(props);
        this.state={
            inforList:[],
        }
    }

    render(){
        return (
            <div>
                {
                    this.state.inforList.length==0?<p className="v-item">暂无公告</p>:
                        <WingBlank>
                            <Carousel className="my-carousel"
                                      vertical
                                      dots={false}
                                      dragging={false}
                                      swiping={false}
                                      autoplay
                                      infinite
                            >
                                {this.state.inforList.map((item,index)=>{
                                    return(<div className="v-item" key={index}>{item.noticeText}</div>)
                                })}
                            </Carousel>
                            <WhiteSpace />
                        </WingBlank>
                }
            </div>
        )
    }

    componentDidMount() {
        var self=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/querySystemNotice",
            async:true,
            data: {},
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(response, textStatus){

                if(response.code==1){
                    self.setState({inforList:response.data})
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });
    }
}