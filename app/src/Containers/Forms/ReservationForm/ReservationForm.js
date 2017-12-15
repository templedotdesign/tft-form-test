import React, { Component } from 'react';
import axios from 'axios';

import * as Constants from '../../../Constants/ReservationForm/ReservationForm';

import Field from '../../../Components/Forms/Field/Field';
import SelectField from '../../../Components/Forms/SelectField/SelectField';
import FieldArea from '../../../Components/Forms/FieldArea/FieldArea';
import TravelerInfo from '../../../Components/Forms/TravelerInfo/TravelerInfo';
import Notification from '../../../Components/Forms/Notification/Notification';

import classes from './ReservationForm.css';

class ReservationForm extends Component {
  state = {
    agents: [],
    showSuccessNotification: false,
    showFailureNotification: false
  }

  componentDidMount() {
    let agentsArray = [{value: 'null', name: 'Select'}];
    const getAgentsURL = `https://www.vacationcrm.com/travelmvc/api/Service/GetAgents?ApiKey=${Constants.API_KEY}`;
    axios.get(getAgentsURL)
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
    this.setState({...this.state, [event.target.name]: event.target.value || null});
  };

  blurTest = (event) => {
    event.target.style.backgroundColor = 'red';
    event.target.style.color = 'white';
  };

  onSubmit = (event) => {
    event.preventDefault();
    const postRequestURL = `https://vacationcrm.com/travelmvc/api/Service/PostRequest?ApiKey=${Constants.API_KEY}`;
    const passengersArray = this.createPassengers();
    const paymentsArray = this.createPayments();
    const formattedDepartureDate = this.formatDate(this.state.departureDate);
    const formattedReturnDate = this.formatDate(this.state.returnDate);
    const reservation = {
      Airfare: this.state.airfare || null,
      ApiKey: Constants.API_KEY,
      Bedding: this.state.bedding || null,
      CustomField1: null,
      CustomField2: null,
      CustomField3: null,
      CustomField4: null,
      CustomField5: null,
      CustomField6: null,
      CustomField7: null,
      CustomField8: null,
      CustomField9: null,
      CustomField10: null, 
      DepartureDate: formattedDepartureDate,
      DepartureLocation: this.state.departureLocation || null,
      DestinationLocation: this.state.destinationLocation || null,
      Insurance: this.state.insurance || null,
      Military: this.state.military || null,
      OtherQuestion: this.state.otherQuestion || null,
      Passengers: passengersArray,
      Payments: paymentsArray,
      PrimaryAgent: this.state.primaryAgent || null,
      ReminderText: null,
      Resort: this.state.resort || null,
      ReturnDate: formattedReturnDate,
      RoomType: this.state.roomType || null,
      SpecialRequest: this.state.specialRequest || null,
      VacationType: this.state.vacationType || null,
      pdf_id: null,
      udf_reg1: null,
      udf_reg2: null,
      udf_reg3: null,
      udf_reg4: null,
      udf_reg5: null
    };
    //console.log(reservation);
    axios.post(postRequestURL, reservation)
    .then(res => {
      console.log(res);
      console.log('upload successful')
      this.setState({...this.state, showSuccessNotification: true})
    })
    .catch(err => {
      console.log(err);
      this.setState({...this.state, showFailureNotification: true})
    });
  };

