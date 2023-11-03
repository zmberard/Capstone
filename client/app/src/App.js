//import logo from "./logo.svg";
import "./App.css";
  
function App() {
  return (
    <div className="App">


      <ul>
        <li><a class="active" href="#home">CS Applications</a></li>
        <li><a href="#news">Apply</a></li>
      </ul>
      <div class="container">
        <div class="jumbotron">
          <h1>CS Applications</h1>
          <p>Welcome to the CS Applications System</p>
        </div>
      </div>
      <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>Requirements</h2>
          <p>In order to be considered for admission to the professional program, a student must have:
          </p>
              <ol class="customIndent">
                <li>Passed all pre-professional program courses with a C or better</li>
                <li>Achieved at least a 2.3 GPA on all pre-professional courses (including transfer courses)</li>
              </ol>
        </div>
        <div class="col-md-6">
          <h2> Apply </h2>
          <p>
          When you are ready to apply, click here!
          </p>
          <button class="button"> Apply! </button>
        </div>
        
      </div>
      
        
      </div>
    </div>
  );
}

export default App;