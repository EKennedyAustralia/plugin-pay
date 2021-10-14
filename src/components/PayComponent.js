/**
 * This will eventually be converted into an SDK similar to all the other SDKs and we will need to use
 * access tokens as with other SDKs
 */

/**
 * This is a direct client implementation. It is also possible to use a Node server to initiate the 
 * Twilio API calls and this file only to handle the browser logic to call the node server. This means 
 * that the browser client needs to know the Twilio creds, which is not ideal. This is for prototyping
 * only!
 * 
 */
//import twilio from "twilio";
import SyncClient from "twilio-sync";
import React from 'react';
import { withTaskContext, } from '@twilio/flex-ui';
import CreditCard from "./CreditCard";
import PayClient from '@deshartman/payclient'


class PayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentCardNumber: "",
            securityCode: "",
            expirationDate: "",
            paymentToken: "",
            focused: 'name',
            paymentCardType: "",
            captureComplete: false
          }
    }

    async componentDidMount() {
        // Set the Internal Merchant Server URL for config and Access Tokens
        let merchantServerUrl = "https://agent-pay-server-3809.twil.io";
        console.log("Eli note:", this.props.task)
        var callSid = this.props.task.attributes.call_sid
        try {
            this.payClient = new PayClient(merchantServerUrl, "Alice", callSid)
            
            //subscribe to payClient events 
            this.payClient.on("callConnected", () => {
                console.log(`Eli note - callConnected:`);
              });

              this.payClient.on("cardUpdate", (data) => {
                this.setState({...this.state,
                                paymentCardNumber: data.paymentCardNumber,
                                securityCode: data.securityCode ,
                                expirationDate: data.expirationDate,
                                paymentToken: data.paymentToken,
                                paymentCardType: data.paymentCardType
                            })
                });
                
        } catch (error) {
          console.error(`'Mounted Error: ${error})`);
        }
        
        this.payClient.startCapture();

      }

      render() {

        return (
            <CreditCard _cardData={this.state}/>
        )
    }      

}

export default withTaskContext(PayComponent);