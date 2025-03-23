"""
Test script to verify the correct import for the google-search-results package
"""
try:
    print("Trying: from serpapi import GoogleSearch")
    from serpapi import GoogleSearch
    print("Success! The correct import is: from serpapi import GoogleSearch")
    print("Class:", GoogleSearch)
except ImportError as e:
    print(f"Error: {e}")
    
    try:
        print("\nTrying: from serpapi.google_search import GoogleSearch")
        from serpapi.google_search import GoogleSearch
        print("Success! The correct import is: from serpapi.google_search import GoogleSearch")
        print("Class:", GoogleSearch)
    except ImportError as e:
        print(f"Error: {e}")
        
        try:
            print("\nTrying: from serpapi.google_maps_search import GoogleMapsSearch")
            from serpapi.google_maps_search import GoogleMapsSearch
            print("Success! The correct import is: from serpapi.google_maps_search import GoogleMapsSearch")
            print("Class:", GoogleMapsSearch)
        except ImportError as e:
            print(f"Error: {e}")
            
            try:
                print("\nTrying: from serpapi.serp_api_client import SerpApiClient")
                from serpapi.serp_api_client import SerpApiClient
                print("Success! The correct import is: from serpapi.serp_api_client import SerpApiClient")
                print("Class:", SerpApiClient)
            except ImportError as e:
                print(f"Error: {e}")

print("\nAttempting to list all modules and classes in the serpapi package:")
try:
    import serpapi
    print("serpapi package contents:", dir(serpapi))
except ImportError as e:
    print(f"Error importing serpapi: {e}")
