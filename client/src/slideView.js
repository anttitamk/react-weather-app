import React from 'react'
import Slider from "react-slick"
import {Card} from 'reactstrap'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


function SlideView(result) {

    if (result.data === null) return <div></div>
    if (result.data !== null && result.data !== undefined && result.data.error !== undefined) return <div></div>

    var forecastList = []
    forecastList = result.data.list
    // remove the first array of weather forecast as it's already handled in weather.js
    forecastList.shift()

    return(
        <Slider
            className="slider"
            speed={500}
            slidesToShow={6}
            slidesToScroll={3}
            infinte={false}
            dots={true}
            focusOnSelect={true}>

                {forecastList.map((weather, key) => 

                    <Card key={key} className="card white-text">
                        <div>{dayOfWeek(new Date(weather.dt_txt).getDay())}</div>
                        <div style={{fontSize: '1.6em'}}>{weather.main.temp.toFixed(0)} &deg;C</div>
                        <div>{new Date(weather.dt_txt).toLocaleTimeString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                        </div>
                    </Card>

                )}

        </Slider>
    )
}

function dayOfWeek(dayNumber) {
    switch(dayNumber) {
        case 1: 
            return "Ma"
        case 2:
            return "Ti"
        case 3: 
            return "Ke"
        case 4:
            return "To"
        case 5: 
            return "Pe"
        case 6:
            return "La"
        case 0:
            return "Su"
        default:
            return ""
    }
}

export default SlideView