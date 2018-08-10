import React from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Modal from 'react-modal';
import {
    Link
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
                need1: '',
                need2: '',
                need3: '',
                youtubeLink: '',
                productAndServices: '',
                phone: '',
                email: '',
                companyImageForAdmin: '',
                industry: '',
                stage: '',
                location: '',
                picture: null,
            }
        }
    }

    componentDidMount() {
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
                need1: '',
                need2: '',
                need3: '',
                youtubeLink: '',
                productAndServices: '',
                phone: '',
                email: '',
                industry: '',
                stage: '',
                picture: null,
                location: '',
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
            location: this.state.form.location
        }
        axios.post('http://localhost:4000/api/createcompany', companyObject)
        .then(res => {
            return res.data._id;
        })
        .then((id) => {
            let fd;
            this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
            fd = new FormData();
            fd.append('picture', blob);
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

    render() {
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
                <input value={this.state.form.need1} type='text'
                onChange={this.handleneed1}/>
                <br/>
                
                <label htmlFor='Company Needs 2'>Need 2</label>
                <input value={this.state.form.need2} type='text'
                onChange={this.handleneed2}/>
                <br/>
                
                <label htmlFor='Company Needs 3'>Need 3</label>
                <input value={this.state.form.need3} type='text'
                onChange={this.handleneed3}/>
                <br/>

                {/* Commpany owner picture */}
                {/* LinkedIn profile link */}
                
                {/* Call this pitch presentation */}
                <label htmlFor='Youtube Video'>Youtube Link</label>
                <input value={this.state.form.youtubeLink} type='url'
                onChange={this.handleyoutubeLink}/>
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
                <input value={this.state.form.industry} type='text'
                onChange={this.handleindustry}/>
                <br/>
                
                <label htmlFor='Stage of Business'>Stage of Company</label>
                <input value={this.state.form.stage} type='text'
                onChange={this.handlestage}/>
                <br/>
                
                <label htmlFor='Business Location'>Business Location</label>
                <input value={this.state.form.location} type='text'
                onChange={this.handlelocation}/>
                <br/>
                
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

export default NewForm;