import React, {useState} from 'react';
import './assets/primary.scss';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Admin } from './components/Admin';
import { Doctor } from './components/Doctor';
import { PatientHome } from './components/PatientHome';
import { RequestList } from './components/RequestList';
import { DocRequestList } from './components/DocRequestList';
import { PastRequestList } from './components/PastRequestList';
import {ForumList} from './components/ForumList'
import { Request } from './components/Request';

function App() {
  return (
    <div>
      <Router >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/admin" component={Admin} />
          <Route path="/doctor" component={Doctor} />
          <Route path="/patient" component={PatientHome} />
          <Route path="/requestList" component={RequestList} />
          <Route path="/docRequestList" component={DocRequestList} />
          <Route path="/pastRequestList" component={PastRequestList} />
          <Route path="/forumList" component={ForumList} />
          <Route path="/request" component={Request}/>
          <Redirect from="/" to="/login" /> 
          
        </Switch>
        {/* <Link to="/login"> login</Link> */}
        {/* <Link to="/patient">Patient</Link> */}
      </Router> 
    </div>
  );
}

export default App;

      