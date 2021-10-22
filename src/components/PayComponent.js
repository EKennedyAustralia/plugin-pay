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
import PayClient from '../components/AgentAssistPayClient';


class PayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.payClient = null;

    this.state = {
      callConnected: false,
      capturing: false,
      capturingCard: false,
      capturingSecurityCode: false,
      capturingDate: false,
      captureComplete: false,
      focused: 'name',

      cardData: {
        paymentCardNumber: "",
        securityCode: "",
        expirationDate: "",
        paymentToken: "",
        paymentCardType: "",
      }
    }
  }

  async componentDidMount() {
    // Set the Internal Merchant Server URL for config and Access Tokens
    let merchantServerUrl = "https://agent-pay-server-3809.twil.io";
    console.log("Eli note:", this.props.task)
    var callSid = this.props.task.attributes.call_sid
    try {
      this.payClient = new PayClient("Alice");

      await this.payClient.attachPay(merchantServerUrl, callSid);
      await this.payClient.startCapture();

      //Establish the listeners
      this.payClient.on("callConnected", () => {
        this.setState({
          ...this.state,
          callConnected: true,
        });

        console.log(`callConnected: this.state.callConnected ${this.state.callConnected}`);
      });

      this.payClient.on("capturing", () => {
        this.setState({
          ...this.state,
          capturing: true,
        });

        console.log(`capturing: this.state.capturing ${this.state.capturing}`);
      });

      this.payClient.on("capturingCard", () => {
        this.setState({
          ...this.state,
          capturingCard: true,
          capturingSecurityCode: false,
          capturingDate: false,
        });

        console.log(
          `capturingCard: this.state.capturingCard ${this.state.capturingCard} this.state.capturingSecurityCode ${this.state.capturingSecurityCode} this.state.capturingDate ${this.state.capturingDate}`
        );
      });

      this.payClient.on("capturingSecurityCode", () => {
        this.setState({
          ...this.state,
          focused: "cvc",
          capturingSecurityCode: true,
          capturingCard: false,
          capturingDate: false,
        });

        console.log(
          `capturingSecurityCode: this.state.capturingSecurityCode ${this.state.capturingSecurityCode} this.state.capturingCard ${this.state.capturingCard} this.state.capturingDate ${this.state.capturingDate}`
        );
      });

      this.payClient.on("capturingDate", () => {
        this.setState({
          ...this.state,
          capturingDate: true,
          capturingCard: false,
          capturingSecurityCode: false,
        });

        console.log(
          `capturingDate: this.state.capturingDate ${this.state.capturingDate} this.state.capturingCard ${this.state.capturingCard} this.state.capturingSecurityCode ${this.state.capturingSecurityCode} `
        );
      });

      this.payClient.on("cardReset", () => {
        this.setState({
          ...this.state,
          capturingCard: true,
        });

        console.log(`cardReset: this.state.capturingCard ${this.state.capturingCard}`);
      });

      this.payClient.on("securityCodeReset", () => {
        this.setState({
          ...this.state,
          capturingSecurityCode: true,
        });

        console.log(
          `securityCodeReset: this.state.capturingSecurityCode ${this.state.capturingSecurityCode}`
        );
      });

      this.payClient.on("dateReset", () => {
        this.setState({
          ...this.state,
          capturingDate: true,
        });

        console.log(`dateReset: this.state.capturingDate ${this.state.capturingDate}`);
      });

      this.payClient.on("captureComplete", () => {
        this.setState({
          ...this.state,
          captureComplete: true,
        });
        this.payClient.submitCapture();

        console.log(
          `captureComplete: this.state.captureComplete ${this.state.captureComplete}`
        );
      });

      this.payClient.on("cancelledCapture", () => {
        this.setState({
          ...this.state,
          capturing: false,
          capturingCard: false,
          capturingSecurityCode: false,
          capturingDate: false,
          captureComplete: false,
        });
        console.log(
          `cancelledCapture: this.state.capturing ${this.state.capturing} this.state.capturingCard ${this.state.capturingCard} this.state.capturingSecurityCode ${this.state.capturingSecurityCode} this.state.capturingDate ${this.state.capturingDate} this.state.captureComplete ${this.state.captureComplete}`
        );
      });

      this.payClient.on("submitComplete", () => {
        this.setState({
          ...this.state,
          capturing: false,
          capturingCard: false,
          capturingSecurityCode: false,
          capturingDate: false,
        });

        console.log(
          `submitComplete: this.state.capturing ${this.state.capturing} this.state.capturingCard ${this.state.capturingCard} this.state.capturingSecurityCode ${this.state.capturingSecurityCode} this.state.capturingDate ${this.state.capturingDate}`
        );
      });

      this.payClient.on("cardUpdate", (data) => {
        if (this.state.captureComplete) {
          console.log(`cardUpdate: this.state.captureComplete ${this.state.captureComplete}`);
          console.log(data)
          this.setState({
            ...this.state,
            cardData: { ...this.state.cardData, paymentToken: data.paymentToken },
            captureComplete: false
          });
        } else {
          console.log(data)
          var search = 'x';
          var replaceWith = '*';
          var modifiedCardNumber = data.paymentCardNumber.split(search).join(replaceWith);
          this.setState({
            ...this.state, cardData: {
              paymentCardNumber: modifiedCardNumber,
              securityCode: data.securityCode,
              expirationDate: data.expirationDate,
              paymentCardType: data.paymentCardType
            }
          });
        }
        // console.log(`cardUpdate: this.state.captureComplete ${this.state.captureComplete}`);
      });


    } catch (error) {
      console.error(`'Mounted Error: ${error})`);
    }
  }

  render() {

    return (
      <CreditCard data={this.state} />
    )
  }

}

export default withTaskContext(PayComponent);