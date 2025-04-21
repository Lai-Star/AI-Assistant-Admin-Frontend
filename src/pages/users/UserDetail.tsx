import React, { useState, useEffect } from "react";
import axios from "axios";
import config from '../../../config/index.tsx';

interface User {
  id: string;
  name: string;
  company_name: string;
  user_group_name: string;
  created_at: string;
  updated_at: string;
}

interface UserDetailProps {
  userId: string | null;  // or 'undefined' depending on your use case
  onClose: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ userId, onClose }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const headers = {
          'Authorization': `${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        };
        const response = await axios.get(
          `https://${config.serverUrl}/api/users/${userId}`,
          {
            headers
          }
        );
        console.log(response.data)
        setUser(response.data);
      } catch (error) {
        console.error("Error searching for user:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <aside className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg border-l border-gray-300 p-4">
      <div className="flex flex-row">
        <h2 className="text-2xl font-bold mb-2">View User</h2>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      {user ? (
        <div>
          <div className="flex items-center">
            <span className="mx-4 text-gray-700 font-bold">
              User Data
            </span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="text-gray-700">
              <p className="text-gray-700 mb-2">Name: </p>
              <p>
                <strong>{user.name}</strong>
              </p>
            </div>
            <div className="text-gray-700">
              <p className="text-gray-700 mb-2">Company Name: </p>
              <p>
                <strong>{user.company_name}</strong>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="text-gray-700">
              <p className="text-gray-700 mb-2">Group Name: </p>
              <p>
                <strong>{user.user_group_name}</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mx-4 text-gray-700 font-bold">Details</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="text-gray-700">
              <p className="text-gray-700 mb-2">Date Created: </p>
              <p>
                <strong>{new Date(user.created_at).toLocaleDateString()}</strong>
              </p>
            </div>
            <div className="text-gray-700">
              <p className="text-gray-700 mb-2">Last edited: </p>
              <p>
                <strong>{new Date(user.updated_at).toLocaleDateString()}</strong>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* Footer with close button */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </aside>
  );
};

export default UserDetail;