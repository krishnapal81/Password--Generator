import { useState,useCallback,useEffect } from 'react'
import './index.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberallowed,setNumberallowed]=useState(false)
  const [specialcharallowed,setSpecialcharallowed]=useState(false)
  const [password,setPassword]=useState("")
  const [inputText,setInputText]=useState("")

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  
    if(numberallowed){
      str=str+"0123456789"
    }
    if(specialcharallowed){
      str=str+"~!@#$%^&*_+="
    }
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1) 
      pass+=str.charAt(char)
    }
    setPassword(pass)

  },[length,numberallowed,specialcharallowed])

  useEffect(()=>{
    passwordGenerator()

  },[length,numberallowed,specialcharallowed])

  const handleInputChanges=(e)=>{
    setInputText(e.target.value)

  }

  const copyToClipboard=()=>{
    navigator.clipboard.writeText(password).then(()=>{
      alert("Password Copied")
      
      console.log(navigator.clipboard.read)
    }).catch(()=>{
      alert("Not Copied!!!!!!")
    })
  }

  return (
    <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 text-center'>
   <h1 className='text-center text-white my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly onChange={handleInputChanges}/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberallowed} id='numberInput' onChange={()=>{setNumberallowed((prev)=>!prev)}} />
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={specialcharallowed} id='characterInput' onChange={()=>{setSpecialcharallowed((prev)=>!prev)}} />
          <label>Character</label>
        </div>
      </div>
   </div>
    </>
  )
  
}

export default App
