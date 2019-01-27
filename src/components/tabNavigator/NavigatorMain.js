/**
 * Created by zhangHeng on 17/6/10.
 */

import React from 'react';
import { Link } from 'react-router';

export default class Navigator extends React.Component {
	constructor(prop) {
		super(prop);
		this.state = {
			accountId: localStorage['id']
		}
	}
	componentDidMount() {
//		(function() {
//			var c = document.createElement('script');
//			c.src = '//kefu.qycn.com/vclient/?webid=133743';
//			var s = document.getElementsByTagName('script')[0];
//			s.parentNode.insertBefore(c, s);
//		})();
	}
	render() {
		return(
			<footer className="bar-tab">
                <Link to='/' activeClassName={'indexActive'}>
                    <span className="footer-icon active nav-index"></span>
                    <span className="tab-label">首页</span>
                </Link>

                <Link to='/bird' activeClassName={'birdActive'}>
                    <span className="footer-icon nav-bird active"></span>
                    <span className="tab-label">多多鸟说</span>
                </Link>
                <Link to="/onLine" activeStyle={{background:'green'}}>
                    <span className="footer-icon"></span>
                    <span className='nav-yys'></span>
                    <span className="tab-label">营养师在线</span>
                </Link>
                <Link to='/cart' activeClassName={'carActive'}>
                    <span className="footer-icon nav-shopping active"></span>
                    <span className="tab-label">购物车</span>
                </Link>
                <Link to='/mine' activeClassName={'mineActive'}>
                    <span className="footer-icon nav-my active"></span>
                    <span className="tab-label">我的</span>
                </Link>
            </footer>
		)
	}
}