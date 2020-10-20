from bs4 import BeautifulSoup
#import urllib
import urllib.request as req
#import webbrowser

#
# f = open("/Users/jeewon.b/Desktop/naver.txt", "r")
# code = f.read()
# f.close()

# 1. 웹페이지 HTML 소스코드 가져오기
code = req.urlopen(
    "https://finance.naver.com/marketindex/?tabSel=exchange#tab_section")
# code = webbrowser.get("https://finance.naver.com/marketindex/?tabSel=exchange#tab_section")

print(code)
# 2. HTML 분석시키기
soup = BeautifulSoup(code, "html.parser")

# 3. 원하는 요소 가져오기
# price = soup.select_one("ul#exchangeList span.value")

word = soup.select("ul.ah_l span.ah_k")

count = 0
for i in word:
    print(i.string)
    count += 1
    if count == 20:
        break

# 4. 내용 출력하기
# f = open("환율.txt", "w")
# f.write("미국 : {}원".format(price[0].string)+"\n")
# f.write("일본 : {}원".format(price[1].string)+"\n")
#
