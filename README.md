# Group 16 -  Launched
Member: Caleb Campbell, James Chen, Francisco Cid, Adnan Y Desai, Maryam Hussaini, Samuel Pang

## Introduction
Spacecraft launch events are core information for enthusiasts to track space activity, study rocket specification, and learn about launch service providers. However, given the numerous launch attempts committed around the world as well as the amount of detail included in each launched rocketed, it presents a hardship for individuals to study this topic in an organized and efficient manner.

Our project, **Launched**, provides a wiki solution for users who to access information on spacecraft launch events. It presents all historical launch events, the rockets involved, and the hosting agencies as three of its pillars. Through the splash page, the user can access each pillar’s category page and view a list of its entities. Each entity features its own page with detailed information presented in a visually authentic manner and said page is interconnected with relevant entities from the other two pillars. Lastly, an about page is installed to introduce our members to the user while showcasing each of our member’s contributions to this project.

## Tools
### Version Control: Git and Gitlab
Git is used as our version control tool. We have a repository hosted on Gitlab. Each developer checkouts out their own development branch before merging into the master branch during a collaboration session.

### API Access
The API used to obtain information on the pillars is Launch Library provided by The Space Devs.

URL: https://ll.thespacedevs.com/2.1.0/swagger?format=openapi

In this phase, information is collected from ~/launch/, ~/launcher/, and ~/agency/.

API is accessed by sending GET requests via Postman, and the information is stored under backend/main.py in the form of a list of dictionaries.
It is planned to use SpaceX and NASA API in future developments to supplement resources on each entity’s detail page (e.g. gallery of a rocket’s pictures, logs of launch procedure, etc.)

### Backend
**Backend Framework: Flask.**
Flask provides the advantage of templating in bulk, the capability of integrating with front-end frameworks, and the potential of API/database interaction in future developments. In this phase of the project, we did a minimal amount of work on the backend. The current main responsibility of flask is to serve the application backend. We have connected the front-end and backend by setting up a proxy to do local development work. In this one line of code we are creating a instance of flask and routing the static assets and build assets to the frontend React application.

    app = Flask(__name__, static_folder="./frontend/build/static", template_folder="./frontend/build")

### Front-End
**Front-end Framework: React is used to build the frontend UI framework for the website.** React provides the developers the advantage of utilizing  modular components to implement across multiple web pages. With React, the static HTML elements, the CSS styling selectors, and additional JavaScript to add functionality are encapsulated by pages and components. This provides and organized structure to develop different features to be implemented. Our development team enjoyed the benefit of being able to work on different features simultaneously without having conflicts with styling. An example of the structure we used is shared below. The two directories of note include the pages folder that hold the web pages for each pillar, and the components folder that includes components that we reused throughout the website. In the future, more components will be created as we add functional aspects to the website.

![Folder Structure](uploads/FolderStructure.JPG)


