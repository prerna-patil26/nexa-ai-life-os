from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List, Optional
import random

router = APIRouter(prefix="/shopping", tags=["shopping"])

# Mock product database
MOCK_PRODUCTS = {
    "iphone": [
        {"platform": "Amazon", "price": 79900, "rating": 4.5},
        {"platform": "Flipkart", "price": 78900, "rating": 4.6},
        {"platform": "Croma", "price": 81000, "rating": 4.3},
    ],
    "laptop": [
        {"platform": "Amazon", "price": 54990, "rating": 4.4},
        {"platform": "Flipkart", "price": 53990, "rating": 4.5},
        {"platform": "Croma", "price": 55990, "rating": 4.2},
    ],
    "sneakers": [
        {"platform": "Myntra", "price": 2999, "rating": 4.3},
        {"platform": "Ajio", "price": 2899, "rating": 4.4},
        {"platform": "Amazon", "price": 3199, "rating": 4.2},
    ],
    "headphones": [
        {"platform": "Amazon", "price": 1999, "rating": 4.3},
        {"platform": "Flipkart", "price": 1899, "rating": 4.4},
        {"platform": "Croma", "price": 2099, "rating": 4.1},
    ],
    "smartwatch": [
        {"platform": "Amazon", "price": 3999, "rating": 4.2},
        {"platform": "Flipkart", "price": 3799, "rating": 4.3},
        {"platform": "Myntra", "price": 4099, "rating": 4.1},
    ],
}

@router.post("/search")
def search_products(data: Dict[str, Any]):
    """Search products across platforms and find best deals"""
    try:
        product_name = data.get("product_name", "").lower()
        budget = data.get("budget")
        has_image = data.get("has_image", False)
        
        if not product_name and not has_image:
            raise HTTPException(status_code=400, detail="Product name or image required")
        
        # Find matching products
        products = []
        matched_keyword = None
        
        for keyword, platform_products in MOCK_PRODUCTS.items():
            if keyword in product_name or (has_image and not product_name):
                products = platform_products
                matched_keyword = keyword
                break
        
        # If no match found, generate random products
        if not products:
            matched_keyword = product_name.split()[0] if product_name else "product"
            platforms = ["Amazon", "Flipkart", "Myntra"]
            products = [
                {"platform": p, "price": random.randint(1000, 50000), "rating": round(random.uniform(3.5, 4.8), 1)}
                for p in platforms
            ]
        
        # Filter by budget
        if budget:
            products = [p for p in products if p["price"] <= budget * 1.1]  # 10% tolerance
        
        if not products:
            return {
                "message": "No products found within budget",
                "products": [],
                "best_deal": None,
                "recommendations": ["Try increasing your budget", "Search with different keywords"]
            }
        
        # Find best deal
        best_deal = min(products, key=lambda x: x["price"])
        best_deal["is_best_deal"] = True
        
        # Generate recommendations
        recommendations = []
        if best_deal["price"] < 2000:
            recommendations.append("This is a budget-friendly option")
        if best_deal["rating"] > 4.4:
            recommendations.append("High rating - excellent quality")
        if len(products) > 2:
            recommendations.append("Multiple platforms available - compare before buying")
        recommendations.append("Check delivery time and return policy before purchase")
        
        return {
            "product": matched_keyword,
            "products": products,
            "best_deal": best_deal,
            "recommendations": recommendations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/compare")
def compare_products(data: Dict[str, Any]):
    """Compare specific products"""
    try:
        product_ids = data.get("product_ids", [])
        
        if not product_ids:
            raise HTTPException(status_code=400, detail="Product IDs required")
        
        # Mock comparison
        comparison = []
        for pid in product_ids:
            comparison.append({
                "id": pid,
                "name": f"Product {pid}",
                "platform": random.choice(["Amazon", "Flipkart", "Myntra"]),
                "price": random.randint(1000, 50000),
                "rating": round(random.uniform(3.5, 4.8), 1),
                "features": ["Feature A", "Feature B", "Feature C"],
                "delivery_days": random.randint(1, 7)
            })
        
        return {"products": comparison}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))