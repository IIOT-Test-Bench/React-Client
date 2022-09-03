import React from 'react'

const Slider = ({stateVar, setStateVar, labelVar}) => {
  return (
    <div className="row mb-3" >
                            <label for="topiclvl" class="form-label">{labelVar} : <span>{stateVar}</span></label>
                            <div className='col-md-8'>
                            <input type="range" class="form-range" min="0" max="50" id="topiclvl" onChange={(e) => setStateVar(e.target.value)} />
                            </div>
                            <div className='col-md-2 ms-2'>
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                Dynamic
                            </label>
                            </div>
    </div>
  )
}

export default Slider