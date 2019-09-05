import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

//area of 1 pizza in sq.in
let areaOfPizza = diameter => {
  let radius = diameter / 2;
  let pi = 3.14;
  let area = pi * (radius * radius);
  return area;
};

//area of total pizza count
let totalPizzaArea = (size, numberOfPizzas) => {
  return areaOfPizza(size) * numberOfPizzas;
};
//price per sq inch
let pricePerSqIn = (unitPrice, totalPizzaArea, numberOfPizzas) => {
  return (unitPrice * numberOfPizzas) / totalPizzaArea;
};
//price per slice
let pricePerSlice = (unitPrice, slicesPerPizza) => {
  return unitPrice / slicesPerPizza;
};
// total cost
let totalPrice = (unitPrice, numberOfPizzas) => {
  return unitPrice * numberOfPizzas;
};

interface PizzaBuildState {
  size: number;
  unitPrice: number;
  numberOfPizzas: number;
  slices: number;
}

const DEFAULTSTATE: PizzaBuildState = {
  size: 16,
  unitPrice: 10.0,
  numberOfPizzas: 1,
  slices: 6
};

function PizzaForm() {}

function App() {
  const [resultList, setResultList] = React.useState([]);
  const [pizzaState, setPizzaState] = React.useState(DEFAULTSTATE);

  const [input, setValue] = React.useState();
  let [pizzaArea, setPizzaArea] = React.useState(0);
  let [totalCost, setTotalCost] = React.useState(0);

  let handleInput = event => {
    handleChange(event.target.name, event.target.value);
  };

  let handleChange = (key, value) => {
    setPizzaState((prevState: PizzaBuildState) => {
      let updatedState = {
        ...prevState
      };
      updatedState[key] = value;
      return updatedState;
    });
  };

  let totalArea = totalPizzaArea(pizzaState.size, pizzaState.numberOfPizzas);

  return (
    <div className="App">
      <h1>Pizza Wizard</h1>
      <div style={{ border: "5px solid red", marginBottom: 20 }}>
        <h2>Results View</h2>
        <ul>
          <li>
            <span>Price Per Sq. Inch: </span>
            <span>Price Per Slice:</span>
            <span>Total Price: </span>
            <span>Pizza Size: </span>
            <span>Unit Price: </span>
            <span>Quantity: </span>
            <span>Slices per Pizza: </span>
          </li>
        </ul>
      </div>
      <div style={{ border: "5px solid black", marginBottom: 20 }}>
        <div style={{ backgroundColor: "#e2e2e2", marginBottom: 20 }}>
          <h2>Current Pizza Build</h2>
          <p>Area of 1 Pizza: {areaOfPizza(pizzaState.size)}</p>
          <p>Total Area of Pizza: {totalArea}</p>
          <p>
            Price per Sq. Inch: $
            {pricePerSqIn(
              pizzaState.unitPrice,
              totalArea,
              pizzaState.numberOfPizzas
            )}
          </p>
          <p>
            Price per Slice: $
            {pricePerSlice(pizzaState.unitPrice, pizzaState.slices)}
          </p>
          <p>
            Total Price: $
            {totalPrice(pizzaState.unitPrice, pizzaState.numberOfPizzas)}
          </p>
        </div>
        <div style={{ border: "5px solid blue", marginBottom: 20 }}>
          <TextInput
            label="Pizza Size:"
            name="size"
            value={pizzaState.size}
            onChange={handleInput}
          />
          <TextInput
            label="Unit Price:"
            name="unitPrice"
            value={pizzaState.unitPrice}
            onChange={handleInput}
          />
          <TextInput
            label="Number of Pizzas:"
            name="numberOfPizzas"
            value={pizzaState.numberOfPizzas}
            onChange={handleInput}
          />
          <TextInput
            label="Slices per Pizza:"
            name="slices"
            value={pizzaState.slices}
            onChange={handleInput}
          />
        </div>
      </div>
    </div>
  );
}

let TextInput = props => {
  return (
    <div key={props.name}>
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" {...props} />
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
