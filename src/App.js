// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PaymentForm from './components/PaymentForm';
import Transactions from './components/Transactions';

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Payment</Link>
          </li>
          <li>
            <Link to="/transactions">View Transactions</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<PaymentForm />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </div>
  </Router>
);

export default App;
