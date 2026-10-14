from flask import (
    Flask,
    jsonify
)

from flask_cors import CORS

from routes.prediction import (
    prediction_bp
)

from routes.data import (
    data_bp
)


app = Flask(__name__)

CORS(app)


app.register_blueprint(
    prediction_bp
)

app.register_blueprint(
    data_bp
)


@app.get("/")
def home():

    return jsonify(
        {
            "success": True,
            "message":
                "Crop Yield Prediction API is running."
        }
    )


@app.get("/api/health")
def health():

    return jsonify(
        {
            "success": True,
            "message":
                "Backend is healthy."
        }
    )


if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )