import React, { Component } from 'react';
import './LandingPage.css';
import {Link} from 'react-router-dom';
// import Data from './Data';
import Filter from './Filter';

class API extends React.Component{
    constructor(props){
        super(props);
        this.state={
            companies:[]
        }
    }

    componentDidMount(){
        const url=`http://localhost:4000/api/companies/`;
        console.log(url);
        fetch(url)
            .then(companies=>companies.json())
            .then(companies=>{
                this.setState({
                    companies
                })
            })
    }

    render(){
    return(
        <LandingPage companies={this.state.companies}/>
    )
}
}

    const LandingPage=({companies})=>
    <div className="landingPage">
    <Filter industry={companies.industry}/>
        {companies.map(function(companyData){
        return(
            <body>
            <div>
                <Link to={`/company/${companyData._id}`}>
                <h1>{companyData.name}</h1>
                <h1>{companyData.picture}</h1>
                </Link>
            </div>
            </body>
        )}
    )}
    <Link to={'/admin'} >
    <button>Admin Panel</button>
    </Link>

    <Link to={'/test'}>
    <button>Image Upload Test</button>
    </Link>
    
    </div>    
    

export default API;