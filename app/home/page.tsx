import MenuBar from "@/app/components/menu_slide/page";
import Navbar from "@/app/components/navbar/page";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex">
      <MenuBar />
      <div className="flex flex-col w-full h-screen">
        <div className="">
          <Navbar />
        </div>
        <main className="flex-col p-8 w-full h-full">
           
          <div className="flex w-full h-1/3 mb-8 gap-4">
          
            <div className="border-1 rounded-lg w-200 h-full flex-col p-4">
              
              <p className=" text-2xl font-bold">Today's Quote</p>
              <p className=" text-1xl font-bold">"There is more treasure in books than in all the pirate's loot on Treasure lsland".</p>


              <div className="flex">
              <div className="mt-20 flex space-x-2">
                <div className="border-1 w-2 h-2 rounded-full bg-black "></div>
                <div className="border-1 w-2 h-2 rounded-full "></div>
                <div className="border-1 w-2 h-2 rounded-full "></div>
                <div className="border-1 w-2 h-2 rounded-full "></div>
              </div>
              <span className="ml-50 mt-10">- Wait Disney</span>
              </div>
              
            </div>

            <div className="border-1 rounded-lg w-500 h-full flex gap-2">

              <div className="border-1 rounded-lg w-30 h-full">
                <span className="transfrom -rotate-90 flex justify-center mt-20 items-center font-bold">
                   New Arrivals
                </span>
              </div>

              <div className="flex p-1 gap-2">
                <div className="border-1 rounded-lg w-30 h-full shadow-lg flex justify-center items-center ">
                  <div className="border-1 rounded-lg w-26 h-40"> </div>
              </div>
              <div className="border-1 rounded-lg w-30 h-full shadow-lg">

              </div>
              <div className="border-1 rounded-lg w-30 h-full shadow-lg">

              </div>
              <div className="border-1 rounded-lg w-30 h-full shadow-lg">

              </div>
              </div>

            </div>

          </div>
          
          

          <h1 className="text-3xl font-bold mb-4">Recommended for You</h1>

          {/* map */}
          <div className="flex gap-2 w-full h-full">
            <div className="flex-col border-1 rounded-lg w-1/5 h-1/2 p-4">
              <div className="border-1 rounded-lg w-full h-3/4">
                Cover
              </div>
              <div className="h-1/4 mt-2 flex-col justify-between">
                <h2 className="text-xl font-semibold">Title</h2>
                <p className="text-gray-600">Author</p>
              </div>
              
            </div>

                  
          </div>
          
        </main>
      </div>
    </div>
  );
}
