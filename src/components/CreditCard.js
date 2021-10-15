import React from 'react';
import { Checkmark } from 'react-checkmark'
import Cards from 'react-credit-cards';
import TextField from '@material-ui/core/TextField'
import 'react-credit-cards/es/styles-compiled.css'

const overlayStyle = {
    capture: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: "5vh",
        paddingTop: "5vh",
        paddingLeft: "25px",
        justifyContent: "space-around",
        alignContent: "center",
        minWidth: "350px",
        maxWdith: "350px",
    },
    complete: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: "8vh",
        paddingTop: "4vh",
        paddingLeft: "25px",
        justifyContent: "center",
        alignContent: "center",
        minWidth: "350px",
        maxWdith: "350px",
    }
}

export default class CreditCard extends React.Component {

    render() {
        if (this.props.data.captureComplete == false) {
            return (
                <div style={overlayStyle.capture}>
                    <div id="PaymentForm">
                        <Cards
                            cvc={this.props.data.cardData.securityCode}
                            expiry={this.props.data.cardData.expirationDate}
                            focused={this.props.focused}
                            name="Michael Johnson"
                            preview={true}
                            issuer={this.props.data.cardData.paymentCardType}
                            number={this.props.data.cardData.paymentCardNumber}
                        />
                    </div>
                    <TextField
                        style={{ maxWidth: "100px", alignSelf: 'center' }}
                        // variant='outlined'
                        value='$18.50'
                        label='Payment Amount'
                    />
                </div>
            );
        } else {
            return (
                <div style={overlayStyle.complete}>
                    <Checkmark size='128px' color='green' />
                    <h6 style={{ color: "green", alignSelf: "center", paddingBottom: '10vh' }}>Payment token: {this.props.data.cardData.paymentToken}</h6>
                    <h4>Payment Processed</h4>
                </div>
            );
        }
    }
}