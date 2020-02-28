import React, { Component } from 'react';

import Weather from './weather';

import {
  Container,
  Button,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Jumbotron,
  InputGroup,
  Input,
  InputGroupAddon,
  FormGroup
} from 'reactstrap';

const axios = require('axios');


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      cityList: [],
      newCityName: ''
    };
  }

  getCityList = () => {
    axios({
      url: '/api/cities',
    })
    .then(res => res)
    .then(res => {
      // the response is an array, just get the city names
      var cityList = res.data.map(city => city.city_name);
      this.setState({cityList});
    })
  }

  handleInputChange = (e) => {
    this.setState({newCityName: e.target.value});
  }

  handleAddCity = () => {
    axios({
      method: 'post',
      url: '/api/cities',
      data: {city: this.state.newCityName}
    })
    .then(res => res.data)
    .then(res => {
      this.getCityList();
      this.setState({newCityName: ''})
    })
  }

  getWeather = (city) => {
    axios(`/api/weather/${city}`)
    .then(res => res.data)
    .then(weather => {
      console.log(weather)
      this.setState({weather})
    })
  }

  handleChangeCity = (e) => {
    this.getWeather(e.target.value)
  }

  componentDidMount () {
    this.getCityList();
  }

  render()
  {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">Weather app</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">MyWeather</h1>
              <p className="lead">The current weather for your cities!</p>

              <InputGroup>
                <Input
                placeholder="New city name..."
                value={this.state.newCityName}
                onChange={this.handleInputChange}/>

                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddCity}>Add city</Button>
                </InputGroupAddon>
                
              </InputGroup>

            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current weather</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCity}>
                { this.state.cityList.length === 0 && <option>No cities added yet</option> }
                { this.state.cityList.length > 0 && <option>Select a city</option> }
                { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Weather data={this.state.weather}/>
      </Container>
    );
  }  
}

export default App;
