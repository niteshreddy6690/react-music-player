import React, {useState} from 'react';
import './App.css';
import Musicplayer from "./Components/Musicplayer";

function App() {
    const [active,setActive]=useState(true)
    const  handelActive=()=>{
        setActive(!active)
    }
  return (
    <div className="App">
        <Musicplayer/>
    </div>
  );
}

export default App;
