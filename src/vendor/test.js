/**
 * Created by zhangHeng on 17/12/2.
 */

import Bird from './components/bird/BirdIndex.js'
import Home from './components/home/HomePage.js'
import Mine from './components/mine/MineIndex.js'
import OnLine from './components/onLine/LineIndex.js'
import Car from './components/shoppingCart/CartIndex.js'
import ForgetPass from './components/login/ForgertPass.js'
import ForgetPassSetPhoneCode from './components/login/ForgetPassSetPhoneCode.js'
import ForgetPassResetPass from './components/login/ForgetPassResetPass.js'
import LoginByAccount from './components/login/LoginByAccount'
import LoginByPhone from './components/login/LoginByPhone'
import LoginByPhoneSetPass from './components/login/LoginByPhoneSetPass'
import RegByPhone from './components/login/RegByPhone'
import PersonInfor from './components/mine/PersonInfor.js'

import Login from './components/login/LoginByAccount.js'
import Classify from './components/classify_list/Classify'
import BrandIndex from './components/brand/BrandIndex'
import Detail from './components/brand/Detail'
import BrandInformation from './components/brand/BrandInformation'
import TotalClassify from './components/classify_list/Index'
import NewProducet from './components/classify_list/NewProducet.js'


import CardIndex from './components/shoppingCart/CartIndex'
import MangerAddress from './components/shoppingCart/MangerAddress'
import AddAddress from './components/shoppingCart/AddAddress'
import Name from './components/shoppingCart/Name'
import Telephone from './components/shoppingCart/Telephone'
import CardId from './components/shoppingCart/CardId'
import Coupon from './components/shoppingCart/Coupon'
import Cart from './components/shoppingCart/Cart'

import MyCoupon from './components/orders/MyCoupon.js'
import MyCollection from './components/orders/MyCollection.js'
import EditRecent from './components/orders/EditRecent.js'
import Index from './components/orders/Index.js'
import Written from './components/niaoshuo/Written.js'
import ViewLogistics from './components/orders/ViewLogistics.js'
import IndexHealth from './components/health_money/IndexHealth.js'
import RealName from './components/mine/RealName.js'
import RealID from './components/mine/RealID.js'
import WritingEvaluation from './components/orders/WritingEvaluation.js'
import ShoppingGuide from './components/shopping_guide'
import CustSex from './components/mine/CustSex.js'
import UploadCard from './components/mine/UploadCard.js'
import BirthDady from './components/mine/BirthDady.js'
import CustNickName from './components/mine/CustNickName.js'
import YetSendGoods from './components/orders/YetSendGoods.js'
import GoEvaluate from './components/orders/GoEvaluate.js'

import AddressList from './components/mine/AddressList'
import StockUp from './components/orders/StockUp'
import MoreGroup from './components/classify_list/MoreGroup.js'
import HeadUpload from './components/mine/HeadUpload.js'
import MineAddAddress from './components/mine/Form.js'
import Search from './components/home/Search.js'

const config=[
    {
        path:'ForgetPass',
        component:ForgetPass,
    },
    {
        path:'ForgetPassSetPhoneCode',
        component:ForgetPassSetPhoneCode,
    },
    {
        path:'ForgetPassResetPass',
        component:ForgetPassResetPass,
    },
    {
        path:'LoginByAccount',
        component:LoginByAccount,
    },
    {
        path:'LoginByPhone',
        component:LoginByPhone,
    },
    {
        path:'LoginByPhoneSetPass',
        component:LoginByPhoneSetPass,
    },
    {
        path:'RegByPhone',
        component:RegByPhone,
    },
    {
        path:'Bird',
        component:Bird,
    },
    {
        path:'Home',
        component:Home,
    },
    {
        path:'Mine',
        component:Mine,
    },
    {
        path:'OnLine',
        component:OnLine,
    },
    {
        path:'Car',
        component:Car,
    },
    {
        path:'PersonInfor',
        component:PersonInfor,
    },
    {
        path:'MyCoupon',
        component:MyCoupon,
    },
    {
        path:'MyCollection',
        component:MyCollection,
    },
    {
        path:'EditRecent',
        component:EditRecent,
    },
    {
        path:'Index',
        component:Index,
    },

    {
        path:'Written',
        component:Written,
    },
    {
        path:'ViewLogistics',
        component:ViewLogistics,
    },
    {
        path:'IndexHealth',
        component:IndexHealth,
    },

    {
        path:'RealName',
        component:RealName,
    },
    {
        path:'RealID',
        component:RealID,
    },

    {
        path:'WritingEvaluation',
        component:WritingEvaluation,
    },
    {
        path:'AddAddress',
        component:AddAddress,
    },
    {
        path:'CustSex',
        component:CustSex,
    },
    {
        path:'UploadCard',
        component:UploadCard,
    },
    {
        path:'BirthDady',
        component:BirthDady,
    },
    {
        path:'CustNickName',
        component:CustNickName,
    },


    /*后添加的*/
    {
        path:'CardIndex',
        component:CardIndex,
    },
    {
        path:'MangerAddress',
        component:MangerAddress,
    },
    {
        path:'AddAddress',
        component:AddAddress,
    },
    {
        path:'Name',
        component:Name,
    },
    {
        path:'Telephone',
        component:Telephone,
    },
    {
        path:'CardId',
        component:CardId,
    },
    {
        path:'Coupon',
        component:Coupon,
    },
    {
        path:'Cart',
        component:Cart,
    },
    {
        path:'YetSendGoods',
        component:YetSendGoods,
    },
    {
        path:'GoEvaluate',
        component:GoEvaluate,
    },
    {
        path:'Login',
        component:Login,
    },
    {
        path:'Classify',
        component:Classify,
    },
    {
        path:'BrandIndex',
        component:BrandIndex,
    },
    {
        path:'Detail',
        component:Detail,
    },
    {
        path:'BrandInformation',
        component:BrandInformation,
    },
    {
        path:'ShoppingGuide',
        component:ShoppingGuide,

    },
    {
        path:'TotalClassify',
        component:TotalClassify,
    },
    {
        path:'AddressList',
        component:AddressList,
    },
    {
        path:'StockUp',
        component:StockUp,
    },
    {
        path:'Group',
        component:MoreGroup,
    },
    {
        path:'Group',
        component:MoreGroup,
    },
    {
        path:'NewProducet',
        component:NewProducet,

    },
    {
        path:'HeadUpload',
        component:HeadUpload,
    },
    {
        path:'MineAddAddress',
        component:MineAddAddress,
    },
    {
        path:'Search',
        component:Search,
    }
]


