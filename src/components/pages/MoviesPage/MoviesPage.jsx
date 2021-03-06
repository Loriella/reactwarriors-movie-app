import React from "react";
import {withAuth} from "../../../hoc/withAuth";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";

const initialFilters = {
  sort_by: "popularity.desc",
  primary_release_year: "primary_release_year",
  with_genres: [],
};

class MoviesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: initialFilters,
      page: 1,
      total_pages: 1,
    }
  }

  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  onChangePage = page => {
    this.setState({
      page
    })
  };

  onChangeTotalPages = value => {
    this.setState({
      total_pages: value
    })
  };

  onResetFilters = () => {
    this.setState({
      filters: initialFilters,
      page: 1
    })
  };

  render() {
    const {
      filters,
      page,
      total_pages,
    } = this.state;

    const {auth, authActions} = this.props;

    return (
      <div className="container pt-1">
        <div className="row">
          <div className="col-4">
            <div className="card sticky-top">
              <div className="card-body py-1">
                <h3>Фильтры:</h3>
                <Filters
                  filters={filters}
                  page={page}
                  total_pages={total_pages}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                  onResetFilters={this.onResetFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              session_id={auth.session_id}
              onChangePage={this.onChangePage}
              onChangeTotalPages={this.onChangeTotalPages}
              toggleModal={authActions.toggleModal}
            />
          </div>
        </div>
      </div>

    );
  }
}

export default withAuth(MoviesPage);
