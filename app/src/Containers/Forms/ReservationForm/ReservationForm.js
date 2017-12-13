import React, { Component } from 'react';
import axios from 'axios';

import * as Constants from '../../../Constants/ReservationForm/ReservationForm';

import Field from '../../../Components/Forms/Field/Field';
import SelectField from '../../../Components/Forms/SelectField/SelectField';
import FieldArea from '../../../Components/Forms/FieldArea/FieldArea';
import TravelerInfo from '../../../Components/Forms/TravelerInfo/TravelerInfo';

import classes from './ReservationForm.css';

class ReservationForm extends Component {
  state = {
    agents: [],
    useSameAddress: null,
    payOtherAmount: null,    
    primaryAgent: null,
    travelType: null,
    paymentType: null,
    lodging: null,
    numberOfTravelers: 0
  }

  componentDidMount() {
    let agentsArray = [{value: 'null', name: 'Select'}];
    axios.get('https://www.vacationcrm.com/travelmvc/api/Service/GetAgents?ApiKey=9A9535E5-B636-4C3B-BAA7-56C87E2FD076')
    .then(res => {
      res.data.map(agent => {
        agentsArray.push({value: agent.Code, name: agent.FullName});
        return null;
      });
      this.setState({...this.state, agents: agentsArray});
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleChange = (event) => {
    this.setState({...this.state, [event.target.name]: event.target.value});
  };

  onAgentChanged = (event) => {
    this.setState({...this.state, primaryAgent: event.target.value});
  };

  onTravelTypeChanged = (event) => {
    this.setState({...this.state, travelType: event.target.value});
  };

  onTravelerCountChanged = (event) => {
    this.setState({...this.state, numberOfTravelers: event.target.value});
  };

  onPaymentTypeChanged = (event) => {
    this.setState({...this.state, paymentType: event.target.value});
  };

  onBillingAddressChanged = (event) => {
    if(event.target.value === 'yes') {
      this.setState({...this.state, useSameAddress: true});
    } else if(event.target.value === 'no') {
      this.setState({...this.state, useSameAddress: false});
    }
  };

  onPaymentAmountChanged = (event) => {
    this.setState({...this.state, payOtherAmount: event.target.value});
  };

  onLodgingChanged = (event) => {
    this.setState({...this.state, lodging: event.target.value});
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    // console.log(this.state.travelType);
    // console.log(this.state.numberOfTravelers);
  };

  render() {
    let disclaimer = null;
    if(this.state.travelType === 'domestic') {
      disclaimer = (<p>Passenger name must match name on State ID EXACTLY.  Passengers under 16 years of age may substitute their birth certificate for a State ID.</p>);
    } else if(this.state.travelType === 'international') {
      disclaimer = (<p>Passenger name must match name on Passport EXACTLY.</p>);
    }

    let travelers = [];
    for(let i = 1; i <= this.state.numberOfTravelers; i++) {
      travelers.push(<TravelerInfo key={i} number={i} traveltype={this.state.travelType}/>)
    }
    
    let billingInfo = null;
    if(this.state.useSameAddress === false) {
      billingInfo = (
        <div>
          <Field label="Billing Country:" type="text"/>
          <Field label="Billing Address:" type="text"/>
          <Field label="Suite / Apt #:" type="text"/>
          <Field label="Billing City:" type="text"/>
          <Field label="Billing State:" type="text"/>
          <Field label="Billing Zip Code:" type="text"/>
        </div>
      );
    }

    let payOtherAmount = null;
    if(this.state.payOtherAmount === 'other') {
      payOtherAmount = (
        <Field label="Amount:" type="text"/>
      );
    }

    let paymentInfo = null;
    if(this.state.paymentType !== null) {
      paymentInfo = (
        <div>
          <Field label="Credit Card Number:" type="text"/>
          <Field label="Expiration Month:" type="text" placeholder="MM"/>
          <Field label="Expiration Year:" type="text" placeholder="YYYY"/>
          <Field label="CCV #:" type="text"/>
          <Field label="Name On The Card:" type="text"/>
          <SelectField label="Billing Address Same As Contact Address?" options={Constants.YES_NO} changed={this.onBillingAddressChanged}/>
          {billingInfo}
          <Field label="Payment Description:" type="text"/>
          <SelectField label="Pay In Full Or Deposit?" options={Constants.PAYMENT_AMOUNTS} changed={this.onPaymentAmountChanged}/>
          {payOtherAmount}
        </div>
      );
    }

    let lodgingInfo = null;
    if(this.state.lodging === 'lodging') {
      lodgingInfo = (
        <div>
          <Field label="Perferred Resort:" type="text"/>
          <SelectField label="Perferred Room Type:" options={Constants.ROOM_TYPES} multiple/>
        </div>
      );
    } else if(this.state.lodging === 'cruise') {
      lodgingInfo = (
        <div>
          <Field label="Perferred Cruise:" type="text"/>
          <SelectField label="Perferred Cabin Type:" options={Constants.CABIN_TYPES}/>
        </div>
      );
    }

    return (
      <div className={classes.ReservationForm}>
        <form>

          <div className={classes.Banner} style={{borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}>
            <h1>Step 1: Passenger Information</h1>
          </div>

          <div className={classes.Skinny}>
            <p style={{textAlign: 'center'}}>Select One From Each List</p>
            <SelectField label="Who Is Your Travel Agent?" name="primaryAgent" options={this.state.agents} changed={this.handleChange}/>
            <SelectField label="Total Number Of Passengers:" options={Constants.TRAVELER_COUNT} changed={this.onTravelerCountChanged}/>            
            <SelectField label="Domestic Or International Travel?" options={Constants.TRAVEL_TYPES} changed={this.onTravelTypeChanged}/>
          </div>
          <hr/>

          <div className={classes.Disclaimer}>
            {disclaimer}
          </div>

          <div>
            {travelers}
          </div>
          

          <div className={classes.Banner}>
            <h1>Step 2: Contact Information</h1>
          </div>

          <div className={classes.Skinny}> 
            <Field label="Your Country:" type="text" placeholder="USA"/>
            <Field label="Street Address:" type="text" placeholder="123 N. Main St"/>
            <Field label="City:" type="text" placeholder="Columbus"/>
            <Field label="State:" type="text" placeholder="Ohio"/>
            <Field label="Zip Code:" type="text" placeholder="12345"/>
            <Field label="Email:" type="email" placeholder="john@doe.com"/>
            <Field label="Home Phone:" type="text" placeholder="###-###-####"/>
            <Field label="Cell Phone:" type="text" placeholder="###-###-####"/>
          </div>
          

          <div className={classes.Banner}>
            <h1>Step 3: Trip Information</h1>
          </div>
          

          <div className={classes.Skinny}>
            <SelectField label="Lodging or Cruise?" options={Constants.LODGING_CRUISE} changed={this.onLodgingChanged}/>
            {lodgingInfo}
            <Field label="Departure Date:" type="date"/>
            <Field label="Return Date:" type="date"/>
            <SelectField label="Bedding Type:" options={Constants.BEDDING_TYPES}/>
            <Field label="Departure Airport:" type="text"/>
            <SelectField label="Vacation Type:" options={Constants.VACTION_TYPES}/>
            <SelectField label="Do You Need Airfare?" options={Constants.YES_NO_AIRFARE}/>
            <SelectField label="Active Military / Veteran:" options={Constants.YES_NO}/>
            <SelectField label="Do You Want Travel Insurance?" options={Constants.YES_NO}/>
            <div className={classes.Disclaimer}>
            <p>We Cannot Add Cancel For Any Reason Insurance After Deposit, However We Can Add Other Traditional Insurance At A Later Date.</p>
            </div>
            <Field label="Your Anniversary:" type="text"/>
          </div>

          <div className={classes.Banner}>
            <h1>Step 4: Payment Information (optional)</h1>
          </div>

          <div className={classes.Skinny}>
            <SelectField label="Payment Type:" options={Constants.PAYMENT_TYPES} changed={this.onPaymentTypeChanged}/>
            {paymentInfo}
          </div>
          
          <div className={classes.Banner}>
            <h1>Step 5: Additional Information</h1>
          </div> 

          <div className={classes.Skinny}>
            <FieldArea label="Special Requests:" cols="30" rows="10"/>
            <FieldArea label="Other Questions / Comments:" cols="30" rows="10"/>
            <Field label="Electronic Signature:" type="text"/>
          </div>
          <div style={{margin: '10px'}}>
            <p>{Constants.TERMS_ONE}</p>
            <br/>
            <p>{Constants.TERMS_TWO}</p>
          </div>
          <hr/>
          <div>
            <button onClick={this.onSubmit}>Submit</button>
          </div>

        </form>
      </div>
    );
  }
}

export default ReservationForm;