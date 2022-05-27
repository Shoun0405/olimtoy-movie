import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { imgPath } from '../utils/environments'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Actors from '../components/Actors'
import { actorsOfMovies } from '../redux/slices/moviesSlice'

const MoviesDetails = () => {

  const dispatch = useDispatch()
    const {moviesDetails,
      moviesActors,
      loading} = useSelector(state => state.movies)
    

    useEffect(()=>{
      dispatch(actorsOfMovies(moviesDetails?.id))
    },[dispatch, moviesDetails])

    const actors = moviesActors?.cast
    

    const hour = !loading ? 
    Math.floor(moviesDetails?.runtime / 60) : 0
    const minut = !loading ? 
    Math.round(((moviesDetails?.runtime / 60) - Math
    .floor(moviesDetails?.runtime / 60)) * 60) : 0

    const rev = !loading ? moviesDetails?.revenue
    .toLocaleString('en-US', {minimumFractionDigits: 2})
    : 0
    const budge = !loading ? moviesDetails?.budget
    .toLocaleString('en-US', {minimumFractionDigits: 2}) 
    : 0
    const goBackHandler = () => {
      localStorage.removeItem('movieDetails')
    }

    return (
          <div className='details text-light'>
            <Navbar/>
            {moviesDetails && (
              <div className='container-fluid'>
              <div className="d-flex align-items-center">
              <img src={`${imgPath}w1280${moviesDetails?.backdrop_path}`}
              className="backDrop me-3"
              alt="" />
              <div className="titles me-1">
              <h1>{moviesDetails.original_title}</h1>
              <p>{moviesDetails.overview}</p>
              <span>Release: {moviesDetails.release_date}</span>
              <span className='d-block'>Duration: {hour} h {minut} m </span>
              <span>
              Budget: ${budge}
              </span>
              <span className='d-block'>
              Revenue: ${rev}
              </span>
              <span>Rate: {moviesDetails.vote_average}</span>
              </div>
              </div>
              <hr />
              <div className="d-flex align-items-center mb-4">
              <img className='posterImg'
              src={`${imgPath}w1280${moviesDetails?.poster_path}`} alt="" />{
                actors ? null
                :
              <Actors actors={actors}/>
              }
              </div>
              <Link className='text-decoration-none btn btn-primary me-4'
              onClick={() => goBackHandler()}
               to={'/'}>
                 Go Home</Link>
              <Link className='text-decoration-none btn btn-success '
              onClick={() => goBackHandler()}
               to={'/search'}>
                 Go Search</Link>
              </div>
            )}
              <Footer/>


          </div>
  )
}

export {MoviesDetails}
