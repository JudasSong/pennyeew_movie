'use strict'

module.exports = {
    'button': [{
        "name": "排行榜",
        "sub_button": [{
            "name": "最热的",
            "type": "click",
            "key": "movie_hot"
        }, {
            "name": "最冷的",
            "type": "click",
            "key": "movie_cold"
        }]
    }, {
        "name": "分类",
        "sub_button": [{
            "name": "犯罪",
            "type": "click",
            "key": "movie_crime"
        }, {
            "name": "动画",
            "type": "click",
            "key": "movie_cartoon"
        }]
    }, {
        "name": "帮助",
        "type": "click",
        "key": "help"
    }]
};


/*   ,{
   "name": "下发图片消息",
   "type": "media_id",
   "media_id": "xxx"
}, {
   "name": "跳转图文消息的URL",
   "type": "view_limited",
   "media_id": "xxx"
}*/
