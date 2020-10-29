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
export const getSingerSingle = id => instance.get(`/artists?id=${id}`)

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
export const getMvDetailInfo = id => instance.get(`/mv/detail/info?mvid=${id}`, {})

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
