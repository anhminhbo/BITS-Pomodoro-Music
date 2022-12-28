/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import'./SettingTimer.css'
import { useRef, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';

const formatTime = (num) => {
    if (num<10) return '0'+num;
    return num;
}

const FULL_DASH_ARRAY = 283;

const SettingTimer = () => {
    const [focusLengthMin, setFocusLengthMin] = useState(0);
    const [breakLengthMin, setBreakLengthMin] = useState(0);
    const [isFocused, setIsFocused] = useState(true);
    const [noti, setNoti] = useState(false);
    const [temp, setTemp] = useState(noti);
    const Min = useRef(isFocused ? focusLengthMin : breakLengthMin);
    const Sec = useRef(0);
    const [TimerMin, setTimerMin] = useState(Min.current);
    const [TimerSec, setTimerSec] = useState(Sec.current);
    const [Action, setAction] = useState("Start");
    const Interval = useRef(0);
    const totalTime = useRef();

    useEffect(() => {
        Min.current = (isFocused ? focusLengthMin : breakLengthMin);
        Sec.current = 0;
        totalTime.current = Min.current * 60;
        document.getElementsByClassName("timer-path-remaining")[0].setAttribute("stroke-dasharray", "283 283");
        setTimerMin(Min.current);
        setTimerSec(Sec.current);
    }, [focusLengthMin, breakLengthMin, isFocused]);

    const setCircleDashArray = (timeFraction) => {
        const circleDashArray = `${(timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
        document.getElementsByClassName("timer-path-remaining")[0].setAttribute("stroke-dasharray", circleDashArray);
    }

    // NOTE: THE TIMER ONLY RUN IF INTERVAL EQUALS ZERO
    const startAndStopTimer = () => {
        if (Interval.current == 0) {
            setAction("Stop");
            // Start a Timer
            Interval.current = setInterval(() => {
                // If time runs out
                if (Min.current == 0 && Sec.current == 0) {
                    clearInterval(Interval.current);
                    // Set interval to 1 to prevent pressing button while time runs out
                    Interval.current = 0;
                    setIsFocused(!isFocused);
                    console.log("Stop");
                    setAction("Start");                     
                }
                // If time doesn't run out but second equals to zero
                else if (Sec.current == 0) {
                    Sec.current = 59;
                    Min.current--; 
                }
                // Go normally by reducing second by one
                else Sec.current--;
                // Update value for re-render
                let timeInSec = Min.current*60 + Sec.current;
                setCircleDashArray(timeInSec / totalTime.current);
                setTimerMin(Min.current);
                setTimerSec(Sec.current);
            }, 1000);
        }
        else {
            // If time doesn't run out, allow restart the timer
            if (Min.current != 0 || Sec.current != 0) {
                setAction("Start");
                console.log(Min.current);
                console.log(Sec.current);
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
        document.getElementById('setting-focus-length-min').value = null;
        document.getElementById('setting-break-length-min').value = null;
        document.getElementById('setting-noti').checked = noti;
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
        console.log(breakLengthMin);
        console.log(noti);
    }, [focusLengthMin, breakLengthMin, noti])

    // Handle save properties in Setting
    const handleSave = () => {
        setFocusLengthMin(document.getElementById('setting-focus-length-min').value ? document.getElementById('setting-focus-length-min').value : 0);
        setBreakLengthMin(document.getElementById('setting-break-length-min').value ? document.getElementById('setting-break-length-min').value : 0);
        if (noti !== temp) setNoti(temp);
        handleCloseAndOpen();
    }
    
    return (
        <>
            <div className='setting-timer-container'>
                <div className='timer-container'>
                    <div className='timer-base'>
                        <svg className="timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <g className="timer-circle">
                            <circle className="timer-path-elapsed" cx="50" cy="50" r="45" />
                            <path
                            id='timer-path-left'
                            strokeDasharray="283 283"
                            className="timer-path-remaining"
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
                        
                    </div>
                    <div className="timer-btn">
                        <button className="timer-start-btn" id="timer-btn" onClick={() => startAndStopTimer()}>
                            {Action}
                        </button>
                        <button className='setting-button' onClick={() => handleCloseAndOpen()}>
                            Setting
                        </button>
                    </div>
                </div>
            </div>
            <div id="setting-outer" style={style}>
                <div className='setting-container'>
                    <div className="setting-header">
                        <h1 className='setting-title'>Setting</h1> 
                        <svg className='bi bi-x setting-close-icon' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" onClick={() => handleCloseAndOpen()}>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                    <ul>
                        <li className='setting-li'>
                            <span className='setting-item-name'  style={{transform: "translateY(5px)"}} >
                                Focus length
                            </span>
                            
                                <input id='setting-focus-length-min' placeholder="Minutes" type="number" maxLength='4'  min="1" max="60" className="setting-numbox"/>
                            
                            
                        </li>

                        <li className='setting-li'>
                            <span className='setting-item-name' style={{transform: "translateY(5px)"}} >
                                Break length
                            </span>
                            
                                <input id='setting-break-length-min' placeholder="Minutes" type="number" step="1"  min="1" className="setting-numbox"/>
                            
                            
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
                        <button className='setting-save-button' onClick={() => handleSave()}>
                            Save
                        </button>
                    </div>
                </div>
            </div>  
            {(isFocused ? <MusicPlayer /> : <></>)}
        </>
    )
}

export default SettingTimer