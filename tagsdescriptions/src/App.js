import React from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/login'
import Newuser from './components/users/newUser'
import Users from './components/users/users'
import Tagsdescriptors from './components/tagsdescriptors/tagsDescriptors'
import Network from './components/network/network'
import NetworkStatus from './components/network/networkStatus'
import ImportDevices from './components/files/importDevices'
import devices from './components/devices/devices'
import deviceStatus from './components/devices/deviceStatus'

import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';
import AssetState from './context/asset/assetState';
import SystemState from './context/system/systemState';
import NetworkState from './context/network/networkState';
import DeviceState from './context/devices/devicesState';
import ImportState from './context/import/importState';
import ConnectionState from './context/connection/connectionState';
import UserState from './context/user/userState';
import Menu from './layout/menu';
import Connections from './components/architecture/connections'
import TagDescriptorState from './context/tagdescriptor/tagDescriptorState';
//import Docpdf from './components/tagsdescriptors/docpdf'
import Eventlist from './components/alarmasyeventos/eventlist'


import Assets from './components/assets/assets'
import PrivateRoute from './components/routes/privateRoute'

import authToken from '../src/config/token'
import Diagram_Networking from './components/architecture/diagram_networking';
import Diagram_Devices from './components/architecture/diagram_devices';

import ChangePassword from './components/users/changePassword';



const token = localStorage.getItem('token');
authToken(token)

function App() {
  return (
    <AssetState>
      <SystemState>
        <TagDescriptorState>
          <AuthState>
            <AlertState>
              <NetworkState>
                <ConnectionState>
                  <DeviceState>
                    <ImportState>
                      <UserState>
                      
                        <Router>
                          <Switch>
                            <Route exact path="/" component={Login}/>
                            <Route exact path="/newuser" component={Newuser}/>
                            <PrivateRoute exact path="/tagsdescriptors" component={Tagsdescriptors}/>
                            <PrivateRoute exact path="/assets" component={Assets}/>
                            <PrivateRoute exact path="/menu" component={Menu}/>
                            <PrivateRoute exact path="/events" component={Eventlist}/>
                            <PrivateRoute exact path="/network" component={Network}/>
                            <PrivateRoute exact path="/networkstatus" component={NetworkStatus}/>
                            <PrivateRoute exact path="/devices" component={devices}/>
                            <PrivateRoute exact path="/devicestatus" component={deviceStatus}/>
                            <PrivateRoute exact path="/importDevices" component={ImportDevices}/>
                            <PrivateRoute exact path="/architecture" component={Diagram_Networking}/>
                            <PrivateRoute exact path="/architectureDevices" component={Diagram_Devices}/>
                            <PrivateRoute exact path="/users" component={Users}/>
                            <PrivateRoute exact path="/changePassword" component={ChangePassword}/>
                            <PrivateRoute exact path="/connections" component={Connections}/>
                          </Switch>
                        </Router>
                      </UserState>
                    </ImportState>
                  </DeviceState>
                </ConnectionState>
              </NetworkState>
            </AlertState>
          </AuthState>
        </TagDescriptorState>
      </SystemState>
    </AssetState>
  );
}

export default App;
