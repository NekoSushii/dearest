import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './Home.css'
import Calendar from './Calendar'

function Home() {


    const LoginCheck = () => {
        return (<p>lol</p>)
    }


    return(
        <Router>
            <div className='navbar'>
                <li className='navitem_float_left'>
                    <Link to={'/'} className='navlink'>Home</Link>
                </li>
                <li className='navitem_float_left'>
                    <Link to={'calendar'} className='navlink'>Calendar</Link>
                </li>
                {LoginCheck()}
            </div>

            <div className='body'>
                    
            </div>

            <div className='footer'>

            </div>
            <Route path='/' element={<Home/>}/>
            <Route path='/calendar' element={<Calendar/>}/>
        </Router>
    )
}

export default Home