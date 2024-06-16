import './CSS_files/app.css'
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="front-page">
            <div className="header">
                <h1>Welcome to our Polling Website</h1>
            </div>
            <div className="content">
                <div className="image-container">
                    <img src="https://via.placeholder.com/400" alt="Polling Website" />
                </div>
                <div className="text-container">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus urna nec dui
                        convallis, sed bibendum dui sagittis. Duis tristique justo vitae metus malesuada,
                        at sodales ex tincidunt.
                    </p>
                    <p>
                        Proin sodales, velit ac viverra bibendum, velit lorem tempor lorem, id tempor ligula
                        dui non libero. Ut vitae ullamcorper ligula, in interdum arcu.
                    </p>
                    <p>
                        Phasellus et ligula eu libero convallis semper. Duis luctus aliquet efficitur.
                        Integer fermentum urna ut sapien consequat, a laoreet felis posuere.
                    </p>
                    <div className="action-buttons">
                        <Link to="/signup" className="btn">Sign Up</Link>
                        <Link to="/login" className="btn">Login</Link>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default App;
