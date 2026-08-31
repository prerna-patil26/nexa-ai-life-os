import cv2
import numpy as np
from typing import Dict, Any, List
from app.vision.preprocess import ImagePreprocessor
from app.vision.ocr import OCREngine

class VisionAnalyzer:
    """Main vision analysis engine"""
    
    def __init__(self):
        self.preprocessor = ImagePreprocessor()
        self.ocr = OCREngine()
    
    def analyze_image(self, image: np.ndarray) -> Dict[str, Any]:
        """Analyze image and extract information"""
        result = {}
        
        # Preprocess
        preprocessed = self.preprocessor.preprocess(image)
        
        # Extract text
        text = self.ocr.extract_text(image)
        result["text"] = text
        
        # Get image dimensions
        height, width = image.shape[:2]
        result["dimensions"] = {"width": width, "height": height}
        
        # Detect edges
        gray = self.preprocessor.grayscale(image)
        edges = cv2.Canny(gray, 100, 200)
        result["edge_density"] = float(np.sum(edges > 0)) / (width * height)
        
        # Color analysis
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        result["color_mean"] = hsv.mean(axis=(0,1)).tolist()
        
        return result
    
    def analyze_screenshot(self, image_path: str) -> Dict[str, Any]:
        """Analyze a screenshot"""
        image = cv2.imread(image_path)
        if image is None:
            return {"error": "Could not read image"}
        return self.analyze_image(image)
    
    def analyze_video(self, video_path: str, max_frames: int = 10) -> Dict[str, Any]:
        """Analyze video by extracting frames"""
        extractor = FrameExtractor()
        frames = extractor.extract_frames(video_path, max_frames=max_frames)
        
        result = {
            "frame_count": len(frames),
            "frames": []
        }
        
        for i, frame in enumerate(frames):
            frame_analysis = self.analyze_image(frame)
            result["frames"].append({
                "frame_index": i,
                "analysis": frame_analysis
            })
        
        return result
