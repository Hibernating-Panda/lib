import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-xl w-full max-w-xl text-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="mx-auto "
        />
        <h2 className="text-xl font-medium text-gray-800 mb-0">
          Registration
        </h2>
        <p className="text-sm text-gray-500 mb-6">For Both Staff & Students</p>
        <form className="mt-5">
          <div className="text-left mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="user"
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
            />
          </div>

          <div className="text-left mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="username@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
            />
          </div>

          <div className="text-left mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
            />
            <span className="absolute right-3 top-10 text-xl text-gray-400 cursor-pointer">
              &#128065;&#xfe0e;
            </span>
          </div>

          <div className="text-left mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
            />
            <span className="absolute right-3 top-10 text-xl text-gray-400 cursor-pointer">
              &#128065;&#xfe0e;
            </span>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3.5 bg-orange-500 text-white font-semibold text-lg rounded-lg hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
        <div className="flex justify-between items-center text-sm mt-7">
          <p className="text-gray-700">
            Already a User?{" "}
            <a href="#" className=" font-semibold underline">
              Login now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
