import React from 'react'

const ConfigPubSub = () => {
  return (

    <div className=''>
        <h2 className='my-4'>Configure Publishers and Subscribers</h2>
        <div className="row">
        <div class="col-sm-6 col-md-6 my-3">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Publishers</h5>
                    <p class="card-text">
                        <form>
                            <div class="form-group row">
                            <div className="col-md-4" >
                            <label htmlFor="pubnum" className="col col-form-label">No. Limit</label>
                            <div className="col">
                            <input type="number" className="form-control" id="pubnum" defaultValue={"20"} />
                            </div>
                            </div>

                            <div className="col-md-4" >
                            <label htmlFor="msgsize" className="col col-form-label">Message Size (mb)</label>
                            <div className="col">
                            <input type="number" className="form-control" id="msgsize" defaultValue={"1000"} />
                            </div>
                            </div>

                            <div className="col-md-4" >
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

                            <div class="form-group row">
                            <div className="col-md-4" >
                            <label htmlFor="host" className="col col-form-label">Msg Interval (sec)</label>
                            <div className="col">
                            <input type="text" className="form-control" id="host" defaultValue={"20"} />
                            </div>
                            </div>
                            </div>

                    </form>

                    </p>
                </div>
                </div>
            </div>

            <div class="col-sm-6 col-md-6 my-3">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Subscriber</h5>
                    <p class="card-text">
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

                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
  )
}

export default ConfigPubSub