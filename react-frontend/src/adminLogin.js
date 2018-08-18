import React from 'react';
import { Button, FormGroup, FormControl, Col, ControlLabel, Modal } from 'react-bootstrap';
import './adminLogin.css'
import axios from 'axios';

class adminLogin extends React.Component {
    constructor(props){
        super(props);
    
    this.state =  {
        username : '',
        password : '',
        showModal: false
        } 
    }

    componentDidMount() {
            //check local storage for token and if its there setState to token : token
            //if it doesnt exists or expired redirect to login
            let serverRequest = 'http://localhost:4000/api/verifyToken';
            let localToken = JSON.parse(localStorage.getItem('token'))

            axios({
                method: 'post',
                url: serverRequest,
                headers: {
                    token: localToken,
                }
            })
                .then(data => {
                    if (data.data === 'OK') {
                        this.props.history.push('admin');
                    }
                    return
                })
                .catch(error => console.log(error));
        }

    handleUsername = (event) => {
        this.setState({
            username : event.target.value
        })
    }

    handlePassword = (event) => {
        this.setState({
            password : event.target.value
        })
    }

    _clearForm = () => {
        this.setState({
            username: '',
            password: ''
        });
    }

    handleOpenModal = () => {
        this.setState({
            showModal: true
        });
    }

    handleCloseModal = () => {
        this.setState({
            showModal: false,
        },
        this._clearForm());
    }


handleLogin = () => {
    //DO POST REQUEST
    var serverRequest = 'http://localhost:4000/api/admin';
    var loginBody = {
        username: this.state.username,
        password: this.state.password 
    }
    fetch(serverRequest, {
        headers: new Headers({
            "Content-type" : "application/json"  
        }),
        body: JSON.stringify(loginBody) , 
        method : "POST"
    })
    .then((data) => data.text()
    )
    .then((data) => {
        //if password is correct store token in local storage
        if (this.state.password !== data) {
        // if (data !== 'false') {
        //store in local Storage
        localStorage.setItem('token', JSON.stringify(data))
        this.props.history.push('/admin')
        } else {
            this.handleOpenModal();
        }
    })
    .catch((error) => console.log(error));
}


render(){ 
    return (
        <div className="admin-login-container">
            <div className="admin-login-inner-container">
                
                <FormGroup controlId="formHorizontalText">
                    <Col componentClass={ControlLabel} sm={2}>
                        User Name:
                    </Col>
                    <Col sm={10}>
                        <FormControl type="text" 
                        placeholder="Enter your user name" 
                        value={this.state.username} 
                        onChange={this.handleUsername} 
                        required/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password:
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" 
                        placeholder="Enter your password" 
                        value={this.state.password} 
                        onChange={this.handlePassword} 
                        required/>
                    </Col>
                </FormGroup>

                <div className="login-button-container">
                    <Button className="login-button" 
                    bsStyle="primary"  
                    onClick={this.handleLogin}>
                        Sign In
                    </Button>
                    <Button className="login-button" 
                    onClick={this._clearForm}>
                        Clear
                    </Button>
                </div>         
                </div>

                <div className="static-modal">
                    <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Error!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Invalid username or password</h4>
                        </Modal.Body>
                        <Modal.Footer>
                                <Button bsStyle="primary" onClick={this.handleCloseModal}>Continue</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    };
}

export default adminLogin;