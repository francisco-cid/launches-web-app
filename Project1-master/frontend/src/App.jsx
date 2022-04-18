import React from 'react';
import './App.css';

import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
  Redirect
} from "react-router-dom";

// Pages
import IndexPage from "./pages//Index/Index"
import NotFoundPage from "./pages/404"
import AboutPage from "./pages/About/About"
import LaunchesPage from "./pages/Launches/Launches"
import LaunchDetailPage from "./pages/Launches/Launch"
import AgenciesPage from "./pages/Agencies/Agencies"
import AgencyDetailPage from "./pages/Agencies/Agency"
import LaunchersPage from "./pages/Launchers/Launchers"
import LauncherDetailsPage from "./pages/Launchers/Launcher"
import TestResultsPage from "./pages/TestResults/TestResults"



function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={IndexPage}/>
              <Route exact path="/404" component={NotFoundPage}/>
              <Route exact path="/about" component={AboutPage}/>
              <Route exact path="/launches" component={LaunchesPage}/>
              <Route exact path="/launches/:launch_id" component={LaunchDetailPage}/>
              <Route exact path="/agencies" component={AgenciesPage}/>
              <Route exact path="/agencies/:agency_id" component={AgencyDetailPage}/>
              <Route exact path="/launchers" component={LaunchersPage}/>
              <Route exact path="/launchers/:launcher_id" component={LauncherDetailsPage}/>
              <Route exact path="/testresults" component={TestResultsPage}/>
              <Redirect to="/404"/>
          </Switch>
      </Router>
      )
}

export default App;
