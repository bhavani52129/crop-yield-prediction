from flask import Blueprint, jsonify
import pandas as pd

from config.config import DATASET_PATH

data_bp = Blueprint("data", __name__)

_df = None


def get_dataset():
    global _df

    if _df is None:
        if not DATASET_PATH.exists():
            raise FileNotFoundError(
                f"Dataset not found: {DATASET_PATH}"
            )

        _df = pd.read_csv(DATASET_PATH)

        if "Unnamed: 0" in _df.columns:
            _df = _df.drop(columns=["Unnamed: 0"])

    return _df


@data_bp.route("/api/areas", methods=["GET"])
def areas():
    try:
        df = get_dataset()

        values = sorted(
            df["Area"].dropna().unique().tolist()
        )

        return jsonify({
            "success": True,
            "areas": values
        })

    except Exception as error:
        return jsonify({
            "success": False,
            "message": str(error)
        }), 500


@data_bp.route("/api/crops", methods=["GET"])
def crops():
    try:
        df = get_dataset()

        values = sorted(
            df["Item"].dropna().unique().tolist()
        )

        return jsonify({
            "success": True,
            "crops": values
        })

    except Exception as error:
        return jsonify({
            "success": False,
            "message": str(error)
        }), 500


@data_bp.route("/api/statistics", methods=["GET"])
def statistics():
    try:
        df = get_dataset()

        return jsonify({
            "success": True,
            "records": int(len(df)),
            "areas": int(df["Area"].nunique()),
            "crops": int(df["Item"].nunique()),
            "year_min": int(df["Year"].min()),
            "year_max": int(df["Year"].max()),
            "average_yield": round(
                float(df["hg/ha_yield"].mean()), 2
            )
        })

    except Exception as error:
        return jsonify({
            "success": False,
            "message": str(error)
        }), 500


# ---------------------------------------------------------
# Dashboard analytics
# ---------------------------------------------------------

@data_bp.route("/api/analytics", methods=["GET"])
def analytics():
    try:
        df = get_dataset()

        # Average yield by year
        yearly = (
            df.groupby("Year")["hg/ha_yield"]
            .mean()
            .reset_index()
            .sort_values("Year")
        )

        yearly_data = [
            {
                "year": int(row["Year"]),
                "yield": round(float(row["hg/ha_yield"]), 2)
            }
            for _, row in yearly.iterrows()
        ]

        # Average yield by crop
        crop_data = (
            df.groupby("Item")["hg/ha_yield"]
            .mean()
            .sort_values(ascending=False)
            .head(10)
        )

        crop_results = [
            {
                "crop": str(index),
                "yield": round(float(value), 2)
            }
            for index, value in crop_data.items()
        ]

        # Average yield by area
        area_data = (
            df.groupby("Area")["hg/ha_yield"]
            .mean()
            .sort_values(ascending=False)
            .head(10)
        )

        area_results = [
            {
                "area": str(index),
                "yield": round(float(value), 2)
            }
            for index, value in area_data.items()
        ]

        return jsonify({
            "success": True,
            "yearly": yearly_data,
            "crops": crop_results,
            "areas": area_results
        })

    except Exception as error:
        return jsonify({
            "success": False,
            "message": str(error)
        }), 500