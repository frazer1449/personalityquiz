import React, {useContext} from "react";
import {UserContext} from "./UserContext.jsx"

export default function Results({ element, artwork }) {
  // reference the context for the "name".
  const {name} = useContext(UserContext)

  return (
    <div>
      <p>
        <strong>{name}</strong>, your element is: {element}
      </p>
      {artwork ? (
        <div className="artwork">
          <h2>{artwork.title}</h2>
          <img src={artwork.primaryImage} alt={artwork.title} />
          <p>{artwork.artistDisplayName}</p>
          <p>{artwork.objectDate}</p>
        </div>
      ) : (
        <p>No artwork found.</p>
      )}n
    </div>
  );
}