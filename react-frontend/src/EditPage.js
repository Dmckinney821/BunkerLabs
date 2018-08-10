import React from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class EditPage extends React.Component {
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
                productsAndServices: '',
                phone: '',
                email: '',
                companyImageForAdmin: '',
                industry: '',
                stage: '',
                BusinessLocationForAdmin: '',
                picture: null,
                location: '',
                linkedIn: '',
                profile: ''
            }
        }
        
    }

    componentDidMount() {
        this.setState({
            baseFormState: this.state.form
        })
    }
    handlename= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                name: event.target.value
            }
        })
    }

    handlewebsite= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                website: event.target.value
            }
        })
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
        })
    }
    handleneed1= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                need1: event.target.value
            }
        })
    }
    handleneed2= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                need2: event.target.value
            }
        })
        console.log(this.state.form)
    }
    handleneed3= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                need3: event.target.value
            }
        })
        console.log(this.state.form)
    }
    handleyoutubeLink= (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                youtubeLink: event.target.value
            }
        })
        console.log(this.state.form)
    }
    
    handleproductsAndServices =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                productsAndServices: event.target.value
            }
        })
        console.log(this.state.form)
    }
    handlephone =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                phone: event.target.value
            }
        })
        console.log(this.state.form)
    }
    handleemail =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                email: event.target.value
            }
        })
        console.log(this.state.form)
    }
    handlePicture =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                picture: event.target.files[0]
            }
        })
        console.log(this.state.form)
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
        })
        console.log(this.state.form)
    }
    handlestage =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                stage: event.target.value
            }
        })
        console.log(this.state.form)
    }
    handleBusinessLocationForAdmin =(event) => {
        this.setState({
            form: {
                ...this.state.form, 
                BusinessLocationForAdmin: event.target.value
            }
        })
        console.log(this.state.form)
    }
    updateCompany =(event) => {
        event.preventDefault()
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
            profile: this.state.form.profile,
            linkedIn: this.state.form.linkedIn,
        }
        fetch(`http://localhost:4000/api/updatecompany/${this.props.match.params.id}`,
        {
            method: 'POST',
            body: JSON.stringify(companyObject)
            })
            .then(res => (res.json()))
            // .then(res => console.log(res.data._id))
            // .then(console.log(res.data._id))
    
    }
        deleteCompany = (event) => {
            event.preventDefault()
            axios.post(`http://localhost:4000/api/deletecompany/${this.props.match.params.id}`, this.props.match.params.id)
            .then(res => {
               console.log(res);
            //    return res.data._id;
             })
        }

//     handleEntry(event){
//         event.preventDefault();
//         console.log(event.target.value)
//         // const form = event.target.value;
//         // const data = new FormData(event.target)
//     // }

    
//     // createCompany = () => 
//         let needs = [];
//         if (this.state.form.need1 !== '') {
//             needs.push(this.state.form.need1);
//         };
//         if (this.state.form.need2 !== '') {
//             needs.push(this.state.form.need2);
//         };
//         if (this.state.form.need3 !== '') {
//             needs.push(this.state.form.need3);
//         };

//         let fd;
//         this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
//         fd = new FormData();
//         fd.append('picture', blob);
        
//         });
        
//         // let fd = new FormData();
//         // // debugger
//         // fd.append('picture', this.state.form.picture, this.state.form.picture.name);

//         let companyObject = {
//             name: this.state.form.name,
//             summary: this.state.form.summary,
//             industry: this.state.form.industry,
//             stage: this.state.form.stage,
//             productAndServices: this.state.form.productAndServices,
//             needs: needs,
//             website: this.state.form.website,
//             email: this.state.form.email,
//             phone: this.state.form.phone,
//             youtubeLink: this.state.form.youtubeLink,
//             paypalLink: this.state.form.paypalLink,
//         }
//          axios.post('http://localhost:4000/api/createcompany', companyObject)
//         .then(res => {
//            console.log(res);
//            return res.data._id;
//          })
//         .then((id) => {
//            console.log('id',id);
//            console.log(fd)
//            axios({
//                method: 'post',
//                url: `http://localhost:4000/api/createcompanypicture/${id}`,
//                data: fd,
//                config: { headers: {'Content-Type': 'multipart/form-data' }}
//            })
//            .then(res => {
//                console.log(res)
//            })
//            .catch(err => console.log(err));
//            })
//          .catch(err => console.log(err));
//         } 

