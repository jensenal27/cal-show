import React from 'react';
import moment from 'moment';

const SliderEvent = ({ item: {Title}, item: {DateAndTime}, item: {Description}, item: {Image} }) => {

    return(
        <div className = 'slider' style={{color: 'white'}}>
            <div className = 'sliderimage' style={{backgroundImage: `url(${Image})`}}/>
            <div className = 'sliderinfo'>
                <div className = 'slidertitle'>
                    {Title}
                </div>
                {Description}
            </div> 
        </div>
    );
}

export default SliderEvent;