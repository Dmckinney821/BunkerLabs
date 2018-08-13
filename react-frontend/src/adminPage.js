import React, { Component } from 'react';
import NewForm from './NewForm';
import {Link, Redirect} from 'react-router-dom';

class adminPage extends React.Component {
    state = {
        companies: [],
        token : "",
        redirect : false
    }

    componentDidMount() {
        //check local storage for token and if its there setState to token : token
        //if it doesnt exists or expired redirect to login
        let localToken = localStorage.getItem('token');
        if (localToken){
            this.setState({
               token: localToken
            })} 
            else {
                //redirect react route
                this.setState({
                    redirect: true
                })}
        fetch('http://localhost:4000/api/companies')
        .then(res => res.text())
        .then(companies => {
            console.log(companies)
            this.setState({companies});
         })   
    }
    _convertToCompany = (data) => {
        return (
           <li>    
               <Link to={`/admin/companies/${data._id}/edit`}>
                {data.companyNameForAdmin}
               </Link>
           </li>
        )
    };

    renderRedirect = () => {
        if (this.state.redirect){
            return <Redirect to='/login' /> 
        } else {
             return (
            <div>
            {/* <ul>react router link tag that ajax request jsut that compnies data */}
                    <ul>
                        {this.state.companies.map(company => this._convertToCompany(company))}  
                        <li><button onClick={this.state.NewForm}>www.google.com</button></li>         
                    </ul>
                    <Link to={`admin/companies/new`}>
                        <button>New Company</button>
                    </Link>
            </div>
            )
        }
    }
    
        render() {
            return(
                    <div>
                    {this.renderRedirect()}
                    </div>
                ) 
        }
    }
export default adminPage;
