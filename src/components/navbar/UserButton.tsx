import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/use-app-selector";
import useAuth from "../../hooks/use-auth";
import useMessage from "../../hooks/use-message";
import { RootState } from "../../store/store";

const UserButton = () => {
  const { token, info } = useAppSelector((state: RootState) => state.user);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const auth = useAuth();
  const message = useMessage();
  const navigate = useNavigate();
  return (
    <>
      {message.node}
      {!token ? (
        <Link to="/login">
          <BiUser size={24} />
        </Link>
      ) : (
        <div className="relative">
          <p
            className="flex cursor-pointer"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
          >
            <BiUser size={24} /> {info.name}
          </p>
          {userDropdownOpen && (
            <div className="absolute flex flex-col cursor-pointe top-8 left-1/2 -translate-x-1/2 text-center bg-white shadow-md rounded-lg w-36 overflow-hidden">
              <Link to="/my-profile" className="p-2 hover:bg-gray-100">
                My Profile
              </Link>
              <Link to="/order-history" className="p-2 hover:bg-gray-100">
                My Orders
              </Link>
              <a
                className="p-2 hover:bg-gray-100 text-red-700"
                onClick={() =>
                  auth.logout().then(() => {
                    setTimeout(() => navigate("/login"), 500);
                    message.showMessage(
                      "You have successfully logged out",
                      "success"
                    );
                  })
                }
              >
                Sign Out
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserButton;
