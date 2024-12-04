"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation"; // Đúng hook cho thư mục app

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // Để hiển thị lỗi (nếu có)
  const router = useRouter(); // Sử dụng từ "next/navigation"

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        "https://vpp-server-production.up.railway.app/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        document.cookie = `token=${data.result.token}; path=/`;
        router.push("/dashboard");
      } else {
        setError(data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Lỗi kết nối đến server");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Đăng Nhập</h1>
      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "8px",
              color: "#000",
            }}
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "8px",
              color: "#000",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
