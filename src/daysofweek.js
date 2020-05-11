import React from 'react';
import moment from 'moment';

const DaysOfWeek = ({currentDate}) => {
    
    const dateFormat = "ddd";
    const days = [];
    let startDate = moment(currentDate).startOf('week');
    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="day-col" key={i}>
            {moment(startDate).add(i, 'days').format(dateFormat)}
            </div>
        );
    }

    return(
        <div className = 'daysdiv'>
            <div className="dayswrap">{days}</div>
        </div>
    );
}

export default DaysOfWeek;