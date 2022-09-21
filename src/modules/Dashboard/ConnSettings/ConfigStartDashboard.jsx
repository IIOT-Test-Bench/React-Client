import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../../IndexPage/LoadingScreen';
import CheckBox from './CheckBox';
import InfoBox from './InfoBox';
import Slider from './Slider';
import io from 'socket.io-client';
import {subscriberActions} from '../../Settings/Store/SubscriberSlice';
import {setSimulationConnection, setSimulationButton} from '../../Settings/Store/SettingsSlice';

const socket = io("https://iiot-bench.herokuapp.com", {
        forceNew: true
      });
  
    const ConfigStartDashboard = () => {
      const dispatch = useDispatch();
      
    let isConnected = useSelector(state => state.settings.isSimulationConnected);
    //Store simulation running values
    const [loading, setLoading] = useState(false);
    const [connectedUsers, setConnectedUsers] = useState(0);
    let simulationButton = useSelector(state => state.settings.simulationButton);


    //Usage statistics
    const [cpu, setCpu] = useState(`${0}%`);
    const [memUsage, setMemUsage] = useState(`${0} MB`);
    const [sent, setSent] = useState(0);
    const [received, setReceived] = useState(0);
    const [netIn, setNetIn] = useState(0);
    const [netOut, setNetOut] = useState(0);

    let client = useSelector((state) => state.settings.clientid);
    const [numPub, setNumPub] = useState("");
    const [numSub, setNumSub] = useState(null);
    const [pubInterval, setPubInterval] = useState("");
    const [pubTopicLevel, setPubTopicLevel] = useState("");
    const [subTopicLevel, setSubTopicLevel] = useState(null);

    const [compression, setCompression] = useState(false);
    const [encryption, setEncryption] = useState(false);
    const [persistence, setPersistence] = useState(false);
    
    useEffect(() => {
      //For the client side socket io connection 
            socket.on('connection', () => {
              setLoading(false);
              dispatch(setSimulationConnection({simulationSignal:true}));
              console.log("testing out");
            });
            socket.on('connectionStatus', (data) => {
              console.log("The details", data);
            });
  
            socket.on('IDReceived', () => {
              // console.log("The id has been received")
            })
  
            socket.on('disconnect', () => {
              dispatch(setSimulationConnection({simulationSignal:false}));
              setLoading(false);
            });

            socket.on('connected-users', (data) => {
              // console.log("Net Out:", data);
              setConnectedUsers(data);
              console.log("Connected Users: ", data)
            });   
        
            socket.on('memory-usage', (data) => {
              console.log("Memory Usage:", data);
              setMemUsage(data);
            });
            socket.on('cpu-usage', (data) => {
              console.log("CPU Usage:", data);
              setCpu(data);
            });
            socket.on('sent', (data) => {
              // console.log("Sent messages:", data);
              setSent(data);
            });
            socket.on('received', (data) => {
              // console.log("Received messages:", data);
              setReceived(data);
            });
            socket.on('netin', (data) => {
              // console.log("Net In:", data);
              setNetIn(data);
            });
            socket.on('netout', (data) => {
              // console.log("Net Out:", data);
              setNetOut(data);
            });
            socket.on('topics', (data) => {
              console.log("Topics:", data);
              dispatch(subscriberActions.addToSubscribedTopics({topic:data, clientId:client}));
            });       
        
        return () => {
          // socket.off('connect');
          // socket.off('disconnect');
          // socket.off('memory-usage');
        };
      }, []);
    
      const handleSimulation = () => {

        switch(isConnected){
          case true:
            socket.emit('stopSimulation', {numOfPubs:numPub});
            // console.log("Stopped logging the info...")
            socket.close();
            //reset subscribed topics when simulation stops
            dispatch(subscriberActions.resetSubscribedTopics());
            document.querySelector("#gear").classList.remove("connected-gear")
            dispatch(setSimulationConnection({simulationSignal:false}));
            setLoading(false);
            dispatch(setSimulationButton({simulationText:"Start Simulation"}));
            // console.log(isConnected);
          break;
          case false:
            // console.log(socket); 
            socket.open();
            socket.emit("clientId", client, (feedback) => {
              // console.log("Client Id received", feedback)
            });
            socket.emit('startSimulation', {numOfPubs:numPub, pubInterval:pubInterval, pubTopicLevel:pubTopicLevel, numOfSubs:numSub, subTopicLevel:subTopicLevel})
            dispatch(setSimulationConnection({simulationSignal:true}));
            // console.log(isConnected);
            document.querySelector("#gear").classList.add("connected-gear");
            dispatch(setSimulationButton({simulationText:"Stop Simulation"}));
          break;
          default:
        }
        
      }
    
  return (
    <>
    {!client ? <LoadingScreen message={"Kindly connect to broker to run simulation"}/> :
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
                            <Slider id={"numpub"} stateVar={numPub} setStateVar={setNumPub} labelVar={"No. of Publisher"} min={"1"} max={"100"}/>
                            <Slider id={"pubinterval"} stateVar={pubInterval} setStateVar={setPubInterval} labelVar={"Interval (ms)"} min={"10"} max={"10000"} step={"1"} />
                            <Slider id={"pubtopiclevel"} stateVar={pubTopicLevel} setStateVar={setPubTopicLevel} labelVar={"Topic Level"} max={"10"}/>
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
                                <CheckBox stateVar={compression} setStateVar={setCompression} labelVar={"Compression"} disabled={true}/>
                                <CheckBox stateVar={encryption} setStateVar={setEncryption} labelVar={"Encryption"} disabled={true}/>
                                <CheckBox stateVar={persistence} setStateVar={setPersistence} labelVar={"Persistence"} disabled={true}/>
                            
                            </div>
                            <div className="my-3 d-flex justify-content-center flex-column align-items-center">
                            {/* <div className="spinner-border" style={{width: "6rem", height: "6rem"}} role="status">
                            <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                            <span className="visually-hidden">Loading...</span>
                            </div>
                            </div> */}
                            <span >Connected clients</span>
                            <div>
                            <img src='gear.svg' alt='gear button' id='gear' />
                            <span className='connected-users'>{connectedUsers}</span>
                            </div>
                            </div>

                            <div className="row col-md-10">
                                <div className="col">
                                <InfoBox tagId={"received"} label={"Received"} value={received} labellen={6} boxlen={5}/>
                                </div>
                                <div className="col">
                                <InfoBox tagId={"sent"} label={"Sent"} value={sent} labellen={6} boxlen={5}/>
                                </div>
                            </div>
                            <InfoBox tagId={"cpu"} label={"CPU"} value={cpu}/>
                            <InfoBox tagId={"memory"} label={"Memory"} value={memUsage}/>
                            <div className="row">
                                <div className="col">
                                <InfoBox tagId={"netin"} label={"Network IN"} value={netIn} labellen={6} boxlen={5}/>
                                </div>
                                <div className="col">
                                <InfoBox tagId={"netout"} label={"Network OUT"} value={netOut} labellen={6} boxlen={5}/>
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
                            <Slider id={"numsub"} stateVar={numSub} setStateVar={setNumSub} labelVar={"No. of Subscribers"} min={"1"} max={"100"}/>
                            <Slider id={"subtopiclevel"} stateVar={subTopicLevel} setStateVar={setSubTopicLevel} labelVar={"Topic Levels"} max={"10"}/>
                            </div>

                            <InfoBox tagId={"cpu"} label={"CPU"} value={cpu}/>
                            <InfoBox tagId={"memory"} label={"Memory Usage"} value={memUsage}/>
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
                  {simulationButton}
                  </button>
                </div>

            </div>
        </div>
        }
        </>
  )
}

export default ConfigStartDashboard