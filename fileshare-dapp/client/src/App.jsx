import { useState, useEffect} from 'react'
import {ethers} from "ethers";
import abi from "./artifacts/contracts/Upload.sol/Upload.json"
import './App.css'
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';
import Revoke from './components/Revoke';

function App() {
  const [state, setState] = useState({
    provider: null,
    contract: null
  })

  const [account, setAccount] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpenOne, setModalOpenOne] = useState(false)

  useEffect(() => {
    
    const wallet = async() => {

      const provider = new ethers.providers.Web3Provider(window.ethereum)

      if(provider) {

        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const contractABI = abi.abi

        await provider.send(
          "eth_requestAccounts", []
        )

        window.ethereum.on("chainChanged", () => {
          window.location.reload()
        })

        window.ethereum.on("accountsChanged", () => {
          window.location.reload()
        })
        
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        console.log(address)
        setAccount(address)

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        console.log(contract)

        setState({
          provider: signer, 
          contract
        })

      } else {
        alert("Metamask not found")
      }

    }

    wallet()

  }, [])
  

  return (
    <>
      {!modalOpen && (
        <button id="top-button" className='share' onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={state.contract}></Modal>
      )}
      {!modalOpenOne && (
        <button id="top-button" className='share' onClick={() => setModalOpenOne(true)}>
          Revoke
        </button>
      )}
      {modalOpenOne && (
        <Revoke setModalOpenOne={setModalOpenOne} contract={state.contract}></Revoke>
      )}

      <div>
      <h1 style={{ color: "white" }}>Drive DApp</h1>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>

      <p style={{ color: "white" }}>
        Account : {account ? account : "Not connected"}
      </p>
      <FileUpload
        account={account}
        provider={state.provider}
        contract={state.contract}
      />
      <Display contract={state.contract} account={account} />
      </div>
    </>
  )
}

export default App
