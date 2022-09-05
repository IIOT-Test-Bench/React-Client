import React from 'react'
import { getRandomNumber } from '../../HelperFunctions/generateClientId'

const Slider = ({id, stateVar, setStateVar, labelVar, min=0, max=50}) => {
  
  const handleCheck = ({target}) => {
    if(target.checked){
      let randNum = getRandomNumber(min, max);
      document.querySelector(`#${id}`).style.width = `${(randNum/max)*100}%`;
      setStateVar(randNum);
    }
  }

  return (
    <div className="row mb-3" >
                            <label htmlFor="topiclvl" className="form-label">{labelVar} : <span>{stateVar}</span></label>
                            <div className='col-md-8'>
                            <input type="range" className="form-range" min={min} max={max} id={id} onChange={(e) => setStateVar(e.target.value)} />
                            </div>
                            <div className='col-md-2 ms-2'>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={handleCheck} />
                            <label className="form-check-label" htmlFor="flexCheckDefault" >
                                Dynamic
                            </label>
                            </div>
    </div>
  )
}

export default Slider