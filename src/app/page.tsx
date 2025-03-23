import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image 
              src="/rescue-flow-logo.svg" 
              alt="RescueFlow Logo" 
              width={150} 
              height={30} 
              className="h-8 w-auto"
            />
          </div>
          
          <Link href="/dashboard">
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-16 flex-grow">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">
              Optimizing Emergency Medical Response
            </h1>
            <p className="text-gray-600">
              RescueFlow is a comprehensive platform designed to streamline emergency response operations, connecting healthcare providers and the public in real-time.
            </p>
            <div className="flex gap-4 mt-6">
              <Link href="/dashboard" className="bg-gray-900 text-white px-6 py-3 rounded text-sm font-medium">
                Dashboard
              </Link>
              <a href="#" className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded text-sm font-medium">
                Mobile App
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-12 rounded-lg shadow-md">
              <Image 
                src="/ambulance-icon.svg" 
                alt="Ambulance" 
                width={150} 
                height={150} 
                className="h-32 w-32"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 flex items-center justify-center text-sm text-gray-600">
          <div className="flex items-center">
            <Image src="/rescue-flow-logo.svg" alt="RescueFlow" width={24} height={24} className="h-5 w-5 mr-2" />
            <span>RescueFlow</span>
          </div>
          <span className="mx-2">&copy; 2025 RescueFlow. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
