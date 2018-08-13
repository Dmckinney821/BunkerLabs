import React from 'react';
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
        fetch(url)
            .then(companies=>companies.json())
            .then(companies=>{
                this.setState({
                    companies
                });
            });
    }

    render(){
    return(
       
       
        <LandingPage companies={this.state.companies}/>
        
        )
    }
}

    const LandingPage=({companies})=>
    
    <div className="companyContainer">
   

    { <Filter industry={companies.industry}/> }
    
        {companies.map(function(companyData){
        return(
       
            <div className='companyIndividual' key={companyData._id}>
               
                <Link to={`/company/${companyData._id}`}>
                
                <img src={`http://localhost:4000/${companyData.picture}`} alt=""/>
                <h1 className='companyContainer'>{companyData.name}</h1>
                </Link>
                
            </div>
            )}
        )}
        
        <div className="Admin-panel">
        <Link to={'/admin'} >
            <button>ADMIN PANEL</button>
        </Link>
        </div>
    </div>   
    
     
   

export default API;