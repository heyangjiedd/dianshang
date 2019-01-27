/**
 * Created by zhangHeng on 17/6/22.
 * 商品倒计时
 */

import React from 'react'

export default class Countdown extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            data:{
                start:new Date(),
                end:new Date(),
                now:new Date()
            },
            active:true
        }
        this.serverNow=this.state.data.now.getTime()
        this.interval=null;
    }

    render(){
        return (
            <div>
                <p className="font-size-18" id="title">距离本场活动开始还有</p>
                <div className="display-flex" id="countdown">
                    <div className="countdown-item background-red">00</div>
                    <span className="comminute">:</span>
                    <div className="countdown-item background-red">00</div>
                    <span className="comminute">:</span>
                    <div className="countdown-item background-red">00</div>
                    <span className="comminute">:</span>
                    <div className="countdown-item background-red" id="test">00</div>
                </div>
            </div>
        );
    }

    //初始化渲染后触发
    componentDidMount() {
        var self=this;
        this.updateTime(this.timeFormat(this.state.data))

        this.interval=setInterval(function(){
            if(self.state.active){
                window.clearInterval(self.interval);
            }
            self.updateTime(self.timeFormat(self.state.data))
        },1000);
    }

    //每次接受新的props触发
    componentWillReceiveProps(nextProps) {
        this.setState({data:nextProps.data})
    }

    //组件卸载时触发
    componentWillUnmount(){
        window.clearInterval(this.interval)
    }


    //时间格式转化
    timeFormat(dataObj) {
        for(var prop in dataObj) {
            if(dataObj.hasOwnProperty(prop)) {
                if(typeof dataObj[prop] == 'number') {
                    dataObj[prop] = new Date(dataObj[prop]);
                }
                if(typeof dataObj[prop] == 'string') {
                    dataObj[prop] = new Date(Date.parse(dataObj[prop].replace(/-/g, "/")));
                }
            }
        }
        return dataObj;
    }

   //活动是否开始
    updateTime(data) {
        this.serverNow+=1000
        var isFinish=Math.floor(data.end.getTime()-this.serverNow)> 0 ? true : false;
        var isStart=Math.floor(this.serverNow-data.start.getTime())> 0 ? true : false;

        if(isFinish && !isStart) {
            this.timeChang(data,true);
        } else if(isStart && isFinish) {
            this.timeChang(data,false);
        }else{
            this.setState({active:false});
            document.getElementById('title').innerText='本场活动已结束'
        }
    }

    timeChang(data,_status) {

        var time_difference=0;

        if (_status) {
            document.getElementById('title').innerText='距本场活动开始还有：'
            time_difference=(data.end.getTime()-this.serverNow)/1000;

        } else{
            document.getElementById('title').innerText='距本场活动结束还有：'
            time_difference=(data.end.getTime()-this.serverNow)/1000;
        }

        this._day = Math.floor(time_difference / 86400);
        time_difference %= 86400;

        this._hour = Math.floor(time_difference / 3600);
        time_difference %= 3600;

        this._minutes = Math.floor(time_difference / 60);
        time_difference %= 60;

        this._seconds = Math.floor(time_difference);

        var day = this.fillZero(this._day, 3);
        var hour = this.fillZero(this._hour, 2);
        var minutes = this.fillZero(this._minutes, 2);
        var seconds = this.fillZero(this._seconds, 2);

        var parents=document.getElementById('countdown');
        var childNodes=parents.getElementsByTagName('div');

        childNodes[0].innerText=day;
        childNodes[1].innerText=hour;
        childNodes[2].innerText=minutes;
        childNodes[3].innerText=seconds

    }

    fillZero(num, digit) {
        var str = '' + num;
        while(str.length < digit) {

            str = '0' + str;
        }
        return str;
    }


}