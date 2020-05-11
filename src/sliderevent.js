import React from 'react';
import moment from 'moment';
import tz from 'moment-timezone';

const SliderEvent = ({ item: {Title}, item: {DateAndTime}, item: {Description}, item: {Image} }) => {

    return(
        <div className = 'slider' style={{color: 'white'}}>
            <div className = 'sliderimage' style={{backgroundImage: `url(${Image})`}}/>
            <div className = 'sliderinfo'>
                <div className = 'slidertitle'>{Title}</div>
                <div className = 'slidertime'>{moment.utc(DateAndTime).format('LT')}</div>
                <div className = 'sliderdesc'>{Description}</div>
                <div className = 'sliderbuttons'>
                    <div className = 'button'>Register</div>
                    <div className = 'button'>Download</div>
                </div>
            </div> 
        </div>
    );
}

export default SliderEvent;