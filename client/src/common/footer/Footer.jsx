import React from 'react'

const Footer = () => {
    let date = new Date()
    let year = date.getFullYear()
  return (
      <div>
          <h5>Copyright &copy; CaseDuncan { year} All rights Reserved</h5>
    </div>
  )
}

export default Footer