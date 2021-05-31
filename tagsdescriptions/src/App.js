import React from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/login'
import Newuser from './components/auth/newUser'
import Tagsdescriptors from './components/tagsdescriptors/tagsDescriptors'

import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';
import AssetState from './context/asset/assetState';
import SystemState from './context/system/systemState';
import Menu from './layout/menu';
import TagDescriptorState from './context/tagdescriptor/tagDescriptorState';
//import Docpdf from './components/tagsdescriptors/docpdf'
import Eventlist from './components/alarmasyeventos/eventlist'


import Assets from './components/assets/assets'
import PrivateRoute from './components/routes/privateRoute'

import authToken from '../src/config/token'




const token = localStorage.getItem('token');
authToken(token)

function App() {
  return (
    <AssetState>
      
      <SystemState>
        <TagDescriptorState>
          <AuthState>
            <AlertState>
              <Router>
                <Switch>
                  <Route exact path="/" component={Login}/>
                  <Route exact path="/newuser" component={Newuser}/>
                  <PrivateRoute exact path="/tagsdescriptors" component={Tagsdescriptors}/>
                  <PrivateRoute exact path="/assets" component={Assets}/>
                  <PrivateRoute exact path="/menu" component={Menu}/>
                  <PrivateRoute exact path="/events" component={Eventlist}/>
                </Switch>
              </Router>
            </AlertState>
          </AuthState>
        </TagDescriptorState>
      </SystemState>
    </AssetState>
  );
}

export default App;
