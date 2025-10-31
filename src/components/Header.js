import React from 'react'
import "./Header.css"

function Header({ toogleSidebar }) {
  return (
    <div className='header'>
      <div header_left>
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
          onClick={() => { }}
          title="Logout"
        >
          ⎋
        </button>
      </div>
    </div>
  )
}

export default Header