An example of using react components inside a page is shown below. We import the components into the our JSX file, and include them in out HTML. The Navbar and Footer in this example are other JSX files that have additional HTML. This structure of encapsulated each element in separate files allows a developer to more easily navigate through their code.

    import Navbar from '../../components/Navbar'
    import Footer from '../../components/Footer/Footer'

    function IndexPage() {
    return (
        <div>
        <Navbar />
            <div>
                Page Contents here
            </div>
        <Footer />
    </div>
    } 

    export default IndexPage


**Routing: react-router-dom allows us to route between the different web pages.** We chose to do allow the routing between pages through the react-router-dom package because of the ease of implementation and the performance benefits. By having the linking handled on the front-end of the application, the speed of navigating through our website is improved from a website using HTML anchor tags or sending requests to the backend to render other pages. Below is example code of how we import each webpage into our App.jsx file and use the react-router-dom to map the URL paths to each respective web page.

    import IndexPage from "./pages/Index"
    import NotFoundPage from "./pages/404"
    import AboutPage from "./pages/About/About"
    import LaunchesPage from "./pages/Launches"
    import AgenciesPage from "./pages/Agencies"
    import AstronautPage from "./pages/Spacecrafts"
    function App() {

      return (
          <Router>
              <Switch>
                  <Route exact path="/" component={IndexPage}/>
                  <Route exact path="/404" component={NotFoundPage}/>
                  <Route exact path="/about" component={AboutPage}/>
                  <Route exact path="/launches" component={LaunchesPage}/>
                  <Route exact path="/astronauts" component={Spacecrafts}/>
                  <Route exact path="/agencies" component={AgenciesPage}/>
                  <Redirect to="/404"/>
              </Switch>
          </Router>
          )
    }

    export default App;

Below are a few different implementations of using the Link component from react-router-dom. As seen in the Button or Nav.Link(react-bootstrap elements), Link can be integrated into other HTML elements.

    <Link to="/launches">Launches</Link>
    <Button as={Link} to="/launches/" type="submit">Launches</Button>
    <Nav.Link as={NavLink} to="/launches">Launches</Nav.Link>


**Styling: react-bootstrap is used to style elements on the website.** Bootstrap’s library features a wide range of layout, component, and content styling that allows the developer to quickly build web page components with a minimal amount of code. We chose to import react-bootstrap as opposed to using the CDN because it allows the developer additional features that increase the control of styling. We ensured to use react-bootstrap and not the traditional Bootstrap because of potential performance issues with that option. Since React uses a virtual DOM and Bootstrap makes changes to the actual DOM, problems could arise. We do not only want a great looking website, but a website that functions properly and has the lowest probability of disrupting the user experience. We are currently using the vanilla bootstrap theme, but have imported a Bootswatch theme that we will experiment with in the next phase of the project.

These lines of code are an example of traditional Bootstrap used as a layout styling solution. It has two columns, launch_box, and pillar_box, in the same row.
Under the launch_box column, two rows are embedded to achieve the ‘side-bar’ look in the pillar_box column.
Row 1 under launch_box presents two smaller cards and row 2 presents a bigger card. The resultant view is presented below.

    <Container fluid name="content">
        <Row>
             <Col name="info_box" className="col-sm-8 col-md-8 col-lg-8">
                  <Row className="row">
                        <Col className="col-sm-6 col-md-6 col-lg-6">
                            <Card name="date-card" ...>
                        </Col>
                        <Col className="col-sm-6 col-md-6 col-lg-6">
                             <Card name="status-card"...>
                        </Col>
                        <div className="w-100"></div>
                        <Col className="col-sm-12 col-md-12 col-lg-12">
                            <Card ...>
                        </Col>
                  </Row>
             </Col>
             <Col name="pillar_box" className="col-sm-4 col-md-4 col-lg-4">
                   <Card name="rocket-card" className="card mb-3" ...>
                   <Card name="agency-card" className="card"...>
             </Col>
        </Row>
    </Container>



![Fig 1: Bootstrap layout solution](uploads/tech_report_fig1.png)


We utilize a dependency from Material Design for Bootstrap(React Version) to develop the design for our tables displaying our data. The following code in frontend/pages/Agencies/Agencies.js is an example of installing a sortable table of a pillar's model page. In this phase, data is hardcoded into a dictionary with two lists of dictionaries: columns and rows.

    function AgenciesPage() {
        const data = {columns[...], rows[...]};

            return (

        <div>
            <Navigation/>
            <Container>
                <h1>Agencies</h1>

                <MDBDataTable
                striped
                bordered
                small
                data={data}
                />

            </Container>
            <Footer/>
        </div>
        )
    }

    export default AgenciesPage

_Columns_ is a list of dictionaries containing information on each column. The *Name* column is provided as an example above. The label key provides a visible label on the column header, the field pulls the value of a matched key from a row into this column, the sort key provides a sorting method, and the width specifies the width of the key.
The string column is sorted alphabetically, and the integer column is sorted numerically.

    {
        label: 'Total Launch Count',
        field: 'launch_count',
        sort: 'asc',
        width: 100
    }

_Rows_ is a list of dictionaries containing information on each row. A row is provided as an example below. Key matching a column's field fills its value into the corresponding column.
The hyperlink cannot be sorted. In order to circumvent this issue, we added a little blue react icon alongside the row's value to serve as a link.

    {
        name: 'Strategic Missile Troops',
        country: 'Russia',
        launch_count: '4',
        succ_launches: '1',
        wiki_url:<a href="https://en.wikipedia.org/wiki/Strategic_Missile_Forces">Click</a>,
        launches: <Link to = "/launches/launch1"> Samos 2 </Link>,
        space_crafts:<Link to = "/spacecrafts/spacecraft"> c </Link>
    }


Lastly, the data is used for an MDBDataTable to achieve a sortable feature, and the table installed is presented as shown below. Columns can be sorted when the user clicks the header, and links to other pillars can be activated when the blue react icon is clicked.

![sortable_table](uploads/tech_report_fig2.png)


# Hosting

The website is hosted on GCP under the project ID of cs331e-launched.


## Database
### Hosting the database on GCP
Database is hosted on GCP through an SQL instance named 'p2prod' at a public IP address of 35.224.250.226. It features multiple zones avaiability, 4 cores, 15 GB of memory, and 100 GB SSD storage.
The database can be accessed via the following variables:

**Server:** 35.224.250.226

**Database:** postgres

**Port:** 5432

**Username:** postgres

**Password:** 1234

Psql database access is specified under backend/model.py via flask, flak_cors, and flask_sqlalchemy as
presented below:

    app = Flask(__name__, static_folder="../frontend/build/static", template_folder="../frontend/build")
    CORS(app)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",
    'postgresql://postgres:1234@35.224.250.226:5432/postgres')
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # to suppress a warning message
    db = SQLAlchemy(app)

