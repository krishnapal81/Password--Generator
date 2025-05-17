import { useState,useCallback,useEffect } from 'react'
import { motion } from 'framer-motion';

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




  const getStrength = (len, nums, chars) => {
    if (len < 8) return 'Weak';
    if (len < 12 && (nums || chars)) return 'Medium';
    if (len >= 12 && nums && chars) return 'Strong';
    return 'Fair';
  };
  
  const strength = getStrength(length, numberallowed, specialcharallowed);
  const strengthColor = {
    Weak: 'text-red-500',
    Fair: 'text-yellow-400',
    Medium: 'text-orange-400',
    Strong: 'text-green-400',
  };






  return (
    <>
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 font-[Poppins]">
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-lg bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 text-white"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-cyan-300 drop-shadow-lg">
        ⚡ Ultra Password Generator
      </h1>

      <motion.div whileHover={{ scale: 1.02 }} className="flex mb-6 rounded-lg overflow-hidden shadow-inner transition-all duration-300">
        <input
          type="text"
          value={password}
          className="w-full py-3 px-4 text-black rounded-l-lg outline-none bg-white/80 placeholder-gray-600 font-medium"
          placeholder="Generated Password"
          readOnly
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all px-5 py-3 text-white font-semibold rounded-r-lg shadow-lg"
          onClick={copyToClipboard}
        >
          Copy
        </motion.button>
      </motion.div>

      <div className="mb-6 text-right">
        <span className={`text-sm font-bold ${strengthColor[strength]} transition-all`}>
          Strength: {strength}
        </span>
      </div>

      <div className="space-y-6 text-sm">
        <div className="flex items-center justify-between">
          <label htmlFor="range" className="text-cyan-300 font-medium">Length: <span className="text-white font-bold">{length}</span></label>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            id="range"
            className="w-2/3 accent-cyan-500 cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="numberInput" className="text-cyan-300 font-medium">Include Numbers</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={numberallowed}
              className="sr-only peer"
              onChange={() => setNumberallowed(prev => !prev)}
            />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="characterInput" className="text-cyan-300 font-medium">Include Special Characters</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={specialcharallowed}
              className="sr-only peer"
              onChange={() => setSpecialcharallowed(prev => !prev)}
            />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>
      </div>
    </motion.div>
  </div>
    </>
  )
  
}

export default App
