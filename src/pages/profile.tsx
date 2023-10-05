  import React, { ChangeEvent, useEffect, useState } from "react";

  // components

  import CardTable from "../components/Cards/CardTable";

  // layout for page

  import AdminLayout from "../layouts/AdminLayout";
  import { useSession } from "next-auth/react";
  import { JWTPayloadTypes, UserTypes } from "../services/data-types";
  import Cookies from "js-cookie";
  import jwtDecode from "jwt-decode";
  import Link from "next/link";
  import { FaSearch } from "react-icons/fa";
  import UserDropdown from "../components/Dropdowns/UserDropdown";
  import Image from 'next/image';
  import { getServerSideProps } from "./admin/index";


  export { getServerSideProps };



  export default function Tables() {
  // Function to handle file upload
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining for null check
    if (file) {
      // Handle the file upload logic here (e.g., send the file to the server and update the user's profile picture).
      //place holder kali
    }
  };
  const [isHovered, setIsHovered] = useState(false);
    const { data: session } = useSession();

    const [user, setUser] = useState<UserTypes>({
      id: '',
      name: '',
      email: '',
      avatar: '',
    });
    useEffect(() => {
      if (session) {
        console.log('session', session);
      }
      const token = Cookies.get('token');
      if (token) {
        // const jwtToken = atob(token);
        const payload: JWTPayloadTypes = jwtDecode<JWTPayloadTypes>(token);
        console.log('payload', payload);
        if (payload.user) {
          const userFromPayload: UserTypes = payload.user;
          setUser(userFromPayload);
        }
      }
    }, [session]);
    
    return (
      <AdminLayout>
        <div className="flex py-2 px-4 rounded-lg bg-gray-950 ">
    <div className="ml-4 flex flex-col justify-between w-full ">
      <h1 className="mb-6 text-white">Employee Details</h1>

  
      <div className="flex items-center">
        {/* Image Div */}
        <label
          htmlFor="upload-avatar"
          className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            alt="..."
            src={user.avatar || "/assets/img/team-1-800x800.jpg"}
            layout="responsive"
            width={186}
            height={190}
          />
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Image
                src="/assets/img/cameraLog.png"
                alt="Camera Logo"
                width={32}
                height={32}
              />
            </div>
          )}
          <input
            type="file"
            id="upload-avatar"
            accept="image/*"
            className="opacity-0 w-0 h-0 absolute"
            onChange={handleFileChange}
          />
        </label>

        {/* Employee Name */}
        <div className="grid grid-rows-2 gap-4 text-gray-400  ">
        <h2 className="ml-4 mb-4 text-white text-lg font-semibold block">{user.name}</h2>
        <div className="ml-4 grid grid-cols-3 gap-4 text-gray-400 justify-items-stretch place-content-center w-full">
          <div className="flex flex-col items-center">
            <span className="block mb-1">Role</span>
            <span className="block text-white">Manager</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="block mb-1">Phone Number</span>
            <span className="block text-white">+62 823 7263-7364</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="block mb-1">Email</span>
            <span className="block text-white">{user.email}</span>
          </div>
        </div>

        </div>
      </div>

    
      
  

      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-4">
            <Link
              href="/admin/settings"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center"
            >
              Profile Edit
            </Link>
            <Link
              href="/admin/account/change-pass"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center"
            >
              Change Password
            </Link>
        
      </div>
    </div>
  
  </div>
      </AdminLayout>
    );
  }
