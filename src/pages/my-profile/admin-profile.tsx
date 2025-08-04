import { Profile } from "@components";
import { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import axios from "axios";

interface AdminData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  city?: string;
  country?: string;
  branch?: string;
}

const AdminProfile = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access_token");
      const adminId = localStorage.getItem("user_id"); // yoki admin_id

      if (!adminId) {
        throw new Error("Admin ID topilmadi");
      }

      const response = await axios.get(`/api/admin/${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Backend'dan kelgan ma'lumotlarni frontend formatiga o'zgartirish
      const data = response.data;
      setAdminData({
        firstName: data.first_name || "Admin",
        lastName: data.last_name || "Admin",
        email: data.email || "",
        phone: data.phone || "",
        role: data.role || "Admin",
        city: data.city || "Tashkent",
        country: data.country || "Uzbekistan",
        branch: data.branch?.name || "",
      });
    } catch (err: any) {
      console.error("Admin profile fetch error:", err);
      setError(
        err.response?.data?.message || "Ma'lumotlarni yuklashda xatolik"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert
          message="Xatolik"
          description={error}
          type="error"
          showIcon
          action={
            <button
              onClick={fetchAdminProfile}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Qayta urinish
            </button>
          }
        />
      </div>
    );
  }

  if (!adminData) {
    return (
      <div className="p-4">
        <Alert message="Ma'lumot topilmadi" type="warning" showIcon />
      </div>
    );
  }

  return <Profile type="admin" data={adminData} />;
};

export default AdminProfile;
