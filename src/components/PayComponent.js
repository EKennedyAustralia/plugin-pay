import React from 'react';
import { withTaskContext, } from '@twilio/flex-ui';
import TextField from '@material-ui/core/TextField';
import PayClient from './AgentAssistPayClient';


const overlayStyle = {
    container: {
        display: "flex",
        flexDirection: "column",
        paddingTop: "5vh",
        paddingLeft: "25px",
        justifyContent: "space-around",
        alignContent: "center",
        minWidth: "350px",
        maxWdith: "350px",
    },
}

class PayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            paymentCardNumber: "",
            paymentCardType: "",
            securityCode: "",
            expirationDate: "",
            paymentToken: "",
            callConnected: false,
            capturing: false,
            capturingCard: false,
            capturingSecurityCode: false,
            capturingDate: false,
            captureComplete: false,
        }
        this.payClient = null;
    }

    componentDidMount() {
        // Set the Internal Merchant Server URL for config and Access Tokens
        let merchantServerUrl = "https://agent-pay-server-3809.twil.io";
        let callSid = this.props.task.attributes.call_sid

        try {
            this.payClient = new PayClient(merchantServerUrl, this.state, callSid);
            this.payClient.startCapture();

            //Establish the listeners
            this.payClient.on("callConnected", () => {
                this.callConnected = true;
            });

            this.payClient.on("capturing", () => {
                this.capturing = true;
            });

            this.payClient.on("capturingCard", () => {
                this.capturingCard = true;
                this.capturingSecurityCode = false;
                this.capturingDate = false;
            });

            this.payClient.on("capturingSecurityCode", () => {
                this.capturingSecurityCode = true;
                this.capturingCard = false;
                this.capturingDate = false;
            });

            this.payClient.on("capturingDate", () => {
                this.capturingDate = true;
                this.capturingCard = false;
                this.capturingSecurityCode = false;
            });

            this.payClient.on("cardReset", () => {
                this.capturingCard = true;
            });

            this.payClient.on("securityCodeReset", () => {
                this.capturingSecurityCode = true;
            });

            this.payClient.on("dateReset", () => {
                this.capturingDate = true;
            });

            this.payClient.on("captureComplete", () => {
                this.captureComplete = true;
            });

            this.payClient.on("cancelledCapture", () => {
                this.capturing = false;
                this.capturingCard = false;
                this.capturingSecurityCode = false;
                this.capturingDate = false;
                this.captureComplete = false;
            });

            this.payClient.on("submitComplete", () => {
                this.capturing = false;
                this.capturingCard = false;
                this.capturingSecurityCode = false;
                this.capturingDate = false;
            });

            this.payClient.on("cardUpdate", (data) => {
                if (this.captureComplete) {
                    this.paymentToken = data.paymentToken;
                    this.captureComplete = false;
                } else {
                    this.paymentCardNumber = data.paymentCardNumber;
                    this.paymentCardType = data.paymentCardType;
                    this.securityCode = data.securityCode;
                    this.expirationDate = data.expirationDate;
                }
            });


        } catch (error) {
            console.error(`'Mounted Error: ${error})`);
        }
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.id]: event.target.value })
    }
    render() {

        return (
            <div style={overlayStyle.container}>
                <TextField
                    variant="outlined"
                    id="paymentCardNumber"
                    label="Card Number"
                    style={{ margin: 8 }}
                    placeholder="e.g. 	
                    5555555555554444"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.paymentCardNumber}
                    onChange={this.handleChange}
                />
                <br />
                <TextField
                    id="securityCode"
                    variant="outlined"
                    label="Security Code"
                    style={{ margin: 8 }}
                    placeholder="securityCode"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.securityCode}
                    onChange={this.handleChange}
                />
                <br />
                <TextField
                    id="expirationDate"
                    variant="outlined"
                    label="Expiry Date"
                    style={{ margin: 8 }}
                    placeholder="MM/YY"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.expirationDate}
                    onChange={this.handleChange}
                />
                <TextField
                    id="paymentToken"
                    variant="filled"
                    label="Token"
                    style={{ margin: 8 }}
                    placeholder="awaiting token from server..."
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.paymentToken}
                    onChange={this.handleChange}
                />
            </div>
        )
    }

}

export default withTaskContext(PayComponent);

