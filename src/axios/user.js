import instance from "./instance"

/**
 * @methods 手机登录
 * @params phone password
 */
export const login = params => instance.get(`/login/cellphone`, {params})


/**
 * @methods 手机注册
 * @params 说明 : 调用此接口 ,传入手机号码和验证码,密码,昵称, 可注册网易云音乐账号(同时可修改密码)
 * @params 必选参数 : captcha: 验证码; phone : 手机号码; password: 密码; nickname: 昵称
 */
export const register = params => instance.get(`/register/cellphone`, {params})

/**
 * @methods 发送验证码
 * @params 说明 : 调用此接口 ,传入手机号码, 可发送验证码
 * @params 必选参数 : phone: 手机号码
 * @params 可选参数 : ctcode: 国家区号,默认86即中国
 */
export const getCaptcha = phone => instance.get(`/captcha/sent?phone=${phone}`, {})

/**
 * @methods 验证验证码
 * @params 说明 : 调用此接口 ,传入手机号码和验证码, 可校验验证码是否正确
 * @params 必选参数 : phone: 手机号码; captcha: 验证码
 */
export const verifyCaptcha = params => instance.get(`/captcha/verify`, {params})

/**
 * @methods 获取用户详情
 * @params 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 * @params 必选参数 : uid : 用户 id
 */
export const getUserDetail = uid => instance.get(`/user/detail?uid=${uid}`, {})

/**
 * @methods 获取用户信息 , 歌单，收藏，mv, dj 数量
 * @params 说明 : 登录后调用此接口 , 可以获取用户信息
 */
export const getUserSub = () => instance.get(`/user/subcount`, {})

/**
 * @methods 收藏/取消收藏歌单
 * @params 说明: 调用此接口 , 传入类型和歌单 id 可收藏歌单或者取消收藏歌单
 * @params 必选参数: t :类型, 1:收藏, 2:取消收藏  id: 歌单 id
 */
export const setPlayListCollection = params => instance.get(`/playlist/subscribe`, {params})

/**
 * @methods 获取用户歌单
 * @params 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 * @params 必选参数 : uid : 用户 id
 * @params 可选参数 : limit : 返回数量 , 默认为 30
 * @params 可选参数 : offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 */
export const getUserPlayList = uid => instance.get(`/user/playlist?uid=${uid}`, {})

/**
 * @methods 获取用户播放记录
 * @params 说明 : 登录后调用此接口 , 传入用户 id, 可获取用户播放记录
 * @params 必选参数 : uid : 用户 id
 * @params 可选参数 : type : type=1 时只返回 weekData, type=0 时返回 allData
 */
export const getUserPlayRecord = params => instance.get(`/user/record`, {params})
