import React from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
} from 'react-bootstrap';
import './adminPage.css';
import axios from 'axios';

class adminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: [],
            token : "",
            redirect : false
        }
    }

    componentDidMount() {
        //check local storage for token and if its there setState to token : token
        //if it doesnt exists or expired redirect to login
        let serverRequest = '/api/verifyToken';
        let localToken = JSON.parse(localStorage.getItem('token'))

        axios({
                method: 'post',
                url: serverRequest,
                headers: {
                    token: localToken,
                }
            })
            .then(data => {
                if (data.data !== 'OK') {
                    this.props.history.push('login');
                }
                return
            })
            .catch(error => console.log(error));
        

        fetch('/api/companies')
        .then(res => res.json())
        .then(companies => {
            this.setState({
                companies: companies
            });
        });
    }

    _createOption = (company) =>{
        return(
            
        <option value={company._id} key={company._id}>
            {company.name}
        </option>
        )
    };

    _convertToCompany = (data) => {
        return (
            <li>
                <Link to={`/admin/companies/edit/${data._id}`}>
                    {data.name}
                </Link>
            </li>
        )
    };

    _handleCompanySelect = (event) => {
        this.props.history.push(`/admin/companies/edit/${event.target.value}`)
    }

    render() {
        return (
            <div className="admin-outer-container">
                <div className="admin-inner-container">
                    <div className="create-companybutton">
                    <Link to={`/admin/companies/new`}>
                        <Button bsStyle="primary" bsSize="large">
                            Create New Company
                        </Button>
                    </Link>
                </div>
                    <div className="company-list-form">
                    <Form onChange={this._handleCompanySelect}>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Edit or Delete a Company:</ControlLabel>
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="">Select a company</option>
                                    {this.state.companies.map(company => this._createOption(company))}
                                </FormControl>
                        </FormGroup>
                    </Form>
                    </div>
                </div>
            </div>
            );
    }
}
    
export default adminPage;