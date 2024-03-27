import React from "react";
import "./Counter.style.sass";

interface Props {
  value: number;
  setValue: any;
}

export default function Counter({ value, setValue }: Props) {
  return (
    <div className="counter">
      <button onClick={() => setValue(value - 1)}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 12L18 12"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <input
        onChange={(e) => setValue(Number(e.target.value))}
        inputMode="numeric"
        type="text"
        value={value}
      ></input>
      <button onClick={() => setValue(value + 1)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.402 45.402">
          <g>
            <path
              d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
            />
          </g>
        </svg>
      </button>
    </div>
  );
}