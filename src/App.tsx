import React from 'react';
import './App.css';
import AnalyticsComponent from './components/analytics/analytics.component'


function App() {
  return (
    <div className="App">
     <ul>
  <li><a className="active" href="#home">Distributed Delivery</a></li>
    <li  style={{ float: "right"}}><img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="avatar"/>&nbsp;&nbsp;<span style={{color:"white"}}>swagtv &nbsp;&nbsp;</span></li>
</ul>

      <AnalyticsComponent/>
    </div>
  );
}

export default App;
