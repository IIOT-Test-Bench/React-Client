import React, {useState, useEffect} from 'react';
    import LoadingScreen from '../../IndexPage/LoadingScreen';

    const ConfigPubSub = () => {

    const [client, setClient] = useState(null);
    const [numPub, setNumPub] = useState(null);
    const [pubInterval, setPubInterval] = useState(null);
    const [topicLevel, setTopicLevel] = useState(null);

  return (
    <>
    {client ? <LoadingScreen /> :
    <div className=''>
        {/* <h2 className='my-4'></h2> */}
        <div className="row">

            {/* Publisher configurations */}
        <div class="col-sm-6 col-md-3 my-3">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Publisher</h5>
                    <div class="card-text">
                        <form>
                            <div class="form-group row">
                            <div className="row my-3" >
                            <label for="publimit" class="form-label">No. of Publishers : <span>{numPub}</span></label>
                            <div className='col-md-8'>
                            <input type="range" class="form-range" min="0" max="50" id="publimit" onChange={(e) => setNumPub(e.target.value)} />
                            </div>
                            <div className='col-md-2 ms-2'>
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                Dynamic
                            </label>
                            </div>
                            </div>

                            <div className="row mb-3" >
                            <label for="pubInterval" class="form-label">pubInterval : <span>{pubInterval}</span></label>
                            <div className='col-md-8'>
                            <input type="range" class="form-range" min="0" max="50" id="pubInterval" onChange={(e) => setPubInterval(e.target.value)} />
                            </div>
                            <div className='col-md-2 ms-2'>
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                Dynamic
                            </label>
                            </div>
                            </div>

                            <div className="row mb-3" >
                            <label for="topiclvl" class="form-label">Topic Level : <span>{topicLevel}</span></label>
                            <div className='col-md-8'>
                            <input type="range" class="form-range" min="0" max="50" id="topiclvl" onChange={(e) => setTopicLevel(e.target.value)} />
                            </div>
                            <div className='col-md-2 ms-2'>
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                Dynamic
                            </label>
                            </div>
                            </div>

                            </div>
                    </form>

                    </div>
                </div>
                </div>
            </div>

            {/* Broker info  */}
            <div class="col-sm-6 col-md-6 my-3">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Broker</h5>
                    <div class="card-text">
                    <form>
                            <div class="form-group row">
                            <div className="col-md-6" >
                            <label htmlFor="pubnum" className="col col-form-label">No. Limit</label>
                            <div className="col">
                            <input type="number" className="form-control" id="pubnum" defaultValue={"20"} />
                            </div>
                            </div>

                            <div className="col-md-6" >
                            <label htmlFor="topiclvl" className="col col-form-label">Topic Level</label>
                            <div className="col">
                            <select className="form-select" defaultValue={"0"} aria-label="Select protocol">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            </select>
                            </div>
                            </div>
                            </div>

                    </form>

                    </div>
                </div>
                </div>
            </div>

            <div class="col-sm-6 col-md-3 my-3">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Subscriber</h5>
                    <div class="card-text">
                    <form>
                            <div class="form-group row">
                            <div className="col-md-6" >
                            <label htmlFor="pubnum" className="col col-form-label">No. Limit</label>
                            <div className="col">
                            <input type="number" className="form-control" id="pubnum" defaultValue={"20"} />
                            </div>
                            </div>

                            <div className="col-md-6" >
                            <label htmlFor="topiclvl" className="col col-form-label">Topic Level</label>
                            <div className="col">
                            <select className="form-select" defaultValue={"0"} aria-label="Select protocol">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            </select>
                            </div>
                            </div>
                            </div>

                    </form>

                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        }
        </>
  )
}

export default ConfigPubSub