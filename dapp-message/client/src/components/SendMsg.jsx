import { ethers } from 'ethers'
import React from 'react'

const SendMsg = ({state}) => {

  const sendMsg = async(e) => {
    e.preventDefault()
    const {contract} = state
    const name = document.querySelector("#name").value
    const message = document.querySelector("#message").value
    const amount = {value: ethers.utils.parseEther("0.000001")}
    const transaction = await contract.sendMsg(name, message, amount)
    await transaction.wait()
    console.log("Transaction is successful")
    alert("Transaction is successful")
    window.location.reload()
  }

  return (
    <div>
      <form onSubmit={sendMsg}>
        <div style={{marginBottom: "10px"}}>
        <label for="name" style={{marginRight: "22px"}}>Name : </label>
        <input type="text" id="name" required/><br></br>
        </div>
        <div style={{marginBottom: "10px"}}>
        <label for="message" style={{marginRight: "3px"}}>Message : </label>
        <input type="text" id="message" required/><br></br>
        </div>
        <button>Send</button>
      </form>
    </div>
  )
}

export default SendMsg