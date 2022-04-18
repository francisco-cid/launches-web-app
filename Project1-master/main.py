import os
import unittest
from flask import Flask, render_template, request, send_from_directory, make_response
import backend.test as unit_test
import io
from backend.models import app, db, launches, launchers, agencies, used, made_by, serviced


# The db connection line is moved to models.py

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")

# -----------------
# External APIs to fetch DB data from frontend

@app.route('/api/launches')
def get_launches():
    """ Fetch all launches from the database """
    launches_list = db.session.query(launches).all()
    response = list()

    for launch in launches_list:
        response.append({
            "launch_id": launch.launch_id,
            "launcher_id": launch.launcher_id,
            "agency_id": launch.agency_id,
            "name": launch.launch_name,
            "window_start": launch.window_start,
            "failreason": launch.failreason,
            "image": launch.image,
            "status_abbrev": launch.status_abbrev,
            "status_name": launch.status_name,
            "status_description": launch.status_description,
            "pad_name": launch.pad_name,
            "map_url": launch.map_url
        })

    return make_response({
        'launches': response
    }, 200)

@app.route('/api/launches/<string:launch_id>')
def get_launch_detail(launch_id):
    """ Fetch single launch from the database """
    launch = db.session.query(launches).get(launch_id)
    agency = db.session.query(agencies).filter_by(agency_id=launch.agency_id).one()
    launcher = db.session.query(launchers).filter_by(launcher_id=launch.launcher_id).one()
    response = list()

    response.append({
        "launch_id": launch.launch_id,
        "launcher_id": launch.launcher_id,
        "launcher_name": launch.launcher_name,
        "agency_id": launch.agency_id,
        "agency_name": agency.agency_name,
        "agency_image": agency.logo_url,
        "name": launch.launch_name,
        "window_start": launch.window_start,
        "failreason": launch.failreason,
        "image": launch.image,
        "status_abbrev": launch.status_abbrev,
        "status_name": launch.status_name,
        "status_description": launch.status_description,
        "pad_name": launch.pad_name,
        "map_url": launch.map_url,
        "lat": launch.lat,
        "lng": launch.lng
    })

    return make_response({
        'launch': response
    }, 200)


@app.route('/api/launchers')
def get_launchers():
    """ Fetch all launchers from the database """
    launchers_list = db.session.query(launchers).all()
    response = list()

    for launcher in launchers_list:
        response.append({
            "launcher_id": launcher.launcher_id,
            "agency_id": launcher.agency_id,
            "name": launcher.launcher_name,
            "description": launcher.description,
            "family": launcher.family,
            "variant": launcher.variant,
            "length": launcher.length,
            "diameter": launcher.diameter,
            "maiden_flight": launcher.maiden_flight,
            "launch_cost": launcher.launch_cost,
            "launch_mass": launcher.launch_mass,
            "to_thrust": launcher.to_thrust,
            "image_url": launcher.image_url,
            "info_url": launcher.info_url,
            "wiki_url": launcher.wiki_url,
            "total_launch_count": launcher.total_launch_count,
            "consecutive_successful_launches": launcher.consecutive_successful_launches,
            "successful_launches": launcher.successful_launches,
            "failed_launches": launcher.failed_launches
        })

    return make_response({
        'launchers': response
    }, 200)

