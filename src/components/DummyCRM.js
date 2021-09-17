import React from 'react';
import { withTaskContext, } from '@twilio/flex-ui';
import Payment from './Payment';
import ReactGoogleSlides from "react-google-slides";

class DummyCRM extends React.Component {

      render() {
        
        if(this.props.task === undefined) {
          return (
            
            <div style={{minHeight: "100vh", paddingLeft: "20px"}}>
              <div style={{ minHeight: "10vh"}}></div>
              <ReactGoogleSlides
                width={1200}
                height={675}
                slidesLink="https://docs.google.com/presentation/d/1xD72zRYjBXY_Nmqs-Vnww4qm45CMFbG2mRAIS6GQu8U"
                // showControls
                loop
              />
          </div>

           

          );
        }
        else {
          return (
            <Payment />

          );
        }
    }
}

export default withTaskContext(DummyCRM);
