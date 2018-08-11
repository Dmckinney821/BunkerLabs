import React from 'react';
import './LandingPage.css';
import {Link} from 'react-router-dom';

class Homepage extends React.Component{
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

    _renderSingleCompany = (company) => {
        return (
                <SingleCompany companyInfo={company} key={company._id}/>
        )
    }

    render(){
    return(
            <div className="companyContainer">
                {this.state.companies.map(this._renderSingleCompany)}

                <Link to={'/admin'} >
                    <button>Admin Panel</button>
                </Link>
            </div>
        )
    }
}

    function renderLogo(picture) {
        if (picture !== null || picture !== '') {
            return (
                <img src={`http://localhost:4000/${picture}`} alt=""/>
            )
        } else {
            return (
                <img src={`http://localhost:4000/images/nologo.jpg`} alt=""/>
            )
        }
    }

    const SingleCompany = (props) => {
        return (
            <Link to={`/company/${props.companyInfo._id}`}>
                <div className="individualCompany">
                    {renderLogo(props.companyInfo.picture)}
                    {/* <img src={`http://localhost:4000/${props.companyInfo.picture}`} alt=""/> */}
                    <h3>{props.companyInfo.name}</h3>
                </div>
            </Link>
        )
    }
    

export default Homepage;