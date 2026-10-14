export default function About() {
  return (
    <section className="page-section">

      <div className="page-heading">

        <p className="eyebrow">
          PROJECT INFORMATION
        </p>

        <h1>About the Project</h1>

        <p>
          An end-to-end Data Science and Machine Learning
          application for predicting crop yield from
          historical agricultural and environmental data.
        </p>

      </div>


      <div className="about-grid">


        <div className="about-main-card">

          <div className="about-icon">
            🌾
          </div>

          <h2>Crop Yield Prediction</h2>

          <p>
            Agriculture depends on several environmental
            and agricultural conditions. This project uses
            historical crop data to estimate crop yield
            using machine learning.
          </p>

          <p>
            The system provides a simple web interface where
            users can select an area and crop and enter
            rainfall, pesticide, temperature and year
            information to receive a predicted yield.
          </p>

        </div>


        <div className="about-info-card">

          <h3>Dataset</h3>

          <div className="info-stat">
            <strong>28,242</strong>
            <span>Records</span>
          </div>

          <div className="info-stat">
            <strong>101</strong>
            <span>Areas</span>
          </div>

          <div className="info-stat">
            <strong>10</strong>
            <span>Crops</span>
          </div>

          <div className="info-stat">
            <strong>1990–2013</strong>
            <span>Year Range</span>
          </div>

        </div>

      </div>


      <div className="about-section">

        <div className="section-heading left-heading">

          <p className="eyebrow">
            TECHNOLOGY
          </p>

          <h2>Technology Stack</h2>

        </div>


        <div className="stack-grid">

          <div className="stack-card">
            <span>🐍</span>
            <h3>Python</h3>
            <p>Data processing and ML</p>
          </div>

          <div className="stack-card">
            <span>🐼</span>
            <h3>Pandas</h3>
            <p>Dataset manipulation</p>
          </div>

          <div className="stack-card">
            <span>🤖</span>
            <h3>Scikit-learn</h3>
            <p>Machine learning</p>
          </div>

          <div className="stack-card">
            <span>⚡</span>
            <h3>Flask</h3>
            <p>Backend REST API</p>
          </div>

          <div className="stack-card">
            <span>⚛️</span>
            <h3>React</h3>
            <p>Frontend interface</p>
          </div>

          <div className="stack-card">
            <span>📡</span>
            <h3>Axios</h3>
            <p>API communication</p>
          </div>

        </div>

      </div>


      <div className="about-section">

        <div className="section-heading left-heading">

          <p className="eyebrow">
            ML PIPELINE
          </p>

          <h2>Project Workflow</h2>

        </div>


        <div className="pipeline">

          <div className="pipeline-step">
            <span>01</span>
            <strong>Dataset</strong>
            <p>Historical crop data</p>
          </div>

          <div className="pipeline-line"></div>

          <div className="pipeline-step">
            <span>02</span>
            <strong>Preprocessing</strong>
            <p>Clean and prepare data</p>
          </div>

          <div className="pipeline-line"></div>

          <div className="pipeline-step">
            <span>03</span>
            <strong>Training</strong>
            <p>Train regression models</p>
          </div>

          <div className="pipeline-line"></div>

          <div className="pipeline-step">
            <span>04</span>
            <strong>Evaluation</strong>
            <p>Compare model scores</p>
          </div>

          <div className="pipeline-line"></div>

          <div className="pipeline-step">
            <span>05</span>
            <strong>Prediction</strong>
            <p>Estimate crop yield</p>
          </div>

        </div>

      </div>


      <div className="features-section">

        <div className="feature-item">
          <span>📍</span>
          <div>
            <strong>Area</strong>
            <p>Geographical location</p>
          </div>
        </div>

        <div className="feature-item">
          <span>🌱</span>
          <div>
            <strong>Crop</strong>
            <p>Selected crop type</p>
          </div>
        </div>

        <div className="feature-item">
          <span>📅</span>
          <div>
            <strong>Year</strong>
            <p>Historical year</p>
          </div>
        </div>

        <div className="feature-item">
          <span>🌧️</span>
          <div>
            <strong>Rainfall</strong>
            <p>Average rainfall</p>
          </div>
        </div>

        <div className="feature-item">
          <span>🧪</span>
          <div>
            <strong>Pesticides</strong>
            <p>Pesticide usage</p>
          </div>
        </div>

        <div className="feature-item">
          <span>🌡️</span>
          <div>
            <strong>Temperature</strong>
            <p>Average temperature</p>
          </div>
        </div>

      </div>

    </section>
  );
}