@app.route('/api/launchers/<int:launcher_id>')
def get_launcher_detail(launcher_id):
    """ Fetch single launcher from the database """
    launcher = db.session.query(launchers).get(launcher_id)
    agency = db.session.query(agencies).filter_by(agency_id=launcher.agency_id).one()
    response = list()
    launcher_launches_list = db.session.query(used).filter_by(launcher_id=launcher.launcher_id).all()
    launcher_launches_name = []
    launcher_launches_id = []
    for launch in launcher_launches_list:
        launcher_launches_name.append(launch.__dict__['launch_name'])
        launcher_launches_id.append(launch.__dict__['launch_id'])

    response.append({
        "launches_name": launcher_launches_name,
        "launches_id": launcher_launches_id,
        "launcher_id": launcher.launcher_id,
        "agency_id": launcher.agency_id,
        "agency_name": agency.agency_name,
        "agency_image": agency.logo_url,
        "name": launcher.launcher_name,
        "description": launcher.description,
        "family": launcher.family,
        "variant": launcher.variant,
        "length": launcher.length,
        "diameter": launcher.diameter,
        "maiden_flight": launcher.maiden_flight,
        "launch_cost": launcher.launch_cost,
        "launch_mass": launcher.launch_mass,
        "to_thrust": launcher.to_thrust,
        "image_url": launcher.image_url,
        "info_url": launcher.info_url,
        "wiki_url": launcher.wiki_url,
        "total_launch_count": launcher.total_launch_count,
        "consecutive_successful_launches": launcher.consecutive_successful_launches,
        "successful_launches": launcher.successful_launches,
        "failed_launches": launcher.failed_launches
    })

    return make_response({
        'launcher': response
    }, 200)

@app.route('/api/agencies')
def get_agencies():
    """ Fetch all agencies from the database """
    agencies_list = db.session.query(agencies).all()
    response = list()

    for agency in agencies_list:
        response.append({
            "agency_id": agency.agency_id,
            "name": agency.agency_name,
            "type": agency.type,
            "country_code": agency.country_code,
            "description": agency.description,
            "founding_year": agency.founding_year,
            "total_launch_count": agency.total_launch_count,
            "successful_launches": agency.successful_launches,
            "consecutive_successful_launches": agency.consecutive_successful_launches,
            "successful_landings": agency.successful_landings,
            "attempted_landings": agency.attempted_landings,
            "consecutive_successful_landings": agency.consecutive_successful_landings,
            "info_url": agency.info_url,
            "wiki_url": agency.wiki_url,
            "logo_url": agency.logo_url,
            "image_url": agency.image_url
        })

    return make_response({
        'agencies': response
    }, 200)

@app.route('/api/agencies/<int:agency_id>')
def get_agency_detail(agency_id):
    """ Fetch all agencies from the database """
    agency = db.session.query(agencies).get(agency_id)
    response = list()
    agency_launches_list = db.session.query(serviced).filter_by(agency_id=agency.agency_id).all()
    agency_launches_name = []
    agency_launches_id = []
    for launch in agency_launches_list:
        agency_launches_name.append(launch.__dict__['launch_name'])
        agency_launches_id.append(launch.__dict__['launch_id'])
    agency_launchers_list = db.session.query(made_by).filter_by(agency_id=agency.agency_id).all()
    agency_launchers_name = []
    agency_launchers_id = []
    for launcher in agency_launchers_list:
        agency_launchers_name.append(launcher.__dict__['launcher_name'])
        agency_launchers_id.append(launcher.__dict__['launcher_id'])

    response.append({
        "launches_name": agency_launches_name,
        "launches_id": agency_launches_id,
        "launcher_name": agency_launchers_name,
        "launcher_id": agency_launchers_id,
        "agency_id": agency.agency_id,
        "name": agency.agency_name,
        "type": agency.type,
        "country_code": agency.country_code,
        "description": agency.description,
        "founding_year": agency.founding_year,
        "total_launch_count": agency.total_launch_count,
        "successful_launches": agency.successful_launches,
        "consecutive_successful_launches": agency.consecutive_successful_launches,
        "successful_landings": agency.successful_landings,
        "attempted_landings": agency.attempted_landings,
        "consecutive_successful_landings": agency.consecutive_successful_landings,
        "info_url": agency.info_url,
        "wiki_url": agency.wiki_url,
        "logo_url": agency.logo_url,
        "image_url": agency.image_url
    })

    return make_response({
        'agency': response
    }, 200)

@app.route('/api/test')
def run_unit_tests():
    f = io.StringIO()
    runner = unittest.TextTestRunner(stream=f, verbosity=2)
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    suite.addTests(loader.loadTestsFromModule(unit_test))
    result = runner.run(suite)
    results = f.getvalue()
    results = results.replace('\n','<br>')
    return {'TestResults':results}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, threaded=True, debug=True)
