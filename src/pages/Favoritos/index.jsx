import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { toast } from "react-toastify";

export default function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(myList) || []);
  }, []);

  function excluir(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });
    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    toast.success("Excluído com sucesso!");
  }

  return (
    <div className="FavFilmes">
      <h1>Favoritos</h1>

      {filmes.length === 0 && <h3>Sem filmes salvos!</h3>}

      <ul>
        {filmes &&
          filmes.map((r) => (
            <li key={r.id}>
              <h3>{r.title}</h3>
              <div>
                <Link to={`/filme/${r.id}`}>Acessar</Link>
                <button
                  onClick={() => {
                    excluir(r.id);
                  }}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
