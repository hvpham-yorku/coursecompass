from bs4 import BeautifulSoup
import requests
import random

# list of user agents
userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    # "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.3342.1039 Safari/537.36",
    # "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.5528.1301 Safari/537.36",
    # "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.6327.1738 Safari/537.36",
    # "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.1553.1540 Safari/537.36",
    # "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.4613.1196 Safari/537.36",
]


headers = {
    "authority": "w2prod.sis.yorku.ca",
    "method": "GET",
    "path": "/Apps/WebObjects/cdm",
    "scheme": "https",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-encoding": "gzip, deflate, br, zstd",
    "accept-language": "en-US,en;q=0.9",
    "cookie": "_fbp=fb.1.1735237175505.71950264753474458; _scid=R1bpd4siila1u3sW6ZNhPmdrpfOcktj3; _gcl_au=1.1.113427937.1735237177; _tt_enable_cookie=1; _ttp=Op1OgcmtfFnz3GvQTAea8YR_TLG.tt.1; _hjSessionUser_1020482=eyJpZCI6IjY1ZTYyOTY1LWQxNjctNWE3ZC04YzJmLWM0ZWU3ZDYwY2Q2MiIsImNyZWF0ZWQiOjE3Mzg3Mzg2NDI3NTUsImV4aXN0aW5nIjp0cnVlfQ==; _sctr=1%7C1739941200000; _ga_DX5QPT1BP1=GS1.1.1740007250.3.1.1740007372.10.0.1162792642; _ga_0V7GCPHS8C=GS1.1.1740007250.3.1.1740007372.0.0.0; _ga_PEBT2P35HY=GS1.1.1740007250.3.1.1740007372.10.0.0; _scid_r=Wtbpd4siila1u3sW6ZNhPmdrpfOcktj3pIt-dw; _ga_F94BX0GT4T=GS1.1.1740007387.1.1.1740007458.60.0.0; _ga_PJW3EFS05D=GS1.1.1740018608.2.0.1740018608.0.0.0; _ga=GA1.2.857082067.1735237177; _gid=GA1.2.317928327.1742006264; __cflb=0H28vS27h3uF7CnjbNENszaAX7tRuHfDrwxZeZgEzZK; __cf_bm=wOHFfc1OUp..s0kEgr2r.6sa5ctfffN5hDsA3pC2UFg-1742011782-1.0.1.1-JfC.CvLeZOIYaYVXWWhsB0LCVOxrVU_IHufZGbP0JK99C7IDdmdP_vZXeg_FnENtGhjwXoO8pLG9N.ImRbq3m_L1GmJlzPeZh34A9DwxKvo; _gat=1; _ga_Z0E6N67TRH=GS1.2.1742006264.1.1.1742012003.0.0.0",
    "priority": "u=0, i",
    "referer": "https://www.google.com/",
    "sec-ch-ua": '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "cross-site",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
}


## Open the Home Page
home_page = requests.get(
    "https://w2prod.sis.yorku.ca/Apps/WebObjects/cdm",
    headers=headers,
)

if home_page.status_code == 200:
    print("Home Page Opened Successfully")
else:
    print(f"{home_page.status_code} Error Opening Home Page")
    exit()

print("Home Page", home_page)
