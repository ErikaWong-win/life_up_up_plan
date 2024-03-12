# from selenium import webdriver

# #打开谷歌浏览器
# driver = webdriver.Chrome()
# #打开百度搜索主页
# driver.get('https://www.baidu.com')
# driver.find_element_by_xpath('//*[@id="kw"]').send_keys('爱奇艺')
# driver.find_element_by_xpath('//*[@id="su"]').click()


from selenium import webdriver
import time

driver =webdriver.Chrome()
driver.get('https://passport.zhihuishu.com/login?service=https://onlineservice.zhihuishu.com/login/gologin')
time.sleep(3)
#send_keys设置input框内容  click处理点击
driver.find_element_by_xpath('//*[@id="lUsername"]').send_keys('13818981747')
driver.find_element_by_xpath('//*[@id="lPassword"]').send_keys('123')
driver.find_element_by_xpath('//*[@id="f_sign_up"]/div[1]/span').click()
