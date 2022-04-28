import axios from "axios";
import { useEffect, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const res = await axios.post('https://shorturlshort.herokuapp.com/new',{
        url:`${inputValue}`
      })
    try {
      setLoading(true);
      setShortenLink(res.data.code);
    } catch(err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if(loading) {
    return <p className="noData">Encurtando...</p>
  }
  if(error) {
    return <p className="noData">Ops! Algo deu errado :(</p>
  }
const domain = 'https://shorturlshort.herokuapp.com/';

  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{domain + shortenLink}</p>
          <CopyToClipboard
            text={shortenLink}
            onCopy={() => setCopied(true)}
          >
            <button className={copied ? "copiado" : ""}>Copiar link!</button>
          </CopyToClipboard>
        </div>
      )}
    </>
  )
}

export default LinkResult