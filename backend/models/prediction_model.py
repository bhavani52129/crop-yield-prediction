from pathlib import Path

import joblib


PROJECT_ROOT = (
    Path(__file__)
    .resolve()
    .parents[2]
)


MODEL_PATH = (
    PROJECT_ROOT /
    "ml" /
    "models" /
    "crop_yield_pipeline.pkl"
)


_model = None


def get_model():

    global _model

    if _model is None:

        if not MODEL_PATH.exists():

            raise FileNotFoundError(
                f"Model not found at {MODEL_PATH}. "
                "Run 'py ml/train_model.py' first."
            )

        _model = joblib.load(
            MODEL_PATH
        )

    return _model