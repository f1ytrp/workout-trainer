import {useState, useEffect, useRef} from 'react';

export default function useTimer(){
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if(isRunning){
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => {
            clearInterval(timerRef.current);
        };
    }, [isRunning]);

    const start = () => setIsRunning(true)
    const stop = () => setIsRunning(false);
    const resetTimer = () => {
        stop();
        setTime(0);
    };

    return { time, start, stop, resetTimer, isRunning }
}