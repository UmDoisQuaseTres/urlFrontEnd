import { useState } from "react"

const InputShortener = ({ setInputValue }) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    setInputValue(value);
    setValue("");
  }

  return (
    <div className="inputContainer">
      <h1>Encurtador <span>de links</span></h1>
      <div>
        <input
          type="text"
          placeholder="Cole o link a ser encurtado!"
          value={value}
          onChange={e => setValue(e.target.value)}  
        />
        <button onClick={handleClick}>Encurtar</button>
      </div>
    </div>
  )
}

export default InputShortener