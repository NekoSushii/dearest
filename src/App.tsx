import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
// import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Home from './components/Home';
import Calendar from './components/Calendar';
import Login from './components/Login';
import Game from './components/Game';
import Wheel from './components/SpinningWheel'
import Timeline from './components/news/Timeline'
import News from './components/news/News'
import MapOverlay from './components/Weather/MapOverlay';
import './style/App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App(){

    function NavigationBar() {
        const CheckLogin = () => {
            if(sessionStorage.getItem('name') != null){
                // const customId = 'lol'
                
              return(
                <div>
                    <li className='navitem_float_left'>
                      <Link to={'/dearest/calendar'} className='navlink'>Calendar</Link>
                    </li>
                    {/* <li className='navitem_float_left'>
                      <Link to={'/dearest/game'} className='navlink'>Game</Link>
                    </li> */}
                    <li className='navitem_float_left'>
                        <Link to={'/dearest/weather'} className='navlink'>Weather</Link>
                    </li>
                    <li className='navitem_float_right'>Welcome {sessionStorage.getItem('name')}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a style={{cursor: "pointer"}} onClick={logout} className='navlink_a'>Logout</a>
                    </li>
                </div>
              )
            }
        
            else{
              return(
                <li className='navitem_float_right'>
                  <Link  to={'/dearest/login'} className='navlink'>Login</Link>
                </li>
              )
            }
          }
        
        
          const logout =()=>{
            sessionStorage.clear()
            window.location.href = '/dearest'
            sessionStorage.setItem('toast', 'out')
          }


        return (
          <div className='navbar'>
            <li className='navitem_float_left'>
                <Link to={'/dearest'} className='navlink'>Home</Link>
            </li>
            {/* <li className='navitem_float_left'>
                <Link to={'/dearest/news'} className='navlink'>News</Link>
            </li> */}
            {/* <li className='navitem_float_left'>
                <Link to={'/dearest/timeline'} className='navlink'>Timeline</Link>
            </li> */}
            {/* <li className='navitem_float_left'>
                <Link to={'/dearest/wheel'} className='navlink'>Wheel</Link>
            </li> */}
            {CheckLogin()}
          </div> 
        );
    }

    
    const toastNotification = () => {
        if(sessionStorage.getItem('toast') === 'true') {
            toast.success('Logged in as ' + sessionStorage.getItem('name'))
            sessionStorage.setItem('toast', 'false')
        }
        else if(sessionStorage.getItem('toast') === 'out'){
            sessionStorage.clear()
            toast.success('Successfully logged out')
        }
    }

    return (
        <div className='bg'>
            <Router>
                {NavigationBar()}
                {toastNotification()}
                {/* <DndProvider backend={HTML5Backend}> */}
                    <div className='maincon'>
                        <Routes>
                            <Route path='/dearest' element={<Home/>}/>
                            <Route path='/dearest/calendar' element={<Calendar/>}/>
                            <Route path='/dearest/login' element={<Login/>}/>
                            <Route path='/dearest/game' element={<Game/>}/>
                            <Route path='/dearest/wheel' element={<Wheel/>}/>
                            <Route path='/dearest/timeline' element={<Timeline/>}/>
                            <Route path='/dearest/news' element={<News/>}/>
                            <Route path='/dearest/weather' element={<MapOverlay/>} />
                        </Routes>
                    </div>
                {/* </DndProvider> */}
                <ToastContainer position='top-right' autoClose={1500} pauseOnFocusLoss pauseOnHover theme='colored'/>
            </Router>
            
        </div>
      );
}

export default App;