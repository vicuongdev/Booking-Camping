import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from "../../utils/baseUrl";
const CampingInfo = () => {
  const [tents, setTents] = useState([]);
  const [selectedTent, setSelectedTent] = useState(null);
  const [draggingTent, setDraggingTent] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggingTentIndex, setDraggingTentIndex] = useState(null);

  const calculateCoordinates = (index) => {
    const row = Math.floor(index / 10);
    const col = index % 10;
    const x = col * 50;
    const y = row * 50;
    return { x, y };
  }

  const fetchTents = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/tents/GetAllTents`);
      const mappedTents = response.data.map((tent, index) => ({
        ...tent,
        coordinates: calculateCoordinates(index)
      }));
      setTents(mappedTents);
    } catch (error) {
      console.error('Error fetching tents: ', error);
    }
  }

  useEffect(() => {
    fetchTents();
  }, []);

  const handleTentClick = (tent) => {
    setSelectedTent(tent);
  }

  const handleMouseDown = (index, event) => {
    const offsetX = event.clientX - tents[index].coordinates.x;
    const offsetY = event.clientY - tents[index].coordinates.y;
    setDraggingTentIndex(index);
    setDraggingTent({ ...tents[index], dragOffset: { x: offsetX, y: offsetY } });
  }

  const handleMouseMove = (event) => {
    if (draggingTent) {
      const newX = event.clientX - draggingTent.dragOffset.x;
      const newY = event.clientY - draggingTent.dragOffset.y;
      setDraggingTent({ ...draggingTent, coordinates: { x: newX, y: newY } });
      setTents(prevTents => {
        const updatedTents = prevTents.map((tent, index) => {
          if (index === draggingTentIndex) {
            return { ...tent, coordinates: { x: newX, y: newY } };
          }
          return tent;
        });
        return updatedTents;
      });
    }
  }
  

  const handleMouseUp = () => {
    if (draggingTent) {
      setSelectedTent({ ...draggingTent });
      setDraggingTent(null);
      setDraggingTentIndex(null);
    }
  }

  const handleHideDescription = () => {
    setSelectedTent(null);
  }

  return (
    <>
      <div className="contact-info" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <h2>Đặt chỗ ngay</h2>
        <p>Hòa mình vào thiên nhiên tại khu cắm trại Mã đà - Đặt chỗ ngay để trải nghiệm không gian thiên nhiên tuyệt vời!</p>
        <div className="camping-map-container" onMouseMove={handleMouseMove}>
          <div style={{ position: 'relative' }}>
            <img src="/images/map-new.jpg" alt="Camping Map" />
            <svg style={{ position: 'absolute', top: 0, left: 0 }} width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <symbol id="tent" viewBox="0 0 100 100">
                <image href="/images/tent-svgrepo-com.svg" x="0" y="0" width="50" height="50" />
              </symbol>
              {tents.map((tent, index) => (
                <use
                  key={index}
                  xlinkHref="#tent"
                  x={draggingTentIndex !== null ? draggingTent.coordinates.x : tent.coordinates.x}
                  y={draggingTentIndex !== null ? draggingTent.coordinates.y : tent.coordinates.y}
                  width="50"
                  height="50"
                  alt={tent.name}
                  title={tent.name}
                  onMouseDown={(event) => handleMouseDown(index, event)} // Thêm index vào đây
                  onMouseEnter={() => handleTentClick(tent)}
                  onMouseLeave={handleHideDescription}
              />
              
              ))}
            </svg>
          </div>
        </div>
        {selectedTent && (
          <div className="tent-description">
            <h3>{selectedTent.name}</h3>
            <p>{selectedTent.description}</p>
          </div>
        )}
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
  );
};

export default CampingInfo;
