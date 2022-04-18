#!/usr/bin/env python3

# ---------------------------
# projects/IDB3/create_db.py
# Fares Fraij
# ---------------------------

import json
import re

from models import app, db, launches, launchers, agencies, serviced, used, made_by


# ------------
# load_json
# ------------
def load_json(filename):
    """
    return a python dict jsn
    filename a json file
    """
    with open(filename) as file:
        jsn = json.load(file)
        file.close()

    return jsn


# ------------
# clean_cost
# ------------
# Takes in string, returns a formatted float number. Used to format the launch_cost attribute in launcher before loading
# into database
def clean_cost(cost):
    # if empty return none/null
    if cost == '' or cost is None:
        return None
    # get rid of any characters that aren't integers, "M" or "m" or "," or "."
    cost = re.sub('[^Mm0-9-.]+', '', cost)
    # if cost is a range, make it the higher limit only
    if '-' in cost:
        cost = re.split('-', cost)
        cost = cost[1]
    # if there's no m or M in string, divide by a million
    if 'm' not in cost and 'M' not in cost:
        cost = re.sub('[^0-9]', '', cost)
        cost = float(cost) / 1000000
    else:
        cost = float(re.sub('[^0-9.]', '', cost))
    if cost < 1:
        return None
    # returns a float which represents cost in millions of dollars
    return cost


# ------------
# create_launches
# ------------
def create_launches():
    launches_json = load_json('JSON/launches.json')

    for oneLaunch in launches_json['launches']:
        launch_id = oneLaunch["id"]
        launcher_id = oneLaunch["rocket_id"]
        agency_id = oneLaunch["launch_service_provider_id"]
        if agency_id is None:
            continue
        agency_name = oneLaunch["launch_service_provider_name"]
        launch_name = oneLaunch["name"]
        launcher_name = oneLaunch["rocket_name"]
        window_start = oneLaunch["window_start"]
        failreason = oneLaunch["failreason"]
        if failreason == "":
            failreason = None
        image = oneLaunch["image"]
        status_abbrev = oneLaunch["status_abbrev"]
        status_name = oneLaunch["status_name"]
        status_description = oneLaunch["status_description"]
        pad_name = oneLaunch["pad_name"]
        map_url = oneLaunch["map_url"]
        lat_str = oneLaunch["lat"]
        lat_float = float(lat_str)
        lng_str = oneLaunch["lng"]
        lng_float = float(lng_str)

        newLaunches = launches(launch_id=launch_id, launcher_id=launcher_id, agency_id=agency_id,
                               agency_name=agency_name, launch_name=launch_name, launcher_name=launcher_name,
                               window_start=window_start, failreason=failreason, image=image,
                               status_abbrev=status_abbrev, status_name=status_name,
                               status_description=status_description, pad_name=pad_name, map_url=map_url,
                               lat=lat_float, lng=lng_float)

        db.session.add(newLaunches)
        db.session.commit()


# ------------
# create_launcher
# ------------
def create_launchers():
    launchers_json = load_json("JSON/launchers.json")

    for oneLauncher in launchers_json['launchers']:
        launcher_id = oneLauncher["id"]
        agency_id = oneLauncher["manufacturer"]
        launcher_name = oneLauncher["name"]
        description = oneLauncher["description"]
        family = oneLauncher["family"]
        variant = oneLauncher["variant"]
        length = oneLauncher["length"]
        diameter = oneLauncher["diameter"]
        maiden_flight = oneLauncher["maiden_flight"]
        launch_cost = clean_cost(oneLauncher["launch_cost"])
        launch_mass = oneLauncher["launch_mass"]
        to_thrust = oneLauncher["to_thrust"]
        image_url = oneLauncher["image_url"]
        info_url = oneLauncher["info_url"]
        wiki_url = oneLauncher["wiki_url"]
        total_launch_count = oneLauncher["total_launch_count"]
        consecutive_successful_launches = oneLauncher["consecutive_successful_launches"]
        successful_launches = oneLauncher["successful_launches"]
        failed_launches = oneLauncher["failed_launches"]

        newLauncher = launchers(launcher_id=launcher_id, agency_id=agency_id, launcher_name=launcher_name,
                                description=description, family=family,
                                variant=variant, length=length, diameter=diameter, maiden_flight=maiden_flight,
                                launch_cost=launch_cost, launch_mass=launch_mass, to_thrust=to_thrust,
                                image_url=image_url, info_url=info_url, wiki_url=wiki_url,
                                total_launch_count=total_launch_count,
                                consecutive_successful_launches=consecutive_successful_launches,
                                successful_launches=successful_launches, failed_launches=failed_launches)

        db.session.add(newLauncher)
        db.session.commit()


