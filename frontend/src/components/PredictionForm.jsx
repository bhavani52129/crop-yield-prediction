import { useEffect, useState } from "react";

import {
  getAreas,
  getCrops,
  predictYield
} from "../api/api";

import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import PredictionResult from "./PredictionResult";


const initialForm = {
  area: "",
  crop: "",
  year: 2013,
  rainfall: "",
  pesticides: "",
  temperature: "",
};


export default function PredictionForm() {

  const [form, setForm] = useState(initialForm);

  const [areas, setAreas] = useState([]);
  const [crops, setCrops] = useState([]);

  const [loadingOptions, setLoadingOptions] = useState(true);
  const [predicting, setPredicting] = useState(false);

  const [error, setError] = useState("");
  const [result, setResult] = useState(null);


  useEffect(() => {

    async function loadOptions() {

      try {

        const [areaData, cropData] = await Promise.all([
          getAreas(),
          getCrops()
        ]);

        setAreas(areaData.areas || []);
        setCrops(cropData.crops || []);

      } catch (err) {

        setError(
          "Could not connect to the Flask backend. Start the backend first."
        );

      } finally {

        setLoadingOptions(false);

      }
    }

    loadOptions();

  }, []);


  function handleChange(event) {

    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));

  }


  async function handleSubmit(event) {

    event.preventDefault();

    setError("");
    setResult(null);


    if (
      !form.area ||
      !form.crop ||
      form.rainfall === "" ||
      form.pesticides === "" ||
      form.temperature === ""
    ) {

      setError("Please fill in all fields.");

      return;
    }


    setPredicting(true);


    try {

      const data = await predictYield({

        area: form.area,

        crop: form.crop,

        year: Number(form.year),

        rainfall: Number(form.rainfall),

        pesticides: Number(form.pesticides),

        temperature: Number(form.temperature)

      });


      if (!data.success) {

        setError(
          data.message || "Prediction failed."
        );

        return;
      }


      setResult(data);


    } catch (err) {

      const message =
        err.response?.data?.message ||
        "Prediction failed. Make sure the Flask backend is running.";

      setError(message);


    } finally {

      setPredicting(false);

    }

  }


  if (loadingOptions) {

    return (
      <Loading text="Loading crop and area data..." />
    );

  }


  return (

    <div className="prediction-layout">

      <div className="prediction-form-card">

        <div className="form-card-header">

          <div>
            <span className="form-icon">🌱</span>
          </div>

          <div>
            <h2>Enter Prediction Details</h2>

            <p>
              Provide the conditions you want the model to evaluate.
            </p>
          </div>

        </div>


        <form
          className="prediction-form"
          onSubmit={handleSubmit}
        >

          <div className="form-section-title">
            <span>01</span>
            Crop Information
          </div>


          <div className="form-grid">

            <label className="form-field">

              <span>Area</span>

              <select
                name="area"
                value={form.area}
                onChange={handleChange}
              >

                <option value="">
                  Select area
                </option>

                {areas.map((area) => (

                  <option
                    key={area}
                    value={area}
                  >
                    {area}
                  </option>

                ))}

              </select>

            </label>


            <label className="form-field">

              <span>Crop</span>

              <select
                name="crop"
                value={form.crop}
                onChange={handleChange}
              >

                <option value="">
                  Select crop
                </option>

                {crops.map((crop) => (

                  <option
                    key={crop}
                    value={crop}
                  >
                    {crop}
                  </option>

                ))}

              </select>

            </label>


            <label className="form-field">

              <span>Year</span>

              <input
                type="number"
                name="year"
                min="1990"
                max="2013"
                value={form.year}
                onChange={handleChange}
              />

              <small>
                Dataset range: 1990–2013
              </small>

            </label>

          </div>


          <div className="form-section-title">
            <span>02</span>
            Environmental Conditions
          </div>


          <div className="form-grid">

            <label className="form-field">

              <span>Average Rainfall</span>

              <div className="input-with-unit">

                <input
                  type="number"
                  min="0"
                  step="any"
                  name="rainfall"
                  placeholder="Example: 1083"
                  value={form.rainfall}
                  onChange={handleChange}
                />

                <span>mm/year</span>

              </div>

            </label>


            <label className="form-field">

              <span>Average Temperature</span>

              <div className="input-with-unit">

                <input
                  type="number"
                  step="any"
                  name="temperature"
                  placeholder="Example: 25"
                  value={form.temperature}
                  onChange={handleChange}
                />

                <span>°C</span>

              </div>

            </label>


            <label className="form-field">

              <span>Pesticides</span>

              <div className="input-with-unit">

                <input
                  type="number"
                  min="0"
                  step="any"
                  name="pesticides"
                  placeholder="Example: 15000"
                  value={form.pesticides}
                  onChange={handleChange}
                />

                <span>tonnes</span>

              </div>

            </label>

          </div>


          <button
            className="primary-button predict-button"
            type="submit"
            disabled={predicting}
          >

            {predicting
              ? "⏳ Predicting..."
              : "🌾 Predict Crop Yield"}

          </button>

        </form>

      </div>


      <div className="prediction-side">

        <div className="info-card">

          <span className="info-icon">🤖</span>

          <h3>AI Model</h3>

          <strong>Random Forest</strong>

          <p>
            Selected as the best-performing model after
            comparing four regression algorithms.
          </p>

        </div>


        <div className="info-card">

          <span className="info-icon">📈</span>

          <h3>Model Performance</h3>

          <strong>R² = 98.43%</strong>

          <p>
            The model achieved the highest R² score
            among the tested algorithms.
          </p>

        </div>

      </div>


      <ErrorMessage message={error} />

      <PredictionResult result={result} />

    </div>

  );
}