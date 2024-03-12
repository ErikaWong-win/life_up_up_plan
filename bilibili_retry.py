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
      '5000-20000' # 设定价格，精确到分，代码中没法显示小数点，所以要在价格后面多打两个0；这里写的就是你的心理预期价格
    ],
    'nextId': nextId
  })

  headers = {
    'authority': 'mall.bilibili.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
    'content-type': 'application/json',
    'cookie': 'buvid3=8E53A993-94B0-5918-7257-749C6551FA8356597infoc; i-wanna-go-back=-1; _uuid=C24108847-8EEB-C29F-F926-B4C1B33F32FB41837infoc; FEED_LIVE_VERSION=V8; home_feed_column=5; b_nut=1689339042; DedeUserID=20652666; DedeUserID__ckMd5=be6016803baa55b9; b_ut=5; header_theme_version=CLOSE; buvid4=FAF0DEF1-4614-999B-DD4F-E10464E26B7057651-023071420-aN5fltImCgR01MsGVIEPWjjV8jHC8KSHQ%2B7AYvH2TlPk%2Bx3u%2B0AtVA%3D%3D; rpdid=0zbfvRRteZ|CY893RkB|2Qy|3w1Qkiio; buvid_fp_plain=undefined; nostalgia_conf=-1; CURRENT_QUALITY=120; hit-new-style-dyn=1; hit-dyn-v2=1; browser_resolution=1699-838; enable_web_push=DISABLE; LIVE_BUVID=AUTO8817004879647758; balh_server_inner=__custom__; balh_is_closed=; CURRENT_BLACKGAP=0; PVID=1; CURRENT_FNVAL=4048; fingerprint=874f2bf16e999c689333df0abd40f2ab; buvid_fp=874f2bf16e999c689333df0abd40f2ab; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDg0MTEzODAsImlhdCI6MTcwODE1MjEyMCwicGx0IjotMX0.Pj5rQe8qEbvjIGsWfh29gs9VLZsNpiDYcYMv6WGU3-g; bili_ticket_expires=1708411320; SESSDATA=4d137a48%2C1723704181%2Cdfc88%2A22CjCWMpYsMAcfu7Kn2FadmLBr_QCYntliWWOkUBPeRVAjKAOjhskTsBWoPU74HFTRfwgSVjR2QTdSem1uNnE1MXhIYlpwRUM5OFktdGc3WXprQ0N0MjdEY2FiQ1VlVFlTd1NhY3ZrYjZSU25GZHdGZ2dvc2t3cUNhdkJHODNTbGNXX1lNUTBidVZ3IIEC; bili_jct=cefe419d1168f84ede78a9c1ced19b96; sid=qm0iw6ow; bp_video_offset_20652666=898984775898890274; b_lsid=51EDC3B2_18DB6E3F063; bsource=search_bing',
    'origin': 'https://mall.bilibili.com',
    'referer': 'https://mall.bilibili.com/neul-next/index.html?page=magic-market_index',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/121.0.0.0'
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
     if "狼与香辛料" in name:  # 输入找手办的关键词
       if item not in i_want:
        i_want.append(item)
  except Exception as e:
    sleep(6)


# 打印数组中的所有ID，即输出最终找到的所有符合以上条件的商品
if i_want == []:
  print('没有找到任何商品')
  quit()
else:
  print('这里是找到的所有商品:', i_want)

print('---------------------------')

# 从所有符合条件的商品中，找出价格最低的商品
min_element = min(i_want, key=lambda x: x['price'])
print('这就是价格最低的商品:', min_element)