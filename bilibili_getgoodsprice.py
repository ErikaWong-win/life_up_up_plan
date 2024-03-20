# Editor: Sheeran
# Date: 2024/2/17 19:47
# 魔力赏集市H5: https://mall.bilibili.com/neul-next/index.html?page=magic-market_index
from time import sleep

import requests
import json

url = "https://mall.bilibili.com/mall-magic-c/internet/c2c/v2/list"

i_want = []
nextId = None
while True:
  # 这里是价格过滤器
  payload = json.dumps({
    'categoryFilter':'2312',  # 这里是类型id，2312是手办

    'priceFilters': [
      '10000-10500' # 设定价格，精确到分，代码中没法显示小数点，所以要在价格后面多打两个0；这里写的就是你的心理预期价格
    ],
    'nextId': nextId
  })

  headers = {
    'authority': 'mall.bilibili.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
    'content-type': 'application/json',
    'cookie': 'buvid3=8E53A993-94B0-5918-7257-749C6551FA8356597infoc; i-wanna-go-back=-1; _uuid=C24108847-8EEB-C29F-F926-B4C1B33F32FB41837infoc; FEED_LIVE_VERSION=V8; home_feed_column=5; b_nut=1689339042; DedeUserID=20652666; DedeUserID__ckMd5=be6016803baa55b9; b_ut=5; header_theme_version=CLOSE; buvid4=FAF0DEF1-4614-999B-DD4F-E10464E26B7057651-023071420-aN5fltImCgR01MsGVIEPWjjV8jHC8KSHQ%2B7AYvH2TlPk%2Bx3u%2B0AtVA%3D%3D; rpdid=0zbfvRRteZ|CY893RkB|2Qy|3w1Qkiio; buvid_fp_plain=undefined; nostalgia_conf=-1; CURRENT_QUALITY=120; hit-new-style-dyn=1; hit-dyn-v2=1; browser_resolution=1699-838; enable_web_push=DISABLE; LIVE_BUVID=AUTO8817004879647758; balh_server_inner=__custom__; balh_is_closed=; CURRENT_BLACKGAP=0; PVID=1; CURRENT_FNVAL=4048; fingerprint=0e22c024afeb44c1071e4da7fa915232; buvid_fp=0e22c024afeb44c1071e4da7fa915232; bp_video_offset_20652666=907994792634351621; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTA5MDY2MjQsImlhdCI6MTcxMDY0NzM2NCwicGx0IjotMX0._o4gt5APAH7Bgydy954v8BwM9N-cmZfxo0-BOF9aDEU; bili_ticket_expires=1710906564; SESSDATA=9fc522b2%2C1726199426%2Cccd26%2A32CjDFsabW8Q-Y52F7Gql0zN2U-o7Hk9mkhVhyMWfx7t6VHdnr_9JHbGb-y_fIM26ZMrUSVmxwbDdEbFVVNGY4TTNkcHhaQkszYjF2bnlnQmlValpTTHR0UGJWS3FOdHVXY2xFWEJZOWRoR0JacFlhVTVIOWxEazk4UUpYUFpiVjM0MVRCUDFISmpRIIEC; bili_jct=e41e0922ac8a0cdf93e8ea316db93189; sid=5yipx80r',
    'origin': 'https://mall.bilibili.com',
    'referer': 'https://mall.bilibili.com/neul-next/index.html?page=magic-market_index',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/122.0.0.0'
  }
  try:
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)
    response = response.json()
    nextId = response['data']['nextId']
    if nextId is None:
      break
    data = response['data']['data']
    for item in data:
     name = item['c2cItemsName']
     if "雷姆" in name:  # 输入找手办的关键词
       if item not in i_want:
        i_want.append(item)
  except Exception as e:
    sleep(6)


# 打印数组中的所有ID，即输出最终找到的所有符合以上条件的商品
if i_want == []:
  print('没有找到任何商品，叔叔我日你妈')
  quit()
else:
  print('找到的所有商品：', i_want)


print('---------------------------')

# 从所有符合条件的商品中，找出价格最低的商品
min_element = min(i_want, key=lambda x: x['price'])
if 'c2cItemsId' in min_element.keys():
  print ('价格最低的商品：', "https://mall.bilibili.com/neul-next/index.html?page=magic-market_detail&noTitleBar=1&itemsId=", min_element['c2cItemsId'], '&from=market_index')