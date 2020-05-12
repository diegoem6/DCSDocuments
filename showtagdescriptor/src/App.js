import React from 'react';
import ShowTagDescriptor from './components/showTagDescriptor'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import TagDescriptorState from './context/tagdescriptor/tagDescriptorState';

function App() {
  return (
    <TagDescriptorState>
      <Router>
        <Switch>
          <Route exact path="/showTagDescriptor/:tagname" component={ShowTagDescriptor}/>
        </Switch>
      </Router>
    </TagDescriptorState>
  );
}

export default App;
