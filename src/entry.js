'use strict';

//引入样式文件
import './styles/test.css';
import './styles/mui.css'
import 'antd-mobile/dist/antd-mobile.css';

//引入组件
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import {
    forgetPass,
    forgetPassSetPhoneCode,
    forgetPassResetPass,
    loginByAccount,
    loginByPhone,
    loginByPhoneSetPass,
    regByPhone,
    bird,
    home,
    mine,
    car,
    personInfor,
    myCoupon,
    myCollection,
    editRecent,
    index,
    written,
    viewLogistics,
    indexHealth,
    realName,
    realID,
    writingEvaluation,
    addAddress,
    custSex,
    uploadCard,
    birthDady,
    custNickName,
    cardIndex,
    mangerAddress,
    name,
    telephone,
    cardId,
    coupon,
    cart,
    yetSendGoods,
    goEvaluate,
    login,
    classify,
    brandIndex,
    detail,
    brandInformation,
    shoppingGuide,
    totalClassify,
    addressList,
    stockUp,
    moreGroup,
    newProducet,
    headUpload,
    mineAddAddress,
    search,

    productDetails,
    areaGuan,
    writNote,
    classifyIndex



} from './entryConfig.js'

ReactDom.render((
<Router history={hashHistory}>
    <Route>
        <Route path="/" getComponent={home} />
        <Route path="forgetPass" getComponent={forgetPass} />
        <Route path="forgetPassSetPhoneCode" getComponent={forgetPassSetPhoneCode} />

        <Route path="forgetPassResetPass" getComponent={forgetPassResetPass} />
        <Route path="loginByAccount" getComponent={loginByAccount} />
        <Route path="loginByPhone" getComponent={loginByPhone} />
        <Route path="loginByPhoneSetPass" getComponent={loginByPhoneSetPass} />
        <Route path="regByPhone" getComponent={regByPhone} />
        <Route path="bird" getComponent={bird} />
        <Route path="mine" getComponent={mine} />
        <Route path="car" getComponent={car} />
        <Route path="personInfor" getComponent={personInfor} />
        <Route path="myCoupon" getComponent={myCoupon} />

        <Route path="myCollection" getComponent={myCollection} />
        <Route path="editRecent" getComponent={editRecent} />
        <Route path="index" getComponent={index} />
        <Route path="written" getComponent={written} />
        <Route path="viewLogistics" getComponent={viewLogistics} />
        <Route path="indexHealth" getComponent={indexHealth} />
        <Route path="realName" getComponent={realName} />
        <Route path="realID" getComponent={realID} />
        <Route path="writingEvaluation" getComponent={writingEvaluation} />
        <Route path="addAddress" getComponent={addAddress} />
        <Route path="custSex" getComponent={custSex} />

        <Route path="uploadCard" getComponent={uploadCard} />
        <Route path="birthDady" getComponent={birthDady} />
        <Route path="custNickName" getComponent={custNickName} />
        <Route path="cardIndex" getComponent={cardIndex} />
        <Route path="mangerAddress" getComponent={mangerAddress} />
        <Route path="name" getComponent={name} />
        <Route path="telephone" getComponent={telephone} />
        <Route path="cardId" getComponent={cardId} />
        <Route path="coupon" getComponent={coupon} />
        <Route path="cart" getComponent={cart} />
        <Route path="yetSendGoods" getComponent={yetSendGoods} />


        <Route path="goEvaluate" getComponent={goEvaluate} />
        <Route path="login" getComponent={login} />
        <Route path="classify" getComponent={classify} />
        <Route path="brandIndex" getComponent={brandIndex} />
        <Route path="detail" getComponent={detail} />
        <Route path="brandInformation" getComponent={brandInformation} />
        <Route path="shoppingGuide" getComponent={shoppingGuide} />
        <Route path="totalClassify" getComponent={totalClassify} />
        <Route path="addressList" getComponent={addressList} />
        <Route path="stockUp" getComponent={stockUp} />
        <Route path="moreGroup" getComponent={moreGroup} />


        <Route path="newProducet" getComponent={newProducet} />
        <Route path="headUpload" getComponent={headUpload} />
        <Route path="mineAddAddress" getComponent={mineAddAddress} />
        <Route path="search" getComponent={search} />

        <Route path = "productDetails/:id" getComponent={productDetails} />
        <Route path = "classifyIndex/:id" getComponent={classifyIndex} />
  		<Route path = "areaGuan/:id" getComponent={areaGuan} />
        <Route path = "writNote/:id" getComponent={writNote} />
    </Route>
</Router>
),document.getElementById('app'))


