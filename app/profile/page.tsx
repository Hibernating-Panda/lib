"use client";

import { useState, useRef, ChangeEvent } from "react"; // Import useRef and ChangeEvent
import Image from "next/image";
import MenuBar from "@/app/components/menu_slide/page";
import Navbar from "@/app/components/navbar/page";
import { 
  User, 
  Mail, 
  BookCheck, 
  Edit, 
  Save, 
  X, 
  AtSign, 
  Bookmark,
  TrendingUp,
  Camera // Added Camera icon
} from "lucide-react";

// Placeholder data - in a real app, this would come from a user session or API
const userProfile = {
  fullName: "Kenson",
  studentId: "123456",
  email: "kenson@school.edu",
  major: "Computer Science",
  bio: "Lover of classic literature and UX design. Currently exploring the depths of database management.",
  profileImageUrl: "/logo.png", // Using your existing logo.png as a placeholder
  stats: {
    borrowed: 12,
    returned: 5,
    wishlist: 3,
  },
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // States for editable fields
  const [fullName, setFullName] = useState(userProfile.fullName);
  const [email, setEmail] = useState(userProfile.email);
  const [bio, setBio] = useState(userProfile.bio);
  const [major, setMajor] = useState(userProfile.major);
  
  // State for profile image preview
  const [profileImage, setProfileImage] = useState(userProfile.profileImageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null); // To hold the actual file for upload

  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- New Function: Handle Image Selection ---
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file); // Store the file for actual upload
      setProfileImage(URL.createObjectURL(file)); // Create and set a preview URL
    }
  };

  // --- New Function: Trigger File Input ---
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    // In a real app, you would send this data to your API
    // including the `imageFile` if it's not null.
    console.log("Saving data:", { fullName, email, bio, major });
    if (imageFile) {
      console.log("Uploading new image:", imageFile.name);
      // Here you would add your API call to upload the file
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset fields to original data
    setFullName(userProfile.fullName);
    setEmail(userProfile.email);
    setBio(userProfile.bio);
    setMajor(userProfile.major);
    
    // Reset image to original
    setProfileImage(userProfile.profileImageUrl);
    setImageFile(null);

    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      <MenuBar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Profile Card */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col items-center">
                  
                  {/* --- MODIFIED: Profile Image --- */}
                  <div className="relative w-32 h-32">
                    <Image
                      src={profileImage} // Use state variable for the source
                      alt="Profile Picture"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full border-4 border-orange-200 shadow-sm"
                    />
                    {isEditing && (
                      <button
                        onClick={triggerFileInput}
                        className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-colors"
                        title="Change profile picture"
                      >
                        <Camera className="w-5 h-5 text-orange-600" />
                      </button>
                    )}
                  </div>
                  
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    accept="image/png, image/jpeg, image/jpg"
                  />
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-4 text-2xl font-bold text-gray-900 text-center border-b-2 border-gray-300 focus:border-orange-500 outline-none"
                    />
                  ) : (
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">{fullName}</h2>
                  )}

                  <p className="text-sm text-orange-500 font-semibold mt-1">
                    Student ID: {userProfile.studentId}
                  </p>

                  <label className="block text-sm font-medium text-gray-500 mt-6 mb-2 w-full text-left">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full h-28 p-2 border border-gray-300 rounded-md text-gray-700 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-600 text-sm text-left w-full bg-gray-50 p-3 rounded-md border">
                      {bio || "No bio set."}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Details & Stats */}
            <div className="w-full lg:w-2/3 space-y-8">
              {/* Profile Details */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    {isEditing ? (
                      <div className="relative">
                        <AtSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    ) : (
                      <p className="text-lg text-gray-800 font-medium">{email}</p>
                    )}
                  </div>
                  
                  {/* Major */}
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Major</label>
                    {isEditing ? (
                      <div className="relative">
                        <BookCheck className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={major}
                          onChange={(e) => setMajor(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    ) : (
                      <p className="text-lg text-gray-800 font-medium">{major}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Library Stats */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Library Activity</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Stat Card 1 */}
                  <div className="flex items-center gap-4 bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Bookmark className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-orange-600">{userProfile.stats.borrowed}</p>
                      <p className="text-sm text-gray-600">Books Borrowed</p>
                    </div>
                  </div>
                  {/* Stat Card 2 */}
                  <div className="flex items-center gap-4 bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="bg-green-100 p-3 rounded-full">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-green-600">{userProfile.stats.returned}</p>
                      <p className="text-sm text-gray-600">Books Returned</p>
                    </div>
                  </div>
                  {/* Stat Card 3 */}
                  <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-blue-600">{userProfile.stats.wishlist}</p>
                      <p className="text-sm text-gray-600">On Wishlist</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}