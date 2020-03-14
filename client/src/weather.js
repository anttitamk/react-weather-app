import React from 'react';
import {Row, Col, Table, Alert} from 'reactstrap';


function Weather(result) {

    const [show, setShow] = React.useState(true);

    var data = null;

    if (result.data !== null && result.data.error === undefined && result.data.cod === "200") data = result.data
    else if (result.data !== null && result.data !== undefined && result.data.error !== undefined) 
        return <Alert dismissible color="primary" onClose={() => setShow(false)}>
            {result.data.error} Invalid city name. City has been removed from the list.
            </Alert>
    else if (result.data === null) return <div></div>

    if (show){
        return (
            <Row className="weather white-text">
                <Col>
                    <h2 style={{fontSize: '3.5rem'}}>{data.city.name}</h2>
                    <div>
                        <div className="main-weather">
                            <div className="degrees">
                                <img src={`http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`} alt="Weather icon"/>
                                <span style={{marginLeft: '10px'}}>{Math.floor(data.list[0].main.temp)}&deg;C</span>
                            </div>
                            <span className="main-description">{data.list[0].weather[0].description[0].toUpperCase() + data.list[0].weather[0].description.slice(1)}</span>&nbsp;
                        </div>
                        <div className="weather-table">
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Tuulen nopeus</td>
                                        <td>{(data.list[0].wind.speed * 0.277778).toFixed(2)} m/s</td>
                                    </tr>
                                    <tr>
                                        <td>Ilmanpaine</td>
                                        <td>{Math.floor(data.list[0].main.pressure)} hPa</td>
                                    </tr>
                                    <tr>
                                        <td>Kosteus</td>
                                        <td>{Math.floor(data.list[0].main.humidity)} %</td>
                                    </tr>
                                    <tr>
                                        <td>Alin lämpötila</td>
                                        <td>{Math.floor(data.list[0].main.temp_min)} &deg;C</td>
                                    </tr>
                                    <tr>
                                        <td>Ylin lämpötila</td>
                                        <td>{Math.floor(data.list[0].main.temp_max)} &deg;C</td>
                                    </tr>
                                </tbody>
                            </Table>                        
                        </div>
                    </div>                                        
                </Col>
            </Row>
        );
    }    
};

export default Weather