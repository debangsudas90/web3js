import React, { useEffect, useState } from 'react'
import "./Modal.css"

const Revoke = ({setModalOpenOne, contract}) => {

  const [shareList, setShareList] = useState([[]])

  const revokeAccess = async(id) => {
    // const address = document.querySelector(".address").value
    const liText = document.getElementById(`item${id}`).textContent.trim();
    console.log(liText)
    await contract.disallow(liText)

  }

  useEffect(() => {
    
    const accessList = async() => {
      const addressList = await contract.shareAccess()
      const filteredArray = await addressList.filter(element => {
        if(element.access) return element
      });

      setShareList(filteredArray)

    }

    contract && accessList()
    
  }, [contract])

  //set list according to true and false
  //same in modal options
  

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Remove Access</div>
          <div className="body">
          </div>
          <ul className='list-access'>
            {shareList.map((item, index) => (
              <li key={index} id={"item"+index}>{item} 
              <button className='trash-icon' onClick={() => revokeAccess(index)}>
                <svg
                  style={{ color: 'red', verticalAlign: 'middle' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                  fill="red"
                />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  fill="red"
                />
                </svg>
              </button>
            </li>
            ))}
          </ul>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpenOne(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Revoke