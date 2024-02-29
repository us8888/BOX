#coding=utf-8
#!/usr/bin/python
import json
import time
import requests
from base64 import b64decode
from datetime import datetime
from urllib.parse import unquote
from quickjs import Function

from units import getCache, setCache, delCache

class MUSIC():  # 元类 默认的元类 type
	def getInfo(self, params):
		if params['wd'] != '':
			return self.searchContent(params['wd'], params['pg'], params['quick'])
		elif params['t'] != '':
			return self.categoryContent(params['t'], params['pg'], json.loads(b64decode(unquote(params['ext'])).decode()))
		elif params['ids'] != '':
			return self.detailContent(params['ids'])
		elif params['play'] != '':
			return self.playerContent(params['flag'], params['play'])
		else:
			return self.homeContent(params['filter'])

	def homeContent(self, filters):
		result = {}
		result['class'] = [
			{'type_name': '华语', 'type_id': '6998499728862334976'},
			{'type_name': '欧美', 'type_id': '6951459197061984256'},
			{'type_name': '韩语', 'type_id': '6998475633361805312'},
			{'type_name': '日语', 'type_id': '6997855138153095168'}
		]
		return result, 14400

	def categoryContent(self, tid, pg, ext):
		result = {}
		if tid.startswith('ACT&&&'):
			data = json.loads(tid[6:])
			vid = f"ACT&&&[\"{data[0]}\", \"{data[1]}\", \"{data[2]}\"]"
			name = data[1]
			pic = data[2]
			videos = [{"vod_id": vid, "vod_pic": pic, "vod_name": name}]
		else:
			url = f'https://video-api.yinyuetai.com/video/explore/channelVideos?channelId={tid}&detailType=2&size=20&offset={20*(pg-1)}'
			r = requests.get(url, headers=self.header, verify=False, timeout=10)
			vodList = r.json()['data']
			videos = []
			for vod in vodList:
				vid = vod['id']
				pic = vod['fullClip']['headImg']
				name = vod['title']
				remark = vod["allArtistNames"]
				videos.append({
					"vod_id": vid,
					"vod_pic": pic,
					"vod_name": name,
					"vod_remarks": remark
				})
		result['list'] = videos
		result['page'] = 1
		result['pagecount'] = pg+1 if len(videos) == 20 else pg
		result['limit'] = len(videos)
		result['total'] = len(videos)
		return result, 14400

	def detailContent(self, ids):
		if ids.startswith('ACT&&&'):
			# timeStamp = str(int(time.time()))
			# src = f'id{ids[6:]}st{timeStamp}91fd6ee712437d42eeccdf545133039888d1cc77'
			# header = self.getHeader(src, timeStamp)
			# url = f'https://person-api.yinyuetai.com/person/getBase?id={ids[6:]}'
			# r = requests.get(url, headers=header, timeout=10)
			# data = r.json()['data']
			# pic = data['headImg']
			# name = data['niceName']
			# year = ''
			# content = ''
			# actors = f"[a=cr:{{'id':'ACT&&&{name}','name':'{name}'}}/]{name}[/a]"
			data = json.loads(ids[6:])
			pic = data[2]
			name = data[1]
			year = ''
			content = ''
			actors = f"[a=cr:{{'id':'ACT&&&{data[1]}','name':'{data[1]}'}}/]{data[1]}[/a]"
			url = f"https://video-api.yinyuetai.com/video/listByArtist?artistId={data[0]}&sinceId=0&size=999"
			r = requests.get(url, headers=self.header, timeout=10)
			data = r.json()['data']
			playInfosList = []
			for video in data:
				name = video['title']
				for url in video['fullClip']['urls']:
					playInfosList.append([url['display'], name, url['url']])
			vodPlayUrl = ''
			vodPlayFrom = ''
			playInfosList = sorted(playInfosList, key=lambda x: x[0])
			playFromList = []
			for playInfos in playInfosList:
				if playInfos[0] not in playFromList:
					vodPlayFrom += f"{playInfos[0]}$$$"
					playFromList.append(playInfos[0])
					vodPlayUrl = vodPlayUrl.strip('#') + f"$$${playInfos[1]}${playInfos[2]}#"
				else:
					vodPlayUrl += f"{playInfos[1]}${playInfos[2]}#"
		else:
			url = f'https://video-api.yinyuetai.com/video/get?id={ids}'
			r = requests.get(url, headers=self.header, timeout=10)
			data = r.json()['data']
			pic = data['fullClip']['headImg']
			name = data['title']
			year = datetime.fromtimestamp(int(data["publishDate"])).strftime("%Y")
			content = data['content'].strip()
			actors = ''
			for act in data['artists']:
				actors += f"[a=cr:{{'id':'ACT&&&[\"{act['id']}\", \"{act['name']}\", \"{act['headImg']}\"]','name':'{act['name']}'}}/]{act['name']}[/a],"
			vodPlayUrl = ''
			vodPlayFrom = ''
			for video in data['fullClip']['urls']:
				vodPlayUrl += f'{data["title"]}${video["url"]}$$$'
				vodPlayFrom += f'{video["display"]}$$$'
		vod = {
			"vod_id": ids,
			"vod_year": year,
			"vod_pic": pic,
			"vod_name": name,
			"vod_actor": actors.strip(','),
			"vod_content": content,
			"vod_play_url": vodPlayUrl.strip('$$$'),
			"vod_play_from":  vodPlayFrom.strip('$$$')
		}
		result = {
			'list': [
				vod
			]
		}
		return result, 3600

	def searchContent(self, key, pg, quick):
		videos = []
		sinceId = getCache(f'music_{key}_{pg}')
		if pg > 1 and not sinceId:
			return {'list': []}, 600

		header = {
			"Content-Type": "application/json",
			"Referer": "https://www.yinyuetai.com/",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36"
		}
		url = 'https://search-api.yinyuetai.com/search/get_search_result.json'
		params = {
			"searchType": "MV",
			"key": key,
			"sinceId": sinceId if sinceId else '',
			"size": 20,
			"requestTagRows": [{"key": "sortType", "chosenTags": ["COMPREHENSIVE"]}, {"key": "source", "chosenTags": ["-1"]}, {"key": "duration", "chosenTags": ["-1"]}]
		}
		r = requests.post(url, headers=header, json=params, timeout=10)
		delCache(f'music_{key}_{pg}')
		vodList = r.json()['data']
		if len(vodList) == 20:
			setCache(f'music_{key}_{pg+1}', vodList[-1]['id'])
		for vod in vodList:
			videos.append({
				"vod_id": vod['id'],
				"vod_name": vod['title'],
				"vod_pic": vod['fullClip']['headImg'],
				"vod_remarks": vod["allArtistNames"]
			})
		result = {'list': videos}
		return result, 600

	def playerContent(self, flag, pid):
		result = {}
		result["parse"] = 0
		result["url"] = pid
		return result, 3600

	def getHeader(self, src, timeStamp):
		functionJS = """function JS(src){for(var t=[],r=0;r<src.length;r++)t.push(src.charCodeAt(r)&255);for(var n=[],o=0,a=0;o<t.length;o++,a+=8)n[a>>>5]|=t[o]<<24-a%32;var s=t.length*8,i=n,l=[],c=1732584193,u=-271733879,p=-1732584194,f=271733878,d=-1009589776;i[s>>5]|=128<<24-s%32,i[(s+64>>>9<<4)+15]=s;for(var v=0;v<i.length;v+=16){for(var y=c,S=u,g=p,C=f,A=d,w=0;w<80;w++){if(w<16)l[w]=i[v+w];else{var T=l[w-3]^l[w-8]^l[w-14]^l[w-16];l[w]=T<<1|T>>>31}var U=(c<<5|c>>>27)+d+(l[w]>>>0)+(w<20?(u&p|~u&f)+1518500249:w<40?(u^p^f)+1859775393:w<60?(u&p|u&f|p&f)-1894007588:(u^p^f)-899497514);d=f,f=p,p=u<<30|u>>>2,u=c,c=U}c+=y,u+=S,p+=g,f+=C,d+=A}r=[c,u,p,f,d];for(var n=[],o=0;o<r.length*32;o+=8)n.push(r[o>>>5]>>>24-o%32&255);r=n;for(var n=[],o=0;o<r.length;o++)n.push((r[o]>>>4).toString(16)),n.push((r[o]&15).toString(16));return n.join("")}"""
		jsFunc = Function('JS', functionJS)
		res = jsFunc(src)
		header = {
			"pp": res,
			"st": timeStamp,
			"vi": "1.0.0;11;101",
			"wua": "YYT/1.0.0 (WEB;web;11;zh-CN;1fntsQkj24VlzZROIOCCN)",
			"Referer": "https://www.yinyuetai.com/",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36"
		}
		return header

	header = {
		"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36"
	}
