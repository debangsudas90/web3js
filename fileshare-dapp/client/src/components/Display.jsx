import React from 'react'
import "./Display.css"

const Display = () => {
  return (
    <>
      <div className="image-list">Data</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={() => {}}>
        Get Data
      </button>
    </>
  )
}

export default Display