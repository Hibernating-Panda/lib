import MenuBar from "@/app/components/menu_slide/page";
import Navbar from "@/app/components/navbar/page";
import Image from "next/image";

export default function BookPreview() {
return (
  <div className="bg-gray-100 min-h-screen flex">
    <MenuBar />
    <div className="flex-1 flex flex-col">
      <Navbar />

      <main className="flex-1 p-8">
        <button className="flex hover:underline mb-4 items-center text-gray-600">
          <Image
            src="/backarrow.svg"
            alt="Back Icon"
            width={20}
            height={20}
            className="inline-block mr-2"/>
          Back to results
        </button>

        {/* Main Section */}
        <div className="flex space-x-8">
          <div className="flex">
            <div className="w-80 h-90">
            {/* Book Cover */}
            <div className="ml-2 bg-white rounded-xl w-60 shadow-md p-2">
                <Image
                src="/bookcover.jpeg"
                alt="Book Cover"
                width={240}
                height={360}
                className="rounded-2xl shadow-md"
              />
            </div>
              {/* Buy This Book */}
            {/* <div className="mt-10 ml-2 bg-white rounded-xl w-60 shadow-md p-4">
                <h2 className="font-semibold text-gray-700 mb-2 text-xl">Buy this book Online</h2>
                <div className="flex flex-col space-y-2">
                  <button className="underline ">
                    <Image
                      src="/facebook.svg"
                      alt="Facebook Logo"
                      width={50}
                      height={50}
                      className="inline-block mr-2"/>
                    Buy Now
                  </button>
                  <button className="underline ">
                    <Image
                      src="/amazon.svg"
                      alt="Amazon Logo"
                      width={45}
                      height={45}
                      className="inline-block mr-2"/>
                    Buy Now
                  </button>
                  <p className="text-sm font-bold">When you buy books using these links te internet Archive may earn a small commision.</p>
                </div>
              </div> */}
            </div>

            {/* Book Details */}
            <div className="flex-1 w-100">
              <h1 className="text-3xl font-bold text-gray-900">
                Don’t Make Me Think
              </h1>
              <h2 className="text-lg text-gray-700 mt-1">
                By Steve Krug, 2000
              </h2>
              <h3 className="text-gray-600 mt-1">Second Edition</h3>

              {/* Ratings */}
              <div className="flex items-center space-x-2 mt-3 font-bold">
                <p>⭐️⭐️⭐️⭐️⭐️</p>
                <p className="text-gray-500">5.0 Ratings</p>
              </div>

              {/* Reading Stats */}
              <div className="flex space-x-8 mt-3 text-gray-700 font-bold">
                <p>25 Currently reading</p>
                <p>119 Have read</p>
              </div>

              {/* Availability & Status */}
              <div className="flex mt-6 space-x-16">
                {/* Availability */}
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    Availability
                  </h2>
                  <div className="mt-2 space-y-2 text-gray-700">
                    <p className="flex items-center">
                      <Image
                        src="/check.svg"
                        alt="Check Icon"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Hard Copy
                    </p>
                    <p className="flex items-center">
                      <Image
                        src="/check.svg"
                        alt="Check Icon"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      E - Book
                    </p>
                    <p className="flex items-center">
                      <Image
                        src="/check.svg"
                        alt="Check Icon"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Audio book
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    Status
                  </h2>
                  <div className="bg-green-500 text-white px-4 py-1 rounded-lg mt-3 w-fit">
                    In-Shelf
                  </div>
                  <p className="flex items-center mt-3 text-gray-700">
                    <Image
                      src="/ping.svg"
                      alt="Location Icon"
                      width={15}
                      height={15}
                      className="mr-2"
                    />
                    CS A-15
                  </p>
                </div>
                {/* <div>
                  <button className="mt-10 px-4 py-2 w-fit bg-black text-white rounded-lg"> Add to List
                    <Image
                      src="/Polygon 1.svg"
                      alt="Plus Icon"
                      width={15}
                      height={15}
                      className="inline-block ml-2"
                    />
                    </button></div> */}
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 mt-8">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 font-bold">
                  Borrow
                </button>
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center font-bold">
                  Read Now
                  <Image
                    src="/headphones.svg"
                    alt="Audio Icon"
                    width={20}
                    height={20}
                    className="ml-2"
                  />
                </button>
              </div>

              {/* Overview Section */}
              {/* <div className="mt-10 pt-4 w-120">
                <div className="flex space-x-24.5 text-gray-600 font-medium bg-white w-max p-2 rounded-lg">
                  <button className="border-b-2 border-orange-500 text-orange-500">
                    Overview
                  </button>
                  <button>View 166 Editions</button>
                  <button>Details</button>
                  <button>4.1k Reviews</button>
                  <button>Like</button>
                  <button>Review Books</button>
                </div>
                <div className="flex space-x-8.5 text-gray-600 font-medium w-max p-2 mt-2">
                  <div className="bg-white rounded-lg text-center">
                    <h2 className="w-55 text-xs font-semibold text-gray-500 mt-2">
                    Publish Date
                  </h2>
                  <h2 className="text-xs mb-1">2000</h2>
                  </div>
                  <div className="bg-white rounded-lg text-center">
                    <h2 className="w-55 text-xs font-semibold text-gray-500 mt-2">
                    Publisher
                  </h2>
                  <h2 className="text-orange-400 text-xs mb-1">New Riders Press</h2>
                  </div>
                  <div className="bg-white rounded-lg text-center">
                    <h2 className="w-55 text-xs font-semibold text-gray-500 mt-2">
                    Language
                  </h2>
                  <h2 className="text-orange-400 text-xs mb-1">English</h2>
                  </div>
                  <div className="bg-white rounded-lg text-center">
                    <h2 className="w-55 text-xs font-semibold text-gray-500 mt-2">
                    Pages
                  </h2>
                  <h2 className="text-xs mb-1">216</h2>
                  </div>
                </div>

                <div className="mt-4 w-4xl text-gray-700 leading-relaxed">
                  <p>
                    Since Don’t Make Me Think was first published in 2000,
                    hundreds of thousands of web designers and developers
                    have relied on usability guru Steve Krug’s guide to help
                    them understand intuitive navigation and information
                    design. Witty, commonsensical, and practical, it's 
                    one of the best-loved and most recommended books on the subject.
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          {/* RIGHT SIDE (Author Info) */}
          <div className="w-120 h-105 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              About Author
            </h2>
            <h3 className="text-md font-semibold text-gray-700 mt-5">
              Steve Krug
            </h3>
            <p className="text-sm text-gray-600 mt-10">
              Steve Krug is a usability consultant with 30 years of
              experience as a user advocate for companies like Apple,
              Netscape, AOL, and Lexus. Based on the success of Don’t Make Me
              Think, he became a sought-after speaker on usability design.
            </p>

            <h3 className="mt-10 text-gray-700 font-semibold">
              Other Books
            </h3>
            <div className="flex space-x-3 mt-3">
              <Image
                src="/bookcover.jpeg"
                alt="Other Book 1"
                width={80}
                height={120}
                className="rounded-md shadow-sm"
              />
              <Image
                src="/bookcover.jpeg"
                alt="Other Book 2"
                width={80}
                height={120}
                className="rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}
