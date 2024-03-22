
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { baseUrl } from "../../utils/baseUrl";


// const CampingInfo = () => {
//   const [tents, setTents] = useState([]);
//   const [selectedTent, setSelectedTent] = useState(null);

//   const fetchTents = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/api/tents/GetAllTents`); 
//       setTents(response.data);
//     } catch (error) {
//       console.error('Error fetching tents: ', error);
//     }
//   }

//   useEffect(() => {
//     fetchTents();
//   }, []);

//   const handleTentClick = (tent) => {
//     setSelectedTent(tent);
//   }

//   const handleHideDescription = () => {
//     setSelectedTent(null);
//   }
//   const customCoordinates = [
//     "182,82,421,192",
//     "723,746,59,44", 
//   ];

//   return (
//     <>
//       <div className="contact-info">
//         <h2>Đặt chỗ ngay</h2>
//         <p>
//           Hòa mình vào thiên nhiên tại khu cắm trại Mã đà - Đặt chỗ ngay để trải nghiệm không gian thiên nhiên tuyệt vời!
//         </p>
//         <div className="camping-map-container">
//           <img src="/images/map-new.jpg" useMap="#campMap" alt="Camping Map" />
//           <map name="campMap">
//             {tents.map((tent, index) => (  
//               <area 
//                 key={index}
//                 shape="rect"
//                 coords={customCoordinates[index]}
//                 href="#" 
//                 alt={tent.name}
//                 title={tent.name}
//                 onMouseEnter={() => handleTentClick(tent)}
//                 onMouseLeave={handleHideDescription}
//               />
//             ))}
//           </map>
//         </div>
//         {selectedTent && (
//           <div className="tent-description">
//             <h3>{selectedTent.name}</h3>
//             <p>{selectedTent.description}</p>
//           </div>
//         )}
//         <ul>
//           <li>
//             <div className="icon">
//               <i className="bx bx-map"></i>
//             </div>
//             <h3>Địa chỉ</h3>
//             <p>Ấp 1, xã, Hiếu Liêm, Vĩnh Cửu, Đồng Nai</p>
//           </li>
//           <li>
//             <div className="icon">
//               <i className="bx bx-phone-call"></i>
//             </div>
//             <h3>Liên hệ</h3>
//             <p>
//               Số điện thoại: <a href="tel:0918 669 926">0918 669 926</a>
//             </p>
//             <p>
//               Mail: <a href="mailto:hello@eLearniv.com">hello@eLearniv.com</a>
//             </p>
//           </li>
//           <li>
//             <div className="icon">
//               <i className="bx bx-time-five"></i>
//             </div>
//             <h3>Giờ hoạt động</h3>
//             <p>Monday - Friday: 09:00 - 20:00</p>
//             <p>Sunday & Saturday: 10:30 - 22:00</p>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default CampingInfo;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from "../../utils/baseUrl";

const CampingInfo = () => {
  const [tents, setTents] = useState([]);
  const [selectedTent, setSelectedTent] = useState(null);
  const [draggingTent, setDraggingTent] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const calculateCoordinates = (index) => {
    const row = Math.floor(index / 5); // so hang
    const col = index % 5; // so cot.
    const x = col * 100; 
    const y = row * 100; 
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

  const handleMouseDown = (tent, event) => {
    setDraggingTent(tent);
    const rect = event.target.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });
  }

  const handleMouseMove = (event) => {
    if (draggingTent) {
      const newX = event.clientX - dragOffset.x;
      const newY = event.clientY - dragOffset.y;
      setDraggingTent({ ...draggingTent, coordinates: { x: newX, y: newY } });
    }
  }

  const handleMouseUp = () => {
    setDraggingTent(null);
  }

  const handleHideDescription = () => {
    setSelectedTent(null);
  }
  return (
    <>
      <div className="contact-info" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <h2>Đặt chỗ ngay</h2>
        <p>Hòa mình vào thiên nhiên tại khu cắm trại Mã đà - Đặt chỗ ngay để trải nghiệm không gian thiên nhiên tuyệt vời!</p>
        <div className="camping-map-container">
          <img src="/images/map-new.jpg" alt="Camping Map" />
          <svg width="50%" height="50%" viewBox="916 973 716 539" xmlns="http://www.w3.org/2000/svg">
            {tents.map((tent, index) => (  
              <use
                key={index}
                xlinkHref="/images/tent-4-svgrepo-com.svg"
                x={tent.coordinates.x} 
                y={tent.coordinates.y} 
                width="50" 
                height="50" 
                alt={tent.name}
                title={tent.name}
                onMouseDown={(event) => handleMouseDown(tent, event)}
                onMouseEnter={() => handleTentClick(tent)}
                onMouseLeave={handleHideDescription}
              />
            ))}
          </svg>
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




