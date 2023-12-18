import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { api_Key } from "../../../keyApi";
import "./style.css";
import { toast } from "react-toastify";

export default function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState();
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: api_Key,
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoad(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilme();
  }, [id, navigate]);

  function salvarFilmes() {
    const myList = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(myList) || [];

    const hasFilm = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilm) {
      toast.warn("Já adicionado!");
      return;
    } else {
      filmesSalvos.push(filme);
      localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
      console.log(hasFilm);
      toast.success("Filme salvo.");
    }
  }

  if (load) {
    return (
      <div>
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="filmeInfo">
        <img
          src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
          alt={filme.title}
        />
        <h1>{filme.title}</h1>

        <div className="sinopse">
          <h3>Sinopse</h3>
          <p>{filme.overview}</p>
        </div>

        <strong>Avaliação: {filme.vote_average.toFixed(2)}/10</strong>

        <div className="filmeActions">
          <a
            href={`https://www.youtube.com/results?search_query=Trailer+${filme.title}`}
            target="blank"
            rel="noreferrer"
          >
            <button>Trailer</button>
          </a>
          <button onClick={salvarFilmes}>Salvar</button>
        </div>
      </div>
    </>
  );
}
