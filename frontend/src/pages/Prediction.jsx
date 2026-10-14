import PredictionForm from "../components/PredictionForm";

export default function Prediction() {
  return (
    <section className="page-section">

      <div className="page-heading centered-heading">
        <p className="eyebrow">MACHINE LEARNING</p>

        <h1>Predict Crop Yield</h1>

        <p>
          Enter agricultural and environmental conditions to estimate
          crop yield using the trained Random Forest model.
        </p>
      </div>

      <PredictionForm />

    </section>
  );
}