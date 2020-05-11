import React, {useEffect} from 'react';
import { useTransition, animated, useSpring } from 'react-spring';
import {useGesture} from 'react-use-gesture';
import moment from 'moment';
import SliderEvent from './sliderevent';

const Slider = ({ modals, selectedDate, modalDate, currentDate, setSelectedDate, nextModal, prevModal }) => {

    const transition = useTransition(modals, modals => modals.Id, {
        from: { opacity: 0, height: '0%', transform: 'translatey(1rem)' },
        enter: { opacity: 1, height: '100%', transform: 'translatey(0rem)' },
        leave: { opacity: 0, height: '0%', transform: 'translatey(1rem)' }
    });

    const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))

    const bind = useGesture({
        onDrag: ({ down, movement: [mx], cancel, active}) => {
            if(mx > window.innerWidth / 6 || mx < -window.innerWidth / 6) cancel(); 
            if(mx < -window.innerWidth / 6 && active) nextModal();
            if(mx > window.innerWidth / 6 && active) prevModal();
            set({xy: down ? mx: [0, 0], immediate: down})
        }
    })
    
    return (
        <div className = 'date'>
            <animated.div className = 'scrollingcontent' {...bind()} style={{
                    transform: xy.interpolate((x, y) => `translatex(${x}px)`)
                }} >
                {transition.map(({ item, key, props }) => (
                    <animated.div className = 'scrollwrap' key={key} style={props}>
                        <SliderEvent item={item}/>
                    </animated.div>
                ))}
            </animated.div>
        </div>
    )
}

export default Slider;