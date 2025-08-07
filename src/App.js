import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [codeCount, setCodeCount] = useState(1);
  const [codeLength, setCodeLength] = useState(8);
  const [codes, setCodes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateUniqueCode = useCallback((length) => {
    const characters = '0123456789ACDFGHJKMNPRUWY';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  }, []);

  const generateCodes = useCallback(() => {
    setIsGenerating(true);

    // Use setTimeout to allow UI to update and show loading state
    setTimeout(() => {
      const codesSet = new Set();

      // Check for impossible requests
      const maxPossibleCodes = Math.pow(24, codeLength);
      if (codeCount > maxPossibleCodes) {
        alert(`Cannot generate ${codeCount} codes with length ${codeLength}. Maximum possible is ${maxPossibleCodes.toLocaleString()}.`);
        setIsGenerating(false);
        return;
      }

      // Warn about potentially slow generation
      if (codeLength > 20) {
        const confirmed = window.confirm(`Generating ${codeCount} codes with length ${codeLength} may take a while. Continue?`);
        if (!confirmed) {
          setIsGenerating(false);
          return;
        }
      }

      while (codesSet.size < codeCount) {
        codesSet.add(generateUniqueCode(codeLength));
      }

      setCodes(Array.from(codesSet));
      setIsGenerating(false);
    }, 100);
  }, [codeCount, codeLength, generateUniqueCode]);

  const downloadCodes = useCallback(() => {
    if (codes.length === 0) {
      alert('No codes to download. Please generate codes first.');
      return;
    }

    const codeText = codes.join('\n');
    const blob = new Blob([codeText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'codes.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, [codes]);

  const copyToClipboard = useCallback(() => {
    if (codes.length === 0) {
      alert('No codes to copy. Please generate codes first.');
      return;
    }

    const codeText = codes.join('\n');
    navigator.clipboard.writeText(codeText).then(() => {
      alert('Codes copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy codes. Please try again.');
    });
  }, [codes]);

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1>🔐 Unique Code Generator</h1>
            <p>Generate random alphanumeric codes with guaranteed uniqueness</p>
          </div>

          <div className="card-body">
            <div className="form-group">
              <label htmlFor="codeCount">Number of Codes to Generate:</label>
              <input
                type="number"
                id="codeCount"
                min="1"
                max="50000"
                value={codeCount}
                onChange={(e) => setCodeCount(parseInt(e.target.value) || 1)}
                className="form-control"
              />
              <small className="form-text text-muted">Maximum: 50,000 codes</small>
            </div>

            <div className="form-group">
              <label htmlFor="codeLength">Length of Each Code:</label>
              <input
                type="number"
                id="codeLength"
                min="1"
                max="50"
                value={codeLength}
                onChange={(e) => setCodeLength(parseInt(e.target.value) || 1)}
                className="form-control"
              />
              <small className="form-text text-muted">Maximum length: 50 characters</small>
            </div>

            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={generateCodes}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Codes'}
              </button>

              <button
                className="btn btn-success"
                onClick={downloadCodes}
                disabled={codes.length === 0}
              >
                📥 Download as .txt
              </button>

              <button
                className="btn btn-secondary"
                onClick={copyToClipboard}
                disabled={codes.length === 0}
              >
                📋 Copy to Clipboard
              </button>
            </div>

            {codes.length > 0 && (
              <div className="results">
                <h3>Generated Codes ({codes.length}):</h3>
                <div className="codes-container">
                  {codes.map((code, index) => (
                    <div key={index} className="code-item">
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;