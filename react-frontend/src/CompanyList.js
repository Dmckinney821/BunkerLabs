import React from 'react';
import {Link} from 'react-router-dom';
import './companyList.css'

class CompanyList extends React.Component {
    render() {
        let companyRows = []
        let companyRow = []
        let companies = this.props.filteredCompanies;
        for (let i = 0; i < companies.length; ++i) {
            if ((i > 0 && i % 3 === 0) || i === companies.length - 1) {
                companyRows.push(
                    <div className="company-container">
                        {companyRow}
                    </div>
                )
                companyRow  = []
            }
            companyRow.push(
                <div className="individualCompany" key={companies[i]._id}>
                    <Link to={`/company/${companies[i]._id}`}>
                            {renderLogo(companies[i].picture)}
                            <h3>{companies[i].name}</h3>
                    </Link>
                </div>
            )
        }
        
        return (
            <div>
                {companyRows}
            </div>
        );
    }  
}

function renderLogo(picture) {
        if (picture) {
            return (
                <img src={`http://localhost:4000/${picture}`} alt=""/>
            )
        } else {
            return (
                <img src={`http://localhost:4000/images/noimageavailable.jpg`} alt=""/>
            )
        }
    }

export default CompanyList;