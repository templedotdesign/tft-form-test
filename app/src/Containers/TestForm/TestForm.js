import React, { Component } from 'react';
import axios from 'axios';

import classes from './TestForm.css';

class TestForm extends Component {
  state = {
    agents: [],
    reservation: {}
  }
  
  componentDidMount() {
    axios.get('https://www.vacationcrm.com/travelmvc/api/Service/GetAgents?ApiKey=9A9535E5-B636-4C3B-BAA7-56C87E2FD076')
    .then(res => {
      this.setState({agents: res.data});
    })
    .catch(err => {
      console.log(err);
    });
  }

  onAgentChangedHandler = (event) => {
    this.setState({...this.state, reservation: { ...this.state.reservation, agent: event.target.value } });
  }

  onNameChangedHandler = (event) => {
    this.setState({...this.state, reservation: {...this.state.reservation, name: event.target.value}});

  };

  onBirthDateChangedHandler = (event) => {
    this.setState({...this.state, reservation: {...this.state.reservation, birthDate: event.target.value }});
  };

  onGenderChangedHandler = (event) => {
    this.setState({...this.state, reservation: {...this.state.reservation, gender: event.target.value }});
  }

  onLeadNameChangedHandler = (event) => {
    this.setState({...this.state, reservation: {...this.state.reservation, leadName: event.target.value}});
  };

  onStreetChangedHandler = (event) => {
    this.setState({...this.state, reservation: {...this.state.reservation, street: event.target.value}});
  };

  onCityChangedHandler = (event) => {
    this.setState({...this.state, reservation: {...this.state.reservation, city: event.target.value}});
  };

  onStateChangedHandler = (event) => {
    this.setState({...this.state, reservation: {...this.state.reservation, state: event.target.value}});
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(this.state.reservation);
  };

  render() {
    return(
      <div className={classes.TestForm}>
        <div className={classes.Border}></div>
        <h1>Domestic Traveler Information Form - TSA Required</h1>
        <p>Complete in full to secure your booking.</p>
        <hr/>
        <form>
          <div>
            <h5>I am working with Tons of Fun Travel agent:</h5>
            <select onChange={this.onAgentChangedHandler}>
              <option value="none"></option>
              {this.state.agents.map(option => {
                return(<option key={option.Code} value={option.Code}>{option.FullName}</option>);
              })}
            </select>
            <hr/>
          </div>
          <div>
            <p>Traveler #1</p>
            <h5>Traveler's Full Name EXACTLY as it appears on ID</h5>
            <input type="text" onChange={this.onNameChangedHandler}/>
            <h5>Traveler's Birthdate</h5>
            <input type="date" onChange={this.onBirthDateChangedHandler}/>
            <h5>Gender</h5>
            <select onChange={this.onGenderChangedHandler}>
              <option value="none"></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {/* <input type="checkbox" />
            <label>Male</label>
            <input type="checkbox" />
            <label>Female</label> */}
            <hr/>
          </div>
          <div>
            <p>Traveler #2</p>
            <h5>Traveler's Full Name EXACTLY as it appears on ID</h5>
            <input type="text"/>
            <h5>Traveler's Birthdate</h5>
            <input type="date"/>
            <h5>Gender</h5>
            <input type="checkbox" />
            <label>Male</label>
            <input type="checkbox" />
            <label>Female</label>
            <hr/>
          </div>
          <div>
            <p>Traveler #3</p>
            <h5>Traveler's Full Name EXACTLY as it appears on ID</h5>
            <input type="text"/>
            <h5>Traveler's Birthdate</h5>
            <input type="date"/>
            <h5>Gender</h5>
            <select onChange={this.onGenderChangedHandler}>
              <option value="none"></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {/* <input type="checkbox" />
            <label>Male</label>
            <input type="checkbox" />
            <label>Female</label> */}
            <hr/>
          </div>
          <div>
            <p>Traveler #4</p>
            <h5>Traveler's Full Name EXACTLY as it appears on ID</h5>
            <input type="text"/>
            <h5>Traveler's Birthdate</h5>
            <input type="date"/>
            <h5>Gender</h5>
            <select onChange={this.onGenderChangedHandler}>
              <option value="none"></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {/* <input type="checkbox" />
            <label>Male</label>
            <input type="checkbox" />
            <label>Female</label> */}
            <hr/>
          </div>
          <div>
            <p>This information is being submitted for a booking secured by:</p>
            <p>I verify that the information supplied is accurate and understand that errors could result in change fees with vendors/airlines.</p>
            <h5>Lead Passenger</h5>
            <input className={classes.Wide} type="text" onChange={this.onLeadNameChangedHandler}/>
            <h5>Address</h5>
            <input className={classes.Wide} type="text" onChange={this.onStreetChangedHandler}/>
            <label>Street Address</label>
            <input className={classes.Wide} type="text" onChange={this.onCityChangedHandler}/>
            <label>City</label>
            <input className={classes.Wide} type="text" onChange={this.onStateChangedHandler}/>
            <label>State / Province / Region </label>
            <input className={classes.Wide} type="text"/>
            <label>Postal / Zip Code</label>
            <input className={classes.Wide} type="text"/>
            <label>Country / Region</label>
            <hr/>
            <h5>Home Phone</h5>
            <input type="text" placeholder="###-###-####"/>
            <h5>Cell Phone</h5>
            <input type="text" placeholder="###-###-####"/>
            <h5>Email</h5>
            <input className={classes.Wide} type="email"/>
            <hr/>
            <button onClick={this.onSubmitHandler}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default TestForm;