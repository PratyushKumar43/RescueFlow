from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from serpapi.google_search import GoogleSearch
import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get API key from environment variable
SERP_API_KEY = os.getenv("SERP_API_KEY")

@app.get("/search")
def search_places(q: str = Query(...), lat: float = Query(40.7455096, description="Latitude"), lon: float = Query(-74.0083012, description="Longitude")):
    print(f"Searching for: {q} near {lat}, {lon}")
    
    params = {
        "engine": "google_maps",
        "q": q,
        "ll": f"@{lat},{lon},14z",
        "api_key": SERP_API_KEY
    }
    
    try:
        search = GoogleSearch(params)
        search_results = search.get_dict()
        return search_results
    except Exception as e:
        print(f"Error during search: {e}")
        return {"error": str(e)}

@app.get("/")
def read_root():
    return {"message": "Welcome to RescueFlow API"}
