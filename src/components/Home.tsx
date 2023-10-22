import React from 'react'

import '../style/Home.css'

import imageOne from '../resources/image/WeiLing_Birthday_150923.jpg'
import imageTwo from '../resources/image/0230916_madefood.jpg'
import imageThree from '../resources/image/20230922_dinner.jpg'
import imageFour from '../resources/image/20231007_CWS_dinner.jpg'
import imageFive from '../resources/image/20231008_nox.jpg'
import imageSix from '../resources/image/20231010_PHcake.jpg'
import imageSeven from '../resources/image/15102023_coffee.jpeg'

function Home(){
  const contentList: any[]= [
    {
      header: 'Hand pour coffee workshop',
      date: '14 October 2023',
      body: 'Coffee good',
      image: imageSeven
    },
    {
      header: 'Birthday cake at home',
      date: '9 October 2023',
      body: 'Birthday cake at home with familiar faces as well as some new ones. Birthday cake courtesy of Dearest is delicious, better than BangawanSolo and Swensens. All this was preceded by a tiring walk in the hot sweltering sun in the far flung island of NTU, followed by a surprisingly nice dinner at Collins where being a alumni came to be useful. Time to go cycle more :) ',
      image: imageSix
    },
    {
      header: 'Birthday Dinner at Nox',
      date: '8 October 2023',
      body: 'Dearest brought me to have dinner at Nox, where we dined in the dark, and were served by waiters who are visually impared. The waiter with the nice voice talked dearest to a deep slumber with his deep soothing voice. I need to step up my game in the future to plan a fun dinner as well!!!',
      image: imageFive
    },
    {
      header: 'Dinner with newly weds, Chee Wei and Sarah',
      date: '7 October 2023',
      body: 'Had dinner with the newly weds at the last minute, met many interesting characters such as mermaid and Benny, hope dearest not too traumatised by the experience, and can join them for more dinners in the future',
      image: imageFour
    },
    {
      header: 'First Cycling Trip With StanChart Gang',
      date: '22 September 2023',
      body: 'When Cycling with the StanChart Gang, had nice dinner together afterwords, thanks for the food dear!',
      image: imageThree
    },
    {
      header: 'Food',
      date: '16 September 2023',
      body: 'Dearest made food for me, taste good!',
      image: imageTwo
    },
    {
      header: 'Dearest Birthday',
      date: '15 September 2023',
      body: 'Happy Birthday Dear!',
      image: imageOne
    }
  ]

  function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 0;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  window.addEventListener("scroll", reveal);


  function content() {
    return(
    <ul>
      {contentList.map((item, index) => (
        <div className={index <= 1 ? '' : 'reveal'}>
          <li className='blog_container'>

            <header className='title_header'>{item.header}</header>
            <h2>{item.date}</h2>

            <div className={index % 2 === 0 ? 'bodytext-left' : 'bodytext-right'}>
              <p>{item.body}</p>
            </div>

            <div className='imgcontainer-picture'>
              <img src={item.image} className={index % 2 === 0 ? 'mainpageimg-right' : 'mainpageimg-left'}/>
            </div>

          </li>
        </div>
        
      ))}
    </ul>
    )
    
  }


return(
    <div>
      {content()}

    </div>
)
}

export default Home