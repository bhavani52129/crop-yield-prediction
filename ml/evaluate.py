from pathlib import Path
import json


PROJECT_ROOT = Path(__file__).resolve().parents[1]

metrics_path = (
    PROJECT_ROOT /
    "reports" /
    "model_metrics.json"
)


if not metrics_path.exists():

    print(
        "Model metrics not found."
    )

    print(
        "Run: py ml/train_model.py"
    )

else:

    with open(
        metrics_path,
        "r",
        encoding="utf-8"
    ) as file:

        data = json.load(file)

    print(
        "Best model:",
        data["best_model"]
    )

    print(
        "Dataset records:",
        data["records"]
    )

    print(
        "Areas:",
        data["areas_count"]
    )

    print(
        "Crops:",
        data["crops_count"]
    )

    print(
        "Year range:",
        data["year_min"],
        "-",
        data["year_max"]
    )

    print("\nModel comparison:")

    for name, metrics in data["metrics"].items():

        print(
            f"{name}: "
            f"MAE={metrics['MAE']:.2f}, "
            f"RMSE={metrics['RMSE']:.2f}, "
            f"R2={metrics['R2']:.4f}"
        )