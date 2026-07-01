from fastapi import FastAPI
from fastapi.responses import JSONResponse
from scheme.user_input import user_input
from model.predict import predict_output
from fastapi.middleware.cors import CORSMiddleware
from scheme.budget import get_budget_car;
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {"Message":"Welcome to Car price prediction api"}

@app.post("/predict")
def predict_price(data:user_input):
    userInput={
         "Name":data.Name,
        "Model":data.Model,
        "Mileage":data.Mileage,
        "Fuel Type":data.FuelType,
        "Engine":data.EngineCapacity,
        "Transmission":data.Transmission,
        "City":data.City    
    }
    
    try:
        prediction=predict_output(userInput)
        return JSONResponse(status_code=200,content={"response":prediction})
    except Exception as e:
        return JSONResponse(status_code=500,content=str(e))
@app.get("/budget/{mini}/{maxi}")
def budget_car(mini:int,maxi:int):
    
  
    try:
        
        data=get_budget_car(mini,maxi)
        return JSONResponse(status_code=200,content={"budget":data})
    except Exception as e:
        return JSONResponse(status_code=500,content=str(e))
    
        
    