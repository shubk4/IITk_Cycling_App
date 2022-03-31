// import { profile } from 'console';
import React from 'react';
import {Link, Navigate} from 'react-router-dom';
// import NavBar from './navBar';
// import CycleStore from './cycleStore';
// import CurStatus from './curStatus';

import "./css/bootstrap.min.css";
import "./css/bootstrap-theme.min.css";
import "./css/fontAwesome.css";
import "./css/hero-slider.css";
import "./css/owl-carousel.css";
import "./css/style.css";
import CycleStore from './CycleStore';
// import CycleTile from './cycleTile';


class UserStore extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            userId:localStorage.getItem("userId"),
              token:`Bearer ${localStorage.getItem("token")}`,
            toLogin:false,
            // allData:{}, // Stores all the data corresponding to all dealers, cycleStores and cycles. Initialized in component did mount
            favorites:[], // allData[dealerId][cycleStoreId][cycleId]
            // currentCycle:{}, // currentCycle :{transaction:{}, allData:{Stores data of currently booked/ in use cycle}}
            cycleStore: {}
        };

    };
    


    //currentCycle.response = 0 if user has no in use or booked cycle

    async componentDidMount(){

        try{

            // Request to currentStatus 

            let req = {
                method : 'POST',
                headers : {
                  'authorization' : this.state.token, 
                  'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                  userId: this.state.userId,
                  token:this.state.token
                })
            };

            let res = await fetch('http://localhost:5000/user/viewCycle',req);
            let response = await res.json();
            console.log("response ",response);
            

            if(res.status===200){
                
                // this.setState({cycleStore:response});

                req = {
                    method : 'POST',
                    headers : {
                        'authorization' : this.state.token, 
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify({
                        userId: this.state.userId,
                        token: this.state.token
                    })
                };
    
                res = await fetch('http://localhost:5000/user/viewFavorite',req);
                let response2 = await res.json();

                if(res.status===200){

                    
                    this.setState({cycleStore:response,favorites:response2.data});   

                }else{

                    this.setState({toLogin:true});

                }

            }else{

                this.setState({toLogin:true});

            }

            



        }catch(err){

            console.log(err);
            alert(err);

        }

    }

    

    changeShow(cycleStoreId){

        let cycleStore = this.state.cycleStore;
        cycleStore[cycleStoreId].show = !cycleStore[cycleStoreId].show;
        this.setState({cycleStore:cycleStore});

    }

    // User information, past transactions and favorites to be shown in profile.

    // async viewProfile(){

    //     try{

    //         // Request to viewProfile

    //         let req = {
    //             method : 'GET',
    //             headers : {
    //                 'authorization' : this.state.token, 
    //                 'Content-Type': 'application/json',
    //             },
    //             body : JSON.stringify({
    //                 userId:this.state.userId,
    //                 token:""
    //             })

    //         };

    //         let res = await fetch('/user/viewProfile',req);
    //         let profileData  = await res.json();        //Object of profile data

    //         // REquest to view favorite cycle

    //         res = await fetch('/user/viewFavorite',req);
    //         let favoriteData = await res.json();        //Array of favorite cycles data

    //         //Request to view past transactions

    //         res = await fetch('/user/pastTransaction',req);
    //         let transactionData = await res.json();         //Array of transactions

    //         this.setState({profile:profileData, favorites:favoriteData, transactions:transactionData});

    //     }catch(err){

    //         console.log(err);
    //         alert(err);

    //     }

    // }

    

    render(){

        if(this.state.toLogin){

            return(<Navigate to="/login" replace={true} />)
    
          }

        let jsx = [];
        let cycleStore = this.state.cycleStore;
          

        if(cycleStore){
            
            // console.log(cycleStore);
            for(let i in this.state.cycleStore){

                
                jsx.push(<CycleStore token={this.state.token} cycleStoreId={i} allData={cycleStore[i]} onClick={()=>{this.changeShow(i)}} />)
    
            }

        }



       return ( <div>

            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <title>IITK | Cycling-App</title>

            <meta name="description" content="" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link rel="stylesheet" href="css/bootstrap.min.css" />
            <link rel="stylesheet" href="css/bootstrap-theme.min.css" />
            <link rel="stylesheet" href="css/fontAwesome.css" />
            <link rel="stylesheet" href="css/hero-slider.css" />
            <link rel="stylesheet" href="css/owl-carousel.css" />
            <link rel="stylesheet" href="css/style.css" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />

            <link href="https://fonts.googleapis.com/css?family=Raleway:100,200,300,400,500,600,700,800,900" rel="stylesheet" />

            <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>

            {/* Navbar start */}
            <div className="wrap">
                <header id="header">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12">
                        <button id="primary-nav-button" type="button">Menu</button>
                        <Link to="/"><div className="logo">
                            <img src="./img/logo.png" alt="IITK-cycling" />
                        </div></Link>
                        <nav id="primary-nav" className="dropdown cf">
                        <ul className="dropdown menu">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/user/home">Dashboard</Link></li>
                            <li><Link to="/user/profile">My Profile</Link></li>
                        </ul>
                        </nav>{/* / #primary-nav */}
                    </div>
                    </div>
                </div>
                </header>
            </div>
            {/* Navbar end */}
            
            <section className="banner banner-primary" id="top" style={{"background-image":"url(https://source.unsplash.com/random/1920x300/?abstract)"}}>
                {/* <div className="container"> */}
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                    <div className="banner-caption">
                        <div className="line-dec" />
                        <h2>Store</h2>
                    </div>
                    </div>
                </div>
                {/* </div> */}
            </section>
            <main>
                {/* Section to contain a single store with cycle */}
                <section id="store">
                <h1 className="section-heading" style={{"font-size":"40px"}}>Stores</h1>
                {jsx}
                </section>
                {/* Store Section end */}
                
            </main>
            {/* Footer element */}
            <footer>
                <div className="container">
                <div className="row">
                    <div className="col-md-5">
                    <div className="about-veno">
                        <div className="logo">
                        <img src="img/footer_logo.png" alt="Venue Logo" />
                        </div>
                        <p>Text about us</p>
                        <ul className="social-icons">
                        <li>
                            <a href="#"><i className="fa fa-facebook" /></a>
                            <a href="#"><i className="fa fa-twitter" /></a>
                            <a href="#"><i className="fa fa-linkedin" /></a>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="useful-links">
                        <div className="footer-heading">
                        <h4>what we have to offer for you?</h4>
                        </div>
                        <div className="row">
                        <div className="col-md-6">
                            <ul>
                            <li><Link to="/user/home"><i className="fa fa-stop" />Home</Link></li>
                            <li><Link to="/user/store"><i className="fa fa-stop" />Store</Link></li>
                            <li><Link to="/user/profile"><i className="fa fa-stop" />Profile</Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="contact-info">
                        <div className="footer-heading">
                        <h4>Contact Information</h4>
                        </div>
                        <p><i className="fa fa-map-marker" /> 212 Barrington Court New York, ABC</p>
                        <ul>
                        <li><span>Phone:</span><a href="#">+1 333 4040 5566</a></li>
                        <li><span>Email:</span><a href="#">contact@company.com</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </footer>
            <div className="sub-footer">
                <p>Copyright © 2021 IITK-Cycling App <Link to="/">Our Link</Link></p>
            </div>
            {/*Script to display cycles when the user clicks on show cycles button */}


                    </div>)
        
    }
}

export default UserStore;