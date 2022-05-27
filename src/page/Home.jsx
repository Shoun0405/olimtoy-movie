import React, 
{
    useEffect
} from 'react'
import {
    popularMovies,
    nowPlayingMovies,
    topRatedMovies,
    upComingMovies
} from '../redux/slices/moviesSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import HeaderCarousel from '../components/HeaderCarousel'
import Navbar from '../components/Navbar'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import MoviesCarousel from '../components/MoviesCarousel.jsx'
import Footer from '../components/Footer.jsx'


const Home = () => {


    const dispatch = useDispatch()
    const {
      home,serverErr,appErr,loading
    } = useSelector(state => state.movies)

    const {popular, 
      topRated, 
      nowPlaying, 
      upComing, 
      } = home
    
    useEffect(() => {
      dispatch(popularMovies())
      dispatch(topRatedMovies())
      dispatch(nowPlayingMovies())
      dispatch(upComingMovies())
    },[dispatch])
  return (
      <div className='home'>
      <Navbar/>  

    {loading ?
    <h1 className='text-light min-vh-100'>Loading ......</h1>:
    appErr || serverErr ?
    
    <h1 className='text-light  min-vh-100'>{serverErr} {appErr}</h1>
    :
      <div className="container">        
      <HeaderCarousel movies={popular}/>
      <MoviesCarousel data={popular} name='Popular'/>
      <MoviesCarousel data={topRated} name='Top Rated'/>
      <MoviesCarousel data={nowPlaying} name='Now Playing'/>
      <MoviesCarousel data={upComing} name='Up Coming'/>
    </div>
    }
    <Footer/>
    </div>
  )
}

export default Home