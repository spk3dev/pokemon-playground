import React from "react"
import BG_Graph from "./assets/bg_graph.png"

function App() {

  const [pokemons, setPokemon] = React.useState([
    {
      id: 1,
      name: "Pikachu",
      image: "Pikachu.gif",
      x: 250,
      y: 80,
    },
    {
      id: 2,
      name: "Magika",
      image: "Magika.gif",
      x: 600,
      y: 500,
    },
    {
      id: 3,
      name: "Bulbasaur",
      image: "Bulbasaur.gif",
      x: 60,
      y: 100,
    }
  ])

  const [pokemonsTemp, setPokemonTemp] = React.useState([])

  React.useEffect(() => {

    setPokemonTemp(pokemons)

  }, [])


  const getPosition = (x, y) => {
    return { position: 'absolute', left: `${x}px`, top: `${y}px` }
  }


  const moveX = (index, type) => {
    if (type === "right") {
      pokemonsTemp[index].x += 20
      setPokemonTemp([...pokemonsTemp])
    }
    if (type === "left") {
      pokemonsTemp[index].x -= 20
      setPokemonTemp([...pokemonsTemp])
    }
  }

  const moveY = (index, type) => {
    if (type === "top") {
      pokemonsTemp[index].y -= 20
      setPokemonTemp([...pokemonsTemp])
    }
    if (type === "bottom") {
      pokemonsTemp[index].y += 20
      setPokemonTemp([...pokemonsTemp])
    }
  }

  const CardPokemon = ({ name, index }) => {

    return (
      <div className="card" style={{ color: "rgb(187, 187, 187)" }}>
        <div className="card-header" style={{ backgroundColor: "rgb(58, 58, 58)" }} id="headingTwo">
          <h5 className="mb-0">
            <button className="btn text-light" data-toggle="collapse" data-target={'#collapse' + index}
              aria-expanded="false" aria-controls={'collapse' + index}>
              {name}
            </button>
          </h5>
        </div>
        {/* { JSON.stringify(props) } */}
        <div id={'collapse' + index} className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
          <div className="card-body" style={{ backgroundColor: "rgb(83, 83, 83)" }}>
            <h6>Move</h6>
            <div className="row">
              <div className="col-6">
                <div>
                  <b>X:</b>
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-secondary" onClick={() => moveX(index, 'left')}>
                    <span style={{ fontSize: "20px" }}>&#9666;</span>
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => moveX(index, 'right')}>
                    <span style={{ fontSize: "20px" }}>&#9656;</span>
                  </button>
                </div>

              </div>
              <div className="col-6">
                <div>
                  <b> Y:</b>
                </div>
                <div className="btn-group-vertical" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-secondary" onClick={() => moveY(index, 'top')} >
                    <span style={{ fontSize: "20px" }}>&#9652;</span>
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => moveY(index, 'bottom')} >
                    <span style={{ fontSize: "20px" }}>&#9662;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">

      <div className="header d-flex justify-content-between">
        <h3> Pokemon Playground </h3>
        <button className="btn btn-primary">
          Add Pokemon
        </button>
      </div>
      <div className="d-flex">
        <div className="left-col d-flex">
          <img src={BG_Graph} alt="bg_graph" />
          <img src={BG_Graph} alt="bg_graph" />
          {
            pokemonsTemp.map(({ x, y, image }, index) => {
              return <img key={index} src={require('./assets/' + image).default} style={getPosition(x, y)} width={"120px"} height={"120px"} alt="pokemon.name" />
            })
          }
        </div>
        <div className="right-col">

          <div className="p-4">
            {
              pokemons.map((item, index) => {

                return <CardPokemon key={item.id} {...item} index={index} />
              })
            }
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
