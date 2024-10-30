import "./App.css"
import React, { useState } from "react";
function App() {



  const [seedPhrase, setSeedPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [wordCount, setWordCount] = useState('12'); 



 


    
    const generateSeedPhrase = async () => {
      setLoading(true);
      setError('');
  
      try {
        const response = await fetch(`https://phrase-pied.vercel.app/generate/${wordCount}`);
        if (!response.ok) {
          throw new Error('Failed to fetch seed phrase');
        }
        const data = await response.json();
        setSeedPhrase(data.seedPhrase); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false);  
      }
    };
  
     const copyToClipboard = () => {
      navigator.clipboard.writeText(seedPhrase)
        .then(() => alert('Seed phrase copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
    };

   return (
    <div style={{
      padding:"10px"
    }}>
    <h1 style={{
      fontSize:"30px",
      textAlign:"center",
      fontWeight:"500"
    }}>Seed Phrase Generator</h1>
    
 
  <div style={{
    display:"flex",
    justifyContent:"space-between",
    width:"100%",
    marginTop:"40px",
       marginBottom:"20px"
  }}>
  <select 
      value={wordCount} 
      onChange={(e) => setWordCount(e.target.value)} 
      className="border rounded p-2 mb-4"
    >
      <option value="12">12 Words</option>
      <option value="24">24 Words</option>
    </select>

    <button 
      onClick={generateSeedPhrase} 
      style={{
        border:"1px solid red",
        color:"red",
        padding:"4px",
        borderRadius:"10px"
      }}
    >
      {loading ? 'Generating...' : 'Generate Seed Phrase'}
    </button>
  </div>
    
    {error && <p className="text-red-500">{error}</p>}
    {seedPhrase && (
      <div className="mb-4">
        <div style={{
          border:"1px solid red",
          padding:"10px",
          borderRadius:"10px"
        }}>
        {seedPhrase}
        </div>
       
        <button 
          onClick={copyToClipboard} 
          style={{
            float:"right",
            background:"red",
            color:"white",
            padding:"4px",
            marginTop:"20px",
            borderRadius:"5px"
          }}
        >
          Copy Seed Phrase
        </button>
      </div>
    )}
  </div>
    );
}
export default App;