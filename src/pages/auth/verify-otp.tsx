import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, Input, Typography, Card, message } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation(); // { email, role }

  const submitOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/${state.role}/verify-otp`, {
        email: state.email,
        code: otp,
      });

      if (response.status === 200) {
        message.success("OTP tasdiqlandi");
        navigate("/reset-password", {
          state: { email: state.email, role: state.role },
        });
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
          OTP tasdiqlash
        </Title>
        <Text
          style={{ display: "block", marginBottom: 24, textAlign: "center" }}
        >
          Emailga yuborilgan 6 xonali kodni kiriting
        </Text>

        <Form onFinish={submitOtp}>
          <Form.Item
            label="OTP kod"
            name="otp"
            rules={[{ required: true, message: "Kod majburiy" }]}
          >
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6 xonali kod"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Tasdiqlash
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default VerifyOtp;
