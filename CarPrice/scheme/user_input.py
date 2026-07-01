from pydantic import BaseModel, Field, computed_field
from typing import Literal, Annotated


class user_input(BaseModel):
    Mileage:Annotated[int,Field(...,gt=-1,description="Mileage of car")]
    model:Annotated[int,Field(...,gt=0,description="Model of the car")]
    EngineCapacity:Annotated[int,Field(...,gt=0,description="In cc")]
    FuelType:Annotated[Literal["Petrol","Diesel","CNG","LPG","Hybrid"],Field(...,description="Fueltype of the car")]
    Transmission:Annotated[Literal["Manual","Automatic"],Field(...,description="Transmission type of a car")]
    Name:Annotated[str,Field(...,description="Name of the car like city etc ")]
    City:Annotated[str,Field(...,description="One city of pakistan")]
    
    @computed_field
    @property
    def Model(self)->float:
        return float(self.model)
    