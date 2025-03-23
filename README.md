# RescueFlow

![RescueFlow Logo](./public/rescue-flow-logo.svg)

## Emergency Medical Services Finder

RescueFlow is a web application designed to help users quickly find nearby medical facilities in emergency situations. By combining geolocation with powerful search functionality, RescueFlow provides immediate access to critical healthcare information when it matters most.

## Features

- **Location-Based Search**: Automatically detects user location or accepts manual location input
- **Customizable Search Queries**: Find hospitals, clinics, emergency rooms, pharmacies, and more
- **Interactive Results**: View comprehensive information about each medical facility
- **Mobile-Responsive Design**: Access from any device in emergency situations
- **Emergency Resources**: Quick access to emergency contact numbers and resources

## Technology Stack

### Frontend
- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework for styling

### Backend
- **FastAPI**: Modern, high-performance Python web framework
- **SERP API**: Integration for Google Maps search functionality

## Getting Started

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- npm or yarn
- pip

### Environment Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/raksha-app.git
   cd raksha-app
   ```

2. Set up the backend environment
   ```bash
   cd Backend
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the Backend directory with your SERP API key
   ```
   SERP_API_KEY=your_serp_api_key_here
   ```

4. Set up the frontend environment
   ```bash
   cd ..  # Back to root directory
   npm install
   # or
   yarn install
   ```

5. Create a `.env.local` file in the root directory
   ```
   BACKEND_URL=http://localhost:8000
   ```

### Running the Application

1. Start the backend server
   ```bash
   cd Backend
   uvicorn main:app --reload
   ```

2. In a separate terminal, start the frontend development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Homepage**: Click "Go to Dashboard" to access the search functionality
2. **Dashboard**: 
   - Allow location access for better results
   - Enter your search query (e.g., "hospitals", "emergency rooms")
   - View results with important details like:
     - Facility name and address
     - Phone number
     - Opening hours
     - Ratings and reviews
     - Direct links to websites and maps

## API Reference

### Backend Endpoints

#### GET `/search`
Search for medical facilities near a specified location.

**Parameters**:
- `q` (required): Search query (e.g., "hospitals", "clinics")
- `lat` (optional): Latitude (defaults to 40.7455096)
- `lon` (optional): Longitude (defaults to -74.0083012)

**Response**:
- JSON object containing search results from Google Maps

## Troubleshooting

### Common Issues

1. **Hydration Errors**: If you encounter React hydration mismatch warnings, make sure:
   - The `suppressHydrationWarning` attribute is added to the html element in `layout.tsx`
   - Server and client rendering are consistent

2. **Image Loading Issues**: If images fail to load:
   - Check that all external domains are configured in `next.config.js`
   - Ensure that image URLs use absolute paths (with http:// or https://)

3. **Location Detection Problems**:
   - Allow location access in your browser
   - If location cannot be detected, the application will use default coordinates

## Project Structure

```
raksha-app/
├── Backend/                  # FastAPI backend
│   ├── main.py              # Main API endpoints
│   └── requirements.txt     # Python dependencies
├── public/                   # Static assets
├── src/                      # Frontend source code
│   ├── app/                 # Next.js app directory
│   │   ├── dashboard/       # Dashboard page
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Home page
│   └── components/          # Reusable React components
│       ├── MapSearch.tsx    # Search component
│       └── SearchResults.tsx # Results display component
├── .env.local                # Frontend environment variables
├── next.config.js            # Next.js configuration
└── package.json              # Node dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ for emergency preparedness and accessibility.