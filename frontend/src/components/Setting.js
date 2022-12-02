import React from 'react'
import'./Setting.css'
import {useRef, useEffect} from 'react';
const Spacer = require('react-spacer')



const Setting = ({handleSetting, style}) => {
    console.log(handleSetting)
    //prevent user from entering special characters
    useEffect(() => {
        var NumBoxes= document.querySelectorAll(".setting-numbox");
            var invalidChars = ["+","-","e"];
            for (const NumBox of NumBoxes) {
                 NumBox.addEventListener("input", function(){
                this.value = this.value.replace(/[e\+\-]/gi, "")
            });
            NumBox.addEventListener("keydown", function(e) {
                if (invalidChars.includes(e.key)) {
                    e.preventDefault()
                }
            });
            }
           
    },[])
    
    
    // const NumBox2 = useRef(null);
    // const NumBox1 = useRef(null);
    // useEffect(() => {
    //     var invalidChars = ["+","-","e"];
    //     NumBox1.current.focus

        
    //     console.log(NumBox2.current)
    //     console.log(NumBox1.current)


    // },[])
    
    

  return (
    <div id="setting-outer" style={style}>
        <div className='setting-container'>
            <div className="setting-header">
                <h1 className='setting-title'>Setting</h1> 
                <svg className='bi bi-x setting-close-icon' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" onClick={() => handleSetting()}>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            <ul>
                <li className='setting-li'>
                    <span className='setting-item-name'>
                    Dark mode
                    </span>
                    <label className='switch'>
                    <input type="checkbox"/>
                    <span className="slider round"></span>
                    </label>
                </li>

                <li className='setting-li'>
                    <span className='setting-item-name' style={{transform: "translateY(5px)"}} >
                        Focus length
                    </span>
                    <input type="number" min="0" className="setting-numbox"/>
                </li>

                <li className='setting-li'>
                    <span className='setting-item-name' style={{transform: "translateY(5px)"}} >
                        Break length
                    </span>
                    <input type="number" min="0" className="setting-numbox"/>
                </li>

                <li className='setting-li'>
                    <span className='setting-item-name'>
                        Sound
                    </span>
                    <label className='switch'>
                    <input type="checkbox"/>
                    <span className="slider round"></span>
                    </label>
                </li>

                <li className='setting-li'>
                    <span className='setting-item-name'>
                        Notifications
                    </span>
                    <label className='switch'>
                    <input type="checkbox"/>
                    <span className="slider round"></span>
                    </label>
                </li>
            </ul>
            <div className='form-head'>
                <button className='setting-button' onClick={() => handleSetting()}>
                    Save
                </button>
            </div>
        </div>
    </div>  
  )
}

export default Setting