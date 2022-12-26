/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import'./SettingTimer.css'
import { useRef, useEffect } from 'react';

const formatTime = (num) => {
    if (num<10) return '0'+num;
    return num;
}

const SettingTimer = () => {
    const [focusLengthMin, setFocusLengthMin] = useState(0);
    const [focusLengthSec, setFocusLengthSec] = useState(0);
    const [breakLengthMin, setBreakLengthMin] = useState(0);
    const [breakLengthSec, setBreakLengthSec] = useState(0);
    const [isFocused, setIsFocused] = useState(true);
    const [noti, setNoti] = useState(false);
    const [temp, setTemp] = useState(noti);
    var Min = (isFocused ? focusLengthMin : breakLengthMin);
    var Sec = (isFocused ? focusLengthSec : breakLengthSec);
    const [TimerMin, setTimerMin] = useState(Min);
    const [TimerSec, setTimerSec] = useState(Sec);
    const [Action, setAction] = useState("Start");
    const Interval = useRef(0);

    useEffect(() => {
        Min = (isFocused ? focusLengthMin : breakLengthMin);
        Sec = (isFocused ? focusLengthSec : breakLengthSec);
        setTimerMin(Min);
        setTimerSec(Sec);
    }, [focusLengthMin, focusLengthSec, breakLengthMin, breakLengthSec, isFocused]);

    // NOTE: THE TIMER ONLY RUN IF INTERVAL EQUALS ZERO

    const startAndStopTimer = () => {
        if (Interval.current == 0) {
            setAction("Stop");
            // Start a Timer
            Interval.current = setInterval(() => {
                // If time runs out
                if (Min == 0 && Sec == 0) {
                    clearInterval(Interval.current);
                    setIsFocused(!isFocused);
                    // Set interval to 1 to prevent pressing button while time runs out
                    Interval.current = 0;
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
        console.log(focusLengthMin);
        console.log(focusLengthSec);
        console.log(breakLengthMin);
        console.log(breakLengthSec);
        console.log(noti);
    }, [focusLengthMin, breakLengthMin, focusLengthSec, breakLengthSec, noti])

    // Handle save properties in Setting
    const handleSave = () => {
        setFocusLengthMin(document.getElementById('setting-focus-length-min').value);
        setFocusLengthSec(document.getElementById('setting-focus-length-sec').value);
        setBreakLengthMin(document.getElementById('setting-break-length-min').value);
        setBreakLengthSec(document.getElementById('setting-break-length-sec').value);
        if (noti !== temp) setNoti(temp);
        handleCloseAndOpen();
    }

    const handleCancel = () => {
        handleCloseAndOpen();
        document.getElementById('setting-focus-length-min').value = focusLengthMin;
        document.getElementById('setting-focus-length-sec').value = focusLengthSec;
        document.getElementById('setting-break-length-min').value = breakLengthMin;
        document.getElementById('setting-break-length-sec').value = breakLengthMin;
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
    
    



  return (
    <div>
        <div className='timer-base'>
            <svg className="timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="timer-circle">
                <circle className="timer-path_elapsed" cx="50" cy="50" r="45" />
                <path
                id='timer-path_left'
                strokeDasharray="283 283"
                className="timer-path_remaining "
                d='
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
                ' />
                </g>
            </svg>
            <div className='timer-label'>
                <div id="timer-time">{formatTime(TimerMin)}:{formatTime(TimerSec)}</div>
            </div>
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
                            <input id='setting-focus-length-min' placeholder="Minutes" type="number" maxLength='4'  min="1" max="60" className="setting-numbox" defaultValue={focusLengthMin} />
                            <input id='setting-focus-length-sec' placeholder="Seconds" type="number" min="0" max="60" className="setting-numbox" defaultValue={focusLengthSec}/>
                        </hstack>
                        
                    </li>

                    <li className='setting-li'>
                        <span className='setting-item-name' style={{transform: "translateY(5px)"}} >
                            Break length
                        </span>
                        <hstack>
                            <input id='setting-break-length-min' placeholder="Minutes" type="number" step="1"  min="1" className="setting-numbox" defaultValue={breakLengthMin}/>
                            <input id='setting-break-length-sec' placeholder="Seconds" type="number" step="1"  min="1" className="setting-numbox" defaultValue={breakLengthSec}/>
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