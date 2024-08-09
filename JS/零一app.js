import req from '../../util/req.js';
import { MOBILE_UA, PC_UA} from '../../util/misc.js';
import {load} from 'cheerio';

let url = 'http://42.157.129.14:2345/999/api.php/app';


async function request(reqUrl, referer, mth, data, host) {
    const headers = {
        'User-Agent': MOBILE_UA,
    };
    let resp = await req(reqUrl, {
        method: mth || 'get',
        headers: headers,
        data: data,
        postType: mth === 'post' ? 'form' : '',
    });
    return resp.data;
}

async function init(inReq, _outResp) {
    return {};
}

async function home(inReq, _outResp) {
    let classes = [{"type_id": "2", "type_name": "电视剧"}, {"type_id": "1", "type_name": "电影"}, {
        "type_id": "3",
        "type_name": "综艺"
    }, {"type_id": "4", "type_name": "动漫"},{"type_id": "5","type_name": "短剧"}];
    let filterObj = {
        "2": [
            {
                "key": "cate",
                "name": "分类",
                "value": [{"n": "全部", "v": ""}, {"n": "爱情", "v": "爱情"}, {"n": "喜剧", "v": "喜剧"},
                    {"n": "都市", "v": "都市"}, {"n": "悬疑", "v": "悬疑"}, {"n": "古装", "v": "古装"}, {"n": "犯罪", "v": "犯罪"},
                    {"n": "历史", "v": "历史"}, {"n": "战争", "v": "战争"}, {"n": "武侠", "v": "武侠"}, {"n": "警匪", "v": "警匪"},
                    {"n": "科幻", "v": "科幻"}, {"n": "奇幻", "v": "奇幻"}, {"n": "谍战", "v": "谍战"}, {"n": "农村", "v": "农村"},
                    {"n": "其他", "v": "其他"}]
            },
            {
                "key": "year",
                "name": "年份",
                "value": [{"n": "全部", "v": ""}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {
                    "n": "2021",
                    "v": "2021"
                }, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}, {
                    "n": "2017",
                    "v": "2017"
                }, {"n": "2016", "v": "2016"}]
            }, {
                "key": "by",
                "name": "排序",
                "value": [{"n": "最新", "v": "time"}, {"n": "最热", "v": ""}, {"n": "评分", "v": "score"}]
            }],
    "1": [
        {
            "key": "cate",
            "name": "分类",
            "value": [{"n": "全部", "v": ""}, {"n": "爱情", "v": "爱情"}, {"n": "喜剧", "v": "喜剧"},
                {"n": "动作", "v": "动作"}, {"n": "悬疑", "v": "悬疑"}, {"n": "古装", "v": "古装"}, {"n": "犯罪", "v": "犯罪"},
                {"n": "文艺", "v": "文艺"}, {"n": "战争", "v": "战争"}, {"n": "奇幻", "v": "奇幻"}, {"n": "警匪", "v": "警匪"},
                {"n": "科幻", "v": "科幻"},{"n": "动画", "v": "动画"}, {"n": "惊悚", "v": "惊悚"}, {"n": "恐怖", "v": "恐怖"},
                {"n": "传记", "v": "传记"}, {"n": "歌舞", "v": "歌舞"},{"n": "其他", "v": "其他"}]
        },
        {
            "key": "year",
            "name": "年份",
            "value": [{"n": "全部", "v": ""}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {
                "n": "2021",
                "v": "2021"
            }, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}, {
                "n": "2017",
                "v": "2017"
            }, {"n": "2016", "v": "2016"}]
        }, {
            "key": "by",
            "name": "排序",
            "value": [{"n": "最新", "v": "time"}, {"n": "最热", "v": ""}, {"n": "评分", "v": "score"}]
        }],
        "3": [
            {
                "key": "cate",
                "name": "分类",
                "value": [{"n": "全部", "v": ""}, {"n": "真人秀", "v": "真人秀"}, {"n": "生活", "v": "生活"},
                    {"n": "搞笑", "v": "搞笑"}, {"n": "访谈", "v": "访谈"}, {"n": "时尚", "v": "时尚"}, {"n": "音乐", "v": "音乐"},
                    {"n": "选秀", "v": "选秀"}, {"n": "美食", "v": "美食"}, {"n": "游戏", "v": "游戏"}, {"n": "纪实", "v": "纪实"},
                    {"n": "旅游", "v": "旅游"}, {"n": "情感", "v": "情感"}, {"n": "恶搞", "v": "恶搞"}, {"n": "吐槽", "v": "吐槽"},
                    {"n": "原创", "v": "原创"},{"n": "歌舞", "v": "歌舞"},{"n": "播报", "v": "播报"},{"n": "曲艺", "v": "曲艺"},
                    {"n": "科教", "v": "科教"},{"n": "其他", "v": "其他"}]
        },
            {
                "key": "year",
                "name": "年份",
                "value": [{"n": "全部", "v": ""}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {
                    "n": "2021",
                    "v": "2021"
                }, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}, {
                    "n": "2017",
                    "v": "2017"
                }, {"n": "2016", "v": "2016"}]
            }, {
                "key": "by",
                "name": "排序",
                "value": [{"n": "最新", "v": "time"}, {"n": "最热", "v": ""}, {"n": "评分", "v": "score"}]
            }],
        "4": [
            {
                "key": "cate",
                "name": "分类",
                "value": [{"n": "全部", "v": ""}, {"n": "搞笑", "v": "搞笑"}, {"n": "热血", "v": "热血"},
                    {"n": "冒险", "v": "冒险"}, {"n": "美少女", "v": "美少女"}, {"n": "校园", "v": "校园"}, {"n": "恋爱", "v": "恋爱"},
                    {"n": "神魔", "v": "神魔"}, {"n": "机战", "v": "机战"}, {"n": "益智", "v": "益智"}, {"n": "亲子", "v": "亲子"},
                    {"n": "科幻", "v": "科幻"}, {"n": "童话", "v": "童话"},{"n": "原创", "v": "原创"},{"n": "动作", "v": "动作"}, {"n": "耽美", "v": "耽美"}, {"n": "魔幻", "v": "魔幻"},
                    {"n": "其他", "v": "其他"}]
            },
            {
                "key": "year",
                "name": "年份",
                "value": [{"n": "全部", "v": ""}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {
                    "n": "2021",
                    "v": "2021"
                }, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}, {
                    "n": "2017",
                    "v": "2017"
                }, {"n": "2016", "v": "2016"}]
            }, {
                "key": "by",
                "name": "排序",
                "value": [{"n": "最新", "v": "time"}, {"n": "最热", "v": ""}, {"n": "评分", "v": "score"}]
            }],
        "5": [
            {
                "key": "cate",
                "name": "分类",
                "value": [{"n": "全部", "v": ""}, {"n": "逆袭", "v": "逆袭"}, {"n": "虐恋", "v": "虐恋"},
                {"n": "穿越", "v": "穿越"}, {"n": "重生", "v": "重生"}, {"n": "甜宠", "v": "甜宠"}, {"n": "都市", "v": "都市"},
                {"n": "战神", "v": "战神"}, {"n": "现代言情", "v": "现代言情"}, {"n": "神豪", "v": "神豪"}, {"n": "热血", "v": "热血"},
                {"n": "古装", "v": "古装"}, {"n": "超能", "v": "超能"},{"n": "赘婿", "v": "赘婿"},{"n": "神医", "v": "神医"},
                {"n": "玄幻", "v": "玄幻"},{"n": "复仇", "v": "复仇"}]
        }]
    };
    return {
        class: classes,
        filters: filterObj,
    }
}

