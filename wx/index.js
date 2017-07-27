'use strict'

var path = require('path');
var util = require('../libs/util');
var Wechat = require('../wechat/wechat');
var wechat_file = path.join(__dirname, '../config/wechat.txt');
var wechat_ticket_file = path.join(__dirname, '../config/wechat_ticket.txt');

var config = {
    wechat: {
        "appID": 'wx4185bb0b486d6860',
        "appSecret": '1fe095cd2af7d6db464e45b15f5f718f',
        "token": 'pennyohknogorccscj',
        // "prefix": "https://api.weixin.qq.com/cgi-bin/",
        // "mpPrefix": "https://mp.weixin.qq.com/cgi-bin/",
        "getAccessToken": function() {
            return util.readFileAsync(wechat_file);
        },
        "saveAccessToken": function(data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data);
        },
        "getTicket": function() {
            return util.readFileAsync(wechat_ticket_file);
        },
        "saveTicket": function(data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_ticket_file, data);
        }
    }
}

exports.wechatOptions = config;
exports.getWechat = function() {
    var wechatApi = new Wechat(config.wechat);

    return wechatApi;
}
