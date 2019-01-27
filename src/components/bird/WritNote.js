/**
 * Created by zhangHeng on 17/6/10.
 * 文章详情
 */

// import React from 'react';
import React, {
	Component,
	PropTypes
} from 'react';
import '../../styles/img.css'
import Header from '../../components/tab/Header'
import $ from 'jquery';
import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
const prompt = Modal.prompt;

export default class WritNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentId: this.props.params.id,
			sayDetailsArr: [],
			sayHtmlArr: [],
			useLess: {},
			commentArray: []
		}
	}

	//渲染评论列表
	_renderCom() {
		if(this.state.commentArray.length != 0) {
			return this.state.commentArray.map((item, index) => {
				return(
					<ul className="comment-articlescrap" key={index}>
                        <li className="mui-media" onClick={this.answer.bind(this,item.parent.id)}>
                            {
                                item.parent.handUrl==null?
                                    <img className="mui-media-object mui-pull-left" src={require('./../../images/default-photo.png')}/>
                                    :
                                    <img className="mui-media-object mui-pull-left" src={'http://116.62.119.165/fileServer/images/'+item.parent.handUrl} />
                            }

                            <div className="mui-media-body">
                                <span style={{color:'#8f8f94'}}>{this.formatDate(item.parent.createTime)}</span>
                                {
                                    item.parent.custName==null?
                                        <p className="mui-ellipsis" style={{marginTop:0,color:'#8f8f94'}}>无名氏</p>
                                        :
                                        <p className="mui-ellipsis" style={{marginTop:0,color:'#8f8f94'}}>{item.parent.custName}</p>

                                }
                            </div>
                        </li>
                        <li className="reply-note">
                                {item.parent.context}
                        </li>
                            {
                                item.list.length==0?null:

                                item.list.map((itemList,listIndex)=>{
                                    return (
                                        <p className="color-qianhui fontSize-14 reply-list-note" key={listIndex}>
                                            <a>{itemList.custName}</a>回复:
                                            {itemList.context}
                                        </p>
                                    )
                                })
                            }

                    </ul>
				)
			})
		} else {
			return null;
		}
	}

	render() {
		return(
			<div>
                <Header title="健康笔记"/>
                <div className="mui-content background-white" style={{marginBottom:50,paddingBottom:0}}>
                    <ul className="write-note">
                        {
                            this.state.sayDetailsArr.map((item)=>{
                                return (
                                     <li key={item.itemKey}>
                                        <h5>{item.title}</h5>
                                        <p className="content-infor">
                                            <span>发表：{item.createTime}</span>&nbsp;
                                            <span>阅读：{item.reading}</span>&nbsp;
                                            <span>评论：{item.praise}</span>
                                        </p>
                                     </li>
                                       
                                )  
                            })
                        }
                        <li className="border-none">
                            {
                                this.state.sayHtmlArr.map((item)=>{
                                    return (

                                        <div className="color-hui font-size-18" key={item.itemKey} dangerouslySetInnerHTML={{__html:item.content}} />

                                    )  
                                })  
                            }

                            <p className="good-idea" style={{marginBottom:20,paddingBottom:0}}>
                                <a className="mui-btn dianzan" onClick={this.dianzan.bind(this)} id="btn_like">
                                    <span className="dianzan-icon" ></span>
                                    好文章,赞一个
                                </a>
                            </p>
                            <div className="jiathis_style_m"></div>
                            <p className="share-icon" >
                                <a style={{paddingTop:5,paddingLeft:'2rem'}} className="mui-text-right">(分享可获得200健康币)</a>
                            </p>
                        </li>
                        <li className="new-comment">
                            <a>最新评论</a>
                        </li>
                        <li>

                            {this._renderCom()}

                        </li>
                    </ul>
                </div>
                <div className="mui-bar" style={{bottom:0,textAlign:'center'}}>
                    <button style={{marginTop:6}}
                            onClick={() => prompt('发表评论', null,
                                [
                                    { text: '取消' },
                                    {
                                        text: '提交',
                                        onPress: value => new Promise((resolve) => {
                                            //Toast.info('onPress promise', 1);
                                            setTimeout(() => {
                                                resolve();
                                                this.addComment(value,1)
                                            }, 1000);
                                        }),
                                    },
                                ], 'default', null, ['请输入你的神妙评论'])}
                    >说说你的意见....</button>
                </div>
            </div>
		)
	}
	componentDidMount() {
		(function() {
			var c = document.createElement('script');
			c.src = 'http://v3.jiathis.com/code/jiathis_m.js';
			c.charset = "utf-8";
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(c, s);
		})();
		this.SayDetails();
		this.commentList(); //获取评论
		this.SayHtml();
	}
	dianzan() {
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/sayPraise",
			async: true,
			data: {
				sayId: this.state.currentId,
				custId: localStorage['id']
			},
			dataType: "json",
			beforeSend: function(XMLHttpRequest) {
				//todo
			},
			success: function(data, textStatus) {
				if(data.code == 1) {
					Toast.success('感谢支持!', 1);
				} else if(data.code == 0) {
					Toast.info(data.message, 1);
				} else {
					Toast.fail(data.message, 1);
				}
			}
		});
	}
	share(stype) {
//		<a className="icon-QQ" onClick={this.share.bind(this,'QQ')}></a>
//      <a className="icon-QQkj" onClick={this.share.bind(this,'QQkj')}></a>
//      <a className="icon-weibo" onClick={this.share.bind(this,'weibo')}></a>
//      <a className="icon-weixin" onClick={this.share.bind(this,'weixin')} id='weixin1'></a>
//      <a className="icon-firend" onClick={this.share.bind(this,'firend')}></a>
		if(stype == 'QQkj') {
			window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + document.location.href + '?sharesource=qzone&title=' + "123" + '&pics=' + "123" + '&summary=' + "123");
		}
		//新浪微博接口的传参
		if(stype == 'weibo') {
			window.open('http://service.weibo.com/share/share.php?url=' + document.location.href + '?sharesource=weibo&title=' + '1234' + '&pic=' + '4324' + '&appkey=2706825840');
		}
		//qq好友接口的传参
		if(stype == 'QQ') {
			window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + document.location.href + '?sharesource=qzone&title=' + '4324' + '&pics=' + '4324' + '&summary=' + '42343' + '&desc=shabi');
		}
		//生成二维码给微信扫描分享
		if(stype == 'weixin') {
			window.open('inc/qrcode_img.php?url=http://zixuephp.net/article-1.html');
		}
		if(stype == 'firend') {
			window.open('inc/qrcode_img.php?url=http://zixuephp.net/article-1.html');
		}
	}
	SayDetails() {
		var _this = this; //把this用_this暂代，以免找不到
		$.ajax({
			type: "get", //请求的方式为get
			url: "http://116.62.119.165/shop-portal/swagger/api/sayDetails", //请求的路径
			async: true,
			data: {
				sayId: this.state.currentId
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},
			success: function(data, textStatus) {
				if(data.code == 1) {
					var sayDetailsArr = [];
					var sayDetailsData = data.data;
					var sayDetailsObj = new Object();
					sayDetailsObj.itemKey = 'i'
					sayDetailsObj.title = sayDetailsData.title; //标题
					sayDetailsObj.createTime = new Date(sayDetailsData.createTime).toLocaleDateString(); //事件
					sayDetailsObj.praise = sayDetailsData.praise; //评论
					sayDetailsObj.reading = sayDetailsData.reading; //阅读
					sayDetailsObj.content = sayDetailsData.content; //内容
					sayDetailsArr.push(sayDetailsObj)
					_this.setState({
						sayDetailsArr: sayDetailsArr
					}, () => {})
				}
			},
			complete: function(XMLHttpRequest, textStatus) {

			}
		});
	}

	/*返回的html*/
	SayHtml() {
		var _this = this;
		$.ajax({
			type: "get", //请求的方式为get
			url: "http://116.62.119.165/shop-portal/swagger/api/sayDetails", //请求的路径
			async: true,
			data: {
				sayId: this.state.currentId
			},
			// dataType: 'html',
			dataType: "json",
			beforeSend: function(XMLHttpRequest) {
				//todo
			},
			success: function(data, textStatus) {
				if(data.code == 1) {
					var sayHtmlArr = []
					var sayHtmlData = (data.data.content).toString('html');
					var sayHtmlObj = new Object();
					sayHtmlObj.itemKey = 'i'
					sayHtmlObj.content = sayHtmlData; //内容
					sayHtmlArr.push(sayHtmlObj)
					_this.setState({
						sayHtmlArr: sayHtmlArr
					}, () => {})

				}
			}
		});
	}

	commentList() {
		var _this = this;
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/sayWordList",
			async: true,
			data: {
				sayId: this.state.currentId,
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},
			success: function(data, textStatus) {
				console.log(data, 'data')
				if(data.code == 1 && data.data.length != 0) {
					console.log(data.data, 'data')
					_this.setState({
						commentArray: data.data
					})
				}
			},
			complete: function(XMLHttpRequest, textStatus) {

			}
		});
	}

	/**发表评论**/
	addComment(value, grade, parentId) {
		var _this = this;
		$.ajax({
			type: "get",
			url: "http://116.62.119.165/shop-portal/swagger/api/sayWordSave",
			async: true,
			data: {
				sayId: this.state.currentId,
				context: value,
				grade: grade,
				custId: localStorage['id'],
				parentId: parentId
			},
			dataType: 'json',
			beforeSend: function(XMLHttpRequest) {
				//todo
			},
			success: function(data, textStatus) {
				if(data.code == 1) {
					Toast.info(data.message, 1);
					_this.commentList()
				}
			},
			complete: function(XMLHttpRequest, textStatus) {

			}
		});
	}

	/**回复评论**/
	answer(parentId) {
		Modal.prompt(
			'回复',
			null, [{
					text: '取消'
				},
				{
					text: '提交',
					onPress: value => new Promise((resolve) => {
						//Toast.info('onPress promise', 1);
						setTimeout(() => {
							resolve();
							this.addComment(value, 2, parentId)
						}, 1000);
					}),
				},
			],
			'default',
			null, ['请输入你的神妙评论'],
			'ios'
		)
	}

	formatDate(nS) {
		return new Date(nS).toLocaleDateString();
	}
}