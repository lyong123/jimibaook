export const baseURL = 'http://192.168.1.253' // http://192.168.0.102  http://192.168.1.111

// 上传图片
export const postBaseImage = '/common/upload64'

// 登录模块
export const RegisterUrl = '/firm/register'
export const LoginUrl = '/firm/login'
export const SendCodeUrl = '/firm/sendCode'
export const LogOutUrl = '/firm/logout'

// 首页
export const findAllToolsUrl = '/tool/findAllTools' // 所有收米工具
export const exchangeToolsUrl = '/tool/exchangeTools' // 兑换收米工具 post
export const userAlreadyHaveUrl = '/tool/firmtoolsInfo' // 已有工具

export const getAllNotices = `/notice/findAllNotices` // 公告

export const homeNewRice = '/fundFlow/getFundFlowByNew' // 最新赠送米粒
export const homeNewActive = '/fundFlow/rice/before' // 最新赠送活跃值
export const postHomeNewActive = '/fundFlow/rice/harvest' // 获取活跃值

// 我的模块
export const getUserInfoUrl = '/firm/logininfo' // get用户信息
export const CommonLevelUrl = '/firm/firmlevel' // 等级规则

export const ForgetLoginUrl = '/firmpassword/resetLoginPawwoord'
export const ForgetExchangeUrl = '/firmpassword/resetTreadPawwoord'
export const ChangeLoginUrl = '/firmpassword/updateLoginPawwoord'
export const ChangeExchangeUrl = '/firmpassword/updateTreadPawwoord'

export const UserAddressUrl = '/firmaddress/firmaddress' // 获取用户收货地址  get
export const EditAddressUrl = '/firmaddress/updatefirmaddress' // 编辑用户收货地址  post
export const DeleteAddressUrl = '/firmaddress/delfirmaddress' // 删除用户收货地址 delete
export const CreateAddressUrl = '/firmaddress/addfirmaddress' // 新增用户收货地址  post

export const addHeaderImageUrl = '/firm/addfirmheadImage' // 头像

export const addUserInfoUrl = '/firm/addfirminfo' // post身份信息
export const RealNameUrl = '/firm/realName' // 实名认证
export const BankInfoUrl = '/bank/bankinfo' // 银行列表

export const FirmflowsUrl = '/firm/firmflows' // 我的大米
export const FirmfoundsUrl = '/firm/firmfounds' // 我的大米

export const SuperiorFirmsUrl = '/firm/superiorFirms' // 我的团队
export const MyteamUrl = '/firm/myteam' // 团队

export const FeedbackUrl = '/message/addmessage' // 问题反馈
export const FeedHistoryUrl = '/message/historicalMessage' // 反馈历史

export const getBuyerInfo = '/order/buyerInfo' /// order/buyerInfo/{matchOrder}
export const getSellerInfo = '/order/sellerInfo' /// /order/sellerInfo/{matchOrder}
export const getConfirmPay = '/order/confirmPayment' // /order/confirmPayment/{orderid}
export const getConfirmRec = '/order/confirmReceive' /// order/buyerInfo/{matchOrder}

// 订单模块
export const OrderListUrl = '/order'
export const PushOrderUrl = '/order/push' // /{sign}申请委托单
export const BuyOrderUrl = '/order/buy' // '/order/buy/{orderid}' 买大米
export const SellOrderUrl = '/order/sell' /// order/sell/{orderid} 出售大米
export const MineOrderUrl = '/order/mine' // /order/mine/{sign} 我的委托单
export const ComfirmPaymentUrl = '/order/confirmPayment' // /order/confirmPayment/{orderid} 确认付款
export const ComfirmReceiveUrl = '/order/confirmReceive' // /{orderid} 确认收款
