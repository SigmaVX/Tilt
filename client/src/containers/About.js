import React from "react";

const About = (props) => {

    return (

    <div>

        <div className="row no-gutters jumbotron text-center about-jumbo mb-0">
            <h1 className="col-12">About</h1>
            <h2 className="col-12">Find | Track | Report</h2>
        </div>

        <div className="container py-4">
            
            

            <div className="row justify-content-center text-center text-center mt-5">    
                <div className="col-10 col-md-6 float-left animated slideInLeft">
                    <img className="img-fluid round-img" src="/images/fortnite.jpeg" alt="Fortnite"/>   
                </div>    
                <div className="col-10 col-md-6 float-left animated slideInRight d-flex align-items-center">
                    <p className="about-text">
                        Report Cheaters To Improve Your Gaming Community And Call Out Toxic Players 
                    </p>
                </div>
            </div>


            <div className="row justify-content-center text-center text-center">  
                <div className="col-10 col-md-6 order-2 order-md-1 float-left animated slideInRight d-flex align-items-center">
                    <p className="about-text">
                        Lookup Cheaters By Their In Game Name To See Who Your Up Against
                    </p>
                </div>
                <div className="col-10 col-md-6 order-1 order-md-2 float-left animated slideInRight">
                    <img className="img-fluid round-img" src="/images/pubg.jpeg" alt="PUBG"/>      
                </div>
            </div>
         


            <div className="row justify-content-center text-center text-center">    
                <div className="col-10 col-md-6 float-left animated slideInLeft">
                    <img className="img-fluid round-img" src="/images/lol.jpeg" alt="League of Legends"/>   
                </div>    
                <div className="col-10 col-md-6 float-left animated slideInRight d-flex align-items-center">
                    <p className="about-text">
                       See How Cheats Are Trending In Your Favorite Game Or System
                    </p>
                </div>
            </div>


            <div className="row justify-content-center text-center text-center mb-5">  
                <div className="col-10 col-md-6  order-2 order-md-1 float-left animated slideInRight d-flex align-items-center">
                    <p className="about-text">
                    Stay On Top Of The Latest Cheat Trends Across All Games    
                    </p>
                </div>
                <div className="col-10 col-md-6  order-1 order-md-2 float-left animated slideInRight">
                    <img className="img-fluid round-img" src="/images/wow.jpg" alt="World of Warcraft"/>      
                </div>
            </div>

        </div>

    </div>

    )
} 

export default About;