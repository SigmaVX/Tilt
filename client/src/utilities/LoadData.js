import API from "./API";

export default {

    loadReports: ()=>{
        API.getReports()
        .then(res => {
            console.log("Reports: ", res.data);
            this.setState({
              reports: res.data,
            })
        })
        .catch(err => console.log(err))
    }


}