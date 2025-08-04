import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, Input, Typography, Card, message } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation(); // { email, role }

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await axios.post(`/api/${state.role}/reset-password`, {
        email: state.email,
        password: values.password,
      });
      message.success("Parol muvaffaqiyatli yangilandi");
      navigate("/"); // login sahifasiga qaytish
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
        padding: 16,
      }}
    >
      <Card
        style={{ width: 400, borderRadius: 12 }}
        bodyStyle={{ padding: 32 }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Yangi parol
        </Title>
        <Text
          style={{ display: "block", marginBottom: 24, textAlign: "center" }}
        >
          Yangi parolni kiriting
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Yangi parol"
            name="password"
            rules={[
              { required: true, message: "Parol majburiy" },
              { min: 6, message: "Kamida 6ta belgidan iborat bo‘lishi kerak" },
            ]}
          >
            <Input.Password placeholder="Yangi parolni kiriting" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Parolni yangilash
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
