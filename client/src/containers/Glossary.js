import React, {Component} from "react";
import API from "../utilities/API";

class Glossary extends Component {

    // Set Initial State
    state = {
        cheats: []
    }

    // Save On Change Data
    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    // Run Functions To State
    componentDidMount(){      
        this.loadCheats(); 
    }

    // Load Cheats To State
    loadCheats = () => {
        API.getCheats()
        .then(res => {
            // console.log(res.data);
            this.setState({
              cheats: res.data,
            })
        })
        .catch(err => console.log(err))
    }




  render() {

    return (

    <div>
        <div className="row no-gutters jumbotron glossary-jumbo text-center mb-0">
            <div className="col-12 jumbo-text justify-content-center">
                <h1 className="col-12 animated bounceInRight">Glossary</h1>
                <h2 className="col-12">Knowledge Is Power</h2>
            </div>
        </div>

        <div className="container-fluid post-content pt-3">
        
            <div className="container glossary py-5">
                <div className="row justify-content-center text-center">
                    
                    <table className="col-12 col-md-8">
                        {this.state.cheats.map(cheat=>{
                            return(
                                <tr className="row d-flex align-items-center animated bounceInRight">
                                    <td className="col-12 col-md-2">
                                        <img classImage="glossary-icon" src={cheat.cheatImage} alt={cheat.cheatName}/>
                                    </td>    
                                    <td className="col-12 col-md-10">
                                        <h4 className="col-12"><strong>{cheat.cheatName}</strong></h4>
                                        <p className="col-12">{cheat.cheatDescription}</p>
                                    </td>
                                </tr>
                            )
                        })}
                        
                    </table>
                </div>
            </div>
        </div>


    </div>
    )
  }
}

export default Glossary;