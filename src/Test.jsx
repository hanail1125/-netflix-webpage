import React, { useState, useEffect } from 'react';
import './App.css';
import ReactPaginate from 'react-paginate'; // ReactPaginate 라이브러리 추가

const Test = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 추가
  const [moviesPerPage, setMoviesPerPage] = useState(20); // 페이지당 영화 개수 설정
  const [totalPages, setTotalPages] = useState(''); // 총 페이지 수 추가


  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=0b9838fb247d1fe11964d3ddd684974e')
      .then((response) => response.json())
      .then((data) => setGenres(data.genres));
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0b9838fb247d1fe11964d3ddd684974e&with_genres=${selectedGenre}&page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        const totalPagesForGenre = genres.length > 0 ? Math.ceil(genres.find(genre => genre.id === selectedGenre)?.total_movies / moviesPerPage) : 0;
        const totalPages = Math.ceil(data?.total_pages / moviesPerPage);
        const pageCount = selectedGenre ? totalPagesForGenre : totalPages;
        setCurrentPage(currentPage > pageCount ? pageCount : currentPage);
        setTotalPages(totalPages * 0.926)
      });
  }, [selectedGenre, currentPage, totalPages]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handlePageChange = (data) => {
    setCurrentPage(data.selected + 1); // 페이지 버튼 클릭 시 선택된 페이지 번호 (index)를 1 더해서 실제 페이지 번호로 설정
  };

  return (
    <div className="App">
      <h1>TMDB API 장르별 필터링</h1>

      <div className="genres">
        {genres?.map((genre) => (
          <button key={genre.id} onClick={() => handleGenreClick(genre.id)}>
            {genre.name}
          </button>
        ))}
      </div>

      <div className="movies" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies?.map((movie) => (
          <div key={movie.id} style={{ width: 220 }}>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>

      {/* ReactPaginate 컴포넌트 추가 */}
      {selectedGenre && movies.length > 0 && (
        <ReactPaginate
          pageCount={totalPages} // 총 페이지 수 계산 (영화 정보 이용)
          onPageChange={handlePageChange}
          currentPage={currentPage - 1} // ReactPaginate 라이브러리는 0-based indexing 사용
          previousLabel="이전"
          nextLabel="다음"
          pageRangeDisplayed={5}
          containerClassName="pagination"
          activeClassName="active"
        />
      )}
    </div>
  );
};

export default Test;
