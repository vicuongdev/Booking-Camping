import React from 'react'

const CampingInfo = () => {
  return (
    <>
      <div className="contact-info">
        {/* <span className="sub-title">Thông tin khu cắm trại Mã đà</span> */}
        <h2>Đặt chỗ ngay</h2>
        <p>
          Hòa mình vào thiên nhiên tại khu cắm trại Mã đà - Đặt chỗ ngay để trai nghiệm không gian thiên nhiên tuyệt vời!
        </p>
        <img src="/images/map-new.jpg" />
        <ul>
          <li>
            <div className="icon">
              <i className="bx bx-map"></i>
            </div>
            <h3>Địa chỉ</h3>
            <p>Ấp 1, xã, Hiếu Liêm, Vĩnh Cửu, Đồng Nai</p>
          </li>
          <li>
            <div className="icon">
              <i className="bx bx-phone-call"></i>
            </div>
            <h3>Liên hệ</h3>
            <p>
              Số điện thoại: <a href="tel:0918 669 926">0918 669 926</a>
            </p>
            <p>
              Mail: <a href="mailto:hello@eLearniv.com">hello@eLearniv.com</a>
            </p>
          </li>
          <li>
            <div className="icon">
              <i className="bx bx-time-five"></i>
            </div>
            <h3>Giờ hoạt động</h3>
            <p>Monday - Friday: 09:00 - 20:00</p>
            <p>Sunday & Saturday: 10:30 - 22:00</p>
          </li>
        </ul>
      </div>
    </>
  )
}

export default CampingInfo