<br>

### Design

The databased used in this project has six tables: launch, launcher, agencies, used, made_by, and serviced.

The **launch** table contains information on each launch event with the following attributes: launch_id, launcher_id, agency_id, agency_name
launch_name, launcher_name, window_start, failreason, image, status_abbrev, status_name, status_description, pad_name, map_url.

The **launcher** table contains information on each launcher with the following attributes: launcher_id, agency_id, launcher_name, description
, family, variant, length, diameter, maiden_flight, launch_cost, launch_mass, to_thrust, image_url, info_url, wiki_url,
total_launch_count, consecutive_successful_launches, successful_launches, and failed launches.

The **agency** table contains information on each agency with the following attributes: agency_id, agency_name, type,
country_code, description, founding_year, total_launch_count, successful_launches, attempted_landings,
consecutive_successful_landings, info_url, wiki_url, and logo_url.

The **used** table contains information on the relationship between launch events and launchers.
For each entry, it describes the launcher used in each launch event. It contains the following
attributes: launch_id, launch_name, launcher_id, and launcher_name.

The **made_by** table contains information on the relationship between launchers and agencies. For each entry,
it describes the agency that manufactures each launcher. It contains the following attributes:
launcher_id, launcher_name, agency_id, and agency_name.

The **serviced** table contains information on the relationship between launch events and agencies. For each
entry, it describes the agency that provided launch service to each launch event. It contains the following
attributes: launch_id, launch_name, agency_id, and agency_name.

### Modeling the tables
![Screen_Shot_2021-04-03_at_6.33.31_PM](uploads/0b74ca82b06e03dfd180f3d4d6b23cf3/Screen_Shot_2021-04-03_at_6.33.31_PM.png)The six tables are modeled in backend/model.py as objects via _class_ statements. A demonstration is presented below
using the launch table as an example.

    class launches(db.Model):
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

First, the table's name is set as _launch_.

Then, each attribute is given a column via db.Column() statement, and its type is specified to be an integer,
a string with know length, or a text with unknown length accordingly.

Launch_id is set to be the primary key given every launch event has a unique launch_id.

Attributes that will appear in other tables like names and id of other pillar's entry is set to be unable to
be null via nullable=False.

Same method is applied to all tables to generate table  model respectively.

### Scraping the data

Data is accessed and scrapped from the api by backend/load_json.py. Two modules are imported for necessary functionality:
json and request.

A demonstration is presented below using the agency table as an example:

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

First, a number of counters is defined to keep track of our progress through the api.

Then, the container of resultant data is defined as agencies_dict.

