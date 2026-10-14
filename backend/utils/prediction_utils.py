import pandas as pd

from models.prediction_model import (
    get_model
)


def predict_crop_yield(data):

    input_data = pd.DataFrame(
        [
            {
                "Area":
                    str(
                        data["area"]
                    ).strip(),

                "Item":
                    str(
                        data["crop"]
                    ).strip(),

                "Year":
                    int(
                        data["year"]
                    ),

                "average_rain_fall_mm_per_year":
                    float(
                        data["rainfall"]
                    ),

                "pesticides_tonnes":
                    float(
                        data["pesticides"]
                    ),

                "avg_temp":
                    float(
                        data["temperature"]
                    )
            }
        ]
    )

    model = get_model()

    prediction = model.predict(
        input_data
    )[0]

    return float(
        prediction
    )