import React, { useState } from 'react'
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