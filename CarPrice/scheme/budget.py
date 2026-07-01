import pandas as pd
import numpy as np

df = pd.read_csv(r"C:\Users\DELL\Downloads\cars.csv")


def get_budget_car(low, high):
    df1 = df[(df["Amount"] >= low) & (df["Amount"] <= high)]
    df2=df1.sample(10)
    return df2.to_dict(orient="records")


