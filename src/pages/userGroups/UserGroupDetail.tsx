import { useState, useEffect } from "react";
import axios from "axios";
import config from '../../../config/index.tsx';

interface UserGroup {
  name: string;
  member_cnt: number;
  company_name: string;
  created_at: string;
  updated_at: string;
}

interface UserDetailProps {
  userGroupId: string | null;  // or 'undefined' depending on your use case
  onClose: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ userGroupId, onClose }) => {
  const [userGroup, setUserGroup] = useState<UserGroup | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const headers = {
          'Authorization': `${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        };
        const response = await axios.get(
          `${config.serverUrl}/api/user-group/${userGroupId}`,
          {
            headers
          }
        );
        console.log(response.data)
        setUserGroup(response.data);
      } catch (error) {
        console.error("Error searching for user:", error);
      }
    };

    if (userGroupId) {
      fetchUser();
    }
  }, [userGroupId]);

  return (
    <aside className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg border-l border-gray-300 p-4">
      <div className="flex flex-row">
        <h2 className="text-2xl font-bold mb-2">View User Group</h2>
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

      {userGroup ? (
        <div>
          <div className="flex items-center">
            <span className="mx-4 text-gray-700 font-bold">
              User Group Data
            </span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="text-gray-700">
              <p className="text-gray-700 mb-2">Group Name: </p>
              <p>
                <strong>{userGroup.name}</strong>
              </p>
            </div>
            <div className="text-gray-700">
              <p className="text-gray-700 mb-2">Member Cnt: </p>
              <p>
                <strong>{userGroup.member_cnt}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <span className="mx-4 text-gray-700 font-bold">Details</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="text-gray-700">
              <p className="text-gray-700 mb-2">Company Name: </p>
              <p>
                <strong>{userGroup.company_name ?? ''}</strong>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="text-gray-700">
              <p className="text-gray-700 mb-2">Date Created: </p>
              <p>
                <strong>{new Date(userGroup.created_at).toLocaleDateString()}</strong>
              </p>
            </div>
            <div className="text-gray-700">
              <p className="text-gray-700 mb-2">Last edited: </p>
              <p>
                <strong>{new Date(userGroup.updated_at).toLocaleDateString()}</strong>
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