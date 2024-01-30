
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const[length,setLength]=useState(8);
  const[NumberAllowed,setNumberAllowed]=useState(false);
  const[charAllowed,setCharAllowed]=useState(false);
  const[password,setpassword]=useState("");
  
  const passwordRef=useRef(null);
  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  },[password])


  
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(NumberAllowed) str +="0123456789"
    if(charAllowed) str +="!@#$%^&*-_=+{~`}[]'`"
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)
  }, [length,NumberAllowed,charAllowed,setpassword])

  useEffect(() => {
    passwordGenerator()
  },[length,NumberAllowed,charAllowed,passwordGenerator])


  return (
    <>
    <h1 className='text-4xl font-bold  text-blue-400 text-center'>Password Generator</h1>
    <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-600 bg-gray-700'>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef} />
        <button onClick={copyPasswordToClipBoard} className='btn outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length: {length}</label>

        </div>
        <div className=' ms-2 flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={NumberAllowed} id='numberInput' onChange={()=>{
            setNumberAllowed((prev) => !prev)
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='ms-2 flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} id="characterInput" onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }} />
          <label htmlFor="">Characters</label>
          <button className='px-2 py-1 bg-blue-400 text-white ms-5' onClick={passwordGenerator}>Retry</button>

        </div>
      </div>
    </div>
    </>
    
   
  );
}

export default App;
