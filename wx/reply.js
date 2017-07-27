'use strict'

var Movie = require('../app/api/movie');
var help = '亲爱的您好，欢迎你订阅了pennyeew微信公众号！' +
    "\n" + '回复1~3，测试文字回复\n' +
    '回复4，测试图文回复\n' +
    '回复 首页，进入电影首页\n' +
    '回复 登录，进入微信登录绑定\n' +
    '回复 电影名字，查询电影信息\n' +
    '回复 语音，查询电影信息\n' +
    '也可以点击，<a href="http://pennyo.viphk.ngrok.org/movie">语音查电影</a>\n';

exports.reply = function*(next) {
    var message = this.weixin;

    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            this.body = help;
        } else if (message.Event === 'unsubscribe') {
            console.log('取消关注啦！' + "\n");
            this.body = '关注取消--';
        } else if (message.Event === 'LOCATION') {
            this.body = '您上报的位置是：' + message.latitude + '/' + message.Longitude + '---' + message.Precision + "\n";
        } else if (message.Event === 'CLICK') {
            var news = [];

            if (message.EventKey === "movie_hot") {
                let movies = yield Movie.findHotMovies(-1, 10);

                movies.forEach(function(movie) {
                    news.push({
                        title: movie.title,
                        description: movie.title,
                        picUrl: movie.poster,
                        url: 'http://pennyo.viphk.ngrok.org/wechat/jump/' + movie._id
                    })
                });
            } else if (message.EventKey === "movie_cold") {
                let movies = yield Movie.findHotMovies(-1, 10);

                movies.forEach(function(movie) {
                    news.push({
                        title: movie.title,
                        description: movie.title,
                        picUrl: movie.poster,
                        url: 'http://pennyo.viphk.ngrok.org/wechat/jump/' + movie._id
                    })
                });
            } else if (message.EventKey === "movie_crime") {
                let cat = yield Movie.findMoviesByCate('犯罪');

                cat.movies.forEach(function(movie) {
                    news.push({
                        title: movie.title,
                        description: movie.title,
                        picUrl: movie.poster,
                        url: 'http://pennyo.viphk.ngrok.org/wechat/jump/' + movie._id
                    })
                });
            } else if (message.EventKey === "movie_cartoon") {
                let cat = yield Movie.findMoviesByCate('动画');

                cat.movies.forEach(function(movie) {
                    news.push({
                        title: movie.title,
                        description: movie.title,
                        picUrl: movie.poster,
                        url: 'http://pennyo.viphk.ngrok.org/wechat/jump/' + movie._id
                    })
                });
            } else if (message.EventKey === "help") {
                news = help;
            }

            this.body = news;
        }
    } else if (message.MsgType === 'voice') {
        var voiceText = message.Recognition;
        var movies = yield Movie.searchByName(voiceText);

        if (!movies || movies.length == 0) {
            movies = yield Movie.searchByDouban(voiceText);
        }

        if (movies && movies.length > 0) {
            reply = [];
            movies = movies.slice(0, 10);

            movies.forEach(function(movie) {
                reply.push({
                    title: movie.title,
                    description: movie.title,
                    picUrl: movie.poster,
                    url: 'http://pennyo.viphk.ngrok.org/wechat/jump/' + movie._id
                })
            });
            console.log(reply);
        } else {
            reply = '没有查询到与' + voiceText + '匹配到的电影，要不要换一个名字试试';
        }

        this.body = reply;
    } else if (message.MsgType === 'text') {
        var content = message.Content;
        var reply = '额，你说的 ' + message.Content + ' 太复杂了';

        if (content === '1') {
            reply = '第一种方法看书';
        } else if (content === '2') {
            reply = '第二种方法喝茶';
        } else if (content === '3') {
            reply = '第三种方法晒太阳';
        } else if (content === '4') {
            reply = [{
                "title": '生活多喜乐',
                "description": '花鸟鱼虫，山河树木',
                "picUrl": 'http://oiler.manami.com.cn/img/1.jpg',
                "url": 'http://oiler.manami.com.cn/'
            }, {
                "title": '技术生活',
                "description": 'IT改变什么',
                "picUrl": 'http://oiler.manami.com.cn/img/2.jpg',
                "url": 'http://www.manami.com.cn'
            }];
        } else {
            var movies = yield Movie.searchByName(content);

            if (!movies || movies.length == 0) {
                movies = yield Movie.searchByDouban(content);
            }

            if (movies && movies.length > 0) {
                reply = [];
                movies = movies.slice(0, 10);

                movies.forEach(function(movie) {
                    reply.push({
                        title: movie.title,
                        description: movie.title,
                        picUrl: movie.poster,
                        url: 'http://pennyo.viphk.ngrok.org/wechat/jump/' + movie._id
                    })
                });
                // console.log(reply);
            } else {
                reply = '没有查询到与' + content + '匹配到的电影，要不要换一个名字试试';
            }
        }

        this.body = reply;
    }

    yield next
}
