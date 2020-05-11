import React from 'react';
import { useTransition, animated, useSpring } from 'react-spring';
import moment from 'moment';
import UpcomingEvent from './upcomingevent';

const Upcoming = ({events, currentDate }) => {

    const next = events.filter( n => {
        return moment(n.DateAndTime).isSameOrAfter(currentDate, 'day') && moment(n.DateAndTime).isSame(currentDate, 'month');
    });

    const use = next.slice(0, 4);

    const transition = useTransition(use, use => use.Id, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });
    
    return (
        <div className = 'left-bottom-events'>
            {transition.map(({ item, key, props }) => (
                <animated.div className = 'eventwrap' key={key} style={props}>
                    <UpcomingEvent item={item}/>
                </animated.div>
            ))}
        </div>
    )
}

export default Upcoming;