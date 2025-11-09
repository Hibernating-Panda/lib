import MenuBar from "@/app/components/menu_slide/page";
import Navbar from "@/app/components/navbar/page";
import { CheckCircle, BookOpen, Volume2, MapPin, Heart } from 'lucide-react';
// The following imports were causing errors because the system could not resolve them:
// import MenuBar from "@/app/components/menu_slide/page";
// import Navbar from "@/app/components/navbar/page";

// Using a placeholder image URL for the book cover
const BOOK_COVER_URL = "https://placehold.co/80x112/ccfbf1/0f766e?text=DON'T+MAKE+ME+THINK";

/**
 * Renders a single book catalog entry card.
 * This component contains the detailed layout of the book, ratings, availability, and actions.
 */
function BookCard() {
  return (
    <div className="bg-white p-6 shadow-lg hover:shadow-xl transition rounded-xl flex items-start space-x-6">
      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-4 w-full items-center">

        {/* 1. Title/Book Info (col-span-3) */}
        <div className="col-span-3 flex items-start space-x-4">
          <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
            <img
              src={BOOK_COVER_URL}
              alt="Don't Make Me Think Book Cover"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col pt-3">
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">Don't Make Me Think</h2>
            <p className="text-sm text-gray-600 mt-1">Steve Krug, 2000</p>
            <p className="text-xs text-gray-400">Second Edition</p>
          </div>
        </div>

        {/* 2. Ratings (col-span-1) */}
        <div className="col-span-1 flex flex-col items-center justify-center space-y-0 text-gray-700">
          <span className="text-lg font-bold">4.5</span>
          <span className="text-xs text-gray-400">/5</span>
        </div>

        {/* 3. Category (col-span-2) */}
        <div className="col-span-2 flex flex-col space-y-1 text-sm">
          <p className="text-gray-900">Computer Science</p>
          <p className="text-gray-600 text-xs">UX Design</p>
        </div>

        {/* 4. Availability (col-span-3) */}
        <div className="col-span-3 flex flex-col space-y-1 text-sm">
          <div className="flex items-center text-green-700">
            <CheckCircle className="w-4 h-4 mr-2 fill-green-100 text-green-500" />
            Hard Copy
          </div>
          <div className="flex items-center text-green-700">
            <BookOpen className="w-4 h-4 mr-2 fill-green-100 text-green-500" />
            E - Book
          </div>
          <div className="flex items-center text-green-700">
            <Volume2 className="w-4 h-4 mr-2 fill-green-100 text-green-500" />
            Audio book
          </div>
        </div>

        {/* 5. Status (col-span-2) */}
        <div className="col-span-2 flex flex-col space-y-2">
          {/* In-Shelf Pill */}
          <div className="inline-flex items-center px-2 py-1 text-sm font-medium bg-green-10 text-green-800 rounded-full">
            In-Shelf
          </div>
          {/* Location */}
          <div className="flex items-center text-sm text-red-500">
            <MapPin className="w-3.5 h-3.5 mr-1.5 fill-red-100" />
            CS A-15
          </div>
        </div>

        {/* 6. Actions (col-span-1) */}
        {/* MODIFIED: Changed from flex-col to flex-row and aligned to the right/end */}
        <div className="col-span-1 flex flex-row items-center justify-end space-x-3 pr-2 pt-1">
          {/* Heart Icon (Save/Favorite) */}
          <button className="text-red-500 hover:text-red-600 p-2 rounded-full transition duration-150">
            <Heart className="w-6 h-6 fill-red-100" />
          </button>
          {/* Preview Button */}
          <button className="px-4 py-2 text-sm font-medium text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition duration-150">
            Preview
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex">
      <MenuBar />
      <div className="flex-1 flex flex-col">
        <div className="">
          <Navbar />
        </div>
        <main className="flex-1 p-8">
         <div className="max-w-6xl mx-auto">
            
            {/* Header Row (Title, Ratings, Category, Availability, Status) */}
            <div className="grid grid-cols-12 gap-4 text-sm text-gray-500 font-medium py-2 border-b border-gray-200 mb-4">
              <div className="col-span-3">Title</div>
              <div className="col-span-1">Ratings</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-3">Availability</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1"></div> {/* For Preview/Actions */}
            </div>

            {/* Render the Book Card component */}
            <BookCard />

          </div> 
        </main>
      </div>
    </div>
  );
}