//             _crop() {
//         // const dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
//         this.setState({
//            croppedImage: this.refs.cropper.getCroppedCanvas().toDataURL()
//        });  
//        console.log(this.state.croppedImage);
//    }

   
//    handleEntry(event){
//     event.preventDefault();
//     const form = event.target.value;
//     const data = new FormData(event.target);


//    fetch('/form-submit', {
//        method: 'POST',
//        body: data,
//    });
// }

componentDidMount() {
    fetch(`http://localhost:4000/api/companies/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(companyData => {
       
        this.setState({
            form: companyData

        });
     })
    
}


   

    render() {
        return (
            <form onSubmit={(e) => {this.updateCompany(e)}} >
            

                <label htmlFor='Company Name'>Company</label>
                <input value={this.state.form.name} type='text'
                onChange={this.handlename}/>


                <label htmlFor='Website Data'>Enter Company Website</label>
                <input value={this.state.form.website} type='url'
                onChange={this.handlewebsite}/>

                <label htmlFor='summary of company'>Company Summary</label>
                <input value={this.state.form.summary} type='text'
                onChange={this.handlesummary}/>

                <label htmlFor='Company Needs 1'>Need 1</label>
                <select value={this.state.form.need1}
                onChange={this.handleneed1}>
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
                
                
                <label htmlFor='Company Needs 2'>Need 2</label>
                <select value={this.state.form.need1}
                onChange={this.handleneed1}>
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
                
                <label htmlFor='Company Needs 3'>Need 3</label>
                <select value={this.state.form.need1}
                onChange={this.handleneed1}>
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
                
                <label htmlFor='Pitch Video'>Pitch Link</label>
                <input value={this.state.form.youtubeLink} type='url'
                onChange={this.handleyoutubeLink}/>
                
                <label htmlFor='Profile Picture'>Profile Picture</label>
                <input value={this.state.form.profile} type='url'
                onChange={this.handleprofile}/>

                 <label htmlFor='LinkedIn'>LinkedIn</label>
                <input value={this.state.form.linkedIn} type='url'
                onChange={this.handlelinkedIn}/>

                
                <label htmlFor='Companies Products and Services'>Products and Services</label>
                <input value={this.state.form.companyProductsandServices} type='text'
                onChange={this.handleCompanyProductsAndServices} />

                <label htmlFor='Company Phone Number'>Company Phone Number</label>
                <input value={this.state.form.phone} type='tel'
                onChange={this.handlephone}/>

                <label htmlFor='Company Email'>Company Email</label>
                <input value={this.state.form.email} type='email'
                onChange={this.handleemail}/>
                
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
                
                <label htmlFor='Stage of Business'>Stage of Company</label>
                <select value={this.state.form.stage}
                onChange={this.handlestage}
                >
                    <option>StartUp</option>
                    <option>Growth</option>
                    <option>Establishment</option>
                    <option>Expansion</option>
                    <option>Maturity</option>
                    </select>
                
                <label htmlFor='Business Location'>Business Location</label>
                <input value={this.state.form.BusinessLocationForAdmin} type='text'
                onChange={this.handleBusinessLocationForAdmin}/>
                
                <label htmlFor=''>Company Image</label>
                <input type='file' name='poi-thumbnail'
                       accept='.png, .jpg, .jpeg'
                onChange={this.handlePicture}/>
                
               


                <input type='submit' value='Save Changes' />
                <button onClick={this.deleteCompany}>Delete Company</button>
                
                
                
                
                
               
                {/* <Cropper
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

               <h4>Cropped Preview</h4>
               <img src={this.state.croppedImage} alt='' className='imgstyle' /> */}


            </form>
        );
}
}


export default EditPage;