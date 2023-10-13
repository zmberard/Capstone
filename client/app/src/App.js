import logo from "./logo.svg";
import "./App.css";
  
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" 
             alt="logo" />
          
<p>A simple React app.....</p>
  
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

App.get('/apply', require('./endpoints/showApplication'))
App.post('/apply', require('./endpoints/processApplication'))
  
App.get('/email', require('./endpoints/sendEmail'))
App.post('/email', require('./endpoints/processEmail'))

App.get('/login', require('./endpoints/showLogin'))
App.post('/login', require('./endpoints/processLogin'))

App.get('/profile', require('./endpoints/studentProfile'))
App.post('/profile', require('./endpoints/processProfile'))


export default App;