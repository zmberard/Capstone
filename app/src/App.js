//import logo from "./logo.svg";
import "./App.css";
  
function App() {
  return (
    <div className="App">
      <banner className="App-banner">
          <p> CS Applications</p>
          <p> Apply </p>
      </banner>
      <header className="App-header">
        
        
          
<p>CS Applications</p>
  
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form action="../../post" method="post" 
              className="form">
          <button type="submit">Connected?</button>
        </form>
      </header>
    </div>
  );
}
  
export default App;