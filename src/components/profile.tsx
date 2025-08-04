import { useState } from "react";
import { Pencil, Camera } from "lucide-react";
import { Modal, Input, Button, Form } from "antd";

interface ProfileProps {
  type: "admin" | "teacher" | "student";
  data: {
    firstName: string;
    lastName: string;
    dob?: string;
    email?: string;
    phone?: string;
    role?: string;
    country?: string;
    city?: string;
    postal?: string;
    avatar?: string;
  };
  onUpload?: (file: File) => void;
  onSave?: (values: any) => void;
  onPasswordChange?: (values: any) => void;
  loading?: boolean;
}

export default function Profile({
  type,
  data,
  onUpload,
  onSave,
  onPasswordChange,
  loading,
}: ProfileProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-[#f9f9f9] min-h-screen">
      <main className="flex-1 space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <div className="relative">
            <img
              src={data.avatar || "/avatar.png"}
              className="w-20 h-20 rounded-full border-4 border-white shadow object-cover"
            />
            {type !== "student" && onUpload && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onUpload(file);
                  }}
                />
                <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {data.firstName} {data.lastName}
            </h2>
            <p className="text-sm text-gray-500 capitalize">
              {type} • {data.city}
            </p>
          </div>
        </div>

        {/* Personal Info */}
        <section className="bg-white rounded-xl p-6 shadow space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-[#252B42]">
              Personal Information
            </h3>
            <button
              className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-400 flex items-center gap-1"
              onClick={() => setOpenEdit(true)}
            >
              <Pencil className="w-4 h-4" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <Info label="First Name" value={data.firstName} />
            <Info label="Last Name" value={data.lastName} />
            <Info label="Date of Birth" value={data.dob || "-"} />
            <Info label="Email Address" value={data.email || "-"} />
            <Info label="Phone Number" value={data.phone || "-"} />
            <Info label="User Role" value={data.role || type} />
          </div>
        </section>

        {/* Address */}
        <section className="bg-white rounded-xl p-6 shadow space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-[#252B42]">Address</h3>
            <button
              className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-400 flex items-center gap-1"
              onClick={() => setOpenPassword(true)}
            >
              <Pencil className="w-4 h-4" /> Change Password
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <Info label="Country" value={data.country || "-"} />
            <Info label="City" value={data.city || "-"} />
            <Info label="Postal Code" value={data.postal || "-"} />
          </div>
        </section>
      </main>

      {/* Modal: Edit Profile */}
      <Modal
        title="Edit Profile"
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={data}
          onFinish={(values) => {
            onSave?.(values);
            setOpenEdit(false);
          }}
        >
          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal: Change Password */}
      <Modal
        title="Change Password"
        open={openPassword}
        onCancel={() => setOpenPassword(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            onPasswordChange?.(values);
            setOpenPassword(false);
          }}
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Change
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p className="font-medium text-[#252B42]">{value}</p>
  </div>
);
