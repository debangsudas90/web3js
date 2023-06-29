import React, { useState } from 'react'
import axios from "axios"
import "./FileUpload.css"

const FileUpload = ({contract,account}) => {

  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState(null)

  //upload image to ipfs
  //retrive file

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(file) {
      try {
        
        const formData = new FormData()
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileTOIPFS", 
          data: formData,
          headers: {
            pinata_api_key: "1bc36c6f70792f1ffbb4",
            pinata_secret_api_key: "6daad68b15eeaa4f81892a2b02b3e391a40e007f81bfabe7c1a752e47bdab090",
            "Content-Type": "multipart/form-data"
          }
        })

        const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`
        contract.add(account, imgHash)
        setFileName(null)
        setFile(null)
        alert("Image successfully uploaded")

      } catch (error) {
        alert(error)
      }
    }
  }

  const handleFileUpload = (e) => {
    e.preventDefault();
    const data = e.target.files[0];
    setFile(data)

    if(data) {
      setFileName(e.target.files[0].name);
    }

  }

  return (
    <div className='top'>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input 
          disabled = {!account}
          type="file" 
          name="data" 
          id="file-upload" 
          onChange={handleFileUpload}/>
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className='upload' disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  )
}

export default FileUpload