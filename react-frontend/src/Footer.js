import React from 'react';
import './Footer.css';

class Footer extends React.Component{

    render(){
        return(

            <div>
        <p className="address-class"> 
                    Bunker Labs
                    <br/>
                    3423 Piedmont Rd
                    <br/>
                    NE Atlanta, Ga 30305
                </p>   
        
        <div className="footer-class">
        </div>

             <footer className="footer" >
                <div className="detail-footer-class">@2018 Bunker Labs NFP. All Rights Reserved. |
                    <a className="footer-a-class" href="https://bunkerlabs.org/privacy-policy/" data-wpel-link="internal">Privacy Policy</a> 
                    | Terms of Use	
                </div>
                    
                <div className="social-media">
                    <div className="media1">
                        <a  href="https://www.linkedin.com/company/bunkerlabs">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div> 
                    <div className="media">
                        <a  href="https://www.facebook.com/thebunkerlabs">
                            <i className="fab fa-facebook-f">
                            </i>
                        </a>
                    </div>
                    <div className="media">
                        <a  href="https://www.instagram.com/thebunkerlabs/">
                            <i className="fab fa-instagram">
                            </i>
                        </a>
                    </div>
                    <div className="media">
                        <a  href="https://twitter.com/TheBunkerLabs" >
                            <i className="fab fa-twitter">
                            </i>
                        </a>
                    </div> 
                </div>
            </footer>
        </div>
        );
    };
}

export default Footer;