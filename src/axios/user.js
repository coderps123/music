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

/**
 * @methods 退出登录
 * @params 说明 : 调用此接口 , 可退出登录
 */
export const logout = () => instance.get(`/logout?timeStamp=${new Date().valueOf()}`)

/**
 * @methods 资源点赞
 * @params 说明 : 调用此接口 , 可对 MV,电台,视频点赞
 * @params 必选参数: type:资源类型,对应以下类型 1: mv, 4: 电台, 5: 视频, 6: 动态
 * @params 必选参数: t: 操作,1 为点赞,其他未取消点赞
 * @params 必选参数: id: 资源 id
 */
export const resourceLike = params => instance.get(`/resource/like`, {params})

/**
 * @methods 给评论点赞
 * @params 说明 : 调用此接口 , 传入 type, 资源 id, 和评论 id cid 和 是否点赞参数 t 即可给对 应评论点赞 ( 需要登录 )
 * @params 必选参数 : id : 资源 id, 如歌曲 id,mv id
 * @params 必选参数 : cid : 评论 id
 * @params 必选参数 : t : 是否点赞 ,1 为点赞 ,0 为取消点赞
 * @params 必选参数 : tpye : 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
 * @params 0: 歌曲, 1: mv, 2: 歌单, 3: 专辑, 4: 电台, 5: 视频, 6: 动态
 */
export const commentLike = params => instance.get(`/comment/like`, {params})

/**
 * @methods 收藏视频
 * @params 说明 : 调用此接口,可收藏视频
 * @params 必选参数: id : 视频 id
 * @params 必选参数: t : 1 为收藏,其他为取消收藏
 */
export const collectionVideo = params => instance.get(`/video/sub`, {params})

/**
 * @methods 发送/删除评论
 * @params 说明 : 调用此接口,可发送评论或者删除评论
 * @params 必选参数: t:1 发送, 2 回复
 * @params 必选参数: tpye: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
 * @params 0: 歌曲, 1: mv, 2: 歌单, 3: 专辑, 4: 电台, 5: 视频, 6: 动态
 * @params 必选参数: id:对应资源 id
 * @params 必选参数: content :要发送的内容
 * @params 必选参数: commentId :回复的评论id (回复评论时必填)
 * @params 调用例子 : /comment?t=1&type=1&id=5436712&content=test (往广岛之恋 mv 发送评论: test)
 */
export const handleComment = params => instance.get(`/comment`, {params})

/**
 * @methods 收藏/取消收藏歌手
 * @params 说明 : 调用此接口,可收藏歌手
 * @params 必选参数: id : 歌手 id
 * @params 必选参数: t:操作,1 为收藏,其他为取消收藏
 */
export const collectionSinger = params => instance.get(`/artist/sub`, {params})
