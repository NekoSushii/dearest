import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Home from './components/Home';
import Calendar from './components/Calendar';
import NavigationBar from './NavigationBar';
import './style/App.css'

function App(){


    return (
        <div>
        <Router>
            <NavigationBar/>
            <DndProvider backend={HTML5Backend}>
                <div className='maincon'>
                    <Routes>
                        <Route path='/dearest' element={<Home/>}/>
                        <Route path='/calendar' element={<Calendar/>}/>
                    </Routes>
                </div>
            </DndProvider>
        </Router>
        </div>
      );
}

export default App;