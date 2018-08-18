import React from 'react';
import './App.css';
import Company from './Company';
import { Route } from 'react-router-dom';
import adminPage from './adminPage';
import EditPage from './EditPage';
import NewForm from './NewForm';
import adminLogin from './adminLogin';
import Navbar from './Navbar';
import Footer from './Footer';
import AboutMarketplace from './AboutMarketplace';
import Homepage from './Homepage';

class App extends React.Component {
  render() {
    return (
        <div className="App">
        <Navbar />
        
        <div className="main-app-container">
        <Route path='/' component={Homepage} exact={true}/>
        <Route path='/login' component={ adminLogin } exact={true}/>
        <Route path='/company/:id' component={Company} exact={true}/>
        <Route path='/about' component={AboutMarketplace} exact={true}/>
        <Route path='/admin' component={ adminPage } exact={true}/>
        <Route path='/admin/companies/new' component={ NewForm } exact={true}/>
        <Route path='/admin/companies/edit/:id' component={ EditPage } exact={true}/>
        </div>

        <Footer className="footer-app"/>
                
        </div>
      
    );
  }
}

export default App;
