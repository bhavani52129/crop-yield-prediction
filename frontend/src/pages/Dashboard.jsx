import { useEffect, useState } from "react";

import {
  getStatistics,
  getAnalytics
} from "../api/api";

import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";


const modelResults = [
  {
    name: "Linear Regression",
    score: 62.35
  },
  {
    name: "Decision Tree",
    score: 97.33
  },
  {
    name: "Random Forest",
    score: 98.43,
    best: true
  },
  {
    name: "Gradient Boosting",
    score: 84.05
  }
];


export default function Dashboard() {

  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  const [error, setError] = useState("");


  useEffect(() => {

    async function loadDashboard() {

      try {

        const [statsData, analyticsData] =
          await Promise.all([
            getStatistics(),
            getAnalytics()
          ]);


        if (!statsData.success) {

          setError(
            statsData.message ||
            "Could not load statistics."
          );

          return;
        }


        if (!analyticsData.success) {

          setError(
            analyticsData.message ||
            "Could not load analytics."
          );

          return;
        }


        setStats(statsData);
        setAnalytics(analyticsData);


      } catch (err) {

        setError(
          "Could not connect to the Flask backend."
        );

      }

    }


    loadDashboard();

  }, []);


  if (error) {

    return (
      <div className="page-section">
        <ErrorMessage message={error} />
      </div>
    );

  }


  if (!stats || !analytics) {

    return (
      <Loading text="Loading dashboard..." />
    );

  }


  const maxYearYield = Math.max(
    ...analytics.yearly.map((item) => item.yield)
  );


  const maxCropYield = Math.max(
    ...analytics.crops.map((item) => item.yield)
  );


  const maxAreaYield = Math.max(
    ...analytics.areas.map((item) => item.yield)
  );


  return (

    <section className="page-section">

      <div className="page-heading">

        <p className="eyebrow">
          DATASET OVERVIEW
        </p>

        <h1>Analytics Dashboard</h1>

        <p>
          Explore the crop yield dataset and compare
          machine learning model performance.
        </p>

      </div>


      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">📊</div>

          <span>Dataset Records</span>

          <strong>
            {stats.records.toLocaleString()}
          </strong>

          <small>
            Available records
          </small>

        </div>


        <div className="stat-card">

          <div className="stat-icon">🌍</div>

          <span>Areas</span>

          <strong>{stats.areas}</strong>

          <small>
            Geographic areas
          </small>

        </div>


        <div className="stat-card">

          <div className="stat-icon">🌱</div>

          <span>Crops</span>

          <strong>{stats.crops}</strong>

          <small>
            Crop types
          </small>

        </div>


        <div className="stat-card">

          <div className="stat-icon">📅</div>

          <span>Year Range</span>

          <strong>
            {stats.year_min}–{stats.year_max}
          </strong>

          <small>
            Historical data
          </small>

        </div>


        <div className="stat-card highlight-stat">

          <div className="stat-icon">📈</div>

          <span>Average Yield</span>

          <strong>
            {stats.average_yield.toLocaleString()}
          </strong>

          <small>
            hg/ha
          </small>

        </div>

      </div>


      {/* Charts */}

      <div className="dashboard-grid">


        {/* Year chart */}

        <div className="chart-card chart-wide">

          <div className="chart-header">

            <div>

              <p className="eyebrow">
                TREND
              </p>

              <h2>Average Yield by Year</h2>

            </div>

            <span className="chart-badge">
              hg/ha
            </span>

          </div>


          <div className="year-chart">

            {analytics.yearly.map((item) => {

              const height =
                maxYearYield > 0
                  ? (item.yield / maxYearYield) * 100
                  : 0;

              return (

                <div
                  className="year-bar-wrapper"
                  key={item.year}
                  title={`${item.year}: ${item.yield.toLocaleString()} hg/ha`}
                >

                  <div className="year-bar-area">

                    <div
                      className="year-bar"
                      style={{
                        height: `${Math.max(height, 4)}%`
                      }}
                    />

                  </div>

                  <span>
                    {item.year}
                  </span>

                </div>

              );

            })}

          </div>

        </div>


        {/* Crop chart */}

        <div className="chart-card">

          <div className="chart-header">

            <div>

              <p className="eyebrow">
                CROPS
              </p>

              <h2>Top Crops by Yield</h2>

            </div>

          </div>


          <div className="horizontal-chart">

            {analytics.crops.map((item) => {

              const width =
                maxCropYield > 0
                  ? (item.yield / maxCropYield) * 100
                  : 0;

              return (

                <div
                  className="horizontal-row"
                  key={item.crop}
                >

                  <div className="row-label">

                    <span>
                      {item.crop}
                    </span>

                    <strong>
                      {item.yield.toLocaleString()}
                    </strong>

                  </div>

                  <div className="progress-track">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${width}%`
                      }}
                    />

                  </div>

                </div>

              );

            })}

          </div>

        </div>


        {/* Area chart */}

        <div className="chart-card">

          <div className="chart-header">

            <div>

              <p className="eyebrow">
                AREAS
              </p>

              <h2>Top Areas by Yield</h2>

            </div>

          </div>


          <div className="horizontal-chart">

            {analytics.areas.map((item) => {

              const width =
                maxAreaYield > 0
                  ? (item.yield / maxAreaYield) * 100
                  : 0;

              return (

                <div
                  className="horizontal-row"
                  key={item.area}
                >

                  <div className="row-label">

                    <span>
                      {item.area}
                    </span>

                    <strong>
                      {item.yield.toLocaleString()}
                    </strong>

                  </div>

                  <div className="progress-track">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${width}%`
                      }}
                    />

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </div>


      {/* Model Performance */}

      <div className="model-performance">

        <div className="section-heading left-heading">

          <p className="eyebrow">
            MODEL EVALUATION
          </p>

          <h2>Machine Learning Performance</h2>

          <p>
            Four regression algorithms were compared
            using the same dataset and evaluation process.
          </p>

        </div>


        <div className="model-grid">

          {modelResults.map((model) => (

            <div
              className={
                model.best
                  ? "model-card best-model"
                  : "model-card"
              }
              key={model.name}
            >

              {model.best && (
                <div className="best-label">
                  🏆 BEST MODEL
                </div>
              )}

              <h3>{model.name}</h3>

              <div className="model-score-value">
                {model.score}%
              </div>

              <div className="model-progress">

                <div
                  style={{
                    width: `${model.score}%`
                  }}
                />

              </div>

              <span>
                R² Score
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}