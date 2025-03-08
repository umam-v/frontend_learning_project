import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';


const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => { 
    MovieProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };


    const [favorites, setFavorites] = useState([])

    useEffect(()=> {
        const storedFavs = localStorage.getItem("favorited")
        if(storedFavs) setFavorites(JSON.parse(storedFavs))
    },[])

    useEffect(()=> {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    },[favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id == movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id == movieId)
    }
    
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    
    return <MovieContext.Provider value={value}>

        {children}
    </MovieContext.Provider>
}
