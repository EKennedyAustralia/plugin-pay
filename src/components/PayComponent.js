import React from 'react';
import { withTaskContext, } from '@twilio/flex-ui';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from 'axios'

const overlayStyle = {
    container: {
        display: "flex",
        flexDirection: "column",
        paddingTop: "5vh",
        paddingLeft: "25px",
        // justifyContent: "space-between",
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
                    fullWidth
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

