import React, { useState, useEffect } from 'react'
import generateID from '../../HelperFunctions/generateClientId'
import { connectBroker } from '../../Settings/Store/SettingsCrud';

const ConfigBroker = () => {
  //store random client id from the generator function 
  const [randId, setRandId] = useState("");

  //Store the various states for the main connection to broker
  const [connStatus, setConnStatus] = useState(false);
  const [connStatusText, setConnStatusText] = useState("Connect");
  const [statusCode, setStatusCode] = useState("info");
  const [connState, setconnState] = useState("Disconnected");

  //Set form data states
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [timeout, setTimeout] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    switch(connStatus){
      case false:
        setConnStatusText("Connect");
        setStatusCode("info");
        setconnState("Disconnected");
        break;
        case true:
          setConnStatusText("Disconnect");
          setStatusCode("success");
          setconnState("Connected");
          break;
      default:
  
      }
    return () => {
    }
  }, [connStatus])
  

  //Connect to the broker on click or submission
  const handleConnect = async () => {
    try{
      setconnState("loading");
      let feedback = await connectBroker(host, port, randId, timeout, username, password);
      console.log(feedback);
      if(connStatus){
        setConnStatus(false); 
        
      }else{
        setConnStatus(true);
        setconnState("Disconnected");
      }

    }catch(e){

    }
    
  }

  let getID = true;

  const getClientId = ({target}) => {
    const clientIdField = document.querySelector("#clientid");
    if(target.checked){
      getID = true;
      const randomId = generateID(6);
      setRandId(randomId);
      getID = false;
      clientIdField.value = randomId;
    }    
  }

  return (
    <div className=''>
        
        <div className='m-4'>
        <form>
        <div className='row my-5'>
        <h2 className='col'>Configure Connection : <span id="connState" style={{color: "orange", fontSize: "0.7em"}}>{connState}</span> 
        <div className="spinner-grow mx-3" style={{width: "1.8rem", height: "1.8rem", color: "orange"}} role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
        </h2>
        
        <button type="button" id="connStatus" className={`btn btn-${statusCode} col-md-3 col-lg-2`} onClick={handleConnect}>
        {connState === "loading"? <span className="spinner-border spinner-border-sm mx-3" role="status" aria-hidden="true"></span> : ""}
        {connStatusText}
        </button>
        </div>
        {/* Initial form start position */}
          <fieldset className='border p-2 my-2'>
            <legend className='col'>Connection</legend>
            <div className="form-group row">
                <div className="col-md-6" >
                <label htmlFor="host" className="col col-form-label">Host or IP</label>
                <div className="col">
                <input type="text" className="form-control" id="host" placeholder="Host or IP Address" onChange={(e) => {setHost(e.target.value)}}/>
                </div>
                </div>

                <div className="col-md-4" >
                <label htmlFor="port" className="col col-form-label">Port</label>
                <div className="col">
                <input type="number" className="form-control" id="port" defaultValue={"5000"} onChange={(e) => {setPort(e.target.value)}}/>
                </div>
                </div>

                <div className="col-md-2" >
                <label htmlFor="timeout" className="col col-form-label">Timeout</label>
                <div className="col">
                <input type="number" className="form-control" id="timeout" defaultValue={"4000"} onChange={(e) => {setTimeout(e.target.value)}}/>
                </div>
                </div>
            </div>
          
            <div className="form-group row">
                <div className="col-md-6" >
                <label htmlFor="protocol" className="col col-form-label">Protocol</label>
                <div className="col">
                  <select className="form-select" defaultValue={"TCP"} aria-label="Select protocol">
                  <option value="tcp">TCP</option>
                  <option value="ssl">SSL</option>
                  </select>
                </div>
                </div>
            </div>
          
            <div className="form-group row">
                <div className="col-md-6" >
                <label htmlFor="username" className="col col-form-label">Username</label>
                <div className="col">
                <input type="text" className="form-control" id="username" placeholder="Enter Username: emqx" onChange={(e) => {setUsername(e.target.value)}}/>
                </div>
                </div>
                <div className="col-md-6" >
                <label htmlFor="password" className="col col-form-label">Password</label>
                <div className="col">
                <input type="text" className="form-control" id="password" placeholder="Enter Password: public" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                </div>
            </div>
          
            <div className="form-group row">
                <div className="col-md-8" >
                <label htmlFor="clientid" className="col col-form-label">Client Id</label>
                <div className="col">
                <input type="text" className="form-control" id="clientid" placeholder='Enter Client ID' defaultValue={getID? randId : ""} onChange={(e) => {setRandId(e.target.value)}}/>
                </div>
                </div>
                <div className="col-md-4" >
                <label htmlFor="randomid" className="col col-form-label">Generate a client ID</label>
                <div className="col">
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="generateid" onClick={getClientId}/>
                <label className="form-check-label" htmlFor="generateid">
                  Get an ID
                </label>
              </div>
                </div>
                </div>
            </div>
          </fieldset>
            
        </form>
        </div>
    </div>
  )
}

export default ConfigBroker