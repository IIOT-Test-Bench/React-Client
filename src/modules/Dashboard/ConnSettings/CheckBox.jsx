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
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value={stateVar} id="flexCheckDefault" onChange={(e) => handleChange(e)}/>
            <label class="form-check-label" for="flexCheckDefault">
                {labelVar}
            </label>
        </div>
    </>
  )
}

export default CheckBox