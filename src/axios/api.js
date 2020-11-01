import instance from "./instance"

/**
 * @methods 获取轮播图
 * @params
 */
export const getBanner = () => instance.get("/banner",{})


/**
 * @methods 推荐歌单
 * @params limit: 取出数量  默认 30
 */
export const getRecommendSongeSheet = limit => instance.get(`/personalized?limit=${limit}`)

/**
 * @methods 推荐新歌曲
 * @params
 */
export const getRecommendSongs = () => instance.get(`/personalized/newsong`, {})

/**
 * @methods 歌曲详情
 * @params ids id数组
 */
export const getSongDetail = ids => instance.get(`/song/detail?ids=${ids}`)

/**
 * @methods 推荐歌手
 * @params limit 获取歌手个数
 */
export const getRecommendSinger = limit => instance.get(`/top/artists?offset=0&limit=${limit}`)
/**
 * @methods 特色榜单
 * @params
 */
export const getRankTopList = () => instance.get(`/toplist`)

/**
 * @methods 热门歌单分类
 * @params
 */
export const getHotSongSheet = () => instance.get(`/playlist/hot`,{})

/**
 * @methods 全部歌单 分类
 * @params
 */
export const getSongSheetCategory = () => instance.get(`/playlist/catlist`,{})

/**
 * @methods 获取歌单
 * @params
 */
export const getSongSheet = params => instance.get(`/top/playlist`, {params})

/**
 * @methods 歌手分类
 * @params
 */
export const getSingerCategory = params => instance.get(`/artist/list`, {params})

/**
 * @methods 歌手单曲
 * @params id: 歌手id
 */
export const getSingerSingle = params => instance.get(`/artists`, {params})

/**
 * @methods 歌手专辑
 * @params id: 歌手id
 * @params offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @params limit: 去除数量
 */
export const getSingerAlbum = params => instance.get(`/artist/album`, {params})

/**
 * @methods 歌手MV
 */
export const getSingerMv = id => instance.get(`/artist/mv?id=${id}`, {})

/**
 * @methods 歌手描述
 * @params 必选参数 : id: 歌手 id
 */
export const getSingerDesc = id => instance.get(`/artist/desc?id=${id}`, {})

/**
 * @methods 全部 mv
 * @params
 */
export const getAllMV = params => instance.get(`/mv/all`, {params})

/**
 * @methods mv详情
 * @params mvid: mv 的 id  其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
 */
export const getMvDetail = mvId => instance.get(`/mv/detail?mvid=${mvId}`, {})

/**
 * @methods mv 播放地址
 * @params 必选参数 : id: mv id
 * @params 可选参数 : r: 分辨率,默认1080,可从 /mv/detail 接口获取分辨率列表
 */
export const getMvURL = params => instance.get(`/mv/url`, {params})

/**
 * @methods mv 评论
 * @params 必选参数 : id: mv id
 * @params 可选参数 : limit: 取出评论数量 , 默认为 20
 * @params offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @params before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export const getMvComments = params => instance.get(`/comment/mv`, {params})

/**
 * @methods mv 点赞转发评论数数据
 * @params 必选参数 : mvid: mv 的 id
 */
export const getMvDetailInfo = params => instance.get(`/mv/detail/info`, {params})

/**
 * @methods mv 相似 mv 调用此接口 , 传入 mvid 可获取相似 mv
 * @params 必选参数 : mvid: mv id
 */
export const getRecommendMv = id => instance.get(`/simi/mv?mvid=${id}`, {})

/**
 * @methods 歌单详情
 * @params id: 歌单id s: 歌单收藏人数 100 默认为 8
 */
export const getPlayListDetail = params => instance.get(`/playlist/detail`, {params})

/**
 * @methods 歌单收藏者
 * @params id: 歌单id, limit: 取出数量(收藏者数量, 默认为: 20), offset: 偏移量(页码)
 */
export const getSubScribersPlayList = params => instance.get(`/playlist/subscribers`, {params})

/**
 * @methods 获取歌单推荐
 * @params id: 歌单id
 */
export const getPlayListRecommend = id => instance.get(`/related/playlist?id=${id}`, {})

/**
 * @methods 歌单评论
 * @params id: 歌单id, limit: 取出数量(默认20)
 */
