from config.config import (
    MIN_YEAR,
    MAX_YEAR
)


def validate_prediction_data(data):

    required_fields = [
        "area",
        "crop",
        "year",
        "rainfall",
        "pesticides",
        "temperature"
    ]

    missing = [
        field
        for field in required_fields
        if field not in data
    ]

    if missing:

        return (
            False,
            "Missing fields: " +
            ", ".join(missing)
        )

    if not str(data["area"]).strip():

        return (
            False,
            "Area is required."
        )

    if not str(data["crop"]).strip():

        return (
            False,
            "Crop is required."
        )

    try:

        year = int(
            data["year"]
        )

    except (
        TypeError,
        ValueError
    ):

        return (
            False,
            "Year must be an integer."
        )

    if (
        year < MIN_YEAR
        or
        year > MAX_YEAR
    ):

        return (
            False,
            f"Year must be between "
            f"{MIN_YEAR} and {MAX_YEAR}."
        )

    numeric_fields = [
        "rainfall",
        "pesticides",
        "temperature"
    ]

    for field in numeric_fields:

        try:

            value = float(
                data[field]
            )

        except (
            TypeError,
            ValueError
        ):

            return (
                False,
                f"{field} must be a number."
            )

        if (
            field != "temperature"
            and
            value < 0
        ):

            return (
                False,
                f"{field} cannot be negative."
            )

    return True, ""