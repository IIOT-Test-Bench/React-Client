import React from 'react'

const CheckBox = ({stateVar, setStateVar, labelVar}) => {
    const handleChange = ({target}) => {
        if(target.checked){
            setStateVar(true);
        }else{
            setStateVar(false);
            // console.log(stateVar);
        }
    }
  return (
    <>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value={stateVar} id="flexCheckDefault" onChange={(e) => handleChange(e)}/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
                {labelVar}
            </label>
        </div>
    </>
  )
}

export default CheckBox