import React from 'react'
import Search from '../../components/Search/Search'
import NavBar from '../../components/NavBar/NavBar'


const Admin = () => {
  return (
    <div className='main_container'>
      <NavBar/>
      <div className="div">
      <h3>Hello Admin!</h3>
      </div>
      <Search/>
    </div>
  )
}

export default Admin
