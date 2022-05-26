import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";

import 'bootstrap/dist/css/bootstrap.css'

// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { imgPath } from '../utils/environments';
import { useDispatch } from 'react-redux';
import { popularMoviesDetails } from '../redux/slices/moviesSlice';
import { Link } from 'react-router-dom';


const HeaderCarousel = ({movies}) => {
  
  const dispatch = useDispatch()
    
  return (
    <Swiper
    centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[ Autoplay, Pagination, Navigation]}
      className="mySwiper rounded-3"
      loop={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
    >
        { movies && movies.map(movie => (
            <SwiperSlide key={movie.id} >
              <Link onClick={()=> dispatch(popularMoviesDetails(movie.id))} to={`/${movie.id}`}>
                <img className='d-block w-100 justify-content-center align-items-center' src={` ${imgPath}w1280${movie.backdrop_path} `}  alt='' />
                
                <div className="carousel-caption d-none d-md-block">
                    <h5>{movie.original_title}</h5>
                    <p>{movie.title !== movie.original_title ? movie.title : null}</p>
                </div>
              </Link>
            </SwiperSlide>
        ))
      }
    </Swiper>
  )
}

export default HeaderCarousel