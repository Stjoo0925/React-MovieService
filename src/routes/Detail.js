import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Detail() {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);

  if (!detail) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{detail.title_long}</h1>
      <hr />
      <div style={{ display: "flex" }}>
        <h4 style={{ marginRight: "20px" }}>Rating | {detail.rating}</h4>
        <h4 style={{ marginRight: "20px" }}>Runtime | {detail.runtime}</h4>
        <h4 style={{ marginRight: "20px" }}>Language | {detail.language}</h4>
      </div>
      <h4>Genre | </h4>
      <ul>
        {detail.genres &&
          detail.genres.map((genre, index) => <li key={index}>{genre}</li>)}
      </ul>
      <img src={detail.medium_cover_image} alt={detail.title} />
      <h4>Introduction | </h4>
      <h4>
        {detail.description_full === ""
          ? "There is no movie introduction..."
          : detail.description_full}
      </h4>
      <button>
        <Link to="/">Back To Main</Link>
      </button>
    </div>
  );
}

export default Detail;
