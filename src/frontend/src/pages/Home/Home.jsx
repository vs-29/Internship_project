import React from 'react'
import Search from '../../components/Search/Search'
import './Home.css'
import NavBar from '../../components/NavBar/NavBar'



function Home() {
  return (
    <div className='main_container' >
        <NavBar/>
        <div className="Search_container">
        <h3>YOUR TIME BUDDY</h3>
        <Search /> 
        </div>
    </div>
  )
}

export default Home
