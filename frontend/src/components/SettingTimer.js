/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import'./SettingTimer.css'
import { useRef, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';
import axios from "axios";
const sound = require('../sound/noti-sound.wav');

const formatTime = (num) => {
    if (num<10) return '0'+num;
    return num;
}

const FULL_DASH_ARRAY = 283;

const SettingTimer = () => {
    const [focusLengthMin, setFocusLengthMin] = useState(0);
    const [breakLengthMin, setBreakLengthMin] = useState(0);
    const [isFocused, setIsFocused] = useState(true);
    const [isMusicOn, setIsMusicOn] = useState(true);
    const noti = useRef(true);
    const Min = useRef(isFocused ? focusLengthMin : breakLengthMin);
    const Sec = useRef(0);
    const [TimerMin, setTimerMin] = useState(Min.current);
    const [TimerSec, setTimerSec] = useState(Sec.current);
    const [Action, setAction] = useState("Start");
    const Interval = useRef(0);
    const totalTime = useRef();
    let isFirstTime = true;

    // const logOut = async () => {
    //     try {
    //       const response = await axios.get(
    //         `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/auth/logout`
    //       );
    //       console.log(response.data.message);
    //       window.location.href = window.__RUNTIME_CONFIG__.FRONTEND_URL + '/login';
    //     } 
    //     catch (err) {
    //         if (err.response.data.errCode === 112) {
    //           // Handle when session expired
    //           window.location.href = window.__RUNTIME_CONFIG__.FRONTEND_URL + '/login';
    //         }
    //     }
    //   };

    const getSettings = async () => {
        try {
            const response = await axios.get(
                `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/timer/getSettings`
            );
            const data = response.data.data.timerSettings;
            setFocusLengthMin(data.focusLength);
            setBreakLengthMin(data.breakLength);
            noti.current = data.isNotified;
            Min.current = (isFocused ? focusLengthMin : breakLengthMin);
            Sec.current = 0;
            setTimerMin(Min.current);
        } 
        catch (err) {
            if (err.response.data.errCode === 112) {
                window.location.href = window.__RUNTIME_CONFIG__.FRONTEND_URL + '/login';
            }
        }
    };

    const updateSettings = async (focusLength, breakLength, noti) => {
        const payload = {
            timerSettings: {
                focusLength,
                breakLength,
                isNotified: noti,
            }
        }
        try {
          const response = await axios.put(
            `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/timer/updateSettings`,
            payload
          );
          // Handle update settings
          console.log("Handle update settings");
          await getSettings();
          return response;
        } 
        catch (err) {
          if (err.response.data.errCode === 112) {
            // Handle when session expired
            window.location.href = window.__RUNTIME_CONFIG__.FRONTEND_URL + '/login';
          }
          console.log(err.response.data);
        }
    };

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
                console.log(noti.current);
                // If time runs out
                if (Min.current == 0 && Sec.current == 0) {
                    clearInterval(Interval.current);
                    // Set interval to 1 to prevent pressing button while time runs out
                    Interval.current = 0;
                    console.log(noti.current);
                    if (noti.current) {
                        document.getElementById("timer-noti-sound").muted = true;
                        document.getElementById("timer-noti-sound").muted = false;
                        document.getElementById("timer-noti-sound").play();
                    }
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
        document.getElementById('setting-noti').checked = noti.current;
    }
    
    // Handle save properties in Setting
    const handleSave = () => {
        const focusLength = (document.getElementById('setting-focus-length-min').value !== "" ? document.getElementById('setting-focus-length-min').value : focusLengthMin);
        const breakLength = (document.getElementById('setting-break-length-min').value !== "" ? document.getElementById('setting-break-length-min').value : breakLengthMin);
        noti.current = !noti.current;
        if (focusLength < 1 || focusLength > 120 || breakLength < 1 || breakLength > 30) {
            document.getElementById('setting-focus-length-min').value = "";
            document.getElementById('setting-break-length-min').value = "";
            alert("Invalid input value. Please enter a value between 1~120 for Focus and 1~30 for Break.");
            return;
        }
        if (focusLength === focusLengthMin && breakLength === breakLengthMin) {
            reset();
        }
        updateSettings(focusLength, breakLength, noti.current);
        handleCloseAndOpen();
    }

    // prevent user from entering special characters
    useEffect(() => {
        getSettings();
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
    }, []);
    
    useEffect(() => {
        console.log(focusLengthMin);
        console.log(breakLengthMin);
        console.log(noti.current);
    }, [focusLengthMin,breakLengthMin,noti.current]);

    const reset = () => {
        Min.current = (isFocused ? focusLengthMin : breakLengthMin);
        Sec.current = 0;
        totalTime.current = Min.current * 60;
        document.getElementsByClassName("timer-path-remaining")[0].setAttribute("stroke-dasharray", "283 283");
        setTimerMin(Min.current);
        setTimerSec(Sec.current);
    }

    useEffect(() => {
        reset();
    }, [focusLengthMin, breakLengthMin, noti.current, isFocused]);

    useEffect(() => {
        if (isFirstTime) {isFirstTime = false}
        else startAndStopTimer();
        document.getElementById("timer-noti-sound").volume = 1;
    }, [isFocused])

    return (
        <>
            <audio id="timer-noti-sound" muted>
                <source src={sound} type="audio/wav"/>
            </audio>
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
                            ' 
                            style={{stroke : (isFocused ? "#04AA6D" : "#5c8a07")}}/>
                            </g>
                        </svg>
                        <div className='timer-label'>
                            <div className="timer-mode" style={{color : (isFocused ? "#04AA6D" : "#5c8a07"), fontWeight: "bold"}}>{isFocused ? "Focus Mode" : "Break Mode"}</div>
                            <div id="timer-time">{formatTime(TimerMin)}:{formatTime(TimerSec)}</div>
                        </div>
                        
                    </div>
                    <div className="timer-btn" style={{height: (isFocused ? "156px" : "104px")}}>
                        {
                            isFocused ?
                            <button className="music-player-status" onClick={() => setIsMusicOn(!isMusicOn)}>
                                Music:
                                {isMusicOn? " ON" : " OFF"}
                            </button>
                            : 
                            <></>
                        }
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
                                <input id='setting-noti' className='setting-checkbox' type="checkbox" defaultChecked={noti.current}/>
                                <span className="setting-slider setting-round" ></span>
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
            {(isFocused && !isMusicOn ? <></> : <MusicPlayer />)}
        </>
    )
}

export default SettingTimer