export const getPlayListComment = params => instance.get(`/comment/playlist`, {params})

/**
 * @methods 歌词
 * @params id: 歌曲id
 */
export const getCurrentSongLyric = id => instance.get(`/lyric?id=${id}`)

/**
 * @methods 热搜列表(简略)
 * @params 说明 : 调用此接口,可获取热门搜索列表
 */
export const getSearchHot = () => instance.get(`/search/hot`)

/**
 * @methods 搜索
 * @params 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 ,
 * @params 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
 * @params 必选参数 : keywords : 关键词
 * @params 可选参数 : limit : 返回数量 , 默认为 30
 * @params 可选参数 : offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @params 可选参数 : type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户,
 * @params 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 */
export const getSearchData = params => instance.get(`/cloudsearch`, {params})

/**
 * @methods 获取全部视频列表
 * @params 说明 : 调用此接口,可获取视频分类列表,分页参数只能传入offset
 * @params 可选参数 : offset: 默认0
 */
export const getAllVideoList = params => instance.get(`/video/timeline/all`, {params})

/**
 * @methods 获取视频分类列表
 * @params 说明 : 调用此接口 , 可获取视频分类列表
 */
export const getVideoCategoryList = params => instance.get(`/video/category/list`, {params})

/**
 * @methods 获取视频标签列表
 * @params 说明 : 调用此接口 , 可获取视频标签列表
 */
export const getVideoTagList = params => instance.get(`/video/group/list`, {params})

/**
 * @methods 获取视频标签/分类下的视频
 * @params 说明 : 调用此接口 , 传入标签/分类id,可获取到相关的视频,分页参数只能传入offset
 * @params 必选参数 : id: videoGroup 的 id
 * @params 可选参数 : offset: 默认0
 */
export const getVideoList = params => instance.get(`/video/group`, {params})

/**
 * @methods 获取登录状态
 * @params 说明 : 调用此接口,可获取登录状态
 */
export const getLoginStatus = () => instance.get(`/login/status`, {})

/**
 * @methods 获取视频播放地址
 * @params 说明 : 调用此接口 , 传入视频 id,可获取视频播放地址
 * @params 必选参数 : id: 视频 的 id
 */
export const getVideoUrl = params => instance.get(`/video/url`, {params})

/**
 * @methods 视频详情
 * @params 说明 : 调用此接口 , 可获取视频详情
 * @params 必选参数 : id: 视频 的 id
 */
export const getVideoDetail = params => instance.get(`/video/detail`, {params})

/**
 * @methods 获取视频点赞转发评论数数据
 * @params 说明 : 调用此接口 , 传入 vid ( 视频id ) , 可获取对应视频点赞转发评论数数据 必选参数 : vid: 视频id
 * @params 必选参数 : id: 视频 的 id
 */
export const getVideoDetailInfo = params => instance.get(`/video/detail/info`, {params})

/**
 * @methods 视频评论
 * @params 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 视频 的所有评论 ( 不需要登录 )
 * @params 必选参数 : id: 视频的 id
 * @params 可选参数 : limit: 取出评论数量 , 默认为 20
 * @params 可选参数 : offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @params 可选参数 : before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export const getVideoComment = params => instance.get(`/comment/video`, {params})

/**
 * @methods 相关视频
 * @params 说明 : 调用此接口 , 可获取相关视频
 * @params 必选参数 : id: 视频 的 id
 */
export const getRecommendVideo = params => instance.get(`/related/allvideo`, {params})

/**
 * @methods 楼层评论
 * @params 说明 : 调用此接口 , 传入资源 parentCommentId 和资源类型 type和资源id 参数, 可获得该资源的歌曲楼层评论
 * @params 必选参数 : parentCommentId: 楼层评论 id
 * @params 必选参数 : id : 资源 id
 * @params 必选参数 : tpye: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
 * @params 0: 歌曲, 1: mv, 2: 歌单, 3: 专辑, 4: 电台, 5: 视频
 * @params 可选参数 : limit: 取出评论数量 , 默认为 20
 * @params 可选参数 : time: 分页参数,取上一页最后一项的 time 获取下一页数据
 */
// export const getFloorComment = params => instance.get(`/comment/floor`, {params})
