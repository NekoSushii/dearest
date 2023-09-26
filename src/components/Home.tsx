import React from 'react'

import '../style/Home.css'

function Home(){

  function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
    
  window.addEventListener("scroll", reveal);

return(
    <div>

      <div className='blog_container'>
        <div className='bodytext-left'>
          <header className='title_header'>First Cycling Trip With StanChart Gang</header>
          <h2>22 September 2023</h2>
          <p>When Cycling with the StanChart Gang, had nice dinner together afterwords, thanks for the food dear!
          </p>
        </div>
        <div className='imgcontainer-picture'>
          <div className='animate__zoomInRight'>
            <img src='flower.jpg' className='mainpageimg-right' alt=''/>
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
            <img src='./flower.jpg' className='mainpageimg-left' alt=''/>
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
            <img src='./flower.jpg' className='mainpageimg-right' alt=''/>
          </div>
        </div>
      </div>

    </div>
)
}

export default Home