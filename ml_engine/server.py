"""
LandslideShield NER — FastAPI Machine Learning Microservice
Exposes REST endpoints for real-time risk prediction, SHAP explanations, and CV crack diagnostics.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional
from model import LandslideRiskMLModel, ComputerVisionCrackDetector

app = FastAPI(
    title="LandslideShield NER — AI Risk Inference Engine",
    description="Operational Machine Learning microservice for landslide early-warning in North East India",
    version="2.4.0"
)

ml_model = LandslideRiskMLModel()
cv_model = ComputerVisionCrackDetector()

class TelemetryPayload(BaseModel):
    rainfall_24h: float = 82.0
    soil_moisture: float = 78.0
    slope_angle: float = 34.0
    insar_displacement: float = 14.2
    rainfall_3day: float = 176.0
    lithology_factor: float = 4.0
    road_cut_proximity: float = 15.0

class ImageDiagnosticPayload(BaseModel):
    image_id: str = "DSC_4091_fissure_cut.jpg"
    gps_coordinates: Optional[str] = "27.3389° N, 88.6065° E"

@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "LandslideShield NER ML Service",
        "model": ml_model.model_name,
        "cv_pipeline": "ResNet50-FissureNet",
        "benchmark": {
            "roc_auc": ml_model.roc_auc,
            "accuracy": ml_model.accuracy
        }
    }

@app.post("/predict")
def predict_landslide_risk(payload: TelemetryPayload):
    try:
        telemetry_dict = payload.model_dump()
        result = ml_model.predict(telemetry_dict)
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/cv/analyze-fissure")
def analyze_fissure(payload: ImageDiagnosticPayload):
    try:
        res = cv_model.analyze_image_telemetry(payload.model_dump())
        return {"success": True, "cv_diagnostics": res}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
