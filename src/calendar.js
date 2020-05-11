import React, {useState} from 'react';
import moment from 'moment';
import './calendar.css';

const Calendar = ({ initialModal, events, actualDate, currentDate, selectedDate, setSelectedDate, modalAppear, setModalDate }) => {

        const monthStart = moment(currentDate).startOf('month');
        const monthEnd = moment(monthStart).endOf('month');
        const startDate = moment(monthStart).startOf('week');
        const endDate = moment(monthEnd).endOf('month');
        const dateFormat = "D";
        const modalDateFormat ="dddd, MMMM Do";

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
            formattedDate = moment(day).format(dateFormat);
            const cloneDay = day;

            let available = events.find( t => {
                return moment(t.DateAndTime).isSame(day, 'day')
            });

            const onDateClick = day => {

                if(available && moment(day).isSame(selectedDate) === false) {
                    setSelectedDate(day);
                    setModalDate(moment(day));
                    modalAppear(day);
                    // setShowModal(true);
                } else if(available && moment(day).isSame(selectedDate) === true) {
                    initialModal();
                } else return null;
            }
            
            days.push(
                <div
                className={`column cell ${!moment(day).isSame(monthStart, 'month') && !available
                ? "disabled" : !moment(day).isSame(monthStart, 'month') && available
                ? "dis-available" : moment(day).isSame(selectedDate, 'day')
                ? "selected" : moment(day).isSame(actualDate, 'day') && !available
                ? "current" : moment(day).isSame(actualDate, 'day') && available
                ? "cur-available" : available
                ? "available" : "" }`}
                key={day}
                onClick={() => onDateClick(cloneDay)}
                >
                <span className="number">{formattedDate}</span>
                <span className="bg">{formattedDate}</span>
                </div>
                );
            day = moment(day).add(1, 'days');
            }
            rows.push(
                <div className="row" key={day}> {days} </div>
            );
            days = [];
            }
        return (
            <div className = 'rowsdiv'>{rows}</div>
        )
}

export default Calendar;