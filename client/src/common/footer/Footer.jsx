import React from 'react'

const Footer = () => {
    let date = new Date()
    let year = date.getFullYear()
  return (
      <div className='mt-5'>
          <p className='fw-bold'>Copyright &copy; CaseDuncan { year} All rights Reserved</p>
    </div>
  )
}

export default Footer