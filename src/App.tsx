import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Home from './components/Home';
import Calendar from './components/Calendar';
import Login from './components/Login'
import './style/App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App(){

    function NavigationBar() {
        const CheckLogin = () => {
            if(sessionStorage.getItem('name') != null){
              return(
                <div>
                    <li className='navitem_float_left'>
                    <Link to={'/calendar'} className='navlink'>Calendar</Link>
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
                  <Link  to={'/login'} className='navlink'>Login</Link>
                </li>
              )
            }
          }
        
        
          const logout =()=>{
            sessionStorage.clear()
            window.location.reload()
            toast.success('Logged out')
          }


        return (
          <div className='navbar'>
            <li className='navitem_float_left'>
                <Link to={'/dearest'} className='navlink'>Home</Link>
            </li>
            {CheckLogin()}
          </div> 
        );
    }


    return (
        <div className='bg'>
            <Router>
                {NavigationBar()}
                <DndProvider backend={HTML5Backend}>
                    <div className='maincon'>
                        <Routes>
                            <Route path='/dearest' element={<Home/>}/>
                            <Route path='/calendar' element={<Calendar/>}/>
                            <Route path='/login' element={<Login/>}/>
                        </Routes>
                    </div>
                </DndProvider>
            </Router>
            <ToastContainer position='top-right' autoClose={1500} hideProgressBar={true} pauseOnFocusLoss pauseOnHover/>
        </div>
      );
}

export default App;