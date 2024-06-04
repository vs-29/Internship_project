import React from 'react'
import Search from '../../components/Search/Search'
import NavBar from '../../components/NavBar/NavBar'


const Admin = () => {
  return (
    <div className='main_container'>
      <NavBar/>
      <div className="Search_container">
      <h2>Hello Admin</h2>
      <Search/>
      </div>
    </div>
  )
}

export default Admin
