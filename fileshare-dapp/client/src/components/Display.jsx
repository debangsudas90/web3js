import React, { useState } from 'react'
import "./Display.css"

const Display = ({contract, account}) => {

  const [data, setData] = useState("")

  const getData = async() => {

    let dataArray
    const otherAddress = document.querySelector(".address").value

    try {

      if(otherAddress) {
        dataArray = await contract.display(otherAddress)
      } else {
        dataArray = await contract.display(account)
      }
    } catch (error) {
      alert(error)
    }

    const isEmpty = Object.keys(dataArray).length == 0

    if(!isEmpty) {
      const images = dataArray.map((image, i) => {
        return  (
          <a href={image} key={`a-${i}`}>
            <img 
              key={`i-${i}}`}
              src={image}
              className='image-list'
              alt="new"
            />
          </a>
        )
      })
      setData(images)
    } else {
      alert("No files found!!")
    }
    
  }

  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  )
}

export default Display