Subsequently, a while-loop is utilized to insert subsequent values into a get request for the agencies api.
For each fetched entry, the status code is checked to make sure it's a successful get request. Attributes that are not needed
are removed via del statements, and the resultant dictionary is appended to the container agencies_dict.

### Populating the tables, null handling, and data cleaning
The resultant dictionary is then written to a json file to be used as a source to populate the database's tables.
This file is save under backend/JSON.

Same technique is applied to both agency and launcher pillar.

### Populating the tables

All six tables are populated via backend/create_db.py. This python module first imports db and the table models from models.py
and populates the tables accordingly.

First, it drops all existing tables and create all six tables according to the models with the following statements:

	db.drop_all()
	db.create_all()

Then, a load_json function is define to read a json file and turn it into a python dictionary:

	def load_json(filename):

	with open(filename) as file:
            jsn = json.load(file)
            file.close()

        return jsn

A function is defined for each table to populate it with appropraite information on its attributes. For instance,
create_agencies() is used to populate the agency table as presented below:

def create_agencies():
agencies_json = load_json("backend/JSON/agencies.json")

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

First, this function reads the agencies.json file and stores it as a dictionary under agencies_json variable.

Then, utilizing a for loop, it goes through each entry under agencies_json and assign each key's value to a variable which is
later assigned to a column for the agencies table as a row vraiable, newagency, according to the agencies model.

Lastly, this row variable is added and commited to the agency table. This process repeats until the function processes the
entirety of agencies_json.

Same technique is applied to the remainder of the six tables to populate them with appropraite information.

### Null handling

Null values under launch.agency_id raises an error due to this attribute's un-nullable status. These null values are handeled
using a simple if statement under backend/create_db. A demonstration is provided below using the used table as an example.


def create_used():
launches_json = load_json('backend/JSON/launches.json')

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

If a null value is present in an entry under the launches_json, the for-loop skips through the entry in order to avoid an error.

### Data cleaning

Launcher.launch_cost provides inconsistent formatting across differentt entries. It occationally specifies the currency unit and
uses M to represent millions randomly. As such, a function is defined to clean this column's data in order to present informative data.


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

This function handles standardizes empty string and null value as a null values, removes special characters between numbers, translates M into million, and removes cost entries that at less than 1.

This function is called under create_launcher to clean the information under launch_cost before setting it as a column variable.







## Dynamic webpages

To populate the front end with data from the PostrgreSQL database, we wrote six APIs in the main.py file. For each pillar
of information (ex. Launches), there are two seperate API functions with different URLs. One API is to receive all
instances of the specified pillar to display in the tables of the index pages of each pillar.
The other API populates the pillar information detail pages for a specific instance.
To accomplish this, the ID of the specific launch, agency, or launcher is passed into the API where that ID is used to
query the database and return the appropriate data. The data is returned as a JSON object. Because of issues with serialization,
the data resulting from the database query needed to be formatted with the correct headers. Below is an example of one of the
API functions for the pillar index/table pages and the corresponding view of the web page that is being populated from
the data received by calling the API.

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

Below is an example of one of the API functions for the detailed pages and the corresponding view of the web page that is being populated from the data received by calling the API.

    @app.route('/api/launches/<string:launch_id>')
    def get_launch_detail(launch_id):
        """ Fetch single launch from the database """
        
        launch = db.session.query(launches).get(launch_id)
        response = list()

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
            'launch': response
        }, 200)

