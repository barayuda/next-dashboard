/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { JWTPayloadTypes, UserTypes } from '../../services/data-types';
import jwtDecode from 'jwt-decode';
import { setChangePass } from '../../services/auth';
import FormInput from '../Elements/FormInput';
import axios from 'axios';
import { changeUserPassword } from '../../services/password'
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import type { User } from '../../services/user';


interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

interface ChangePasswordForm {
  id: any;
  currentPassword: string;
  newPassword: string;
}


export function getServerSideProps(context: GetServerSideProps) {

  // eslint-disable-next-line react-hooks/rules-of-hooks



  

  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  function hidePassword() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const hiddenPasswordDiv = document.getElementById('hiddenPassword') as HTMLDivElement;
    const passwordValue = passwordInput.value;
    const hiddenPassword = '*'.repeat(passwordValue.length); // Replace with asterisks
  
    hiddenPasswordDiv.textContent = hiddenPassword;
  }

  const payload: JWTPayloadTypes = jwtDecode<JWTPayloadTypes>(token);
  // console.log(payload);
  const userFromPayload = payload;
  return {
    props: {
      user: userFromPayload,
    },
  };
}

type ChangePassword = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};
const schema = z
  .object({
    _id: z.string().optional(),
    password: z
      .string()
      .min(1, { message: 'Old password is required!' })
      .max(100),
    newPassword: z
      .string()
      .min(1, { message: 'New password is required!' })
      .max(100),
    confirmPassword: z
      .string()
      .min(1, { message: 'New password is required!' })
      .max(100),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Confirm password did not match',
      });
    }
  });

  


const ChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { data: session } = useSession();
  const [formData, setFormData] = useState<User>(Object);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  // const handleFormValue = () => {
  //   setValue('_id', formData._id);
  // }

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
        // console.log("Test1",userFromPayload)
      }
    }
  }, [session]);

 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };
  const handleConfirmPasswordBlur = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
    } else {
      setErrorMessage('');
    }
    
    if (newPassword.length < 8  ) {
      setErrorMessage1('New password must be at least 8 characters long');
    } else {
      setErrorMessage1('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    if(newPassword == confirmPassword){
      try {
        const data: ChangePasswordForm = {
          id: user.id,
          currentPassword,
          newPassword,
        };
        
        // Call the service function to change the password
        const response = await changeUserPassword(data);
        if(response.statusHttp == 200){
        // Display success message or handle response as needed
        toast.success('Your password has been changed ');
    
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        }else if (response.statusHttp == 400){
          toast.error('Please fills all the required fields');
        }else if(response.statusHttp == 401){
          toast.error('Invalid current password');
        }
      } catch (error) {
        toast.error('Failed to change password.');
      }
    }else {
      toast.error('The confirm password is different from the new password');
    }
  
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r">
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Change Password</h1>
      {message && <p className="text-green-600 mb-4 text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="currentPassword" className="text-gray-700 font-semibold mb-1">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="newPassword" className="text-gray-700 font-semibold mb-1">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={handleConfirmPasswordBlur}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
           {newPassword.length < 8 && <p className="text-red-500 text-sm">{errorMessage1}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-gray-700 font-semibold mb-1">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handleConfirmPasswordBlur}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
           {newPassword !== confirmPassword && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </div>
        <button
            type="submit"
            className="block w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-purple-300"
          >
            Change Password
          </button>
      </form>
    </div>
  </div>
    // <div>
    //   <h1>Change Password</h1>
    //   {message && <p>{message}</p>}
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="currentPassword">Current Password:</label>
    //       <input
    //         type="password"
    //         id="currentPassword"
    //         name="currentPassword"
    //         value={currentPassword}
    //         onChange={(e) => setCurrentPassword(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="newPassword">New Password:</label>
    //       <input
    //         type="password"
    //         id="newPassword"
    //         name="newPassword"
    //         value={newPassword}
    //         onChange={(e) => setNewPassword(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="confirmPassword">Confirm Password:</label>
    //       <input
    //         type="password"
    //         id="confirmPassword"
    //         name="confirmPassword"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       />
    //     </div>
    //     <button type="submit">Change Password</button>
    //   </form>
    // </div>
  );
};

export default ChangePasswordPage;
