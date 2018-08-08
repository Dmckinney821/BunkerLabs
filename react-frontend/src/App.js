import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';
import LandingPage from './LandingPage';
import Company from './Company';
// import Router from './Router';
import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';
import BunkerForms from './btest';
import ImageUpload from './ImageUpload';
import adminPage from './adminPage';
import EditPage from './EditPage';
import NewForm from './NewForm';
import Navbar from './Navbar';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
        <div className="App">
        <Navbar />
        
        <Router>
        <Switch>
        <Route path='/admin' component={ adminPage } exact={true}/>
        <Route path='/admin/companies/:id/edit' component={ EditPage } exact={true}/>
        <Route path='/admin/companies/new' component={ NewForm } exact={true}/>
        <Route path='/company/:id' component={Company} exact={true}/>
        <Route path='/' component={LandingPage} exact={true}/>
        <Route path='/test' component={ImageUpload} exact={true}/>
        {/* <Route path='/navbar' component={Navbar} exact={true}/> */}

        </Switch>
        </Router>

        <Footer />
                
        </div>
      
    );
  }
}

export default App;
