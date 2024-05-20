//En grid,mapeamos cada Card
import React from "react";
// import { useParams } from "react-router";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const Grid = ({ collection }) => {
  //collection es min prop

  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {collection.length > 0 &&
            collection.map((data, i) => (
              <div className="col-md-4" key={i}>
                <Link to={`movie/${data.id}`}>
                  <UserCard dataUsecard={data} />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Grid;
