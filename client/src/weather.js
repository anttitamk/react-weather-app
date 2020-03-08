import React from 'react';
import {Row, Col, Table, Alert} from 'reactstrap';


function Weather(result) {

    const [show, setShow] = React.useState(true);

    var data = null;

    if (result.data !== null && result.data.error === undefined) data = result.data
    else if (result.data !== null && result.data !== undefined && result.data.error !== undefined) 
        return <Alert dismissible color="primary" onClose={() => setShow(false)}>
            {result.data.error} Invalid city name. City has been removed from the list.
            </Alert>
    else if (result.data === null) return <div></div>

    if (show){
        return (
            <Row className="weather">
                <Col sm="12" md={{size: 4, offset: 4}}>
                    <h2>{data.name}</h2>
                    <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="Weather icon"/>
                    <span>{data.weather[0].main}</span>&nbsp;
                    <span>{Math.floor(data.main.temp)}&deg;C</span>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Wind</td>
                                <td>{(data.wind.speed * 0.277778).toFixed(2)} m/s</td>
                            </tr>
                            <tr>
                                <td>Pressure</td>
                                <td>{Math.floor(data.main.pressure)} hPa</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{Math.floor(data.main.humidity)} %</td>
                            </tr>
                            <tr>
                                <td>Min. temp</td>
                                <td>{Math.floor(data.main.temp_min)} &deg;C</td>
                            </tr>
                            <tr>
                                <td>Max. temp</td>
                                <td>{Math.floor(data.main.temp_max)} &deg;C</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }    
};

export default Weather