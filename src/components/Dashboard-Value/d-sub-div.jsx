import React from 'react';
import './dashboardvalue.css';

const Subdiv = ({value, dataSentence}) => {
  return (
    <div className='sub-div'>
      <div className="d-data">{value}</div>
      <div className='d-sentence'>{dataSentence}</div>
    </div>
  )
}

export default Subdiv;
