#!/usr/bin/env python3

# ---------------------------
# projects/IDB3/models.py
# Prof: Fares Fraij
# Group: 16
# Group Memebers: Adnan Desai, Caleb Campbell, Francisco Cid, Jiuyuan Chen, Maryam Hussaini, Samuel Pang
# Website URL: LaunchedApp.me
# Date: 23 April 2021
# ---------------------------

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

app = Flask(__name__, static_folder="../frontend/build/static", template_folder="../frontend/build")
CORS(app)


# Use the following line for prod db server
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",
#                                                        'postgresql://postgres:1234@35.224.250.226:5432/postgres')

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",
                                                       'postgresql://postgres:1234@localhost/postgres')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # to suppress a warning message
db = SQLAlchemy(app)


# ------------
# Launches
# ------------
class launches(db.Model):
    """
    Launches class inherits from db.Model
    db.Model is an object coming from SQLAlchemy
    Output: creates launches entity to be added to the database
    and used in launches pages
    """


    __tablename__ = 'launch'

    launch_id = db.Column(db.String(500), primary_key=True, nullable=False)
    launcher_id = db.Column(db.Integer, nullable=False)
    agency_id = db.Column(db.Integer, nullable=False)
    agency_name = db.Column(db.Text, nullable=False)
    launch_name = db.Column(db.Text, nullable=False)
    launcher_name = db.Column(db.Text, nullable=False)
    window_start = db.Column(db.Text)
    failreason = db.Column(db.Text)
    image = db.Column(db.Text)
    status_abbrev = db.Column(db.Text)
    status_name = db.Column(db.Text)
    status_description = db.Column(db.Text)
    pad_name = db.Column(db.Text)
    map_url = db.Column(db.Text)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)


# ------------
# Launchers
# ------------
class launchers(db.Model):
    """
    Launchers class inherits from db.Model
    db.Model is an object coming from SQLAlchemy
    Output: creates launchers entity to be added to the database
    and used in spacecraft pages
    """
    __tablename__ = 'launcher'

    launcher_id = db.Column(db.Integer, primary_key=True)
    agency_id = db.Column(db.Integer, nullable=False)
    launcher_name = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    family = db.Column(db.Text)
    variant = db.Column(db.Text)
    length = db.Column(db.Float)
    diameter = db.Column(db.Float)
    maiden_flight = db.Column(db.Text)
    launch_cost = db.Column(db.Float)
    launch_mass = db.Column(db.Integer)
    to_thrust = db.Column(db.Integer)
    image_url = db.Column(db.Text)
    info_url = db.Column(db.Text)
    wiki_url = db.Column(db.Text)
    total_launch_count = db.Column(db.Integer)
    consecutive_successful_launches = db.Column(db.Integer)
    successful_launches = db.Column(db.Integer)
    failed_launches = db.Column(db.Integer)


# ------------
# Agencies
# ------------

class agencies(db.Model):
    """
    agencies class inherits from db.Model
    db.Model is an object coming from SQLAlchemy
    Output: creates agencies entity to be added to the database
    and used in agencies pages
    """

    __tablename__ = 'agencies'

    agency_id = db.Column(db.Integer, primary_key=True, nullable=False)
    agency_name = db.Column(db.Text)
    type = db.Column(db.Text)
    country_code = db.Column(db.Text)
    description = db.Column(db.Text)
    founding_year = db.Column(db.String(4))
    total_launch_count = db.Column(db.Integer)
    successful_launches = db.Column(db.Integer)
    consecutive_successful_launches = db.Column(db.Integer)
    successful_landings = db.Column(db.Integer)
    attempted_landings = db.Column(db.Integer)
    consecutive_successful_landings = db.Column(db.Integer)
    info_url = db.Column(db.Text)
    wiki_url = db.Column(db.Text)
    logo_url = db.Column(db.Text)
    image_url = db.Column(db.Text)


# ------------
# Serviced
# ------------

class serviced(db.Model):
    """
    serviced class inherits from db.Model
    db.Model is an object coming from SQLAlchemy
    Output: creates serviced entity to be added to the database
    serviced is a connection table. It helps connect pillars in dynamic frontend.
    """
    __tablename__ = 'serviced'

    launch_id = db.Column(db.String(500), primary_key=True, nullable=False)
    launch_name = db.Column(db.Text)
    agency_id = db.Column(db.Integer, nullable=False)
    agency_name = db.Column(db.Text)


# ------------
# Used
# ------------

class used(db.Model):
    """
    used class inherits from db.Model
    db.Model is an object coming from SQLAlchemy
    Output: creates used entity to be added to the database
    used is a connection table. It helps connect pillars in dynamic frontend.
    """
    __tablename__ = 'used'

    launch_id = db.Column(db.String(500), primary_key=True, nullable=False)
    launch_name = db.Column(db.Text)
    launcher_id = db.Column(db.Integer, nullable=False)
    launcher_name = db.Column(db.Text)


# ------------
# Made_by
# ------------

class made_by(db.Model):
    """
    made_by class inherits from db.Model
    db.Model is an object coming from SQLAlchemy
    Output: creates made_by entity to be added to the database
    made_by is a connection table. It helps connect pillars in dynamic frontend.
    """

    __tablename__ = 'made_by'

    launcher_id = db.Column(db.Integer, primary_key=True, nullable=False)
    launcher_name = db.Column(db.Text)
    agency_id = db.Column(db.Integer, nullable=False)
    agency_name = db.Column(db.Text)



