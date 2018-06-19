import React from 'react'
import HouseDetail from '../house';

const FeaturedHouse = (props) => {
  if (props.house) return (
    <div>
      <div className="row featuredHouse">
        <h3 className="col-md-12 text-center">
          Featured house
        </h3>
      </div>
      <HouseDetail house={props.house} />
    </div>
  );
  return (
    <div>No featured house at this time.</div>
  );
}

export default FeaturedHouse;