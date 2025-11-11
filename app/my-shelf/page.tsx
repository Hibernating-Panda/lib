'use client';

// We'll use these icons for the stars and overdue alert
import { Star, AlertCircle } from 'lucide-react';

// Assuming these components exist in your project structure
// Since I can't access them, I'll create simple placeholders
// so the file can run.

import MenuBar from "@/app/components/menu_slide/page";
import Navbar from "@/app/components/navbar/page";

// --- 1. DEFINE THE DATA STRUCTURE ---
// This type defines what a "book" object looks like,
// based on all the fields you listed.
type Book = {
  id: number;
  title: string;
  author: string;
  coverImageUrl: string;
  borrowedOn: string;
  submissionDue: string;
  isOverdue: boolean;
  status: 'Borrowed' | 'E-BOOK';
};

// --- 2. CREATE MOCK DATA ---
// This is your array of books. In a real app, this would
// come from a database or an API.
const mockBooks: Book[] = [
  {
    id: 1,
    title: "",
    author: '',
    coverImageUrl: '',
    borrowedOn: '',
    submissionDue: '',
    isOverdue: false,
    status: 'E-BOOK',

  },

  {
    id: 2,
    title: '',
    author: '',
    coverImageUrl: '',
    borrowedOn: '',
    submissionDue: '',
    isOverdue: false,
    status: 'Borrowed',
  },

  {
    id: 3,
    title: '',
    author: '',
    coverImageUrl: '',
    borrowedOn: '',
    submissionDue: '',
    isOverdue: true,
    status: 'Borrowed',
  },

  {
    id: 4,
    title: 'Sprint: Solve Big Problems...',
    author: 'Jake Knapp',
    coverImageUrl: 'https://placehold.co/100x150/00aeff/fff?text=Sprint',
    borrowedOn: '11 Mar 2023 09:00 AM',
    submissionDue: '14 Mar 2023',
    isOverdue: false,
    status: 'E-BOOK',
  },

  // Add more books here as needed

    {
    id: 5,
    title: '',
    author: '',
    coverImageUrl: '',
    borrowedOn: '11 Mar 2023 09:00 AM',
    submissionDue: '14 Mar 2023',
    isOverdue: false,
    status: 'E-BOOK',
  },
  
];


// --- 3. CREATE THE REUSABLE BOOK COMPONENT ---
// This component takes one 'book' object as a prop and displays it.
// All the styling from your image is encapsulated here.
const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between transition-all hover:shadow-md">
      {/* Overdue Alert Icon */}
      {book.isOverdue && (
        <AlertCircle className="w-5 h-5 text-red-500 absolute top-3 right-3" />
      )}
      
      {/* Top section: Cover + Borrow Info */}
      <div className="flex gap-4">
        {/* Book Cover */}
        <div className="shrink-0">
          <img
            src={book.coverImageUrl}
            alt={`${book.title} cover`}
            className="w-[100px] h-[150px] object-cover rounded-md border"
            onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x150/ccc/333?text=Image+Missing')}
          />
        </div>

        {/* Info & Buttons */}
        <div className="flex-1 flex flex-col space-y-2">
          <div>
            <span className="text-xs text-gray-500">Borrowed on</span>
            <p className="text-sm font-medium text-gray-800">{book.borrowedOn}</p>
          </div>
          
          <div>
            <span className="text-xs text-gray-500">Submission Due</span>
            <p className={`text-sm font-medium ${book.isOverdue ? 'text-red-500' : 'text-gray-800'}`}>
              {book.submissionDue}
            </p>
          </div>

          {/* Status Button */}
          <button
            className={`w-full py-1.5 rounded-md text-xs font-semibold ${
              book.status === 'Borrowed'
                ? 'bg-gray-200 text-gray-700'
                : 'bg-green-100 text-green-700'
            }`}
            disabled
          >
            {book.status}
          </button>

          {/* Action Button (Return or Read) */}
          <button
            className={`w-full py-1.5 rounded-md text-xs font-semibold border ${
              book.status === 'Borrowed'
                ? 'bg-white text-red-500 border-red-500 hover:bg-red-50'
                : 'bg-white text-orange-500 border-orange-500 hover:bg-orange-50'
            }`}
          >
            {book.status === 'Borrowed' ? 'Return' : 'Read'}
          </button>
        </div>
      </div>

      {/* Bottom section: Title, Author*/}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900 truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-sm text-gray-600">
          {book.author}
        </p>
      </div>
    </div>
  );
};


// --- 4. UPDATE YOUR MAIN PAGE TO USE THE LOOP ---
export default function Home() {
  return (
    <div className="bg-white min-h-screen flex">
      <MenuBar />
      <div className="flex-1 flex flex-col">
        <div className="">
          <Navbar />
        </div>
        
        {/* Give the main content area a light gray background */}
        <main className="flex-1 p-8 bg-gray-50">
          <h1 className="text-3xl font-bold mb-6">
            <span className="text-black">Your </span>
            <span className="text-orange-500">Shelf</span>
          </h1>

          {/* This is the "loop" */}
          {/* We use a responsive grid that shows 1 column on small screens,
              2 on medium, 3 on large, and 4 on extra-large screens.
              The 'gap-6' adds space between the cards. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockBooks.map((book) => (
              // The 'key' is important for React to keep track of each item
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}