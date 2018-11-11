import axios from 'axios';

class apiCalls {
    
    getMovies = async (pageNumber)=>{
        let api_key = '417cacaf8d9e0305e148c3d5b90bdaf3';
        let page;
        if (pageNumber){
            page = pageNumber;
        } else {
            page = 1;
        }
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}`;
        const res = await axios.get(url)
        const results = await res.results 
        return results;
    }

    // getMovieByIdFromAPI = async (movieId)=>{
    //     var data;
    //     let api_key = '877ee9cfc049b2212145ecb01fb2a031';
    //     let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=credits`;
    //     await axios.get(url)
    //       .then(response => { 
    //         data = response.data;
    //       });
    //       return data;
    // }

    // getGenreListFromAPI = async ()=>{
    //     var data;
    //     let api_key = '877ee9cfc049b2212145ecb01fb2a031';
    //     let language = 'en-US';
    //     let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=${language}`;
    //     await axios.get(url)
    //       .then(response => { 
    //         data = response.data.genres;
    //       });
    //       return data;
    // }
}
  
const call = new apiCalls();
export default call;