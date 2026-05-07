import pandas as pd
import numpy as np
import json
from pathlib import Path

excel_path = Path("../data/hospital_data.xlsx")
output_path = Path("../data/hospital_data.json")

bh = pd.read_excel(excel_path, sheet_name="BH Overall Excess x Hospital")
no_bh = pd.read_excel(excel_path, sheet_name="No BH Overall Excess x Hospital")

bh["bh"] = "Yes"
no_bh["bh"] = "No"

df = pd.concat([bh, no_bh])

print(df)

with open(output_path, "w") as f:
    json.dump(df.to_dict(orient="records"), f, indent=2)