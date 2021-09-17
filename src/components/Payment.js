import React from 'react';
import { withTaskContext, Actions } from '@twilio/flex-ui';
import Timeline from './Timeline';
import { loadCSS } from 'flex-plugin';

class Payment extends React.Component {

  componentDidMount(){
    loadCSS("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css");
  }

      render() {

        var screenpop = { 
        "screenPopTitle": "Overdue Payment",
        "screenPopSubtitle": "Make arrangements to collect payment",
        "screenPopFields": [
          {
            "key": "Customer Name",
            "value": "Mark Hannan"
          },
          {
            "key": "Customer Account Number",
            "value": "062-225 1027 7411"
          },
          {
            "key": "Phone number",
            "value": "+61424626630"
          },
          {
            "key": "HomeAddress",
            "value": "1 George Street, Sydney"
          }
        ]
      }
        // var screenpop = this.props.task.attributes;

        return (
        <div style={{background: "#f4f4f4"}}>
          <div class="row">
          <div class="col">
            <div class="row">
              <div class="col">
                <div class="card" style={{minWidth: "550px", marginLeft: "30px",  marginRight: "auto", marginTop: "30px", display: "flex", justifyContent: "space-between"}}>
                  <div class="card-content">
                    <h4 style={{ margin: "5px"}}>{screenpop.screenPopTitle}</h4>
                    <h6 style={{ margin: "5px", marginTop: "10px"}}>{screenpop.screenPopSubtitle}</h6>
                  </div>
                  <div class="card-image">
                    <img style={{maxWidth: "100px", minWidth: "100px", marginRight: "20px", marginTop: "10px"}} src="https://cdn3.iconfinder.com/data/icons/basicolor-signs-warnings/24/182_warning_notice_error-512.png" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row"> 
              <div class="col">
                <div class="card" style={{marginLeft: "30px"}}>
                  <div class="card-image">
                    <img style={{maxWidth: "170px", minWidth: "170px", marginRight: "auto"}} src="https://ca.slack-edge.com/EFUJK1UC8-WR6US3DQD-4d17dd35c157-512" />
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <div class="collection" style={{minWidth: "360px", maxWidth: "360px", minHeight:"150px",  marginLeft: "auto",  marginRight: "auto"}}>                    
                  { screenpop.screenPopFields.map((fields) => {
                      if(fields.key == "Phone number" || fields.key == "Emergency Contact Number"){
                        return (<a href="#!" class="collection-item" onClick={() => {Actions.invokeAction("StartOutboundCall", {destination: fields.value});} }><span class="badge">{fields.value}</span>{fields.key}</a>)
                      } else {
                        return (<a href="#!" class="collection-item"><span class="badge">{fields.value}</span>{fields.key}</a>)  
                      }
                    })}
                  </div>
                </div>
              </div>
             </div>
             <div class="row">
              <div class="card" style={{minWidth: "500px", padding: "20px", marginLeft: "30px",  marginRight: "auto", marginTop: "30px", display: "flex", justifyContent: "space-between"}}>
                <div class="col" style={{minWidth: "350px"}}>
                  <h6>Total Balance:</h6>
                  <hr />
                  <h6 style={{color: "red"}}>Overdue Amount:</h6>
                  <hr />
                  <h6>Late Fee: </h6>
                  <hr />
                  <h6 style={{color: "red"}}>Due Date:</h6>
                  <hr />
                  <h6>Last Payment Date:</h6>
                  
                </div>
                <div class="col" style={{maxWidth: "150px"}}>
                  <h6>$750</h6>
                  <hr />
                  <h6 style={{color: "red"}}>$350</h6>
                  <hr />
                  <h6>$50</h6>
                  <hr />
                  <h6 style={{color: "red"}}>31-Aug-2021</h6>
                  <hr />
                  <h6>31-May-2021</h6>
                </div>
              </div>
             </div>
            <div class="row">
                <div class="card" style={{marginLeft: "30px", marginTop: "30px"}}>
                  <div class="card-image" style={{maxWidth: "500px", minWidth: "500px"}}>
                    <img style={{maxWidth: "500px", minWidth: "500px"}} src="https://bazaar-falcon-7238.twil.io/assets/car.png" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div style={{maxWidth: "600px", minWidth: "600px", marginRight: "auto"}}>
                    <Timeline />
              </div>
            </div>
            </div>
          </div> 
            );
    }
}

export default withTaskContext(Payment);
