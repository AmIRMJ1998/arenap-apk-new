import cn from '@/utils/clsxFun';
import React from 'react'
import { useTimer } from 'react-timer-hook';

const Timer = ({ expiryTimestamp, expireHandler, customStyle }: { expiryTimestamp: Date, expireHandler: () => void, customStyle?: string }) => {


    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: expireHandler });


    return (
        <div className={cn('flex justify-start items-center gap-2 text-md', customStyle)}>
            <p>  {seconds.toString().length === 1 ? `0${seconds}` : seconds} : {minutes.toString().length === 1 ? `0${minutes}` : minutes} {hours > 0 ? ":" : null} {hours > 0 ? hours.toString().length === 1 ? `0${hours}` : hours : null}</p>
        </div>
    )
}

export default Timer