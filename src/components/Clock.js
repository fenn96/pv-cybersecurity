import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(DateTime.local().toFormat('hh:mm:ss a'));
    }, 100);

    return () => clearInterval(intervalID);
  }, [])

  return (
    <div>
        <h2 className='display-2'>{time}</h2>
    </div>
  )
}

export default Clock