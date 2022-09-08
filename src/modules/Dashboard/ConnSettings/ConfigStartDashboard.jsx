import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import generateID from '../../HelperFunctions/generateClientId';
import generateTopic from '../../HelperFunctions/generateTopic';
import LoadingScreen from '../../IndexPage/LoadingScreen';
import { publishMsg, subscribeTopic } from '../../Settings/Store/SettingsCrud';
import CheckBox from './CheckBox';
import InfoBox from './InfoBox';
import Slider from './Slider';

    const ConfigStartDashboard = () => {

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

    //Simulate a publishing sequence
    useEffect(() => {
        
        

      return () => {
        
    
      }
    }, [client])

    //Function to simulate the publishing process
    const simulatePublishings = (interval=pubInterval, topicLen=4, topicLvl=pubTopicLevel, numOfPublishers=numPub) => {

        let lim = 0;
        
        if(client){
            let temp = setInterval(async () => {
                lim += 1;
                if(lim >= numOfPublishers){
                    clearInterval(temp);
                }
    
            //Generate a random topic for each published message
            let topic = generateTopic(topicLen, topicLvl);

            //Generate a random message for each publishing 
            let message = generateID(5);
            let currentpublished = await publishMsg(client, topic, message);
            console.log(currentpublished);
            console.log("The limit for publisher", lim);
    
            }, interval)
        }
    }

    //Function for the simulation of the subscription of random topic from the already published topics
    const simulateSubscriptions = () => {
        let interval = 3000;
        let topic = "aaaabb";
        let lim = 0;
        
        if(client){
            let temp = setInterval(async () => {
                lim += 1;
                if(lim >= 10){
                    clearInterval(temp);
                }
    
            let currentsubscribed = await subscribeTopic(client, topic);
            console.log(currentsubscribed);

            console.log("The limit for subscriptions", lim);
    
            }, interval)
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
                            <Slider id={"numpub"} stateVar={numPub} setStateVar={setNumPub} labelVar={"No. of Publisher"} min={"1"} max={"100000"}/>
                            <Slider id={"pubinterval"} stateVar={pubInterval} setStateVar={setPubInterval} labelVar={"Interval"} min={"1000"} max={"10000"} step={"1000"} />
                            <Slider id={"pubtopiclevel"} stateVar={pubTopicLevel} setStateVar={setPubTopicLevel} labelVar={"Topic Level"} max={"5"}/>
                            </div>

                            <InfoBox tagId={"cpu"} label={"CPU"} value={randnum}/>
                            <InfoBox tagId={"cpu"} label={"CPU"} value={randnum}/>

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
                <button type="button" className="btn btn-primary" onClick={simulatePublishings}>Start Dashboard</button>
                </div>

            </div>
        </div>
        }
        </>
  )
}

export default ConfigStartDashboard