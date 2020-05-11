import React, {useState, useEffect} from 'react';
import { useTransition, animated, config } from 'react-spring';
import './App.css';
import moment from 'moment';
import Calendar from './calendar';
import Months from './months';
import DaysOfWeek from './daysofweek';
import Slider from './slider';
import Upcoming from './upcoming';
import {eventData} from './info.js';

function App() {

  const [events, setEvents] = useState(eventData);
  const [actualDate, setActualDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState([]);
  const [modals, setModals] = useState([]);
  const [modalDate, setModalDate] = useState('');
  const [inView, setInView] = useState(false);

  events.sort((a, b) => moment(a.DateAndTime) - moment(b.DateAndTime));

  const initialModal = () => {

    let today = events.find( t => {
      return moment(t.DateAndTime).isSame(actualDate, 'day')
    });
  
    let next = events.find( n => {
      return moment(n.DateAndTime).isAfter(actualDate, 'day');
    });
  
    let reverse = events.sort((a, b) => moment(b.DateAndTime) - moment(a.DateAndTime))
  
    let prev = reverse.find( n => {
      return moment(n.DateAndTime).isBefore(actualDate, 'day');
    });
  
    let use = next.DateAndTime;

    if(today){
      setSelectedDate(today);
      setModals(today);
      setModalDate(actualDate);
    } else {
      setModals(next);
      setSelectedDate(use);
      setModalDate(use);
    }
    
  }

  useEffect(() => {
    setEvents(eventData);
    initialModal();
  }, []);

  const setMonth = (e) => {
    setCurrentDate(moment(currentDate).startOf('year').add(e, 'months'));
  }

  const prevModal = (e) => {

    let reverse = events.sort((a, b) => moment(b.DateAndTime) - moment(a.DateAndTime))
  
    let prev = reverse.find( n => {
      return moment(n.DateAndTime).isBefore(selectedDate, 'day');
    });

    if(prev){
      setModals(prev);
      setSelectedDate(prev.DateAndTime);
    } else {
      return null
    }

  }

  const nextModal = (e) => {

    events.sort((a, b) => moment(a.DateAndTime) - moment(b.DateAndTime))

    let next = events.find( n => {
      return moment(n.DateAndTime).isAfter(selectedDate, 'day');
    });

    if(next){
      setModals(next);
      setSelectedDate(next.DateAndTime);
    } else {
      return null
    }
  }

  const modalAppear = (day) => {
    setModals(
      [...events.filter(modal => {
        return moment(modal.DateAndTime).isSame(day, 'day')
      })]
    );
  }

  const transition = useTransition(inView, null, {
    config: config.gentle,
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 27 },
    leave: { opacity: 0, height: 0 }
  })

  useEffect(() => {

      setCurrentDate(moment(selectedDate))

  }, [selectedDate])

  useEffect(() => {
    if(!moment(currentDate).isSame(actualDate, 'month')) {
      setInView(true);
    } else {
      setInView(false);
    }
  }, [currentDate])

  return (
    <div className="App">
      <div className = 'header'></div>
      <div className = 'main'>
        <Slider modals={modals} selectedDate={selectedDate} modalDate={modalDate} currentDate={currentDate} setSelectedDate={setSelectedDate} nextModal={nextModal} prevModal={prevModal}/>
      </div>
      <div className = 'footer'>

        <div className = 'left'>
          <div className = 'left-top'>
            <div className = 'left-day-num'>{moment(selectedDate).format('DD')}</div>
            <div className = 'left-day'>{moment(selectedDate).format('dddd')}</div>
          </div>
          <div className = 'left-bottom'>
            <div className = 'bar-left'></div>
            <div className = 'left-bottom-title'>Current Events</div>
            <div className = 'bar-right'></div>
            <Upcoming events={events}/>
          </div>
        </div>
        
        <div className = 'calendar'>
            <div className = 'year'>2020</div>
            <Months currentDate={currentDate} setMonth={setMonth}/>
            <span className = 'divider'></span>
            <DaysOfWeek currentDate={currentDate}/>
            <Calendar initialModal={initialModal} events={events} actualDate={actualDate} currentDate={currentDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} modalAppear={modalAppear} setModalDate={setModalDate}/>
        </div>
        
      </div>
    </div>
  );
}

export default App;
