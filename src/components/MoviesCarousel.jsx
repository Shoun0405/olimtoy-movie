import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import '../App.css'

import { imgPath } from "../utils/environments";
import { useDispatch } from "react-redux";
import { popularMoviesDetails } from "../redux/slices/moviesSlice";
import { Link } from "react-router-dom";


const MoviesCarousel = ({data, name}) => {


  const dispatch = useDispatch()
    
    return(
      <div className="mt-5">
      <h1 className='text-white text-start'>{name}</h1>
        <Swiper
        slidesPerView={4}
        spaceBetween={30}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        className="mySwiper"
      >
        {data && data.map(state => (
        <SwiperSlide key={state.id}>
        <Link
        className=" text-decoration-none"
        to={`/${state.id}`} 
        >
          <img
          className="movie_img border-r
          d-block w-100 justify-content-center align-items-center 
          position-relative"
          onClick={() => {dispatch(popularMoviesDetails(state.id))}} 
          src={`${imgPath}w500${state.poster_path}`} alt="" />
          <div className="movie-info text-light border-r">
            <h5>
            {state.title}
            </h5>
            <span>
            {Number(state.vote_average) === 0 ?
              '' 
              :
            state.vote_average}            
            </span>
          </div>
        </Link>
        </SwiperSlide>
        ))}
      </Swiper>
      </div>
)}

export default MoviesCarousel