async function category(inReq, _outResp) {
    const tid = inReq.body.id;
    const pg = inReq.body.page;
    const extend = inReq.body.filters;
    let page = pg || 1;
    if (page == 0) page = 1;
    //http://42.157.129.14:2345/999/api.php/app/video?txt=lingyi&ppuid=e63bf8d7d86c708cee54973ae3fad66a&pg=1&tid=2&class&area&lang&year&order=time
    const html = await request(url + `/video?txt=lingyi&ppuid=e63bf8d7d86c708cee54973ae3fad66a&pg=${pg}&tid=${tid}&class=${(extend.cate || '')}&area&lang&year=${(extend.year || '')}&order=${(extend.by || '')}`);
    let videos = [];
    for (const a of html.list ) {
        videos.push({
            vod_id: url+'/search?text='+a.vod_name,
            vod_name: a.vod_name,
            vod_pic: a.vod_pic,
            vod_remarks: a.vod_remarks || '',
        });
    }
    const hasMore = html.total/html.limit > 0;
    const pgCount = hasMore ? parseInt(pg) + 1 : parseInt(pg);
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: pgCount,
        limit: 24,
        total: 24 * pgCount,
        list: videos,
    });
}

async function detail(inReq, _outResp) {
    const id = inReq.body.id;
    const html = await request(`${id}`);
    let data = html.list[0];
    const vod = {
        vod_id: data.vod_id,
        vod_name: data.vod_name,
        vod_pic: data.vod_pic,
        vod_remarks: data.vod_remarks
    };
    const playdetail = await request(url+'/video_detail?id='+data.vod_id);
    vod.vod_play_from = playdetail.data.vod_play_from+"$$$";
    vod.vod_play_url = playdetail.data.vod_play_url+"$$$";
    return JSON.stringify({
        list: [vod],
    });
}

