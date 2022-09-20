import React from 'react'
import { useSelector } from 'react-redux'
// import BarChart from '../Charts/BarChart'

const Graphs = () => {
  let client = useSelector((state) => state.settings.clientid);
  let subTopics = useSelector(state => state.subscriber.subscribedTopics[client]);
  console.log(subTopics)
  return (
    <>
        {/* <div className="container mb-3">
          <BarChart />
        </div> */}
        <div className="container">
          <h1 className='m-2'>
            Client ID: {client}
          </h1>
        <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Number</th>
      <th scope="col">Topic</th>
    </tr>
  </thead>
  <tbody>
    {
      subTopics?.map((elem, index) => 
        (
          <tr key={index}>
        <th scope="row">{index}</th>
        <td>{elem}</td>
      </tr>
        )
      )
    }
  </tbody>
</table>
        </div>
    </>
  )
}

export default Graphs