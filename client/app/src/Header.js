import { Link } from 'react-router-dom'; 

const Header = () => {  
  
    return (
        <div className="header">
          <div className="header_container">
            <div className="header_logo">
              <a href="https://www.cs.ksu.edu">  
                <img src="./img/ksuLogo.png" alt="KSU Logo" />
              </a>
            </div>
            <div className="header_name">
              | Computer Science
            </div>
          </div>
        </div>
      );
      
}
export default Header;
  