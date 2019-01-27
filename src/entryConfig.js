/**
 * Created by zhangHeng on 17/6/12.
 */
{/**1*/}
export const bird=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/bird/BirdIndex'))
    }, 'bird')
}

export const home=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/home/HomePage'))
    }, 'home')
}

export const mine=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/mine/MineIndex'))
    }, 'mine')
}

export const online=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/onLine/LineIndex'))
    }, 'online')
}
export const car=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/shoppingCart/CartIndex'))
    }, 'car')
}
export const forgetPass=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/login/ForgertPass'))
    }, 'forgetPass')
}
export const forgetPassSetPhoneCode=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/login/ForgetPassSetPhoneCode'))
    }, 'forgetPassSetPhoneCode')
}
export const forgetPassResetPass=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/login/ForgetPassResetPass'))
    }, 'forgetPassResetPass')
}
export const loginByAccount=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/login/LoginByAccount'))
    }, 'loginByAccount')
}
export const loginByPhone=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/login/LoginByPhone'))
    }, 'loginByPhone')
}
export const loginByPhoneSetPass=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/login/LoginByPhoneSetPass'))
    }, 'loginByPhoneSetPass')
}
export const regByPhone=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/login/RegByPhone'))
    }, 'regByPhone')
}
export const personInfor=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/mine/PersonInfor'))
    }, 'personInfor')
}
{/**2*/}
export const login=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/login/LoginByAccount.js'))
    }, 'login')
}
export const classify=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/classify_list/Classify'))
    }, 'classify')
}
export const brandIndex=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/brand/BrandIndex'))
    }, 'brandIndex')
}
export const detail=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/brand/Detail'))
    }, 'detail')
}
export const brandInformation=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/brand/BrandInformation'))
    }, 'brandInformation')
}
export const totalClassify=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/classify_list/Index'))
    }, 'totalClassify')
}
export const newProducet=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/classify_list/NewProducet'))
    }, 'newProducet')
}
{/**3*/}
export const cardIndex=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/shoppingCart/CartIndex'))
    }, 'cardIndex')
}

export const mangerAddress=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/shoppingCart/MangerAddress'))
    }, 'mangerAddress')
}

export const addAddress=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/shoppingCart/AddAddress'))
    }, 'addAddress')
}

export const name=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/shoppingCart/Name'))
    }, 'name')
}

export const telephone=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/shoppingCart/Telephone'))
    }, 'telephone')
}

export const cardId=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/shoppingCart/CardId'))
    }, 'cardId')
}

export const coupon=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/shoppingCart/Coupon'))
    }, 'coupon')
}

export const cart=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/shoppingCart/Cart'))
    }, 'cart')
}
{/**4*/}
export const myCoupon=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/orders/MyCoupon'))
    }, 'myCoupon')
}

export const myCollection=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/orders/MyCollection'))
    }, 'myCollection')
}

export const editRecent=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/orders/EditRecent'))
    }, 'editRecent')
}

export const index=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/orders/Index'))
    }, 'index')
}

export const written=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/niaoshuo/Written'))
    }, 'written')
}

export const viewLogistics=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/orders/ViewLogistics'))
    }, 'viewLogistics')
}

export const indexHealth=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/health_money/IndexHealth'))
    }, 'indexHealth')
}

export const realName=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/mine/RealName'))
    }, 'realName')
}

export const realID=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/mine/RealID'))
    }, 'realID')
}


export const writingEvaluation=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/orders/WritingEvaluation'))
    }, 'writingEvaluation')
}

export const shoppingGuide=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/shopping_guide'))
    }, 'shoppingGuide')
}

export const custSex=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/mine/CustSex'))
    }, 'custSex')
}

export const uploadCard=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/mine/UploadCard'))
    }, 'uploadCard')
}

export const birthDady=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/mine/BirthDady'))
    }, 'birthDady')
}

export const custNickName=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/mine/CustNickName'))
    }, 'custNickName')
}

export const yetSendGoods=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/orders/YetSendGoods'))
    }, 'yetSendGoods')
}

export const goEvaluate=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/orders/GoEvaluate'))
    }, 'goEvaluate')
}
{/**5*/}
export const addressList=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/mine/AddressList'))
    }, 'addressList')
}

export const stockUp=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/orders/StockUp'))
    }, 'stockUp')
}

export const moreGroup=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/classify_list/MoreGroup'))
    }, 'moreGroup')
}

export const headUpload=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/mine/HeadUpload'))
    }, 'headUpload')
}

export const mineAddAddress=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/mine/Form.js'))
    }, 'mineAddAddress')
}

export const search=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/home/Search.js'))
    }, 'search')
}




export const productDetails=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/home/ProductDetails'))
    }, 'productDetails')
}

export const areaGuan=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/area/AreaGuan'))
    }, 'areaGuan')
}

export const writNote=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/bird/WritNote'))
    }, 'writNote')
}

export const classifyIndex=(location,callback)=>{
    require.ensure([], require=>{
        callback(null,require('./components/classify_list/ClassifyIndex'))
    }, 'classifyIndex')
}
