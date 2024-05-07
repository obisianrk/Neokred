import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type user = {
  name: string;
  email: string;
  dateOfBirth: string;
  phoneNo: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  question: string;
};

const Profile = () => {
  const [user, setUser] = useState<user | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        if (error.response.status == 401) navigate("/login");
        console.error("Error fetching user profile:", error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <img src="assets/logo.png" alt="Logo" className="w-auto h-8" />
        </div>
        <Button onClick={handleLogout} className="logout-button">
          Logout
        </Button>
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col justify-start h-full mt-36">
          <div className="flex items-center justify-center p-4 sm:p-6">
            <div className="flex items-center justify-center w-24 h-24 bg-[#F7F8FA] border border-[#E2E7F0] rounded-full">
              <img
                src="/assets/profile.png"
                alt="Avatar"
                className="w-16 h-16 rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="overflow-hidden border-[#E2E7F0] border-[1px] rounded-[5px] pb-5">
          <div className="px-4 py-5">
            <p className="welcome-heading">Profile</p>
          </div>
          <div className="px-4 py-2">
            <dl>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="profile-data">Name</dt>
                <dd className="profile-data">{user.name}</dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="profile-data">Email</dt>
                <dd className="profile-data">{user.email}</dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="profile-data">DOB</dt>
                <dd className="profile-data">{user.dateOfBirth}</dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="profile-data">Phone number</dt>
                <dd className="profile-data">{user.phoneNo}</dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="profile-data">Address</dt>
                <dd className="profile-data">{user.address}</dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="profile-data">City</dt>
                <dd className="profile-data">{user.city}</dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="profile-data">State</dt>
                <dd className="profile-data">{user.state}</dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="profile-data">ZIP code</dt>
                <dd className="profile-data">{user.zipCode}</dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="profile-data">Country</dt>
                <dd className="profile-data">{user.country}</dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="profile-data">Security</dt>
                <dd className="profile-data">{user.question}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
