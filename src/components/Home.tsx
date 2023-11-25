import React from 'react'

import '../style/Home.css'

import imageOne from '../resources/image/WeiLing_Birthday_150923.jpg'
import imageTwo from '../resources/image/0230916_madefood.jpg'
import imageThree from '../resources/image/20230922_dinner.jpg'
import imageFour from '../resources/image/20231007_CWS_dinner.jpg'
import imageFive from '../resources/image/20231008_nox.jpg'
import imageSix from '../resources/image/20231010_PHcake.jpg'
import imageSeven from '../resources/image/15102023_coffee.jpeg'
import imageEight from '../resources/image/20231023_cookies.jpg'
import image9 from '../resources/image/20231029_hotspring.jpg'
import image10 from '../resources/image/20231027_cycling.jpg'
import image11 from '../resources/image/20231022_TWG.jpg'
import image12 from '../resources/image/20231105_adcwitholivia.jpg'
import image13 from '../resources/image/20231118_sweetpotato.jpg'
import image14 from '../resources/image/25112023_Sakepairing.jpg'


function Home(){
  const contentList: any[]= [
    {
      header: 'Sake pairing at ABC cooking studio',
      date: '25 November 2023',
      body: 'Sake good, food good, good good',
      image: image14
    },
    {
      header: 'Strange place, even stranger food',
      date: '20 November 2023',
      body: 'Went to pick up Standard Chartered Ironman volunteer uniform at a place where birds dont lay egg. Had authentic chinese lunch at an authentic chinese eatery, hopefully dearest is not too traumatised by the food cleanlinest, taste good tho. Had some strange tasting papaya milkshake and mocha, tasting like sweet potato milkshake and vietnamese coffee',
      image: image13
    },
    {
      header: 'ABC Cooking with Olivia',
      date: '05 November 2023',
      body: 'Dearest went baking with Olivia, cake was good, I wonder what Olivia thinks of me?',
      image: image12
    },
    {
      header: 'Sembawang Hotspring cycling adventure',
      date: '29 October 2023',
      body: 'Went cycling to Sembawang Hotspring Park, as it was the first for dearest, brought along 2 eggs, and dearest learned the dark truth about Yishun that day.',
      image: image9
    },
    {
      header: 'Second cycling trip with the StanChart Gang',
      date: '27 October 2023',
      body: 'On this second cycling trip, we cycled close to 30Km from MBFC to Changi Village. My butt was sore for days. I ate some sweat.',
      image: image10
    },
    {
      header: 'We baked cookies!',
      date: '23 October 2023',
      body: 'We made some doughy tasting chocolate chip cookies, but it smelled good though while it was in the oven. More eggs and butter next time!',
      image: imageEight
    },
    {
      header: 'Takashimaya Baking and TWG',
      date: '23 October 2023',
      body: 'Dearest made me some strange tiramisu, but since its my name, I enjoyed it. Had some golden TWG takeaway cups that were deemed un-reusable. Welp!',
      image: image11
    },
    {
      header: 'Hand pour coffee workshop',
      date: '14 October 2023',
      body: 'Coffee good, but same same.',
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
      body: 'Dearest brought us to have dinner at Nox, where we dined in the dark, and were served by waiters who are visually impared. The waiter with the nice voice talked dearest to a deep slumber with his deep soothing voice. I need to step up my game in the future to plan a fun dinner as well!!!',
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
      body: 'Went Cycling with the StanChart Gang, had nice dinner together afterwards, let this be a start to a long and fruitful cycling journey',
      image: imageThree
    },
    {
      header: 'Food',
      date: '16 September 2023',
      body: 'Dearest made Japanese-chinese fusion food for me, taste good! As well as a mochi pork floss bun with them UwU OwO.',
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
    if(sessionStorage.getItem('name') != null){
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

    else{
      return(
        <>
        <h1>Please Login to view blog</h1>
        </>
      )
    }
  }


return(
    <div>
      {content()}

    </div>
)
}

export default Home