import './Home.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Calendar from './Calendar';

function Home() {
  
  return (
    <div className="App">
      <Router>
        <Calendar currentDate={new Date()}></Calendar>
      </Router>
    </div>
  );
}

export default Home;
