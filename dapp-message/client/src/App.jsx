import { useState, useEffect } from 'react'
import abi from "./contractJson/chat.json"
import {ethers} from "ethers"
import SendMsg from './components/SendMsg'
import Memos from './components/Memos'
import logo from './dappimg.webp';
import './App.css'

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  const[account, setAccount] = useState('Not Connected')

  useEffect(() => {
    const template = async() => {
      const contractAddress = "0x2a2DE5933DB55187Ca5E2Ec0400622FBf5FbEc0f";
      const contractABI = abi.abi;

      //Metamask to connect to the blockchain(different n/w) using infura api

      try {
        const {ethereum} = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload()
        })
        setAccount(account)
  
        const provider = new ethers.providers.Web3Provider(ethereum) //read blockchain
        const signer = provider.getSigner() //change state of blockchain(write)
  
        const contract = new ethers.Contract(
          contractAddress, //place where smart contract is deployed
          contractABI,     //help 3rd party app to talk to smart contract
          signer           //transactions on contract
        )

        console.log(contract)
        setState({provider, signer, contract})
  
      } catch (error) {
        console.log(error)
        console.log(ethers.version)
      }
      
    }
    template();

  }, [])
  

  return (
    <>
      <img src={logo} className="img-fluid" alt=".." width="100%" height="320px" />
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>
      <SendMsg state={state}/>
      <Memos state={state}/>
    </>
  )
}

export default App
