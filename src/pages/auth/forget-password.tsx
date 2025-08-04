import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Typography, Card, message, Select } from "antd";
import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (values: { email: string; role: string }) => {
    try {
      setLoading(true);

      const { email, role } = values;

      const response = await axios.post(`/api/${role}/forget-password`, {
        email,
      });

      if (response.status === 200 || response.status === 201) {
        message.success("send OTP email");
        navigate("/verify-otp", { state: { email, role } });
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Card
        style={{ width: 400, borderRadius: 12 }}
        bodyStyle={{ padding: 32 }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Parolni tiklash
        </Title>
        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", marginBottom: 24 }}
        >
          Email kiriting va ro'l tanlang
        </Text>

        <Form
          layout="vertical"
          onFinish={submit}
          initialValues={{ role: "admin" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email required" },
              { type: "email", message: "Please enter the correct email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Select role" }]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="teacher">Teacher</Option>
              <Option value="student">Student</Option>
              <Option value="lid">Lid</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              send OTP 
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" block onClick={() => navigate("/")}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
