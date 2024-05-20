// import React from "react";
// import "../styles/people.css";

// // import Swiper core and required modules
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// // import "swiper/css/effect-fade";

// const SwiperPeople = ({ people }) => {
//   return (
//     <>
//       {/* <h1>Actores Famosos</h1> */}
//       <Swiper
//         // install Swiper modules
//         modules={[Navigation, Pagination, Scrollbar, A11y]}
//         spaceBetween={50}
//         slidesPerView={8}
//         navigation
//         pagination={{ clickable: true }}
//         scrollbar={{ draggable: true }}
//         onSwiper={(swiper) => console.log(swiper)}
//         onSlideChange={() => console.log("slide change")}
//       >
//         {people?.length > 0 &&
//           people.map((person, i) => (
//             <SwiperSlide key={i} className="swiper-slide">
//               <div className="actores">
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
//                   alt=""
//                   className="people"
//                 />
//               </div>
//               <div className="nombreActor">
//                 <p>{person.name}</p>
//               </div>
//             </SwiperSlide>
//           ))}
//       </Swiper>
//     </>
//   );
// };

// export default SwiperPeople;
