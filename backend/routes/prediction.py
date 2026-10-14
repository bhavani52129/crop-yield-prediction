from flask import (
    Blueprint,
    jsonify,
    request
)

from utils.prediction_utils import (
    predict_crop_yield
)

from utils.validation import (
    validate_prediction_data
)


prediction_bp = Blueprint(
    "prediction",
    __name__
)


@prediction_bp.route(
    "/api/predict",
    methods=["POST"]
)
def predict():

    data = request.get_json(
        silent=True
    )

    if not isinstance(
        data,
        dict
    ):

        return jsonify(
            {
                "success": False,
                "message":
                    "Request body must be valid JSON."
            }
        ), 400

    valid, message = (
        validate_prediction_data(
            data
        )
    )

    if not valid:

        return jsonify(
            {
                "success": False,
                "message": message
            }
        ), 400

    try:

        prediction = (
            predict_crop_yield(
                data
            )
        )

        return jsonify(
            {
                "success": True,

                "predicted_yield":
                    round(
                        prediction,
                        2
                    ),

                "unit":
                    "hg/ha"
            }
        )

    except FileNotFoundError as error:

        return jsonify(
            {
                "success": False,
                "message": str(error)
            }
        ), 500

    except Exception as error:

        return jsonify(
            {
                "success": False,

                "message":
                    f"Prediction failed: {error}"
            }
        ), 500