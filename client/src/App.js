import React, { Component } from 'react';
import Weather from './weather';
import SlideView from './slideView'

import {
  Container,
  Button,
  Row,
  Col,
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

  handleDeleteCity = (city) => {
    axios({
      method: 'delete',
      url: '/api/cities',
      data: {city: city}
    })
    .then(res => res.data)
    .then(this.getCityList())
  }

  getWeather = (city) => {
    axios(`/api/weather/${city}`)
    .then(res => res.data)
    .then(weather => {
      if (weather.error !== undefined) this.handleDeleteCity(city)
      this.setState({weather})
    })
  }

  handleChangeCity = (e) => {
    if (e.target.value !== 'Select a city') this.getWeather(e.target.value)
    else this.setState({weather: null})
  }

  componentDidMount () {
    this.getCityList();
  }

  render()
  {
    return (
        <Container fluid className="centered">
        <Row>
            <Jumbotron className="jumbotron">
              <h1 className="display-3 white-text">Päivän sää</h1>
              <p className="lead white-text" style={{paddingBottom: '1em'}}>Lempikaupunkiesi 5 päivän ennuste!</p>

              <InputGroup>
                <Input
                placeholder="Anna kaupungin nimi..."
                value={this.state.newCityName}
                onChange={this.handleInputChange}/>

                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddCity}>Lisää kaupunki</Button>
                </InputGroupAddon>
                
              </InputGroup>

            </Jumbotron>
        </Row>
        <Col>
          <h1 className="display-5 white-text">Kaupunki</h1>
          <FormGroup>
            <Input type="select" className="city-dropdown" onChange={this.handleChangeCity}>
              { this.state.cityList.length === 0 && <option>Kaupunkeja ei vielä lisätty</option> }
              { this.state.cityList.length > 0 && <option>Valitse kaupunki</option> }
              { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
            </Input>
          </FormGroup>
        </Col>
        <Weather data={this.state.weather}/>
        <SlideView data={this.state.weather}/>
        </Container>
    );
  }  
}

export default App;
