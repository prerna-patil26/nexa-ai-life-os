from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Dict, Any
import cv2
import numpy as np
import tempfile
import os
from app.vision.analyzer import VisionAnalyzer

router = APIRouter(prefix="/vision", tags=["vision"])

@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    """Analyze uploaded image"""
    try:
        # Read uploaded file
        contents = await file.read()
        
        # Convert to numpy array
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(status_code=400, detail="Could not decode image")
        
        # Analyze image
        analyzer = VisionAnalyzer()
        result = analyzer.analyze_image(image)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ocr")
async def extract_text(file: UploadFile = File(...)):
    """Extract text from image using OCR"""
    try:
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(status_code=400, detail="Could not decode image")
        
        analyzer = VisionAnalyzer()
        text = analyzer.ocr.extract_text(image)
        
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))