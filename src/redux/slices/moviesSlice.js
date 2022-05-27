import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { api_key, baseUrl, searchUrl } from '../../utils/environments'


/*

///// Home page

*/


//popularMovies

export const popularMovies = createAsyncThunk(
    'movie/popularMovies', async ( page, { rejectWithValue, getState, dispatch } ) => {

        try {
            
            const {data} = await axios.get(`${baseUrl}popular?${api_key}&page=${page}`)
            // const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7bbe24faba3854367a77518e29f17914&page=${page}`)
            
            // console.log(data)
            return data.results

        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.message)
        }

    }
)

//topRatedMovies

export const topRatedMovies = createAsyncThunk(
    'movie/topRatedMovies', async ( page, { rejectWithValue, getState, dispatch } ) => {

        try {
            
            const {data} = await axios.get(`${baseUrl}top_rated?${api_key}&page=${page}`)
            // const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7bbe24faba3854367a77518e29f17914&page=${page}`)
            
            // console.log(data)
            return data.results

        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.message)
        }

    }
)

//upComingMovies

export const upComingMovies = createAsyncThunk(
    'movie/upComingMovies', async ( page, { rejectWithValue, getState, dispatch } ) => {

        try {
            
            const {data} = await axios.get(`${baseUrl}upcoming?${api_key}&page=${page}`)
            // const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7bbe24faba3854367a77518e29f17914&page=${page}`)
            
            // console.log(data)
            return data.results

        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.message)
        }

    }
)

//nowPlayingMovies

export const nowPlayingMovies = createAsyncThunk(
    'movie/nowPlayingMovies', async ( page, { rejectWithValue, getState, dispatch } ) => {

        try {
            
            const {data} = await axios.get(`${baseUrl}now_playing?${api_key}&page=${page}`)
            // const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7bbe24faba3854367a77518e29f17914&page=${page}`)
            
            // console.log(data)
            return data.results

        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.message)
        }

    }
)


/*

///// Details page

*/



export const popularMoviesDetails = createAsyncThunk(
    'movie/popular/details', async ( movie_id, { rejectWithValue, getState, dispatch } ) => {

        try {
            
            const {data} = await axios.get(`${baseUrl}${movie_id}?${api_key}`)
            
            localStorage.setItem("movieDetails", JSON.stringify(data));
            // console.log(data)
            return data

        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.message)
        }

    }
)

export const actorsOfMovies = createAsyncThunk(
    'movies/actors',
    async (movie_id, {rejectWithValue, getState, dispatch})=>{

        try {
            const {data} = await axios.get(`${baseUrl}${movie_id}/credits?${api_key}`)
            return data
        } catch (error) {
         if (!error.response) {
             throw error
         }   
         rejectWithValue(error.message)
        }

    }
)


/*

////// Search page

*/

export const searchMovies = createAsyncThunk(
    'movies/search',
    async (nameAndPage, {rejectWithValue, getState, dispatch}) => {
        

        
        try {
            // const {nameMovie} = nameAndPage
            const {data} = await axios.get(`${searchUrl}?${api_key}&query=${nameAndPage}&include_adult=false`)
            // &page=${!page ? 1 : page }

            return data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            rejectWithValue(error.message)
        }


    }
)


const moviesDetailsStorage = localStorage.getItem("movieDetails")
? JSON.parse(localStorage.getItem("movieDetails"))
: null;


export const moviesSlice = createSlice({
    name : 'movie',
    initialState:{
        moviesDetails:moviesDetailsStorage,
        home:[]
    },

    extraReducers: builder => {
        
        //search movie

        builder.addCase(searchMovies.pending, (state, action)=>{
            state.loading = true
            state.appErr = undefined
            state.serverErr = undefined
        })
        builder.addCase(searchMovies.fulfilled, (state,action)=>{
            state.loading = false
            state.moviesSearched = action.payload
            state.appErr = undefined
            state.serverErr = undefined
        })
        builder.addCase(searchMovies.rejected,(state,action)=>{
            state.loading = false
            state.appErr = action.payload
            state.serverErr = action.error.message
        })


        //topRatedMovies

        builder.addCase(topRatedMovies.pending, (state, action) => {
            state.loading = true
            state.appErr = undefined
            state.serverErr = undefined
        })
        builder.addCase(topRatedMovies.fulfilled, (state, action) => {
            state.loading = false
            state.home= {...state.home, topRated: action.payload}
            state.appErr = undefined
            state.serverErr = undefined
            // console.log(action)
        })
        builder.addCase(topRatedMovies.rejected, (state, action) => {
            state.loading = false
            state.appErr = action.payload
            state.serverErr = action.error.message
        })
        
        //upComingMovies

        builder.addCase(upComingMovies.pending, (state, action) => {
            state.loading = true
            state.appErr = undefined
            state.serverErr = undefined
        })
        builder.addCase(upComingMovies.fulfilled, (state, action) => {
            state.loading = false
            state.home = {...state.home, upComing: action.payload}
            state.appErr = undefined
            state.serverErr = undefined
            // console.log(action)
        })
        builder.addCase(upComingMovies.rejected, (state, action) => {
            state.loading = false
            state.appErr = action.payload
            state.serverErr = action.error.message
        })
        
        //nowPlayingMovies

        builder.addCase(nowPlayingMovies.pending, (state, action) => {
            state.loading = true
            state.appErr = undefined
            state.serverErr = undefined
        })
        builder.addCase(nowPlayingMovies.fulfilled, (state, action) => {
            state.loading = false
            state.home = {...state.home, nowPlaying: action.payload}
            state.appErr = undefined
            state.serverErr = undefined
            // console.log(action)
        })
        builder.addCase(nowPlayingMovies.rejected, (state, action) => {
            state.loading = false
            state.appErr = action.payload
            state.serverErr = action.error.message
        })
        
        
        //popular_movies

        builder.addCase(popularMovies.pending, (state, action) => {
            state.loading = true
            state.appErr = undefined
            state.serverErr = undefined
        })
        builder.addCase(popularMovies.fulfilled, (state, action) => {
            state.loading = false
            state.home = {...state.home, popular: action.payload}
            state.appErr = undefined
            state.serverErr = undefined
            // console.log(action)
        })
        builder.addCase(popularMovies.rejected, (state, action) => {
            state.loading = false
            state.appErr = action.payload
            state.serverErr = action.error.message
        })

        //movies details

        builder.addCase(popularMoviesDetails.pending, (state, action) => {
            state.loading = true
            state.appErr = undefined
            state.serverErr = undefined
        })
        builder.addCase(popularMoviesDetails.fulfilled, (state, action) => {
            state.loading = false
            state.moviesDetails = action.payload
            state.appErr = undefined
            state.serverErr = undefined
        })
        builder.addCase(popularMoviesDetails.rejected, (state, action) => {
            state.loading = false
            state.appErr = action.payload
            state.serverErr = action.error.message
        })

        //movies actors

        builder.addCase(actorsOfMovies.pending, (state, action) => {
            state.loading = true
            state.appErr = undefined
            state.serverErr = undefined
        })
        builder.addCase(actorsOfMovies.fulfilled, (state, action) => {
            state.loading = false
            state.moviesActors = action.payload
            state.appErr = undefined
            state.serverErr = undefined
        })
        builder.addCase(actorsOfMovies.rejected, (state, action) => {
            state.loading = false
            state.appErr = action.payload
            state.serverErr = action.error.message
        })

    }
})



export default moviesSlice.reducer