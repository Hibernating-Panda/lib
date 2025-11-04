import MenuBar from "@/app/components/menu_slide/page";
import Navbar from "@/app/components/navbar/page";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex">
      <MenuBar />
      <div className="flex-1 flex flex-col">
        <div className="">
          <Navbar />
        </div>
        <main className="flex-1 p-8">
          {/* Main content area */}
        </main>
      </div>
    </div>
  );
}
