import sys
# !pip install bs4
import requests
from bs4 import BeautifulSoup

ddg_url = "https://html.duckduckgo.com/html/"

def scrape_search(query):
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
    r = requests.get(ddg_url, params={'q': query}, headers=headers)
    r.raise_for_status()

    soup = BeautifulSoup(r.text)
    arr = []
    for result in soup.findAll('div', class_='result__body'):
        link = result.find('a', class_='result__a')
#         print(link['href'])
#         print(link.text)
        another = result.find('a', class_='result__snippet')
#         print(another.text)
        obj = {
            "link": link['href'],
            "text":link.text,
            "description":another.text
        }
        arr.append(obj)
#         print("*************************")
    # print(arr)
    return {"res":arr}

# if __name__ == "__main__":
#     search2('Black Rot in Grape')