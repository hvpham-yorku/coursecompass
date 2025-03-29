import json
from bs4 import BeautifulSoup
import requests


def get_prereqs_string(prereq):
    return [f"{item['dept']} {item['code']} {item['credit']}.0" for item in prereq]


def find_courses(data):
    # A list to store matching objects
    results = []

    # Base case: if the data is a dictionary
    if isinstance(data, dict):
        # Check if the current dictionary contains a "key" with the expected structure
        if "key" in data and isinstance(data["key"], dict):
            key = data["key"]
            if "faculty" in key and "dept" in key and "code" in key and "credit" in key:
                # If the structure matches, append the object to results
                results.append(data)
        # Recursively check all values in the dictionary
        for value in data.values():
            results.extend(find_courses(value))

    # Base case: if the data is a list
    elif isinstance(data, list):
        for item in data:
            results.extend(find_courses(item))

    return results


############################### get all deps ###############################

depts = []

res = requests.get("https://coursedelta.yorku.dev/")

soup = BeautifulSoup(res.text, "html.parser")

for op in soup.find_all("option", {"value": True}):
    depts.append(op.get("value"))

################################# get courses from each deps ###############################

depts = ["EECS"]

for dept in depts:
    res = requests.get(f"https://coursedelta.yorku.dev/graph/?dept={dept.lower()}")
    soup = BeautifulSoup(res.text, "html.parser")

    script_tag = soup.find("script", text=lambda t: t and "course_boxes_json" in t)

    start_index = script_tag.string.rindex("course_boxes_json = ") + len(
        "course_boxes_json = "
    )
    end_index = script_tag.string.rindex("};") + 1

    json_data = json.loads(script_tag.string[start_index:end_index])

    for course in find_courses(json_data):
        course_id = course["key"]["dept"] + course["key"]["code"]
        preReqs = get_prereqs_string(course["prereqs"])
