import React from 'react';
import moment from 'moment';

const Months = ({currentDate, setMonth}) => {
    
    const dateFormat = "MMM";
    const months = [];
    let startDate = moment(currentDate).startOf('year');
    
    for (let i = 0; i < 12; i++) {
        const month = moment(startDate).add(i, 'months');
        months.push(
            <div className="mon-col" key={i} id={moment(currentDate).isSame(month, 'month') ? 'activemonth' : ''} onClick = {() => setMonth(i)}>
                {month.format(dateFormat)}
            </div>
        );
    }

    return(
        <div className = 'monthsdiv'>
            <div className="monthswrap">{months}</div>
        </div>
    );
}

export default Months;