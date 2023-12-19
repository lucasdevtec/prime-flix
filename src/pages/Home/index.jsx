import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./style.css";

export default function Home() {
  const [filmes, setFilmes] = useState();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: "pt-BR",
          page: 1,
        },
      });
      setFilmes(response.data.results);
    }

    loadFilmes();

    setLoad(false);
  }, []);

  if (load) {
    return (
      <div className="load">
        <h2>Carregando ...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="lista-filmes">
          {filmes &&
            filmes.map((r) => (
              <article key={r.id}>
                <h3>{r.title}</h3>
                <img
                  src={`https://image.tmdb.org/t/p/original/${r.poster_path}`}
                  alt={r.title}
                />
                <Link to={`/filme/${r.id}`}>Acessar</Link>
              </article>
            ))}
        </div>
      </div>
    </>
  );
}
