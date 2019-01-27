/**
 * Created by zhangHeng on 17/6/13.
 */
import React from 'react'
import $ from 'jquery'
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';

export default class Swiper extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            data:{
                listMap:[] ,
                imagesServer:''
            },
            imgHeight:90
        }
    }

    render(){
        const {data}=this.state
        return (
            <div className="height-auto">
                {
                    data.listMap.length==0?null:
                        <Carousel className="my-carousel"
                                  dotStyle={{backgroundColor:'red'}}
                                  dragging={false}
                                  swiping={false}
                                  autoplay
                                  infinite>
                            {data.listMap.map((item,index)=>{
                                return(<a onClick={this.handleItemClick.bind(this,item.href)} href={item.href} className="v-item" key={index}
                                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
                                    <img src={data.imagesServer+item.url} alt={item.alt}
                                         style={{ width: '100%', verticalAlign: 'top' }}/>
                                </a>)
                            })}
                        </Carousel>
                }
            </div>
        );


    }

    componentDidMount() {
        var _this=this;
        $.ajax({
            type: "get",
            url: "http://116.62.119.165/shop-portal/swagger/api/queryHomeBanner",
            async:true,
            data: {},
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //todo
            },
            success: function(response){

                if(response.code==1){
                    _this.setState({data:response.data},()=>{
                        console.log(_this.state.data,'data')
                    })
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){

            }
        });

    }

    handleItemClick(href,index,event) {
        window.open(href)
    }
}