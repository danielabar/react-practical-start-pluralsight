import React from 'react';
import SearchResultsRow from './search-results-row';

const SearchReults = (props) => {
  // an array of SearchResultsRow components, will be rendered later in return statement as expression
  const houseRows = props.filteredHouses.map(h =>
    <SearchResultsRow key={h.id.toString()} house={h} setActiveHouse={props.setActiveHouse} />
  );

  return (
    <div className="mt-2">
      <h4>Results for {props.country}:</h4>
      <table className="table table-hover">
        <tbody>
          {houseRows}
        </tbody>
      </table>
    </div>
  );
}

export default SearchReults;