import React from "react";
import BG_Graph from "./assets/bg_graph.png";

function App() {
  const [pokemons, setPokemon] = React.useState( 
  JSON.parse(localStorage.getItem('pokemons'))?.length
  ? JSON.parse(localStorage.getItem('pokemons'))  
  : [
    {
      id: 1,
      name: "Pikachu",
      image:
        "https://media4.giphy.com/media/FMnVZzDALopvG/giphy.webp?cid=ecf05e47k0ch6j1k271mbzt95qs3m937fm0o2k9lswaose56&rid=giphy.webp",
      x: 250,
      y: 80,
      expanded : false
    },
    {
      id: 2,
      name: "Magika",
      image: "https://media3.giphy.com/media/27wc7vMWPvvJC/giphy.gif",
      x: 600,
      y: 500,
      expanded : false
    },
    {
      id: 3,
      name: "Bulbasaur",
      image:
        "https://media2.giphy.com/media/dAuGq9UkcumNj1KCHe/200w.webp?cid=ecf05e473vgeloe6jwxdohc2adg6nhdqtq3f8br6zmdybwey&rid=200w.webp",
      x: 60,
      y: 100,
      expanded : false
    },
  ]);

  const [pokemonImage, setPokemonImage] = React.useState("");
  const [pokemonName, setPokemonName] = React.useState("");

  React.useEffect(() => {

  }, []);

  const getPosition = (x, y) => {
    return { position: "absolute", left: `${x}px`, top: `${y}px` };
  };

  const moveX = (index, type) => {
    if (type === "right") {
      pokemons[index].x += 20;
      setPokemon([...pokemons]);
    }
    if (type === "left") {
      pokemons[index].x -= 20;
      setPokemon([...pokemons]);
    }
  };

  const moveY = (index, type) => {
    if (type === "top") {
      pokemons[index].y -= 20;
      setPokemon([...pokemons]);
    }
    if (type === "bottom") {
      pokemons[index].y += 20;
      setPokemon([...pokemons]);
    }
  };

  const addPokemon = () => {
    let newPokemon = [
      {
        id: Math.random(),
        name: pokemonName,
        image: pokemonImage,
        x: 60,
        y: 100,
        expanded : true
      },
      ...pokemons,
    ];
    localStorage.setItem('pokemons',JSON.stringify(newPokemon))
    setPokemon(JSON.parse(localStorage.getItem('pokemons')));
  };

  const CardPokemon = ({ name, index , expanded }) => {
    return (
      
      <div key={index} className="card m-2" style={{ color: "rgb(187, 187, 187)" }}>
        <div
          className="card-header"
          style={{ backgroundColor: "rgb(58, 58, 58)" }}
        >
          <h5 className="mb-0">
              {name}
          </h5>
        </div>
  
          <div
            className="card-body"
            style={{ backgroundColor: "rgb(83, 83, 83)" }}
          >
            <h6>Move</h6>
            <div className="row">
              <div className="col-6">
                <div>
                  <b>X:</b>
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => moveX(index, "left")}
                  >
                    <span style={{ fontSize: "20px" }}>&#9666;</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => moveX(index, "right")}
                  >
                    <span style={{ fontSize: "20px" }}>&#9656;</span>
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <b> Y:</b>
                </div>
                <div
                  className="btn-group-vertical"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => moveY(index, "top")}
                  >
                    <span style={{ fontSize: "20px" }}>&#9652;</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => moveY(index, "bottom")}
                  >
                    <span style={{ fontSize: "20px" }}>&#9662;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="header d-flex justify-content-between">
        <h3> Pokemon Playground </h3>
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Add Pokemon
        </button>
      </div>
      <div className="d-flex">
        <div className="left-col d-flex">
          <img src={BG_Graph} alt="bg_graph" />
          <img src={BG_Graph} alt="bg_graph" />
          {pokemons.map(({ x, y, image, name }, index) => {
            return (
              <img
                key={index}
                src={image}
                style={getPosition(x, y)}
                width={"120px"}
                height={"120px"}
                alt={name}
              />
            );
          })}
        </div>
        <div className="right-col" style={{ overflow : "auto" }}>
          <div className="p-4">
              {pokemons.map((item, index) => {
                return <CardPokemon key={item.id} {...item} index={index} />;
              })}
            </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add Pokemon
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="image">Image url</label>
                <span className="ml-2">
                  {" "}
                  <a
                    href="https://giphy.com/search/pokemon-stickers"
                    target="_blank"
                    rel="noreferrer"
                  >
                    link
                  </a>{" "}
                </span>
                <input
                  type="text"
                  className="form-control mt-2 mb-2"
                  id="image"
                  placeholder="image url or base64"
                  onKeyUp={(e) => setPokemonImage(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control mt-2 mb-2"
                  id="name"
                  placeholder="Pikachu .."
                  onKeyUp={(e) => setPokemonName(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addPokemon()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
