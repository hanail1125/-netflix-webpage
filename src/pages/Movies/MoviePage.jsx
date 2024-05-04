import React, {useEffect, useState} from "react";
import {useSearchMovieQuery} from "../../hooks/useSearchMovie";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Alert, Col, Container, Row, Spinner} from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import './MoviePage.style.css';
import {useMoviesGenreQuery} from "../../hooks/useMoviesGenre";
import {useSelectGenreData} from "../../hooks/useSelectGenre";

const MoviePage = () => {
  const [query] = useSearchParams();
  const keyword = query.get('q');
  const [keywords] = useState(keyword);
  const [page, setPage] = useState('');

  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword, page});
  const {data: genreData} = useMoviesGenreQuery();

  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [genres] = useState([]);
  const [moviesPerPage] = useState(20);

  const [ascending, setAscending] = useState(true);
  const {movies} = useSelectGenreData(`https://api.themoviedb.org/3/discover/movie?api_key=0b9838fb247d1fe11964d3ddd684974e&with_genres=${selectedGenre}&page=${currentPage}&language=ko-KR`, selectedGenre, currentPage, genres, moviesPerPage);

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSort = (event) => {
     event.preventDefault();
    navigate(`/movies`);
    setAscending(!ascending);
    setSelectedGenre('');
  };

  useEffect(() => {
    setPage(1);
  }, [ascending, keywords]);

  const navigate = useNavigate();

  const handleGenreClick = (genreId) => {
    navigate(`/movies`);
    setSelectedGenre(genreId);
  };

  const handlePageChange = (data) => {
    setCurrentPage(data.selected + 1);
  };

  if (isLoading) {
    return (
      <div>
        <Spinner
          animation='border'
          variant='danger'
          style={{width: '5rem', height: '5rem'}}
        />
      </div>
    );
  }

  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert >;
  }

  const sortedResults = movies?.sort((a, b) => {
    return ascending ? b.popularity - a.popularity : a.popularity - b.popularity;
  });

  return (
    <Container style={{paddingTop: 110, paddingBottom: 25}}>
      <Row>
        <Col lg={4} xs={12}>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item first">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Sort
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <strong className='first'>Sort Results By</strong>
                  <p className="second">Sort By</p>
                  <p className="third">
                    <button onClick={handleSort}>
                      {ascending ? "Popularity(Desc) ↓" : "Popularity(Desc) ↑"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item second">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Filtering
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <strong className='first'>Genres</strong>
                  <div className="genreData">
                    {genreData?.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => handleGenreClick(genre.id)}
                        className={`${selectedGenre === genre?.id ? 'btn btn-primary' : 'btn btn-danger'}`}
                      >{genre.name}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={8} xs={12} className="MoviesList">
          <Row>
            {keyword && (
              <>
                {data.results.map((movie) => {
                  return (
                    <Col key={movie.id} lg={6} xs={12}>
                      <MovieCard movie={movie} addClass='moviepage' movieType='popular' />
                    </Col>
                  );
                })}
              </>
            )}
            {!keyword && (
              <>
                {sortedResults?.map((movie) => {
                  return (
                    <Col key={movie.id} lg={6} xs={12}>
                      <MovieCard movie={movie} addClass='moviepage' movieType='popular' />
                    </Col>
                  );
                })}
              </>
            )}
          </Row>
          <div style={{marginTop: 30, display: 'flex', justifyContent: 'center'}}>
            <ReactPaginate
              pageCount={keyword ? data.total_pages/moviesPerPage : 500}
              nextLabel="▶"
              onPageChange={handlePageChange}
              currentPage={currentPage - 1}
              pageRangeDisplayed={windowDimensions.width < 700 ? 1 : 10}
              marginPagesDisplayed={1}
              previousLabel="◀"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1}
              disableCurrent={false}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;