  createPassengers = () => {
    let passengers = [];
    for(let i = 1; i <= this.state.numberOfTravelers; i++) {
      let passenger = {};
      const fNameProp = `passenger${i}FirstName`;
      const mNameProp = `passenger${i}MiddleName`;
      const lNameProp = `passenger${i}LastName`;
      const passNumProp = `passenger${i}PassNum`;
      const passIssuerProp =`passenger${i}PassIssuer`;
      const passExpProp = `passenger${i}PassExp`;
      const dobProp = `passenger${i}DOB`;
      const genderProp = `passenger${i}Gender`;
      const suffixProp = `passenger${i}Suffix`;
      const formattedDOB = this.formatDate(this.state[dobProp]);
      passenger = {...passenger, FirstName: this.state[fNameProp]};
      passenger = {...passenger, MiddleName: this.state[mNameProp]};
      passenger = {...passenger, LastName: this.state[lNameProp]};
      passenger = {...passenger, PassportNum: this.state[passNumProp] || null};
      passenger = {...passenger, PassportState: this.state[passIssuerProp] || null};
      passenger = {...passenger, PassportExp: this.state[passExpProp] || null};
      passenger = {...passenger, DOB: formattedDOB};
      passenger = {...passenger, Gender: this.state[genderProp]};
      passenger = {...passenger, Suffix: this.state[suffixProp] || null};
      passenger = {...passenger, DepartureAirport: this.state.departureLocation || null};
      if(i === 1) {
        passenger = {...passenger, PrimaryPass: 'Y'};
        passenger = {...passenger, Country: this.state.contactCountry};
        passenger = {...passenger, Street: this.state.contactStreet};
        passenger = {...passenger, City: this.state.contactCity};
        passenger = {...passenger, State: this.state.contactState};
        passenger = {...passenger, Zip: this.state.contactZip};
        passenger = {...passenger, Email: this.state.contactEmail};
        passenger = {...passenger, Email2: this.state.contactEmail2 || null};
        passenger = {...passenger, Phone1: this.state.contactPhone};
        passenger = {...passenger, Phone2: this.state.contactPhone2 || null};
      } else {
        passenger = {...passenger, PrimaryPass: 'N'};
        passenger = {...passenger, Country: null};
        passenger = {...passenger, Street: null};
        passenger = {...passenger, City: null};
        passenger = {...passenger, State: null};
        passenger = {...passenger, Zip: null};
        passenger = {...passenger, Email: null};
        passenger = {...passenger, Email2: null};
        passenger = {...passenger, Phone1: null};
        passenger = {...passenger, Phone2: null};
      }
      passenger = {...passenger, Anniversary: null};
      passenger = {...passenger, FreqAirline: null};
      passenger = {...passenger, FreqNumber: null};
      passenger = {...passenger, ReferredBy: null};
      passenger = {...passenger, SeatingPref: null};
      passenger = {...passenger, TravelerNumber: null};
      passengers.push(passenger);
    }
    return passengers;
  };

  createPayments = () => {
    let payments = [];
    let payment = {};

    if(!this.state.paymentType) {
      payments.push(payment);
      return payments;
    }

    payment = {...payment, CCName: this.state.ccName};
    payment = {...payment, CCV: this.state.ccv};
    payment = {...payment, CreditCardNum: this.state.ccNumber};
    payment = {...payment, ExpirationMonth: this.state.ccMonth};
    payment = {...payment, ExpirationYear: this.state.ccYear};
    payment = {...payment, PaymentDescription: this.state.ccDescription || null};
    payment = {...payment, PaymentType: this.state.paymentType};
    payment = {...payment, pdf_id: null};
    payment = {...payment, udf_pmt1: null};
    payment = {...payment, udf_pmt2: null};
    payment = {...payment, udf_pmt3: null};
    if(this.state.useSameAddress  === 'Yes') {
      payment = {...payment, CCAddress: this.state.contactStreet};
      payment = {...payment, CCAddress2: null};
      payment = {...payment, CCCity: this.state.contactCity};
      payment = {...payment, CCCountry: this.state.contactCountry};
      payment = {...payment, CCState: this.state.contactState};
      payment = {...payment, CCZip: this.state.contactZip};
    } else {
      payment = {...payment, CCAddress: this.state.ccAddress1};
      payment = {...payment, CCAddress2: this.state.ccAddress2 || null};
      payment = {...payment, CCCity: this.state.ccCity};
      payment = {...payment, CCCountry: this.state.ccCountry};
      payment = {...payment, CCState: this.state.ccState};
      payment = {...payment, CCZip: this.state.ccZip};
    }
    payments.push(payment);
    return payments;
  };

  formatDate = (dateString) => {
    const dateArray = dateString.split('-');
    const formattedArray = [];
    formattedArray.push(dateArray[1]);
    formattedArray.push(dateArray[2]);
    formattedArray.push(dateArray[0]);
    return formattedArray.join('/');
  };

