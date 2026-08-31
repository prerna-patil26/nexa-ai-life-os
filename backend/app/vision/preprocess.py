import cv2
import numpy as np
from typing import Tuple, Optional

class ImagePreprocessor:
    """Preprocess images for analysis"""
    
    def __init__(self):
        pass
    
    def resize(self, image: np.ndarray, width: int = None, height: int = None) -> np.ndarray:
        """Resize image"""
        if width and height:
            return cv2.resize(image, (width, height))
        return image
    
    def grayscale(self, image: np.ndarray) -> np.ndarray:
        """Convert to grayscale"""
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    def denoise(self, image: np.ndarray) -> np.ndarray:
        """Apply denoising"""
        return cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 21)
    
    def enhance_contrast(self, image: np.ndarray) -> np.ndarray:
        """Enhance contrast using CLAHE"""
        if len(image.shape) == 2:
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
            return clahe.apply(image)
        else:
            lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
            l, a, b = cv2.split(lab)
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
            l = clahe.apply(l)
            return cv2.cvtColor(cv2.merge([l, a, b]), cv2.COLOR_LAB2BGR)
    
    def preprocess(self, image: np.ndarray) -> np.ndarray:
        """Full preprocessing pipeline"""
        # Denoise
        denoised = self.denoise(image)
        # Enhance contrast
        enhanced = self.enhance_contrast(denoised)
        return enhanced
