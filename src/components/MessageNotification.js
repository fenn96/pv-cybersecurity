import React from 'react'

const MessageNotification = ({ message }) => {
    return (
        <>
          {message && <div className='alert alert-success text-white'>{message}</div>}
        </>
      )
}

export default MessageNotification