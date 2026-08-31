import cv2
import numpy as np

class OCREngine:
    """OCR engine for text extraction from images"""
    
    def __init__(self):
        try:
            import pytesseract
            self.tesseract = pytesseract
            self.available = True
        except ImportError:
            self.available = False
            print("pytesseract not installed. OCR will not work.")
    
    def extract_text(self, image: np.ndarray) -> str:
        """Extract text from image"""
        if not self.available:
            return "OCR not available - pytesseract not installed"
        
        # Convert to grayscale for better OCR
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Apply thresholding
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        # Extract text
        text = self.tesseract.image_to_string(thresh)
        return text.strip()
    
    def extract_text_from_path(self, image_path: str) -> str:
        """Extract text from image file"""
        image = cv2.imread(image_path)
        if image is None:
            return "Could not read image"
        return self.extract_text(image)
