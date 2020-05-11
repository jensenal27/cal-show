import React from 'react';
import moment from 'moment';
import tz from 'moment-timezone';

const UpcomingEvent = ({ item: {Title}, item: {DateAndTime}, item: {Description}, item: {Image} }) => {

    return(
        <>
            {moment(DateAndTime).format('M/DD') + ' ' + Title}
        </>
    );
}

export default UpcomingEvent;