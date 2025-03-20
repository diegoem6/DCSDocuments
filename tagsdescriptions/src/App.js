import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Newuser from './components/users/newUser';
import Users from './components/users/users';
import Tagsdescriptors from './components/tagsdescriptors/tagsDescriptors';
import TagsAlldescriptors from './components/advanceSearch/tagsAllDescriptors';
import Network from './components/network/network';
import NetworkStatus from './components/network/networkStatus';
import ImportDevices from './components/files/importDevices';
import Devices from './components/devices/devices';
import DeviceStatus from './components/devices/deviceStatus';
import AlertState from './context/alerts/alertState';
import { AuthProvider } from './context/auth/authContext';
import AssetState from './context/asset/assetState';
import SystemState from './context/system/systemState';
import NetworkState from './context/network/networkState';
import DeviceState from './context/devices/devicesState';
import ImportState from './context/import/importState';
import ConnectionState from './context/connection/connectionState';
import UserState from './context/user/userState';
import CabinetState from './context/cabinets/cabinetsState';
import IOCardState from './context/iocards/iocardsState';
import ConectionsC300 from './components/devices/ConnectionsC300';
import Menu from './layout/menu';
import Connections from './components/architecture/connections';
import Cabinets from './components/cabinets/Cabinets';
import CabinetStatus from './components/cabinets/CabinetStatus';
import IOCards from './components/iocards/IOCards';
import TagDescriptorState from './context/tagdescriptor/tagDescriptorState';
import Eventlist from './components/alarmasyeventos/eventlist';
import Assets from './components/assets/assets';
import PrivateRoute from './components/routes/privateRoute';
import authToken from './config/token';
import Diagram_Networking from './components/architecture/diagram_networking';
import Diagram_Devices from './components/architecture/diagram_devices';
import ChangePassword from './components/users/changePassword';
import { AnalyticsProvider } from './context/analytics/analyticsContext';

const token = localStorage.getItem('token');
authToken(token);

function App() {
  return (
    <Router>
      <AssetState>
        <SystemState>
          <TagDescriptorState>
            <AuthProvider>
              <AlertState>
                <CabinetState>
                  <NetworkState>
                    <ConnectionState>
                      <DeviceState>
                        <IOCardState>
                          <ImportState>
                            <UserState>
                              <AnalyticsProvider>
                                <Routes>
                                  <Route path="/" element={<Login />} />
                                  <Route path="/newuser" element={<Newuser />} />
                                  <Route path="/tagsdescriptors" element={<PrivateRoute><Tagsdescriptors /></PrivateRoute>} />
                                  <Route path="/tagsalldescriptors" element={<PrivateRoute><TagsAlldescriptors /></PrivateRoute>} />
                                  <Route path="/assets" element={<PrivateRoute><Assets /></PrivateRoute>} />
                                  <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
                                  <Route path="/events" element={<PrivateRoute><Eventlist /></PrivateRoute>} />
                                  <Route path="/network" element={<PrivateRoute><Network /></PrivateRoute>} />
                                  <Route path="/networkstatus" element={<PrivateRoute><NetworkStatus /></PrivateRoute>} />
                                  <Route path="/devices" element={<PrivateRoute><Devices /></PrivateRoute>} />
                                  <Route path="/devicestatus" element={<PrivateRoute><DeviceStatus /></PrivateRoute>} />
                                  <Route path="/conections300/:idMongo" element={<PrivateRoute><ConectionsC300 /></PrivateRoute>} />
                                  <Route path="/importDevices" element={<PrivateRoute><ImportDevices /></PrivateRoute>} />
                                  <Route path="/architecture" element={<PrivateRoute><Diagram_Networking /></PrivateRoute>} />
                                  <Route path="/architectureDevices" element={<PrivateRoute><Diagram_Devices /></PrivateRoute>} />
                                  <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
                                  <Route path="/changePassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
                                  <Route path="/connections" element={<PrivateRoute><Connections /></PrivateRoute>} />
                                  <Route path="/cabinets" element={<PrivateRoute><Cabinets /></PrivateRoute>} />
                                  <Route path="/cabinetStatus/:cabinetNameParam" element={<CabinetStatus />} />
                                  <Route path="/iocards" element={<PrivateRoute><IOCards /></PrivateRoute>} />
                                </Routes>
                              </AnalyticsProvider>
                            </UserState>
                          </ImportState>
                        </IOCardState>
                      </DeviceState>
                    </ConnectionState>
                  </NetworkState>
                </CabinetState>
              </AlertState>
            </AuthProvider>
          </TagDescriptorState>
        </SystemState>
      </AssetState>
    </Router>
  );
}

export default App;
