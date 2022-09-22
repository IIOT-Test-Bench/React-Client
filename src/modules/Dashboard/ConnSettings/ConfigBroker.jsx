import React, { useState, useEffect } from 'react';
import generateID from '../../HelperFunctions/generateClientId';
import { connectBroker, disconnectBroker } from '../../Settings/Store/SettingsCrud';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentClient, setConnState, setConnStatus, setConnStatusText, setStatusCode, resetConnection} from '../../Settings/Store/SettingsSlice';
import swal from 'sweetalert';

const ConfigBroker = () => {

  //Set a prevent typing states for no input when connnected
  const [preventTyping, setPreventTyping] = useState(false);

  const dispatch = useDispatch();
  //Store the current client
  //Later would be added to redux store
  let connectedClient = useSelector(state => state.settings.clientid);
  //store random client id from the generator function 
  const [randId, setRandId] = useState("");

  //Store the various states for the main connection to broker
  let connStatus = useSelector(state => state.settings.connStatus);
  let connStatusText = useSelector(state => state.settings.connStatusText);
  let statusCode = useSelector(state => state.settings.statusCode);
  let connState = useSelector(state => state.settings.connState);

  //Set form data states
  const [host, setHost] = useState(useSelector(state => state.settings.host));
  const [port, setPort] = useState(useSelector(state => state.settings.port));
  const [timeout, setTimeout] = useState(useSelector(state => state.settings.conntimeout));
  const [username, setUsername] = useState(useSelector(state => state.settings.username));
  const [password, setPassword] = useState(useSelector(state => state.settings.password));

  useEffect(() => {
    if(connStatus){
      setPreventTyping(true);
    }
    return () => {
    }
  }, [connStatus])
  


  useEffect(() => {
    switch(connStatus){
      case false:
        dispatch(setConnStatusText({connStatusText:"Connect"}));
        dispatch(setStatusCode({statusCode:"info"}));
        dispatch(setConnState({connState:"Disconnected"}));
        break;
        case true:
          dispatch(setConnStatusText({connStatusText:"Disconnect"}));
          dispatch(setStatusCode({statusCode:"success"}));
          dispatch(setConnState({connState:"Connected"}));
          document.querySelector("#clientid").value = connectedClient;
          document.querySelector("#host").value = host;
          document.querySelector("#port").value = port;
          document.querySelector("#timeout").value = timeout;
          document.querySelector("#username").value = username;
          document.querySelector("#password").value = password;

          break;
      default:
  
      }
    return () => {
    }
  }, [connStatus, dispatch, connectedClient, host, port, timeout, username, password])


  //Connect to the broker on click or submission
  const handleConnect = async () => {
    try{
      dispatch(setConnState({connState:"Loading..."}));
      
      if(connStatus && (connState === "Connected")){
        let feedback = await disconnectBroker(connectedClient); 
        if(feedback.statusText === "OK"){
          dispatch(setConnStatus({connStatus:false}));
          dispatch(setConnState({connState:"Disconnected"}));
          dispatch(resetConnection());
          setPreventTyping(false);
        }        
      }else{
        if(host && port && randId && timeout && username && password){
          let feedback = await connectBroker(host, port, randId, timeout, username, password);
          if(feedback.statusText === "OK"){
            dispatch(setConnStatus({connStatus:true}));
            dispatch(setConnState({connState:"Connected"}));
            dispatch(setCurrentClient({host:host, port:port, clientid:randId, timeout:timeout, username:username, password:password}));
            setPreventTyping(true);
          }else{
            dispatch(setConnStatus({connStatus:false}));
            dispatch(setConnState({connState:"Disconnected"}));
            swal({
              title: "Wrong values",
              text: "One or some of the values provided are incorrect, kindly check and reconnect",
              icon: "warning",
            });
          }
        }else{
          dispatch(setConnState({connState:"Disconnected"}));
          swal({
            title: "Empty Fields",
            text: "Values from these field are needed for the connection",
            icon: "warning",
          });
        }
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
      // console.log(generateTopic(4,3));
      // console.log(generateMessage(5, 6))
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
        { connState === "Connected" ?
        <div className="spinner-grow mx-3" style={{width: "1.8rem", height: "1.8rem", color: "orange"}} role="status">
         <span className="visually-hidden">Loading...</span> 
        </div>
        : ""}
        </h2>
        
        <button type="button" id="connStatus" className={`btn btn-${statusCode} col-md-3 col-lg-2`} onClick={handleConnect}>
        {connState === "Loading..."? <span className="spinner-border spinner-border-sm mx-3" role="status" aria-hidden="true"></span> : ""}
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
                <input type="text" className="form-control" id="host" placeholder="Host or IP Address" onChange={(e) => {setHost(e.target.value)}} disabled={preventTyping} required={true}/>
                </div>
                </div>

                <div className="col-md-4" >
                <label htmlFor="port" className="col col-form-label">Port</label>
                <div className="col">
                <input type="number" className="form-control" id="port" placeholder={"1883"} onChange={(e) => {setPort(e.target.value)}} disabled={preventTyping} required={true}/>
                </div>
                </div>

                <div className="col-md-2" >
                <label htmlFor="timeout" className="col col-form-label">Timeout</label>
                <div className="col">
                <input type="number" className="form-control" id="timeout" placeholder={"4000"} onChange={(e) => {setTimeout(e.target.value)}} disabled={preventTyping} required={true}/>
                </div>
                </div>
            </div>
          
            <div className="form-group row">
                <div className="col-md-6" >
                <label htmlFor="protocol" className="col col-form-label">Protocol</label>
                <div className="col">
                  <select className="form-select" defaultValue={"TCP"} aria-label="Select protocol" disabled={true}>
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
                <input type="text" className="form-control" id="username" placeholder="Enter Username: emqx" autoComplete={"password"} onChange={(e) => {setUsername(e.target.value)}} disabled={preventTyping} required={true}/>
                </div>
                </div>
                <div className="col-md-6" >
                <label htmlFor="password" className="col col-form-label">Password</label>
                <div className="col">
                <input type="password" className="form-control" id="password" autoComplete={"current-password"} onChange={(e) => {setPassword(e.target.value)}} disabled={preventTyping} required={true}/>
                </div>
                </div>
            </div>
          
            <div className="form-group row">
                <div className="col-md-8" >
                <label htmlFor="clientid" className="col col-form-label">Client Id</label>
                <div className="col">
                <input type="text" className="form-control" id="clientid" placeholder='Enter Client ID' defaultValue={getID? randId : ""} onChange={(e) => {setRandId(e.target.value)}} disabled={preventTyping} required={true}/>
                </div>
                </div>
                <div className="col-md-4" >
                <label htmlFor="randomid" className="col col-form-label">Generate a client ID</label>
                <div className="col">
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="generateid" onClick={getClientId} disabled={preventTyping}/>
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