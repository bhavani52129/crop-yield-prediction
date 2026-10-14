import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">

          <div className="hero-text">
            <div className="hero-badge">
              DATA SCIENCE + MACHINE LEARNING
            </div>

            <h1>
              Smart Crop Yield
              <span> Prediction</span>
            </h1>

            <p className="hero-description">
              Predict expected crop yield using historical agricultural,
              rainfall, pesticide, temperature, crop and area data.
            </p>

            <div className="hero-buttons">
              <Link to="/prediction" className="primary-button">
                🌱 Start Prediction
              </Link>

              <Link to="/dashboard" className="secondary-button">
                View Dashboard
              </Link>
            </div>
          </div>

          <div className="hero-visual">

            <div className="prediction-preview">
              <div className="preview-header">
                <span>AI Prediction</span>
                <span className="status-dot"></span>
              </div>

              <div className="preview-icon">
                🌾
              </div>

              <div className="preview-value">
                98.43%
              </div>

              <div className="preview-label">
                Best Model R² Score
              </div>

              <div className="preview-model">
                <span>Model</span>
                <strong>Random Forest</strong>
              </div>
            </div>

            <div className="floating-card floating-one">
              🌧️
              <div>
                <strong>Rainfall</strong>
                <span>Environmental Data</span>
              </div>
            </div>

            <div className="floating-card floating-two">
              🌡️
              <div>
                <strong>Temperature</strong>
                <span>Climate Feature</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="quick-stats">

        <div className="quick-stat">
          <div className="quick-icon">📊</div>
          <div>
            <strong>28,242+</strong>
            <span>Dataset Records</span>
          </div>
        </div>

        <div className="quick-stat">
          <div className="quick-icon">🌍</div>
          <div>
            <strong>101</strong>
            <span>Areas</span>
          </div>
        </div>

        <div className="quick-stat">
          <div className="quick-icon">🌱</div>
          <div>
            <strong>10</strong>
            <span>Crop Types</span>
          </div>
        </div>

        <div className="quick-stat">
          <div className="quick-icon">🏆</div>
          <div>
            <strong>98.43%</strong>
            <span>Best R² Score</span>
          </div>
        </div>

      </section>

      {/* How it works */}
      <section className="section-block">

        <div className="section-heading">
          <p className="eyebrow">SIMPLE WORKFLOW</p>
          <h2>How Crop Yield Prediction Works</h2>
          <p>
            The system processes agricultural and environmental information
            before generating a machine learning prediction.
          </p>
        </div>

        <div className="workflow-grid">

          <div className="workflow-card">
            <div className="step-number">01</div>
            <div className="workflow-icon">📝</div>
            <h3>Enter Data</h3>
            <p>
              Select the crop, area, year, rainfall, pesticides and temperature.
            </p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-card">
            <div className="step-number">02</div>
            <div className="workflow-icon">⚙️</div>
            <h3>ML Processing</h3>
            <p>
              The trained Random Forest model processes the supplied features.
            </p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-card">
            <div className="step-number">03</div>
            <div className="workflow-icon">📈</div>
            <h3>Get Prediction</h3>
            <p>
              The system displays the estimated crop yield in hg/ha.
            </p>
          </div>

        </div>

      </section>

      {/* Model section */}
      <section className="model-highlight">

        <div>
          <p className="eyebrow">MACHINE LEARNING MODEL</p>

          <h2>Random Forest performed best</h2>

          <p>
            Four regression algorithms were evaluated using the crop yield
            dataset. Random Forest achieved the highest R² score.
          </p>

          <Link to="/dashboard" className="secondary-button">
            View Model Performance
          </Link>
        </div>

        <div className="model-score">
          <span>R² Score</span>
          <strong>98.43%</strong>
          <small>Random Forest</small>
        </div>

      </section>

      {/* Technologies */}
      <section className="section-block">

        <div className="section-heading">
          <p className="eyebrow">TECHNOLOGY STACK</p>
          <h2>Built with modern tools</h2>
        </div>

        <div className="technology-grid">

          <div className="technology-card">
            <span>🐍</span>
            <h3>Python</h3>
            <p>Data processing and machine learning</p>
          </div>

          <div className="technology-card">
            <span>🤖</span>
            <h3>Scikit-learn</h3>
            <p>Model training and prediction</p>
          </div>

          <div className="technology-card">
            <span>⚡</span>
            <h3>Flask</h3>
            <p>Backend REST API</p>
          </div>

          <div className="technology-card">
            <span>⚛️</span>
            <h3>React</h3>
            <p>Interactive frontend</p>
          </div>

        </div>

      </section>

    </div>
  );
}