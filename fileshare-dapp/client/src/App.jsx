import { useState, useEffect} from 'react'
import {ethers} from "ethers";
import abi from "./artifacts/contracts/Upload.sol/Upload.json"
import './App.css'
import FileUpload from './components/FileUpload';
import Display from './components/Display';

function App() {
  const [state, setState] = useState({
    provider: null,
    contract: null
  })

  const [account, setAccount] = useState("")
  const [modalOpen, setModalOpen] = useState(null)

  useEffect(() => {
    
    const wallet = async() => {

      const provider = new ethers.providers.Web3Provider(window.ethereum)

      if(provider) {

        const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
        const contractABI = abi.abi

        await provider.send(
          "eth_requestAccounts", []
        )

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
        <Display contract={state.contract} account={state.account} />
    </>
  )
}

export default App
