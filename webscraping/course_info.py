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
  "Host": "w2prod.sis.yorku.ca",
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Referer": "https://www.google.com/",
  "DNT": "1",
  "Connection": "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "cross-site",
  "Sec-Fetch-User": "?1",
  "Priority": "u=0, i",
  "TE": "trailers"
}

base_url = "https://w2prod.sis.yorku.ca"

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

HomePageSoup = BeautifulSoup(home_page.text, "lxml")

# get the link to the Course Campus Search
courseCampusLink = HomePageSoup.find('a', string="Course Campus").get('href')

wosid = courseCampusLink.split('/')[-2]

# get the link to search courses
course_search_page = requests.get(
    base_url+courseCampusLink,
    headers=headers)
soup = BeautifulSoup(course_search_page.text, "lxml")

search_link = soup.find("form", {"name":"courseCampusForm"}).get('action')

# send the request to get all the courses in keele
courseSearch_form_data = {
    "sessionPopUp":0,
    "selectCampusBox":2,
    "3.10.7.5":"Search Courses",
    #"wosid":wosid
}
all_course_page = requests.post(
    search_link,
    headers=headers,
    data=courseSearch_form_data
)

#with open("output.txt","w") as text_file:
#    text_file.write(all_course_page.text)

soup = BeautifulSoup(all_course_page.text,"lxml")

tables_tags = soup.find_all("table")[6].find_all('tr')

del tables_tags[0]

for tag in tables_tags:

    info = tag.text.split("\n")

    collected = {
        "COURSE_CODE" : info[1],
        "COURSE_NAME" : info[2],
        "COURSE_CREDIT" : info[1][-4:-1]
    }

    ################################### getting profs ################################

    info_link = tag.find("a").get("href")

    more_info = requests.get(
        base_url+info_link,
        headers=headers,
    )

    info_soup = BeautifulSoup(more_info.text, "lxml")
    table_with_each_section = info_soup.find_all("table")[6]

    each_section = table_with_each_section.find_all("tr",recursive=False)

    prof_list = []

    for sec in each_section:
        instructor_tags = sec.find_all("a",href=True)
        # Extract and print the instructor names
        instructor_names = [tag.get_text() for tag in instructor_tags]

        instructor_names = list(
            filter(
                lambda x: x != "Please click here to see details."
                and x != "Please click here to see availability.",
                instructor_names
            )
        )

        instructor_names = [ name.replace("\xa0", " ") for name in instructor_names]

        prof_list.extend(instructor_names)

    collected["proffessor"] = prof_list

    ##################################### get Description ##################################

    p_tags = info_soup.find_all('p')

    for i in range(len(p_tags) - 1):
        if "Course Description:" in p_tags[i].text:
            des = p_tags[i+1].text.strip()
            collected["description"] = des
    
    print(collected)

    #################################### get preRequisites #################################

    

