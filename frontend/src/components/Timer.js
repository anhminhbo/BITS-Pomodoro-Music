import React, { useRef, useState } from 'react'

const formatTime = (num) => {
    if (num<10) return '0'+num;
    return num;
}

const Timer = ({min, sec}) => {
    const Min = useRef(min);
    const Sec = useRef(sec);
    const [TimerMin, setTimerMin] = useState(Min.current);
    const [TimerSec, setTimerSec] = useState(Sec.current);
    const [Action, setAction] = useState("Start");
    const Interval = useRef(0);

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
                    Interval.current = 1;
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
                setTimerMin(Min.current);
                setTimerSec(Sec.current);
            }, 1000);
        }
        else {
            // If time doesn't run out, allow restart the timer
            if (Min.current != 0 && Sec.current != 0) {
                setAction("Start");
                console.log(Min.current);
                console.log(Sec.current);
                console.log("Stop");
                clearInterval(Interval.current);
                Interval.current = 0;
            }
        }
    }

    return (
        <div>
            <div id="Time">{formatTime(TimerMin)}:{formatTime(TimerSec)}</div>
            <input type="button" value={Action} style={{display: "block"}} onClick={startAndStopTimer}/>
        </div>
    )
}

export default Timer