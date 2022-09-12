import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import LoadingScreen from '../../IndexPage/LoadingScreen';
import CheckBox from './CheckBox';
import InfoBox from './InfoBox';
import Slider from './Slider';
import io from 'socket.io-client';

const socket = io("http://localhost:3042", {
        withCredentials: true,
        forceNew: true,
        extraHeaders: {
        }
      });
  
    const ConfigStartDashboard = () => {
      
    const [isConnected, setIsConnected] = useState(false);
    const [msg, setMsg] = useState(null);
    //Store simulation running values
    const [simulationOn, setSimulationOn] = useState(false)
    const [endSocket, setEndSocket] = useState(false)
    const [loading, setLoading] = useState(false);

    //Usage statistics
    const [cpu, setCpu] = useState(`${0}%`);
    const [memUsage, setMemUsage] = useState(`${0} MB`);



    let client = useSelector((state) => state.settings.clientid);
    const [numPub, setNumPub] = useState("");
    const [numSub, setNumSub] = useState(null);
    const [pubInterval, setPubInterval] = useState("");
    const [pubTopicLevel, setPubTopicLevel] = useState("");
    const [subTopicLevel, setSubTopicLevel] = useState(null);
    const [randnum, setRandNum] = useState(0);

    const [compression, setCompression] = useState(false);
    const [encryption, setEncryption] = useState(false);
    const [persistence, setPersistence] = useState(false);

    useEffect(() => {
        setInterval(() => {
            setRandNum(Math.floor(Math.random()*100));
        }, 1000);
      
      return () => {
      }
    }, []) 
    
    useEffect(() => {
      //For the client side socket io connection 
          socket.on('connect', () => {
            setLoading(false);
            setIsConnected(true);
            console.log("yesssss")
            socket.emit("clientId", client);
          });
          socket.on('connectionStatus', (data) => {
            console.log("The details", data);
          });

          socket.on('IDReceived', () => {
            console.log("The id has been received")
          })

      
          socket.on('disconnect', () => {
            setIsConnected(false);
            setLoading(false);
          });
      
          socket.on('memory-usage', (data) => {
            setMsg(data);
            console.log("Memory Usage:", data);
            setMemUsage(data);
          });
          socket.on('cpu-usage', (data) => {
            console.log("CPU Usage:", data);
            setCpu(data);
  
          });
        
    
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('memory-usage');
        };
      }, [simulationOn, endSocket, client]);
    
      const handleSimulation = () => {
        setLoading(true);
        console.log(simulationOn);
              

        if(isConnected){
          setEndSocket(true);
          setSimulationOn(false);
          socket.close();
        }else{
            setEndSocket(false);
            setSimulationOn(true);
            console.log(socket); 
            console.log("yesssss");
            socket.connect();
                        
        }
      }
    
  return (
    <>
    {client ? <LoadingScreen message={"Kindly connect to broker to run simulation"}/> :
    <div className=''>
        {/* <h2 className='my-4'></h2> */}
        <div className="row">

            {/* Publisher configurations */}
        <div className="col-sm-6 col-md-3 my-3">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Publisher</h5>
                    <div className="card-text">
                        <form>
                            <div className="form-group row">
                            <div className="my-3">
                            <Slider id={"numpub"} stateVar={numPub} setStateVar={setNumPub} labelVar={"No. of Publisher"} min={"1"} max={"100000"}/>
                            <Slider id={"pubinterval"} stateVar={pubInterval} setStateVar={setPubInterval} labelVar={"Interval"} min={"1000"} max={"10000"} step={"1000"} />
                            <Slider id={"pubtopiclevel"} stateVar={pubTopicLevel} setStateVar={setPubTopicLevel} labelVar={"Topic Level"} max={"5"}/>
                            </div>

                            <InfoBox tagId={"cpu"} label={"CPU"} value={cpu}/>
                            <InfoBox tagId={"memory"} label={"Memory USage"} value={memUsage}/>

                            </div>
                    </form>

                    </div>
                </div>
                </div>
            </div>

            {/* Broker info  */}
            <div className="col-sm-6 col-md-6 my-3">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">Broker</h5>
                    <div className="card-text">
                    <form>
                    <div className="form-group row">
                            <div className="my-3">
                                <CheckBox stateVar={compression} setStateVar={setCompression} labelVar={"Compression"}/>
                                <CheckBox stateVar={encryption} setStateVar={setEncryption} labelVar={"Encryption"}/>
                                <CheckBox stateVar={persistence} setStateVar={setPersistence} labelVar={"Persistence"}/>
                            
                            </div>
                            <div className="my-3">
                            <div className="spinner-border" style={{width: "6rem", height: "6rem"}} role="status">
                            <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                            <span className="visually-hidden">Loading...</span>
                            </div>
                            </div>
                            
                            </div>

                            <div className="row col-md-10">
                                <div className="col">
                                <InfoBox tagId={"cpu"} label={"Received"} value={randnum} labellen={6} boxlen={5}/>
                                </div>
                                <div className="col">
                                <InfoBox tagId={"cpu"} label={"Sent"} value={randnum} labellen={6} boxlen={5}/>
                                </div>
                            </div>
                            <InfoBox tagId={"cpu"} label={"CPU"} value={randnum}/>
                            <InfoBox tagId={"cpu"} label={"Memory"} value={randnum}/>
                            <div className="row">
                                <div className="col">
                                <InfoBox tagId={"cpu"} label={"Network IN"} value={randnum} labellen={6} boxlen={5}/>
                                </div>
                                <div className="col">
                                <InfoBox tagId={"cpu"} label={"Network OUT"} value={randnum} labellen={6} boxlen={5}/>
                                </div>
                            </div>
                    </div>

                    </form>

                    </div>
                </div>
                </div>
            </div>

            {/* Subscriber configurations */}
            <div className="col-sm-6 col-md-3 my-3">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Subscriber</h5>
                    <div className="card-text">
                    <form>
                            <div className="form-group row">
                            <div className="my-3">
                            <Slider id={"numsub"} stateVar={numSub} setStateVar={setNumSub} labelVar={"No. of Publisher"} />
                            <Slider id={"subtopiclevel"} stateVar={subTopicLevel} setStateVar={setSubTopicLevel} labelVar={"Topic Levels"} />
                            </div>

                            <InfoBox tagId={"cpu"} label={"CPU"} value={randnum}/>
                            <InfoBox tagId={"cpu"} label={"CPU"} value={randnum}/>
                            </div>
                    </form>

                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className='row'>
                <div className=''>
                <button type="button" className="btn btn-primary" onClick={() => handleSimulation()}>
                {loading? <span className="spinner-border spinner-border-sm mx-3" role="status" aria-hidden="true"></span> : ""}
                  Start Dashboard
                  </button>
                </div>

            </div>
        </div>
        }
        </>
  )
}

export default ConfigStartDashboard