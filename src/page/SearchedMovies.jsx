import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { popularMoviesDetails, searchMovies } from '../redux/slices/moviesSlice';
import { imgPath } from '../utils/environments';

const SearchedMovies = () => {
    const dispatch = useDispatch()
    const {moviesSearched} = useSelector(state => state.movies)

    const searchMovie = moviesSearched?.results
    
    const resultsLength = moviesSearched?.results.length

    const [nameMovie, setNameMovie] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (nameMovie) {
        dispatch(searchMovies(nameMovie))
        }
    }

  return (
    <div className='my-bg'>
        <Navbar/>

        <div className="container-fluid min-vh-100">
            
        
        <form onSubmit={handleSubmit} className="d-flex" role="search">
              <input value={nameMovie} 
              onChange={(e)=>{setNameMovie(e.target.value)}}
              className="form-control me-2" type="search"
              placeholder="Search" aria-label="Search" />
              <button
              className="btn btn-outline-success" 
              type="submit">Search</button>
            </form>
        <div className="d-flex  flex-wrap justify-content-center pt-3">
        {
            resultsLength === 0 || !searchMovie ?
            
            <h1 className='text-light mt-5'>
            Nothing not Founded
            </h1>                
        :
         searchMovie.map(searched => (
                <Link to={`/${searched.id}`}
                key={searched.id} 
                onClick={()=>dispatch(popularMoviesDetails(searched.id))} 
                className="card m-3 shadow" style={{width: '16rem'}}>
                <img src={searched.poster_path === null ? 
                    'https://www.prokerala.com/movies/assets/img/no-poster-available.webp' 
                    : 
                    `${imgPath}/w1280/${searched.poster_path}`
                }
                className={searched.poster_path === null ? `no-poster card-img-top` : 'card-img-top'} alt="" />
                <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title mb-3">{
                    searched.title
                    }</h5>
                    <div className="">
                    <p>
                        <b>Popularity</b>: {searched.popularity.toFixed(2)}
                    </p>
                    <p className='mb-0'>
                        <b>Vote</b>: {searched.vote_average}
                    </p>
                    </div>
                </div>
                </Link>
                  
            ))
        }
        </div>

        </div>    

        <Footer/>
    </div>
  )
}

export default SearchedMovies