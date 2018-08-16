import React from 'react';
import './Company.css';
import { Timeline } from 'react-twitter-widgets';
import ReactPlayer from 'react-player';


    function renderneed2(need2) {
        if (need2 !== null && need2 !== ''){
            return (
                <li>
                    {need2}
                </li>
            )
        } else {
            return null
        }
    }

    function renderneed3(need3) {
        if (need3 !== null && need3 !== ''){
            return (
            <li>
                {need3}
            </li>
            )
        } else {
            return null
        }
    }

    function renderownerName(ownerName) {
        console.log(ownerName);
        if (ownerName !== null && ownerName !== ''){
            return (
            <div>
                <strong>
                {ownerName}
                </strong>
            </div>
            )
        } else {
            return null
        }
    }

    function renderwebsite(website) {
        if (website !== null && website !== ''){
            return (
                <div>
                    {website}
                </div>
            )
        } else {
            return null
        }
    }
    const opts ={
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1
        }
    }

    function renderyoutubeLink(youtubeLink) {
        console.log(youtubeLink);
        if (youtubeLink !== null && youtubeLink !== ''){
            return (
                <div className="youtube-item" >
                    <ReactPlayer
                    url={youtubeLink}
                    width='100%'
                    // height='420px'
                    />
                    </div>
            )
        } else {
            return (
                    <div className="youtube-item">
                    <ReactPlayer
                    url={'https://www.youtube.com/watch?v=QXZxsySko4U'}
                    width='100%'
                    // height='420px'
                    />
                    </div>
            )
        }
    }
    
    

    function renderpaypallink(paypallink) {
        if (paypallink !== null && paypallink !== ''){
            return (
                <div>
                    Donate: {paypallink}
                </div>
            )
        } else {
            return null
        }
    }

    function renderlinkedin(linkedin) {
        if (linkedin !== null && linkedin !== ''){
            return (
                <div>
                            <strong>
                                Connect
                            </strong>
                    <div className="company-linkedIn">
                    {linkedin}
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    function renderwebsite(website) {
        if (website !== null && website !== ''){
            return (
                <div>
                    Website: {website}
                </div>
            )
        } else {
            return null
        }
    }
    
    function renderprofile(picture) {
        if (picture) {
            return (
                <div className="container-image">
                    <img className="company-picture" src={`http://localhost:4000/${picture}`} alt=""/>
                </div>
            )
        } else {
            return (
                <div className="container-image">
                    <img className="company-picture" src={`http://localhost:4000/images/default/noprofileimage2.png`} alt=""/>
                </div>
            )
        }
    }

    function renderLogo(logo) {
        if (logo) {
            return (
                <div >
                <img className="company-renderLogo" src={`http://localhost:4000/${logo}`} alt=""/>
                </div>
            )
        } else {
            return (
                <div>
                    <img className="company-renderLogo" src={`http://localhost:4000/images/default/noimageavailable.jpg`} alt=""/>
                </div>
            )
        }
    }

    function renderPhone (phone) {
        let part1 = ' (' + phone.slice(0,3) + ') ';
        let part2 = phone.slice(3,6) + '-';
        let part3 = phone.slice(6,10);
        let formattedPhone = part1 + part2 +part3;
        return (
            formattedPhone
        );
    };

   
    const Company=({companyDetail})=>
            <div className="company-outercontainer">
                <div className='left-main-container'>
                    <div className="company-logo-and-name">
                        <div className="div-Company"> {renderLogo(companyDetail.picture)}
                        <div className="company-name">{companyDetail.name}</div>
                    </div>
                </div>
                <div className="company-box">           
                <div className='summary-border'>
                    <div className="main-summary-inner-container">
                    <div className="company-summary"><strong>About us</strong></div>
                <div className="company-summary">{companyDetail.summary}</div>
                <div className="company-industry"> <strong>Industry: </strong>{companyDetail.industry}</div>
                <div className="company-stage"><strong>Stage: </strong> {companyDetail.stage}</div>
                {/* <p>Product and Services:{companyDetail.productAndServices}</p> */}
                <div className="company-needs"><strong>
                    Needs
                    </strong> 
                </div>
                <ul>
                <li>{companyDetail.need1}</li>
                {renderneed2(companyDetail.need2)}
                {renderneed3(companyDetail.need3)}
                </ul>
                {/* </p> */}
                <div>
                            <strong>
                                Contact
                            </strong>
                <div className="company-website"><a href={`${companyDetail.website}`} target="_blank"> {renderwebsite(companyDetail.website)}</a></div>
                <div className="company-email"><a href={`mailto:${companyDetail.email}`}>Email: {companyDetail.email}</a></div>
                <div className="company-phone"><a href={`tel:{${companyDetail.phone}}`}>Phone: {renderPhone(companyDetail.phone)}</a></div>
                <div className="company-linkedin"><a href={`${companyDetail.linkedIn}`} target="_blank">{renderlinkedin(companyDetail.linkedIn)}</a></div>
                </div>
                {/* Donate to this business - legal review/disclaimer needed? */}
                <div className="company-paypal"> <a href={`${companyDetail.paypalLink}`}>{renderpaypallink(companyDetail.paypalLink)}</a></div>
                </div>
                    </div>
                </div>
                </div>
                <div className='column-video'>
                    <div className="profile-and-name-container">
                    <div className="profile-and-name">
                        <div className="company-profile"> {renderprofile(companyDetail.profile)}</div>
                        <div className='owner-name'> {renderownerName(companyDetail.ownerName)}</div>
                    </div>
                    <div className="meet-the-owner">
                    Meet the Owner
                    </div>
                    </div>
                <div className="company-youtube">{renderyoutubeLink(companyDetail.youtubeLink)}</div>
                </div>
                <div className="twitter-biggersize">
                
                <Timeline className='twitter-feed'
                    dataSource={{
                        sourceType: 'profile',
                        screenName: 'TheBunkerLabs'
                    }}
                    options={{
                        username: 'TheBunkerLabs',
                        height: '790px',
                        
                        
                    }}
                        // onLoad={() => console.log('Timeline is loaded')}
                        />

                </div>
                </div>
    
    class API extends React.Component{
        constructor(props){
            super(props);
            this.state={
                company: {
                    _id:'',
                    name:'',
                    picture:'',
                    summary:'',
                    industry:'',
                    stage:'',
                    productAndServices:'',
                    need1:'',
                    need2:'',
                    need3:'',
                    website:'',
                    email:'',
                    phone:'',
                    youtubeLink:'',
                    paypalLink:'',
                    profile: '',
                    linkedIn: '',
                    ownerName:''
                }
            }
        }

        componentDidMount(){
            const url=`http://localhost:4000/api/companies/${this.props.match.params.id}`;
            // console.log(url);
            fetch(url)
                .then(company=>company.json())
                .then(company=>{
                    this.setState({
                        company: {
                                _id: company._id,
                                name: company.name,
                                picture: company.picture,
                                summary: company.summary,
                                industry: company.industry,
                                stage: company.stage,
                                productAndServices: company.productAndServices,
                                need1: company.needs[0],
                                need2: company.needs[1],
                                need3: company.needs[2],
                                website: company.website,
                                email: company.email,
                                phone: company.phone,
                                youtubeLink: company.youtubeLink,
                                paypalLink: company.paypalLink,
                                profile: company.profile,
                                linkedIn: company.linkedIn,
                                ownerName: company.ownerName
                        }
                    })
                });
        }
        
        render(){
        return(
            <Company companyDetail={this.state.company}/>
        )}
    }
    

export default API;