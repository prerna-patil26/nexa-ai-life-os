import cv2
import numpy as np
from typing import List

class FrameExtractor:
    """Extract frames from videos"""
    
    def __init__(self):
        pass
    
    def extract_frames(self, video_path: str, max_frames: int = 10) -> List[np.ndarray]:
        """Extract key frames from video"""
        cap = cv2.VideoCapture(video_path)
        frames = []
        
        if not cap.isOpened():
            return frames
        
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        if total_frames == 0:
            return frames
        
        # Calculate frame interval
        interval = max(total_frames // max_frames, 1)
        
        frame_idx = 0
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            if frame_idx % interval == 0:
                frames.append(frame)
            
            frame_idx += 1
            if len(frames) >= max_frames:
                break
        
        cap.release()
        return frames
    
    def extract_single_frame(self, video_path: str, timestamp_sec: float = 0) -> np.ndarray:
        """Extract frame at specific timestamp"""
        cap = cv2.VideoCapture(video_path)
        
        if not cap.isOpened():
            return None
        
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_num = int(timestamp_sec * fps)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
        
        ret, frame = cap.read()
        cap.release()
        
        if ret:
            return frame
        return None
