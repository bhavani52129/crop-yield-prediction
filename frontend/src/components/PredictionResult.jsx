export default function PredictionResult({ result }) {

  if (!result) {
    return null;
  }


  return (

    <div className="result-card">

      <div className="result-top">

        <div>

          <p className="eyebrow">
            PREDICTION COMPLETE
          </p>

          <h2>Estimated Crop Yield</h2>

        </div>

        <div className="result-check">
          ✓
        </div>

      </div>


      <div className="yield-display">

        <strong>
          {Number(result.predicted_yield).toLocaleString(
            undefined,
            {
              maximumFractionDigits: 2
            }
          )}
        </strong>

        <span>
          {result.unit}
        </span>

      </div>


      <div className="result-note">

        <span>🤖</span>

        <p>
          This value is a machine-learning estimate
          based on the conditions you provided.
        </p>

      </div>

    </div>

  );
}