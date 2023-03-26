import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = () => {
   
    const params = new URLSearchParams();
    params.append('text', input);
    params.append('source', from);
    params.append('target', to);
    params.append('mimeType', 'text/plain');

    axios.post('http://localhost:3001/translators',params, {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    }).then(res=>{
      console.log(res.data.translatedText)
      setOutput(res.data.translatedText)
    })
  };

  useEffect(() => {
    axios.get('http://localhost:3001/translators',
    {headers: {'accept':'application/json'}}).then(res=>{
      setOptions(res.data);
    })
  },[])

  return (
    <div className="App">
      <div>
        <h2>Google Translator App</h2>
      </div>
      <div>
        From ({from}) :
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        To ({to}) :
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          cols="50"
          rows="8"
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea cols="50" rows="8" value={output}></textarea>
      </div>
      <div>
        <button onClick={e=>translate()}>Translate</button>
      </div>
    </div>
  );
}

export default App;
