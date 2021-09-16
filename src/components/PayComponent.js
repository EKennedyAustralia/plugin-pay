import React from 'react';
import { withTaskContext, } from '@twilio/flex-ui';
import TextField from '@material-ui/core/TextField';
import PayClient from './payClient';


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
            securityCode: "",
            expirationDate: "",
            paymentToken: "",
            callConnected: false,
            capturing: false,
            capturingCard: false,
            capturingCvc: false,
            capturingDate: false,
            captureComplete: false,
          }
    }

    componentDidMount() {
        // Set the Internal Merchant Server URL for config and Access Tokens
        let merchantServerUrl = "https://agent-pay-server-3809.twil.io";
        let callSid = this.props.task.attributes.call_sid
        try {
          PayClient.initialize(merchantServerUrl, this.state, callSid);
        } catch (error) {
          console.error(`'Mounted Error: ${error})`);
        }
      }

    handleChange(event) {
        this.setState({...this.state, [event.target.id]: event.target.value})
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
                <br/>
                <TextField
                    id="securityCode"
                    variant="outlined"
                    label="CVC"
                    style={{ margin: 8 }}
                    placeholder="cvc"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.securityCode}
                    onChange={this.handleChange}
                />
                <br/>
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