async function play(inReq, _outResp) {
    const id = inReq.body.id;
    let UA ='Lavf/58.12.100'
    if(id.indexOf('html') > 0){
        var relurl = await req.get('http://42.157.129.14:2345/json/lzth.php?url='+id,{
            headers:{
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'zh,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6',
                'Accept-Charset': 'UTF-8',
               ' User-Agent': UA,
                'Host': '42.157.129.14:2345',
                'Accept-Encoding': 'gzip'
            }
        })
        if(relurl.data.code===404){
            const relurl1 = await req.get('http://42.157.129.14:2345/json/360.php?url='+id,{
                headers:{
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'Accept-Language': 'zh,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6',
                    'Accept-Charset': 'UTF-8',
                    ' User-Agent': UA,
                    'Host': '42.157.129.14:2345',
                    'Accept-Encoding': 'gzip'
                }
            })
            return JSON.stringify({
                parse: 0,
                url: relurl1.data.url,
            });
        } else {
            return JSON.stringify({
                parse: 0,
                url: relurl.data.url,
            });
        }
    }else{
        const mu3_content = await request('http://42.157.129.14:2345/qu.php?url='+id)
        const m3u_link = mu3_content.url
        return JSON.stringify({
            parse: 0,
            url: m3u_link,
        });
    }
}

async function search(inReq, _outResp) {
    const wd = inReq.body.wd;
    let html = await request(`${url}/search?text=${wd}`);
    let data = html.list[0];
    const vod = {
        vod_id: data.vod_id,
        vod_name: data.vod_name,
        vod_pic: data.vod_pic,
        vod_remarks: data.vod_remarks
    };
    const playdetail = await request(url+'/app/video_detail?id='+data.vod_id);
    vod.vod_play_from = playdetail.data.vod_play_from;
    vod.vod_play_url = playdetail.data.vod_play_url;
    return JSON.stringify({
        list: [vod],
    });
}

async function test(inReq, outResp) {
    try {
        const printErr = function (json) {
            if (json.statusCode && json.statusCode === 500) {
                console.error(json);
            }
        };
        const prefix = inReq.server.prefix;
        const dataResult = {};
        let resp = await inReq.server.inject().post(`${prefix}/init`);
        dataResult.init = resp.json();
        printErr(resp.json());
        resp = await inReq.server.inject().post(`${prefix}/home`);
        dataResult.home = resp.json();
        printErr(resp.json());
        if (dataResult.home.class.length > 0) {
            resp = await inReq.server.inject().post(`${prefix}/category`).payload({
                id: dataResult.home.class[0].type_id,
                page: 1,
                filter: true,
                filters: {},
            });
            dataResult.category = resp.json();
            printErr(resp.json());
            if (dataResult.category.list && dataResult.category.list.length > 0) {
                resp = await inReq.server.inject().post(`${prefix}/detail`).payload({
                    id: dataResult.category.list[0].vod_id, // dataResult.category.list.map((v) => v.vod_id),
                });
                dataResult.detail = resp.json();
                printErr(resp.json());
                if (dataResult.detail.list && dataResult.detail.list.length > 0) {
                    dataResult.play = [];
                    for (const vod of dataResult.detail.list) {
                        const flags = vod.vod_play_from.split('$$$');
                        const ids = vod.vod_play_url.split('$$$');
                        for (let j = 0; j < flags.length; j++) {
                            const flag = flags[j];
                            const urls = ids[j].split('#');
                            for (let i = 0; i < urls.length && i < 2; i++) {
                                resp = await inReq.server
                                    .inject()
                                    .post(`${prefix}/play`)
                                    .payload({
                                        flag: flag,
                                        id: urls[i].split('$')[1],
                                    });
                                dataResult.play.push(resp.json());
                            }
                        }
                    }
                }
            }
        }
        // resp = await inReq.server.inject().post(`${prefix}/search`).payload({
        //   wd: '爱',
        //   page: 1,
        // });
        // dataResult.search = resp.json();
        printErr(resp.json());
        return dataResult;
    } catch (err) {
        console.error(err);
        outResp.code(500);
        return {err: err.message, tip: 'check debug console output'};
    }
}

export default {
    meta: {
        key: 'ly',
        name: '零一app',
        type: 3,
    },
    api: async (fastify) => {
        fastify.post('/init', init);
        fastify.post('/home', home);
        fastify.post('/category', category);
        fastify.post('/detail', detail);
        fastify.post('/play', play);
        fastify.post('/search', search);
        fastify.get('/test', test);
    },
};
