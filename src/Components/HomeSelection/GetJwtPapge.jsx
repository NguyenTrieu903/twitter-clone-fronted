import { React, useEffect, useState } from "react";

const JwtPage = (props) => {
    useEffect(() => {
        // Lấy JWT từ URL query parameters sau khi trang đã chuyển hướng
        const urlParams = new URLSearchParams(window.location.search);
        const jwt = urlParams.get('jwt');
        console.log(jwt)
    
        if (jwt) {
          // Lưu JWT vào localStorage hoặc Redux state để sử dụng sau này
          localStorage.setItem('jwtToken', jwt);
    
          // Xử lý sau khi lấy được JWT, ví dụ chuyển hướng hoặc thực hiện hành động khác
          // Ví dụ: chuyển hướng đến trang home
          props.history.push('/home'); // Điều chỉnh theo route của bạn
        } else {
          // Xử lý khi không có JWT trong URL
        }
      }, [props.history]);

  return (
    <div>
      this is jwt jwtPage
    </div>
  );
};

export default JwtPage;