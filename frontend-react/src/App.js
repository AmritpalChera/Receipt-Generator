import React, { useState, useEffect} from 'react';

import './App.css';



//hw add addtional functionality
function App() {
  
  const [amount, setAmount] = useState('')
  const [percent, setPercent] = useState('')
  const [total, setTotal] = useState('');
  const [tax, setTax] = useState('');
  const [tip, setTip] = useState('');
  const [company, setCompany] = useState ('');
  
  useEffect(() => {}, []);

  const calculateTip = (e) => {
    e.preventDefault();
    const data = {
      amount,
      tip : percent,
    }

    fetch('http://localhost:9000/api/v1/calculatetip', 
    {
      method: 'POST',
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data) 
    }) 
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
        setTotal(data.total);
        setTax(data.tax);
        setTip(data.tipAmount);
      })
  };

  const displayReceipt = (e)=>{
    document.getElementsByClassName('receipt')[0].style.display = "block";
  }
  

  return (
    <div className="App">
      <div className = "row heading">Receipt</div>
      <div className = "row">
        <input 
          type="text" 
          value = {amount} 
          onChange = {(e)=>setAmount(e.target.value)}
          placeholder ="Subtotal($)">
        </input>   
      </div>

      <div>
        <input 
          type="text" value = {percent} 
          onChange = {(e)=>setPercent(e.target.value)}
          placeholder = "Tip(%)">
        </input>
      </div>

      <div>
        <input 
          type="text" value = {company} 
          onChange = {(e)=>setCompany(e.target.value)}
          placeholder = "Company Name">
        </input>
      </div>

      <button id="button" onClick={(e)=>{calculateTip(e); displayReceipt()}}>Generate</button>
    
      <div className= "receipt" style={{display: 'none'}}>
        <div className = "receipt_heading">
          <h2>{company}</h2>
          <h5>Receipt</h5>
        </div>
          
          <h3>Subtotal: ${amount}</h3>
          <h3>Tax: ${tax}</h3>
          <p>Tax Rate: 13%</p>
          <h3>Tip: ${tip}</h3>
          <h3>Total: ${total}</h3>
        
      </div>
      
      
        
 

    </div>
  );
}

export default App;