  render() {
    let disclaimer = null;
    if(this.state.travelType === 'Domestic') {
      disclaimer = (<p>Passenger Name Must Match Name On State ID EXACTLY.  Passengers Under 16 Years Of Age May Substitute Their Birth Certificate For A State ID.</p>);
    } else if(this.state.travelType === 'International') {
      disclaimer = (<p>Passenger Name Must Match Name On Passport EXACTLY.  Passport Expiration Date Must Have 6 Months Validity Remaining After Travel Return Date.</p>);
    }

    let travelers = [];
    for(let i = 1; i <= this.state.numberOfTravelers; i++) {
      travelers.push(<TravelerInfo key={i} number={i} traveltype={this.state.travelType} changed={this.handleChange}/>)
    }
    
    let billingInfo = null;
    if(this.state.useSameAddress === 'No') {
      billingInfo = (
        <div>
          <Field required label="Billing Country:" type="text" name="ccCountry" changed={this.handleChange}/>
          <Field required label="Billing Address:" type="text" name="ccAddress1" changed={this.handleChange}/>
          <Field label="Suite / Apt #:" type="text" name="ccAddress2" changed={this.handleChange}/>
          <Field required label="Billing City:" type="text" name="ccCity" changed={this.handleChange}/>
          <Field required label="Billing State:" type="text" name="ccState" changed={this.handleChange}/>
          <Field required label="Billing Zip Code:" type="text" name="ccZip" changed={this.handleChange}/>
        </div>
      );
    }

    let payOtherAmount = null;
    if(this.state.paymentAmount === 'Other') {
      payOtherAmount = (
        <Field label="Amount:" type="text" name="ccAmount" changed={this.handleChange}/>
      );
    }

    let paymentInfo = null;
    if(this.state.paymentType) {
      paymentInfo = (
        <div>
          <Field required label="Credit Card Number:" type="text" name="ccNumber" changed={this.handleChange}/>
          <Field required label="Expiration Month:" type="text" placeholder="MM" name="ccMonth" changed={this.handleChange}/>
          <Field required label="Expiration Year:" type="text" placeholder="YY" name="ccYear" changed={this.handleChange}/>
          <Field required label="CCV #:" type="text" name="ccv" changed={this.handleChange}/>
          <Field required label="Name On The Card:" type="text" name="ccName" changed={this.handleChange}/>
          <SelectField label="Billing Address Same As Contact Address?" options={Constants.YES_NO} name="useSameAddress" changed={this.handleChange}/>
          {billingInfo}
          <Field label="Payment Description:" type="text" name="ccDescription" changed={this.handleChange}/>
          <SelectField label="Pay In Full Or Deposit?" options={Constants.PAYMENT_AMOUNTS} name="paymentAmount" changed={this.handleChange}/>
          {payOtherAmount}
        </div>
      );
    }

    let lodgingInfo = null;
    if(this.state.lodging === 'Lodging') {
      lodgingInfo = (
        <div>
          <Field label="Perferred Resort:" type="text" name="resort" changed={this.handleChange}/>
          <SelectField required label="Perferred Room Type:" options={Constants.ROOM_TYPES} name="roomType" changed={this.handleChange}/>
        </div>
      );
    } else if(this.state.lodging === 'Cruise') {
      lodgingInfo = (
        <div>
          <Field label="Perferred Cruise:" type="text" name="resort" changed={this.handleChange}/>
          <SelectField required label="Perferred Cabin Type:" options={Constants.CABIN_TYPES} name="roomType" changed={this.handleChange}/>
        </div>
      );
    }

    let notification = null;
    if(this.state.showSuccessNotification) {
      notification = (
        <Notification text="Your data has been uploaded successfully" style={{backgroundColor: 'green'}}/>
      );
    } else if(this.state.showFailureNotification) {
      notification = (
        <Notification text="Your data failed to upload" style={{backgroundColor: 'red'}}/>
      );
    }

    return (
      <div className={classes.ReservationForm}>
        <form>
          <div className={classes.Banner} style={{borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}>
            <h1>Step 1: Passenger Information</h1>
          </div>
          <p style={{textAlign: 'center', fontSize:'1.3rem'}}>Fields in <span style={{fontWeight: 'bold'}}>Bold</span> are required.</p>
          <div className={classes.Skinny}>
            <SelectField label="Who Is Your Travel Agent?" name="primaryAgent" options={this.state.agents} changed={this.handleChange} required/>
            <SelectField label="Total Number Of Passengers:" options={Constants.TRAVELER_COUNT} name="numberOfTravelers" changed={this.handleChange} required/>            
            <SelectField label="Domestic Or International Travel?" options={Constants.TRAVEL_TYPES} name="travelType" changed={this.handleChange} required blur={this.blurTest}/>
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
            <div className={classes.Disclaimer}>
              This Contact Information Should Be For The Primary Passenger.
            </div> 
            <Field required label="Your Country:" type="text" placeholder="USA" name="contactCountry" changed={this.handleChange} blur={this.blurTest}/>
            <Field required label="Street Address:" type="text" placeholder="123 N. Main St" name="contactStreet" changed={this.handleChange}/>
            <Field required label="City:" type="text" placeholder="Columbus" name="contactCity" changed={this.handleChange}/>
            <Field required label="State:" type="text" placeholder="Ohio" name="contactState" changed={this.handleChange}/>
            <Field required label="Zip Code:" type="text" placeholder="12345" name="contactZip" changed={this.handleChange}/>
            <Field required label="Email:" type="email" placeholder="john@doe.com" name="contactEmail" changed={this.handleChange}/>
            <Field label="Email2:" type="email" placeholder="john@doe.com" name="contactEmail2" changed={this.handleChange}/>
            <Field required label="Phone:" type="text" placeholder="###-###-####" name="contactPhone"  changed={this.handleChange}/>
            <Field label="Phone2:" type="text" placeholder="###-###-####" name="contactPhone2" changed={this.handleChange}/>
          </div>
          <div className={classes.Banner}>
            <h1>Step 3: Trip Information</h1>
          </div>
          <div className={classes.Skinny}>
            <SelectField required label="Lodging or Cruise?" options={Constants.LODGING_CRUISE} name="lodging" changed={this.handleChange}/>
            {lodgingInfo}
            <Field required label="Departure Date:" type="date" name="departureDate" changed={this.handleChange}/>
            <Field required label="Return Date:" type="date" name="returnDate" changed={this.handleChange}/>
            <SelectField label="Bedding Type:" options={Constants.BEDDING_TYPES} name="bedding" changed={this.handleChange}/>
            <Field label="Departure Airport:" type="text" name="departureLocation" changed={this.handleChange}/>
            <Field label="Destination Airport:" type="text" name="destinationLocation" changed={this.handleChange}/>
            <SelectField label="Vacation Type:" options={Constants.VACTION_TYPES} name="vacationType" changed={this.handleChange}/>
            <SelectField label="Do You Need Airfare?" options={Constants.YES_NO_AIRFARE} name="airfare" changed={this.handleChange}/>
            <SelectField label="Active Military / Veteran:" options={Constants.YES_NO} name="military" changed={this.handleChange}/>
            <SelectField required label="Do You Want Travel Insurance?" options={Constants.YES_NO} name="insurance" changed={this.handleChange}/>
            <div className={classes.Disclaimer}>
            <p>We Recommend Adding Travel Insurance At Time Of Deposit To Recieve Maximum Benefits.  Cancel For Any Reason Coverage Typically Must Be Purchased Within 14 Days Of Deposit, Policies May Vary.</p>
            </div>
            {/* <Field label="Your Anniversary:" type="text"/> */}
          </div>
          <div className={classes.Banner}>
            <h1>Step 4: Payment Information (optional)</h1>
          </div>
          <div className={classes.Skinny}>
            <SelectField label="Payment Type:" options={Constants.PAYMENT_TYPES} name="paymentType" changed={this.handleChange}/>
            {paymentInfo}
          </div>
          <div className={classes.Banner}>
            <h1>Step 5: Additional Information</h1>
          </div> 
          <div className={classes.Skinny}>
            <FieldArea label="Special Requests:" cols="30" rows="10" name="specialRequest" changed={this.handleChange}/>
            <FieldArea label="Other Questions / Comments:" cols="30" rows="10" name="otherQuestion" changed={this.handleChange}/>
            <Field required label="Electronic Signature:" type="text" name="electronicSignature" changed={this.handleChange}/>
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
        {notification}
      </div>
    );
  }
}

export default ReservationForm;