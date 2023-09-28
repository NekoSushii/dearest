import React from 'react'

import '../style/Home.css'

import imageOne from '../resources/image/WeiLing_Birthday_150923.jpg'
import imageTwo from '../resources/image/0230916_madefood.jpg'
import imageThree from '../resources/image/20230922_dinner.jpg'

function Home(){
  const contentList: any[]= [
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
      var elementVisible = 10;
  
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
{/* 
      <div className='blog_container'>
        <div className='bodytext-left'>
          <header className='title_header'>First Cycling Trip With StanChart Gang</header>
          <h2>22 September 2023</h2>
          <p>When Cycling with the StanChart Gang, had nice dinner together afterwords, thanks for the food dear!
          </p>
        </div>
        <div className='imgcontainer-picture'>
          <div className='animate__zoomInRight'>
            <img src={imageThree} className='mainpageimg-right' alt=''/>
          </div>
        </div>
      </div>

      <div className='container reveal'>
        <div className='blog_container'>
          <div className='bodytext-right'>
            <header className='title_header'>Food</header>
            <h2>16 September 2023</h2>
            <p>Dearest made food for me, taste good!</p>
          </div>
          <div className='imgcontainer-picture'>
            <img src={imageTwo} className='mainpageimg-left' alt=''/>
          </div>
        </div>
      </div>

      <div className='container reveal'>
        <div className='blog_container'>
          <div className='bodytext-left'>
            <header className='title_header'>Dearest Birthday</header>
            <h2>15 September 2023</h2>
            <p>Happy Birthday Dear!</p>
          </div>
          <div className='imgcontainer-picture'>
            <img src={imageOne} className='mainpageimg-right' alt=''/>
          </div>
        </div>
      </div> */}

    </div>
)
}

export default Home