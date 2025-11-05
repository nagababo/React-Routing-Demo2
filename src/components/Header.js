import React from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../features/auth/AuthContext"

function Header({ toogleSidebar }) {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
    navigate("/login")

  }
  return (
    <div className='header'>
      <div className='header-left'>
        <button
          onClick={toogleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        My App
      </div>
      <div>
        <input
          type="search"
          placeholder="Search pages, users..."
          aria-label="Search"
        />
      </div>
      <div className='header-right'>
        <button
          onClick={() => { }}
          title="Profile"
        >
          👤
        </button>

        <button
          onClick={handleLogout}
          title="Logout"
        >
          ⎋
        </button>
      </div>
    </div>
  )
}

export default Header