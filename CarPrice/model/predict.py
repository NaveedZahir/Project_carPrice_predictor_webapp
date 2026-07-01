import pickle 
import pandas as pd

with open("model/model_car.pkl","rb") as f:
    model=pickle.load(f)
def predict_output(user_input:dict):
    df=pd.DataFrame([user_input])
    price=(model.predict(df)[0])
    Mae=2.612
    lower=int(price-Mae)
    upper=int(price+Mae)
    return {"lower":lower,"upper":upper}


    
    