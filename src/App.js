import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/login.component';
import Profile from './components/profile.component';
import Signup from './components/signup.component';
import UserList from './components/userlist.component';
import UrlList from './components/urllist.component';
import Redirect from './components/redirect.component';

class App extends Component{
   render(){
      return(
         <Router>
            <Switch>
               <Route exact path="/" component={Login} />
               <Route path="/signup" component={Signup} />
               <Route path="/profile" component={Profile} />
               <Route path="/listUsers" component={UserList} />
               <Route path="/listUrls" component={UrlList} />
               <Route exact path="/redirect/:customPath" component={Redirect} />
               <Redirect from="*" to="/" />
            </Switch>
         </Router>
      );
   }
}
export default App;