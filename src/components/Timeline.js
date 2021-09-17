import React from 'react';
import { withTaskContext, } from '@twilio/flex-ui';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import StarIcon from '@material-ui/icons/Star';
import ChatIcon from '@material-ui/icons/Chat';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import WarningIcon from '@material-ui/icons/Warning';
import LanguageIcon from '@material-ui/icons/Language';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import PhoneIcon from '@material-ui/icons/Phone';

class Timeline extends React.Component {
    render() {
      return (
        <VerticalTimeline>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<PhoneCallbackIcon />}
            >
                <h5 className="vertical-timeline-element-subtitle">Inbound call</h5>
                <p>
                Inbound call to <b>Eli Kennedy</b> pertaining to <b>Make A Payment</b>
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
                icon={<PhoneIphoneIcon />}
             >
                <h5 className="vertical-timeline-element-subtitle">Mobile App:</h5>
                <p>
                Navigated to <b>current invoice</b> after viewing <b>Overdue amount</b>
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(25, 118, 209)', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                iconStyle={{ background: 'rgb(25, 118, 209)', color: '#fff' }}
                icon={<ChatIcon />}
            >
                <h5 className="vertical-timeline-element-subtitle">Outbound SMS</h5>
                <p>
                Auto-generated SMS reagrding <b>late payment penalties. </b> 
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: 'rgb(206, 32, 37)', color: '#fff' }}
                icon={<WarningIcon />}
            >
                <h5 className="vertical-timeline-element-subtitle">Suspicious Activity</h5>
                <p>
                Suspicious credit card charge processed by <b>Shady Cabs</b>
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                iconStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
                icon={<LanguageIcon/>}
            >
                <h5 className="vertical-timeline-element-subtitle">Desktop site visit</h5>
                <p>
                Processed <b>Address Change</b> transaction and viewed <b>Credit Card</b> product landing page
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<PhoneIcon />}
            >
                <h5 className="vertical-timeline-element-subtitle">Customer service line</h5>
                <p>
                Call to <b>General enquiries</b> and spoke with <b>Eli Kennedy</b> call disposition <b>Legal name change</b>
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                icon={<StarIcon />}
            />
        </VerticalTimeline>
      )
    }
}

export default withTaskContext(Timeline);
