import React from 'react'
import'./Setting.css'
import {useRef, useEffect} from 'react';
const Spacer = require('react-spacer')



const Setting = ({handleSetting}) => {
console.log(handleSetting)
    //prevent user from entering special characters
    useEffect(() => {
        var NumBoxes= document.querySelectorAll(".NumBox");
            
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
    <div className='container-setting'>
        <div>
                <h1 className='h1-setting'>Setting</h1>
                <Spacer height="15px"/> 
            </div>
            <div>
                <ul>
                    <li className='li-setting'>
                        <span className='item-name'>
                        Dark mode
                        </span>
                        <Spacer grow='1' />
                        <label className='switch'>
                           <input type="checkbox"/>
                           <span className="slider round"></span>
                        </label>
                    </li>

                    <li className='li-setting'>
                        <span className='item-name'>
                        Focus length
                        </span>
                        <Spacer grow='1' />
                        <input type="number" min="0" className="NumBox"/>
                    </li>

                    <li className='li-setting'>
                        <span className='item-name'>
                        Break length
                        </span>
                        <Spacer grow='1' />
                        <input type="number" min="0" className="NumBox"/>
                    </li>

                    <li className='li-setting'>
                        <span className='item-name'>
                        Sound
                        </span>
                        <Spacer grow='1' />
                        <label className='switch'>
                           <input type="checkbox"/>
                           <span className="slider round"></span>
                        </label>
                    </li>

                    <li className='li-setting'>
                        <span className='item-name'>
                        Notifications
                        </span>
                        <Spacer grow='1' />
                        <label className='switch'>
                           <input type="checkbox"/>
                           <span className="slider round"></span>
                        </label>
                    </li>
                    
                </ul>
                <div className='form-head'>
                    <button onClick={() => handleSetting()}>
                        Save
                    </button>
                </div>
            </div>
        </div>
        
  )
}

export default Setting