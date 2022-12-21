import React, { useState } from 'react'
import'./SettingTimer.css'
import { useRef, useEffect } from 'react';
const Spacer = require('react-spacer');

const formatTime = (num) => {
    if (num<10) return '0'+num;
    return num;
}

const SettingTimer = () => {
    const [focusLength, setFocusLength] = useState(1);
    const [breakLength, setBreakLength] = useState(1);
    const [noti, setNoti] = useState(false);
    const [temp, setTemp] = useState(noti);
    var Min = Math.trunc(focusLength / 60);
    var Sec = focusLength % 60;
    const [TimerMin, setTimerMin] = useState(Min);
    const [TimerSec, setTimerSec] = useState(Sec);
    const [Action, setAction] = useState("Start");
    const Interval = useRef(0);

    useEffect(() => {
        setTimerMin(Min);
        setTimerSec(Sec);
    }, [focusLength])

    // NOTE: THE TIMER ONLY RUN IF INTERVAL EQUALS ZERO

    const startAndStopTimer = () => {
        if (Interval.current == 0) {
            setAction("Stop");
            // Start a Timer
            Interval.current = setInterval(() => {
                // If time runs out
                if (Min == 0 && Sec == 0) {
                    clearInterval(Interval.current);
                    // Set interval to 1 to prevent pressing button while time runs out
                    Interval.current = 1;
                    console.log("Stop");
                    setAction("Start");
                }
                // If time doesn't run out but second equals to zero
                else if (Sec == 0) {
                    Sec = 59;
                    Min--; 
                }
                // Go normally by reducing second by one
                else Sec--;
                // Update value for re-render
                setTimerMin(Min);
                setTimerSec(Sec);
            }, 1000);
        }
        else {
            // If time doesn't run out, allow restart the timer
            if (Min != 0 && Sec != 0) {
                setAction("Start");
                console.log(Min);
                console.log(Sec);
                console.log("Stop");
                clearInterval(Interval.current);
                Interval.current = 0;
            }
        }
    }

    //Setting condition
    const style = {
        visibility: "hidden",
        opacity: "0",
        transition: "all .1s ease-in-out",
        overflow: "hidden",
    }

    // Handle close and open toggle Setting menu
    const handleCloseAndOpen = () => {
        const opacity = document.getElementById("setting-outer").style.opacity;
        if (opacity === "1"){
            document.getElementById("setting-outer").style.visibility = "hidden";
            document.getElementById("setting-outer").style.opacity = "0";
        }
        else {
            document.getElementById("setting-outer").style.visibility = "visible";
            document.getElementById("setting-outer").style.opacity = "1";
        }
    }

    // prevent user from entering special characters
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

    useEffect(() => {
        console.log(focusLength);
        console.log(breakLength);
        console.log(noti);
    }, [focusLength, breakLength, noti])

    // Handle save properties in Setting
    const handleSave = () => {
        setFocusLength(document.getElementById('setting-focus-length').value);
        setBreakLength(document.getElementById('setting-break-length').value);
        if (noti !== temp) setNoti(temp);
        handleCloseAndOpen();
    }

    const handleCancel = () => {
        handleCloseAndOpen();
        document.getElementById('setting-focus-length').value = focusLength;
        document.getElementById('setting-break-length').value = breakLength;
        document.getElementById('setting-noti').checked = noti;
    }
    
    
    // const NumBox2 = useRef(null);
    // const NumBox1 = useRef(null);
    // useEffect(() => {
    //     var invalidChars = ["+","-","e"];
    //     NumBox1.current.focus

        
    //     console.log(NumBox2.current)
    //     console.log(NumBox1.current)


    // },[])
    
    
useEffect(()=>{


        // setFocusLength(60)
        // console.log(focusLength)
    
})
  
        
    

  return (
    <div>
        <div className=''>
            <div id="timer-time">{formatTime(TimerMin)}:{formatTime(TimerSec)}</div>
            <input id="timer-btn" type="button" value={Action} style={{display: "block"}} onClick={startAndStopTimer}/>
        </div>
        <button className='setting-button' onClick={() => handleCloseAndOpen()}>
            Setting
        </button>
        <div id="setting-outer" style={style}>
            <div className='setting-container'>
                <div className="setting-header">
                    <h1 className='setting-title'>Setting</h1> 
                    <svg className='bi bi-x setting-close-icon' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" onClick={() => handleCancel()}>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
                <ul>
                    <li className='setting-li'>
                        <span className='setting-item-name'  style={{transform: "translateY(5px)"}} >
                            Focus length
                        </span>
                        <hstack>
                            <input id='setting-focus-length' placeholder="Minutes" type="number" maxLength='4'  min="1" max="60" className="setting-numbox" defaultValue={focusLength} />

                            <input id='setting-focus-length-seconds' placeholder="Seconds" type="number" min="0" max="60" className="setting-numbox" defaultValue={focusLength}/>
                        </hstack>
                        
                    </li>

                    <li className='setting-li'>
                        <span className='setting-item-name' style={{transform: "translateY(5px)"}} >
                            Break length
                        </span>
                        <hstack>
                            <input id='setting-break-length' placeholder="Minutes" type="number" step="1"  min="1" className="setting-numbox" />
                            <input id='setting-break-length' placeholder="Seconds" type="number" step="1"  min="1" className="setting-numbox" defaultValue={breakLength}/>
                        </hstack>
                        
                    </li>

                    <li className='setting-li'>
                        <span className='setting-item-name'>
                            Notifications Sound
                        </span>
                        <label className='setting-switch'>
                        <input id='setting-noti' className='setting-checkbox' type="checkbox" defaultChecked={noti}/>
                        <span className="setting-slider setting-round" onClick={() => {setTemp(!temp)}}></span>
                        </label>
                    </li>
                </ul>

                
                <div className='form-head'>
                    <button className='setting-button' onClick={() => handleSave()}>
                        Save
                    </button>
                </div>
            </div>
        </div>  
    </div>
  )
}

export default SettingTimer