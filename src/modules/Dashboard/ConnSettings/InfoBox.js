import React from 'react'

const InfoBox = ({tagId, label, value, labellen=3, boxlen=9}) => {
  return (
    <>
      <div className="form-group row my-1">
        <label htmlFor={tagId} className={`col-md-${labellen} col-form-label`}>{label}</label>
        <div className={`col-md-${boxlen}`}>
          <input type="email" className="form-control" id={tagId} value={value} disabled/>
        </div>
      </div>
    </>
  )
}

export default InfoBox