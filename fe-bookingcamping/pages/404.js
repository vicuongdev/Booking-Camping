import React from 'react'
import Link from 'next/link'

const Custom404 = () => {
  return (
    <>
      <div className="error-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="error-content">
                <img src="/images/error.png" alt="image" />
                <h3>Error 404 : Page Not Found</h3>
                <p>
                  Trang bạn đang tìm kiếm có thể đã bị xóa do đã thay đổi tên hoặc tạm thời không khả dụng.
                </p>

                <div className="btn-box">
                  {/* <Link href="/">
                    <a className="default-btn">
                      <i className="flaticon-history"></i> Quay lại <span></span>
                    </a>
                  </Link> */}
                  <Link href="/">
                    <a className="default-btn">
                      <i className="flaticon-home"></i> Trang chủ <span></span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Custom404
