from pathlib import Path

import joblib
import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[1]

MODEL_PATH = (
    PROJECT_ROOT /
    "ml" /
    "models" /
    "crop_yield_pipeline.pkl"
)


def predict_yield(
    area,
    crop,
    year,
    rainfall,
    pesticides,
    temperature
):

    if not MODEL_PATH.exists():

        raise FileNotFoundError(
            "Trained model not found. "
            "Run: py ml/train_model.py"
        )

    model = joblib.load(
        MODEL_PATH
    )

    data = pd.DataFrame(
        [
            {
                "Area": area,

                "Item": crop,

                "Year": year,

                "average_rain_fall_mm_per_year":
                    rainfall,

                "pesticides_tonnes":
                    pesticides,

                "avg_temp":
                    temperature
            }
        ]
    )

    prediction = model.predict(data)[0]

    return float(prediction)


if __name__ == "__main__":

    prediction = predict_yield(
        "India",
        "Rice, paddy",
        2013,
        1083,
        15000,
        25
    )

    print(
        "Predicted yield:",
        prediction,
        "hg/ha"
    )