# ------------
# create_agencies
# ------------
def create_agencies():
    agencies_json = load_json("JSON/agencies.json")

    for oneAgency in agencies_json["agencies"]:
        agency_id = oneAgency["id"]
        agency_name = oneAgency["name"]
        type = oneAgency["type"]
        country_code = oneAgency["country_code"]
        description = oneAgency["description"]
        founding_year = oneAgency["founding_year"]
        total_launch_count = oneAgency["total_launch_count"]
        successful_launches = oneAgency["successful_launches"]
        consecutive_successful_launches = oneAgency["consecutive_successful_launches"]
        successful_landings = oneAgency["successful_landings"]
        attempted_landings = oneAgency["attempted_landings"]
        consecutive_successful_landings = oneAgency["consecutive_successful_landings"]
        info_url = oneAgency["info_url"]
        wiki_url = oneAgency["wiki_url"]
        logo_url = oneAgency["logo_url"]
        image_url = oneAgency["image_url"]

        newAgency = agencies(agency_id=agency_id, agency_name=agency_name, type=type, country_code=country_code,
                             description=description, founding_year=founding_year,
                             total_launch_count=total_launch_count,
                             successful_launches=successful_launches,
                             consecutive_successful_launches=consecutive_successful_launches,
                             successful_landings=successful_landings, attempted_landings=attempted_landings,
                             consecutive_successful_landings=consecutive_successful_landings, info_url=info_url,
                             wiki_url=wiki_url, logo_url=logo_url, image_url=image_url)

        db.session.add(newAgency)
        db.session.commit()


# ------------
# create_serviced
# ------------
def create_serviced():
    launches_json = load_json('JSON/launches.json')

    for oneLaunch in launches_json['launches']:
        launch_id = oneLaunch["id"]
        launch_name = oneLaunch["name"]
        agency_id = oneLaunch["launch_service_provider_id"]
        if agency_id is None:
            continue
        agency_name = oneLaunch["launch_service_provider_name"]

        newService = serviced(launch_id=launch_id, launch_name=launch_name, agency_id=agency_id,
                              agency_name=agency_name)

        db.session.add(newService)
        db.session.commit()


# ------------
# create_made_by
# ------------
def create_made_by():
    launchers_json = load_json('JSON/launchers.json')
    agency_json = load_json("JSON/agencies.json")
    for oneLauncher in launchers_json['launchers']:
        launcher_id = oneLauncher["id"]
        launcher_name = oneLauncher["name"]
        agency_id = oneLauncher["manufacturer"]
        if agency_id is None:
            continue
        for oneAgency in agency_json["agencies"]:
            if oneAgency["id"] == agency_id:
                agency_name = oneAgency["name"]

        newMade_by = made_by(launcher_id=launcher_id, launcher_name=launcher_name, agency_id=agency_id,
                             agency_name=agency_name)

        db.session.add(newMade_by)
        db.session.commit()


# ------------
# create_used
# ------------

def create_used():
    launches_json = load_json('JSON/launches.json')

    for oneLaunch in launches_json['launches']:
        agency_id = oneLaunch["launch_service_provider_id"]
        if agency_id is None:
            continue
        launch_id = oneLaunch["id"]
        launch_name = oneLaunch["name"]
        launcher_id = oneLaunch["rocket_id"]
        launcher_name = oneLaunch["rocket_name"]

        newUsed = used(launch_id=launch_id, launch_name=launch_name, launcher_id=launcher_id,
                       launcher_name=launcher_name)

        db.session.add(newUsed)
        db.session.commit()


db.drop_all()
db.create_all()

create_launches()
create_launchers()
create_agencies()

create_serviced()
create_used()
create_made_by()
