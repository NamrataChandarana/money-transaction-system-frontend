import React from 'react'

const Balance = ({value}) => {
  const balance = value?.toFixed(2);
  return (
    <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
  )
}

export default Balance