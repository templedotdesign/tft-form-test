import React, { Component } from 'react';
import axios from 'axios';

import * as Constants from '../../../Constants/ReservationForm/ReservationForm';

import SelectField from '../../../Components/Forms/SelectField/SelectField';
import TravelerInfo from '../../../Components/Forms/TravelerInfo/TravelerInfo';

import classes from './ReservationForm.css';

class ReservationForm extends Component {
  state = {
    agents: [],
    travelTypes: Constants.TRAVEL_TYPES,
    travelerCount: Constants.TRAVELER_COUNT,
    primaryAgent: 'null',
    travelType: 'null',
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

  onAgentChanged = (event) => {
    this.setState({...this.state, primaryAgent: event.target.value});
  };

  onTravelTypeChanged = (event) => {
    this.setState({...this.state, travelType: event.target.value});
  };

  onTravelerCountChanged = (event) => {
    this.setState({...this.state, numberOfTravelers: event.target.value});
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.primaryAgent);
    console.log(this.state.travelType);
    console.log(this.state.numberOfTravelers);
  };

  render() {
    let travelers = [];
    for(let i = 1; i <= this.state.numberOfTravelers; i++) {
      travelers.push(<TravelerInfo key={i} number={i} traveltype={this.state.travelType}/>)
    }
    return (
      <div className={classes.ReservationForm}>
        <form>

          <div className={classes.Banner}>
            <h1>Step 1: Passenger Information</h1>
          </div>

          <div className={classes.Selects}>
            <p style={{textAlign: 'center'}}>Select One From Each List</p>
            <SelectField label="Who Is Your Travel Agent?" options={this.state.agents} changed={this.onAgentChanged}/>
            <SelectField label="Domestic Or International Travel?" options={this.state.travelTypes} changed={this.onTravelTypeChanged}/>
            <SelectField label="Total Number Of Passengers:" options={this.state.travelerCount} changed={this.onTravelerCountChanged}/>
          </div>
          <hr/>
          <div>
            {travelers}
          </div>
          <hr/>
          <div className={classes.Banner}>
            <h1>Step 2: Contact Information</h1>
          </div>
          <hr/>
          <div className={classes.Banner}>
            <h1>Step 3: Trip Information</h1>
          </div>
          <hr/>
          <div className={classes.Banner}>
            <h1>Step 4: Payment Information (optional)</h1>
          </div>
          <hr/>
          <div className={classes.Banner}>
            <h1>Step 5: Additional Information</h1>
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