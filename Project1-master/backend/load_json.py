import json
import requests


def load_agencies():
    agency_count = 0
    request_id = 1
    agencies_dict = {"agencies": []}
    while agency_count <= 267:
        if request_id <= 285 or request_id >= 999:
            url = 'https://lldev.thespacedevs.com/2.2.0/agencies/' + str(request_id)
            response = requests.get(url)
            if response.status_code == 200:
                agency_count += 1
                # create dictionary for single agency
                one_agency = response.json()
                # getting rid of key-value pairs we don't need
                del one_agency['url']
                del one_agency['featured']
                del one_agency['abbrev']
                del one_agency['administrator']
                del one_agency['launchers']
                del one_agency['spacecraft']
                del one_agency['parent']
                del one_agency['launch_library_url']
                del one_agency['failed_launches']
                del one_agency['pending_launches']
                del one_agency['failed_landings']
                del one_agency['nation_url']
                del one_agency['launcher_list']
                del one_agency['spacecraft_list']

                # add agency to agencies dictionary
                agencies_dict["agencies"].append(one_agency)

        request_id += 1
    # write JSON file using agencies_dict
    with open('JSON/agencies.json', 'w') as outfile:
        json.dump(agencies_dict, outfile, indent=4)


def load_launches():
    launches_dict = {"launches": []}
    for i in range(0, 1900, 100):
        url = 'https://lldev.thespacedevs.com/2.2.0/launch/?limit=100&offset=' + str(i)
        response = requests.get(url)
        response_dict = response.json()
        launches_dict["launches"] += response_dict["results"]
    # getting rid of key-value pairs we don't want
    # separating nested dictionaries into individual key-value pairs
    for dict in launches_dict["launches"]:
        del dict["url"]
        del dict["slug"]
        dict["status_abbrev"] = dict["status"]["abbrev"]
        dict["status_name"] = dict["status"]["name"]
        dict["status_description"] = dict["status"]["description"]
        if dict["launch_service_provider"] is not None:
            dict["launch_service_provider_id"] = dict["launch_service_provider"]["id"]
            dict["launch_service_provider_name"] = dict["launch_service_provider"]["name"]
        else:
            dict["launch_service_provider_id"] = None
            dict["launch_service_provider_name"] = None
        dict["rocket_id"] = dict["rocket"]["configuration"]["id"]
        dict["rocket_name"] = dict["rocket"]["configuration"]["name"]
        dict["pad_name"] = dict["pad"]["name"]
        dict["map_url"] = dict["pad"]["map_url"]
        dict["lat"] = dict["pad"]["latitude"]
        dict["lng"] = dict["pad"]["longitude"]
        del dict["status"]
        del dict["pad"]
        del dict["last_updated"]
        del dict["net"]
        del dict["window_end"]
        del dict["probability"]
        del dict["holdreason"]
        del dict["hashtag"]
        del dict["webcast_live"]
        del dict["infographic"]
        del dict["program"]
        del dict["mission"]
        del dict["launch_service_provider"]
        del dict["rocket"]


    with open('JSON/launches.json', 'w') as outfile:
        json.dump(launches_dict, outfile, indent=4)


def load_launchers():
    launcher_count = 0
    request_id = 1
    launchers_dict = {"launchers": []}
    while launcher_count <= 456:  # <= 456
        url = 'https://lldev.thespacedevs.com/2.2.0/config/launcher/' + str(request_id)
        response = requests.get(url)
        if response.status_code == 200:
            launcher_count += 1
            # create dictionary for single launch
            one_launcher = response.json()

            # make it to where value for manufacturer key is the id of the related agency
            one_launcher["manufacturer"] = one_launcher["manufacturer"]["id"]

            # getting rid of key-value pairs we don't need
            del one_launcher["url"]
            del one_launcher["full_name"]
            del one_launcher["program"]
            del one_launcher["alias"]
            del one_launcher["min_stage"]
            del one_launcher["max_stage"]
            del one_launcher["leo_capacity"]
            del one_launcher["gto_capacity"]
            del one_launcher["vehicle_range"]
            del one_launcher["apogee"]
            del one_launcher["pending_launches"]

            # add launch to launches dictionary
            launchers_dict["launchers"].append(one_launcher)
        request_id += 1

    # write dictionary onto JSON file
    with open('JSON/launchers.json', 'w') as outfile:
        json.dump(launchers_dict, outfile, indent=4)


def main():
    #load_agencies()
    load_launches()
    #load_launchers()


main()
