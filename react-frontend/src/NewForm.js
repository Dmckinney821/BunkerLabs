import React from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Modal from 'react-modal';
import {
    Link, Redirect
} from 'react-router-dom';

class NewForm extends React.Component {
    constructor(){
        super();
        // this.handleEntry = this.handleEntry()
        this.state={
            form:{
                name: '',
                website: '',
                summary: '',
                need1: 'Investing',
                need2: 'Mentorship',
                need3: 'Employees',
                youtubeLink: '',
                productAndServices: '',
                phone: '',
                email: '',
                companyImageForAdmin: '',
                industry: '',
                stage: '',
                location: '',
                picture: null,
                linkedIn: '',
                profile: ''
            }, 
            token : "",
            redirect : false
        }
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
        this.setState({
            baseFormState: this.state.form
        });
    }

    handlename= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                name: event.target.value
            }
        });
    }

    handlewebsite= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                website: event.target.value
            }
        });
    }

    handlelinkedIn= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                linkedIn: event.target.value
            }
        })
    }

    handleprofile= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                profile: event.target.value
            }
        })
    }

    handlesummary= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                summary: event.target.value
            }
        });
    }

    handleneed1= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                need1: event.target.value
            }
        });
    }

    handleneed2= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                need2: event.target.value
            }
        });
    }

    handleneed3= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                need3: event.target.value
            }
        });
    }

    handleyoutubeLink= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                youtubeLink: event.target.value
            }
        });
    }
    
    handleproductAndServices =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                productAndServices: event.target.value
            }
        });
    }

    handlephone =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                phone: event.target.value
            }
        });
    }

    handleemail =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                email: event.target.value
            }
        });
    };

    handlePicture =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                picture: event.target.files[0]
            },
        })
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onloadend = (e) => {
                this.setState({
                    imagePreview: e.target.result
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        };
    }

    handleindustry =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                industry: event.target.value
            }
        });
    }

    handlestage =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                stage: event.target.value
            }
        });
    }

    handlelocation =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                location: event.target.value
            }
        });
    }

    _clearForm = (event) => {
        event.preventDefault();
        // console.log('clicked')
        this.setState({
            form: {
                name: '',
                website: '',
                summary: '',
                need1: 'Investing',
                need2: 'Mentorship',
                need3: 'Employees',
                youtubeLink: '',
                productAndServices: '',
                phone: '',
                email: '',
                industry: '',
                stage: '',
                picture: null,
                location: '',
                linkedIn: '',
                profile: ''
            }
        });
    }
    
    handleEntry(event){
        event.preventDefault();
        this.handleOpenModal();

        let needs = [];
        if (this.state.form.need1 !== '') {
            needs.push(this.state.form.need1);
        };
        if (this.state.form.need2 !== '') {
            needs.push(this.state.form.need2);
        };
        if (this.state.form.need3 !== '') {
            needs.push(this.state.form.need3);
        }; 
        // needs.push(this.state.form.need1);
        // needs.push(this.state.form.need2);
        // needs.push(this.state.form.need3);

        let companyObject = {
            name: this.state.form.name,
            summary: this.state.form.summary,
            industry: this.state.form.industry,
            stage: this.state.form.stage,
            productAndServices: this.state.form.productAndServices,
            needs: needs,
            website: this.state.form.website,
            email: this.state.form.email,
            phone: this.state.form.phone,
            youtubeLink: this.state.form.youtubeLink,
            paypalLink: this.state.form.paypalLink,
            location: this.state.form.location,
            profile: this.state.form.profile,
            linkedIn: this.state.form.linkedIn,
        };
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
        axios.post('http://localhost:4000/api/createcompany', companyObject)
        .then(res => {
            return res.data._id;
        })
        .then((id) => {
            let fd;
            this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
            fd = new FormData();
            fd.append('picture', blob);
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
            axios({
                method: 'post',
                url: `http://localhost:4000/api/createcompanypicture/${id}`,
                data: fd,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err));
            }); 
        })
        .catch(err => console.log(err));
    }; 

    _crop() {
        // const dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
        this.setState({
            croppedImage: this.refs.cropper.getCroppedCanvas().toDataURL()
        });  
    };  

    handleOpenModal = () => {
        this.setState({ 
            showModal: true 
        });
    }
    
    handleCloseModal = () => {
        this.setState({ 
            showModal: false,
        });
    }

    renderRedirect = () => {
        if (this.state.redirect){
            return <Redirect to ='/login' />
        } else {
        return (
            <div>

            <form onSubmit={(e) => {this.handleEntry(e)}} >
            
                <label htmlFor='Company Name'>Company</label>
                <input value={this.state.form.name} type='text'
                onChange={this.handlename}/>
                <br/>

                <label htmlFor='Website Data'>Enter Company Website</label>
                <input value={this.state.form.website} type='url'
                onChange={this.handlewebsite}/>
                <br/>

                <label htmlFor='summary of company'>Company Summary</label>
                <input value={this.state.form.summary} type='text'
                onChange={this.handlesummary}/>
                <br/>
                
                <label htmlFor='Company Needs 1'>Need 1</label>
                <select value={this.state.form.need1}
                onChange={this.handleneed1}>
                <option></option>
                <option>Investing</option>
                <option>Mentorship</option>
                <option>Employees</option>
                <option>Marketing</option>
                <option>Public Relations</option>
                <option>Facilities</option>
                <option>System Monitoring</option>
                <option>Legal Aide</option>
                <option>IT Help</option>
                </select>
                <br/>
                
                
                <label htmlFor='Company Needs 2'>Need 2</label>
                <select value={this.state.form.need2}
                onChange={this.handleneed2}>
                <option></option>
                <option>Investing</option>
                <option>Mentorship</option>
                <option>Employees</option>
                <option>Marketing</option>
                <option>Public Relations</option>
                <option>Facilities</option>
                <option>System Monitoring</option>
                <option>Legal Aide</option>
                <option>IT Help</option>
                </select>
                <br/>
                
                <label htmlFor='Company Needs 3'>Need 3</label>
                <select value={this.state.form.need3}
                onChange={this.handleneed3}>
                <option></option>
                <option>Investing</option>
                <option>Mentorship</option>
                <option>Employees</option>
                <option>Marketing</option>
                <option>Public Relations</option>
                <option>Facilities</option>
                <option>System Monitoring</option>
                <option>Legal Aide</option>
                <option>IT Help</option>
                </select>
                <br/>
                
                <label htmlFor='Pitch Video'>Pitch Link</label>
                <input value={this.state.form.youtubeLink} type='url'
                onChange={this.handleyoutubeLink}/>
                <br/>
                
                <label htmlFor='Profile Picture'>Profile Picture</label>
                <input value={this.state.form.profile} type='url'
                onChange={this.handleprofile}/>
                <br/>

                <label htmlFor='LinkedIn'>LinkedIn</label>
                <input value={this.state.form.linkedIn} type='url'
                onChange={this.handlelinkedIn}/>
                <br/>
                
                <label htmlFor='Companies Products and Services'>Products and Services</label>
                <input value={this.state.form.productAndServices} type='text'
                onChange={this.handleproductAndServices} />
                <br/>

                <label htmlFor='Company Phone Number'>Company Phone Number</label>
                <input value={this.state.form.phone} type='tel'
                onChange={this.handlephone}/>
                <br/>

                <label htmlFor='Company Email'>Company Email</label>
                <input value={this.state.form.email} type='email'
                onChange={this.handleemail}/>
                <br/>
                
                <label htmlFor='Industry'>Industry</label>
                <select value={this.state.form.industry} 
                onChange={this.handleindustry}>
                <option>Apparel</option>
                <option>Banking</option>
                <option>Media</option>
                <option>  Construction</option>
                <option> Civic</option>
                <option> Real Estate</option>
                <option> Gaming</option>
                <option> Software</option>
                <option> Hardware</option>
                <option>Security</option>
                <option> Education</option>
                <option>Entertainment</option>
                <option> Food/Beverage</option>
                <option> Health/Fitness</option>
                <option> IT</option>
                <option> Insurance</option>
                <option>  Legal Services</option>
                <option> Leisure</option>
                <option> Management/Consulting</option>
                <option> Military</option>
                <option> Music</option>
                <option> News</option>
                <option> Alternative Energy</option>
                <option>Public Relations</option>
                <option>Manufacturing</option>
                <option> Religion</option>
                <option> Retail</option>
                <option>Sporting Goods</option>
                <option> Recruiting</option>
                <option> Telecommunications</option>
                <option>  Transportation</option>
                <option> Warehousing</option>
                <option> Venture Capitalism</option>
                </select>
                <br/>
                
                <label htmlFor='Stage of Business'>Stage of Company</label>
                <select value={this.state.form.stage}
                onChange={this.handlestage}>
                    <option>StartUp</option>
                    <option>Growth</option>
                    <option>Establishment</option>
                    <option>Expansion</option>
                    <option>Maturity</option>
                </select>
                <br/>
                
                <label htmlFor='Business Location'>Business Location</label>
                <select value={this.state.form.location} 
                onChange={this.location}
                >
                <option>Atlanta, GA</option>
                <option>Austin, TX</option>
                <option>Bozeman, MT</option>
                <option>Chicago, IL</option>
                <option>Bay Area, CA</option>
                <option>Columbis, OH</option>
                <option>Detriot, MI</option>
                <option>Houston, TX</option>
                <option>Madison, WI</option>
                <option>Minneapolis, MN</option>
                <option>Nashville, TN</option>
                <option>New York, NY</option>
                <option>Philadelphia, PA</option>
                <option>Raleigh, NC</option>
                <option>San Antonio, TX</option>
                <option>Seattle, WA</option>
                <option>Washington D.C.</option>
                </select>
                <br />
                
                <label htmlFor=''>Company Image</label>
                <input type='file' name='poi-thumbnail'
                        accept='.png, .jpg, .jpeg'
                onChange={this.handlePicture}/>

                <input type='submit' value='Create Entry' />
                <button onClick={this._clearForm}>Clear Form</button>

                <img src={this.state.croppedImage} alt='' className='imgstyle' />
            </form>
            
            <Cropper
                ref='cropper'
                src={this.state.imagePreview}
                style={{height: 400, width: '100%'}}
                // Cropper.js options
                aspectRatio={8/6}
                guides={false}
                autoCropArea={0}
                strict={false}
                highlight={false}
                dragCrop={true}
                cropBoxMovable={true}
                cropBoxResizable={false}
                crop={this._crop.bind(this)} />
                <br/>

            <Modal className=""
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example">
                {this.state.form.name} profile created!
                <Link to = "/admin" > 
                <button onClick={this.handleCloseModal}>Continue</button>
                </Link>
            </Modal>
                {/* <h4>Cropped Preview</h4>
                <img src={this.state.croppedImage} alt='' className='imgstyle' /> */}
            </div>
        );
        }
    }

    render(){
        return (
            <div>
                {this.renderRedirect()}
             </div>
        )
    }
}

export default NewForm;
