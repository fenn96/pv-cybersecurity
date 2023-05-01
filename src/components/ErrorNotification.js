import React from 'react'

const ErrorNotification = ({ error }) => {
  return (
    <>
      {error && <div className='alert alert-danger text-white'>{error}</div>}
    </>
  )
}

export default ErrorNotification