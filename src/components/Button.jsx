import React from 'react'

const Button = ({className, name, imgName, imgSrc, onClick}) => {
  return (
    <>
      <button type='Submit' value="Submit" className={className} onClick={onClick}> <img src={imgSrc} alt={imgName} className={imgName} />{name}</button>
    </>
  )
}

export default Button;
