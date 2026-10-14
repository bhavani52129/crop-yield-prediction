from pathlib import Path
import json
import joblib

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import (
    RandomForestRegressor,
    GradientBoostingRegressor
)
from sklearn.linear_model import LinearRegression
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.tree import DecisionTreeRegressor

from preprocess import FEATURE_COLUMNS, TARGET_COLUMN, load_dataset


PROJECT_ROOT = Path(__file__).resolve().parents[1]

MODEL_DIR = PROJECT_ROOT / "ml" / "models"
REPORT_DIR = PROJECT_ROOT / "reports"


CATEGORICAL_FEATURES = [
    "Area",
    "Item"
]

NUMERICAL_FEATURES = [
    "Year",
    "average_rain_fall_mm_per_year",
    "pesticides_tonnes",
    "avg_temp"
]


def make_preprocessor():

    return ColumnTransformer(
        transformers=[
            (
                "categorical",
                OneHotEncoder(handle_unknown="ignore"),
                CATEGORICAL_FEATURES
            ),
            (
                "numerical",
                "passthrough",
                NUMERICAL_FEATURES
            )
        ]
    )


def make_pipeline(model):

    return Pipeline(
        steps=[
            (
                "preprocessor",
                make_preprocessor()
            ),
            (
                "model",
                model
            )
        ]
    )


def evaluate(model, X_test, y_test):

    predictions = model.predict(X_test)

    mae = mean_absolute_error(
        y_test,
        predictions
    )

    rmse = mean_squared_error(
        y_test,
        predictions
    ) ** 0.5

    r2 = r2_score(
        y_test,
        predictions
    )

    return {
        "MAE": float(mae),
        "RMSE": float(rmse),
        "R2": float(r2)
    }


def main():

    df = load_dataset()

    print("\nDataset loaded successfully.")
    print("Rows:", len(df))
    print("Columns:", df.columns.tolist())

    X = df[FEATURE_COLUMNS]

    y = df[TARGET_COLUMN]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42
    )

    models = {

        "Linear Regression":
            LinearRegression(),

        "Decision Tree":
            DecisionTreeRegressor(
                max_depth=20,
                min_samples_leaf=2,
                random_state=42
            ),

        "Random Forest":
            RandomForestRegressor(
                n_estimators=200,
                max_depth=None,
                min_samples_leaf=1,
                random_state=42,
                n_jobs=-1
            ),

        "Gradient Boosting":
            GradientBoostingRegressor(
                n_estimators=150,
                learning_rate=0.05,
                max_depth=3,
                random_state=42
            )
    }

    results = {}

    trained_models = {}

    print("\nTraining models...\n")

    for name, estimator in models.items():

        pipeline = make_pipeline(estimator)

        pipeline.fit(
            X_train,
            y_train
        )

        metrics = evaluate(
            pipeline,
            X_test,
            y_test
        )

        results[name] = metrics

        trained_models[name] = pipeline

        print(name)

        print(
            f"  MAE : {metrics['MAE']:.2f}"
        )

        print(
            f"  RMSE: {metrics['RMSE']:.2f}"
        )

        print(
            f"  R2  : {metrics['R2']:.4f}"
        )

        print()

    # Select model with highest R2
    best_model_name = max(
        results,
        key=lambda name: results[name]["R2"]
    )

    best_model = trained_models[
        best_model_name
    ]

    MODEL_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    REPORT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    model_path = (
        MODEL_DIR /
        "crop_yield_pipeline.pkl"
    )

    joblib.dump(
        best_model,
        model_path
    )

    metadata = {

        "best_model":
            best_model_name,

        "features":
            FEATURE_COLUMNS,

        "target":
            TARGET_COLUMN,

        "year_min":
            int(df["Year"].min()),

        "year_max":
            int(df["Year"].max()),

        "areas_count":
            int(df["Area"].nunique()),

        "crops_count":
            int(df["Item"].nunique()),

        "records":
            int(len(df)),

        "metrics":
            results
    }

    metrics_path = (
        REPORT_DIR /
        "model_metrics.json"
    )

    with open(
        metrics_path,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            metadata,
            file,
            indent=4
        )

    print(
        f"Best model: {best_model_name}"
    )

    print(
        f"Saved model: {model_path}"
    )

    print(
        f"Saved metrics: {metrics_path}"
    )


if __name__ == "__main__":
    main()