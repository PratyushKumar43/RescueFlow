# Environment Setup Instructions

## Next.js Frontend Environment
Create a `.env.local` file in the root of your Next.js project (raksha-app directory) with the following content:

```
BACKEND_URL=http://localhost:8000
```

## Running the Backend
To run the FastAPI backend:

1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

## Running the Frontend
To run the Next.js frontend:

1. Navigate to the raksha-app directory:
   ```
   cd raksha-app
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
