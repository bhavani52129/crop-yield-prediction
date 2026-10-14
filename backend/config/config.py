from pathlib import Path


PROJECT_ROOT = Path(
    __file__
).resolve().parents[2]


DATASET_PATH = (
    PROJECT_ROOT /
    "dataset" /
    "yield_df.csv"
)


MODEL_PATH = (
    PROJECT_ROOT /
    "ml" /
    "models" /
    "crop_yield_pipeline.pkl"
)


MIN_YEAR = 1990

MAX_YEAR = 2013