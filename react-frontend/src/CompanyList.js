import React from 'react';
import {Link} from 'react-router-dom';
import './companyList.css'

class CompanyList extends React.Component {
    render() {

        let companies = this.props.filteredCompanies.map(company => (
                <div className="individualCompany" key={company._id}>
            <Link to={`/company/${company._id}`}>
                    {renderLogo(company.picture)}
                    <div className="homepage-name-container">
                        <h4 >{company.name}</h4>
                    </div>
            </Link>
                </div>
            ))
        
        return (
            <div className="company-container">
                    {companies}
            </div>
        );
    }  
}

function renderLogo(picture) {
        if (picture) {
            return (
                <div className="company-image-container">
                    <img className="company-list-image" src={`http://localhost:4000/${picture}`} alt=""/>
                </div>
            )
        } else {
            return (
                <div className="company-image-container">
                    <img className="company-list-image" src={`http://localhost:4000/images/default/noimageavailable.jpg`} alt=""/>
                </div>
            )
        }
    }

export default CompanyList;