On the front end, the Axios package is being utilized to fetch the data from the APIs in the main.py file. The React useEffect function allows the fetch call to be ran when the page is first opened and mounted. In order to structure the data into the tables, the data is iterated through and appended to an array that is formatted in the correct datatype to be used in the table.

    function LaunchesPage() {
    const [launchAttributes, setLaunchAttributes] = useState([])
    const launches = []

    useEffect(() => {
        Axios.get('/api/launches')
            .then(response => {
                setLaunchAttributes(response.data.launches)
            });
        }, []);

    launchAttributes.forEach(launch => {
        launches.push({
            name: [launch.name, <Link to={`/launches/${launch.launch_id}`}>
                <FaExternalLinkSquareAlt className={'fa-external-link-square'}/></Link>],
            launch_id: launch.launch_id,
            window_start: launch.window_start,
            status_abbrev: launch.status_abbrev,
            launcher_id: [launch.launcher_id, <Link to={`/launchers/${launch.launcher_id}`}>
                <FaExternalLinkSquareAlt className={'fa-external-link-square'}/></Link>],
            agency_id: [launch.agency_id, <Link to={`/agencies/${launch.agency_id}`}>
                <FaExternalLinkSquareAlt className={'fa-external-link-square'}/></Link>]
        })
    });

    For the pillar details page, a match parameter is passed from the pillar index page that includes the ID for the specific instance and a fetch request is made.

    function LaunchDetailPage({ match }) {
    const [launch, setLaunch] = useState([])

    useEffect(() => {
        Axios.get(/api/launches/${match.params.launch_id}`)
            .then(response => {
                setLaunch(response.data.launch[0])
            });
        }, []);







## Unit Test

Unit test is performed in order to verify the functionality of each api route. An average of three unit test is performed
via backend/test.py for each
model according to backend/model.py

### Designing the test - Insert

An example of insert test is presented below:

    def test_launch_insert_1(self):
        s = launches(launch_id= 'test', launch_name='test-name', launcher_id=100000, launcher_name='test-launcher', agency_id=1000000, agency_name='test-agency')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(launches).filter_by(launch_id = 'test').one()
        self.assertEqual(str(r.launch_name), 'test-name')
        db.session.query(launches).filter_by(launch_id = 'test').delete()
        db.session.commit()

### Designing the test - Row Count

An example of count test is presented below:

    def test_launcher_count(self):
            count = db.session.query(launchers).count()
            self.assertEqual(count, 457)

### Running tests on the fly - Back End 

In order to run the unit tests and display results at the request of the user we created the following Flask 
endpoint in backend/main.py:
        
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

When called by a `GET` request to `/api/test`, `run_unit_tests()` does the following 3 things: 
###### 1) Runs unit tests
To run the unit tests, we first define a runner. In this case, we use TextTestRunner, which allows us to save the output to
a string instead of displaying it directly on the terminal. To do this, the stream parameter of `TextTestRunner()` object 
is set from its default of `sys.out` to a `io.StringIO()` object. The verbosity parameter was also changed from its default
value of 1 to 2, telling the runner to include more information about the tests being run in the output.
Next, we create a loader and a suite. The suite is an object that acts as a collection of tests, and the loader 
allows us to load the suite with tests from the test.py file with the command 

    suite.addTests(loader.loadTestsFromModule(unit_test))

where `unit_test` refers to the test.py file we imported into main.py with 

    import backend.test as unit_test

Finally, the tests are run with

    runner.run(suite)

and the output is saved as a string by calling `getvalue()` method on the stream object. 
    
    results = f.getvalue()

###### 2) Formats Output 
The string result is then altered so that it can eventually be displayed with ease by the front end. The python newline 
character `\n` is replaced with the HTML newline character `<br>` with

    results = results.replace('\n','<br>')

Without this, the frontend will try and display 
the entire string in a single line. An alternative to this could be to split the string into an array where each element
is a string representing a single line of the test output. 

###### 3) Returns Test Output
Finally, results is returned to the client in json format where the key is `"TestResults"`:
    
    return {'TestResults':results}

The resultant data is outputted as an HTML page and presented as a screenshot on the about page.

### Running tests on the fly - Front End 
For the user to be able to run the unit tests on command, we needed a way to make an HTTP request to `/api/test`, receive 
the test results, and display them all from the front end. This is all done inside TestResults.js, a file set up the
same way as all of our other React pages. The following snippet of code makes the `GET` request to the backend, and stores 
the results in the string variable `TestResults` using a `useState()` function.

    const [TestResults, setTestResults] = useState([])
    useEffect(() => {
        Axios.get('/api/test')
            .then(response => {
                setTestResults(response.data.TestResults)
            });
    },      []);

Before returning, a timestamp is created, to notify the user of the time that the request is made at and make it clear that the tests
are being run on the fly. Finally, we return the following HTML code, which displays the test results in a Bootstrap `<Card>`
component

        <div>
            <Card>
                <Card.Title>Unit Test Results</Card.Title>
                <Card.Subtitle>{timestamp.toLocaleTimeString()}</Card.Subtitle>
                <Card.Body>Running... </Card.Body>
                <Card.Body><div dangerouslySetInnerHTML={{__html: TestResults}}></div></Card.Body>
            </Card>
            <Button href="/about"variant="primary">Back to About Page</Button>
        </div>
where `{timestamp.toLocaleTimeString()}` displays the time the request was made in whatever time zone the user is located. The
body of the card contains the results of the unit tests, which are displayed using

    dangerouslySetInnerHTML={{__html: TestResults}}

which allows the page to render a string, in this case `TestResults`, as HTML code. The `<br>` tags that were added in the
backend allow for the string to be displayed in multiple lines. There are several drawbacks to using 
`dangerouslySetInnerHTML`, a major one being that a lot of the default Bootstrap styling is lost. This is why the `<Card>` 
doesn't look like a standard Bootstrap card. The alternative to using `dangerouslySetInnerHTML` involves passing in
the test results from the back end as an array of strings, where each element is a line. The strings would then not have 
to be rendered as HTML. Instead one could use a `forEach` to iterate through the array and display each element in a 
separate line. This is very similar to how the pillar instance pages are populated with incoming data from the back end.
This TestResults page is linked from the About page so that when a user clicks on "Run Unit Tests", it is displayed. 
The final result looks as follows: 

![Unit Test Results](uploads/TestResults.png)







## Maps

Google maps is used to illustrate a marked location of the launches that have taken place when an individual launch page is opened. This is accomplished using react with the api of Google maps.

The following imports are needed

    import { compose, withProps} from "recompose"
    import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";

The following example showcases the creation of a map component with react

    const MyMapComponent = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            mapElement: <div style={{ height: `100%` }} />,
        }),
        withScriptjs,
        withGoogleMap
        )(
            (props) =>
                <GoogleMap
                    defaultZoom={8}
                    defaultCenter={{ lat: launch.lat, lng: launch.lng}}
                >
                    {props.isMarkerShown && <Marker position={{ lat: launch.lat, lng: launch.lng}} />}
                </GoogleMap>
    )

### Routing Coordinates

The longitude and latitude of each launch is obtained from the database of launches (depicted from above as **launch.lng** and **launch.lat**). These values are gathered when a launch page is routed, where the back end retrieves the coordinates from the database and passes it to the front end.

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

            """ Variables of interest """
            "lat": launch.lat,
            "lng": launch.lng
        })

        return make_response({
            'launch': response
        }, 200)

When the longitude and latitude are sent to **MyMapComponent**, the coordinates are marked on Google maps.

![Marked Map](uploads/mapExample.PNG)







## Footer
The footer indicates the bottom of a web page along with copyright details. The footer is created as a JavaScript and CSS component so that it can be added to the bottom of every webpage. Components needs to be imported in every file it is intended to be used in.

Sample JavaScript file

    import React from 'react'
    import { Container, Row } from 'react-bootstrap'
    import './Footer.css'

    function Footer() {

    return (
        <footer className="bg-dark text-light">
            <Container fluid>
                <Row className="justify-content-center">
                    Copyright © 2021 Launched
                </Row>
            </Container>
        </footer>
    )
    }

    export default Footer

Sample CSS file

    footer {
        padding: 1rem;
        width: 100%;
    }

Sample use of the footer component in a JavaScript file

    import Footer from '../../components/Footer/Footer'

        function LaunchersPage() {
            return <Footer/>
        }

### Positioning

For the footer to position properly, there should be enough content on the web page so that the footer does not appear at an awkward location. This is ideal compared to setting the position as "relative" as it can intefere with content such as the bottom of a data table, and block navigation between its pages. A simple yet elegant way to incorporate content into a web page is to insert a background picture header below the navigation bar through CSS.

    .header1 {
        padding: 10vw;
        margin-bottom: 1vw;
        background-image: url("../../images/pexels-pixabay-39896.jpg");
        background-size: 100%;
    }

#### Before
![Bad Content](uploads/contentFillingB.PNG)

#### After
![Good Content](uploads/contentFilling.PNG)

