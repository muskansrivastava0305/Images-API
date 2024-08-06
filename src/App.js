import React, { useState, useEffect } from 'react';

function App() {
  const [records, setRecords] = useState([]);
  //const [downloadLink, setDownloadLink] = useState(null);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list')
      .then(response => response.json())
      .then(data => setRecords(data))
      .catch(err => console.log(err));
  }, []);

  const handleDownload = (image) => {
    fetch(image.download_url)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `image-${image.id}.jpg`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  return (
    <div style={{alignItems:'center'}}>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            <img src={record.download_url} alt={record.author} style={{ width: 250, height: 200, display: 'flex', margin: '20px' }} />
            <p style={{ fontSize: 16, fontWeight: 'bold' }}>{record.author}</p>
            <button onClick={() => handleDownload(record)} style={{ backgroundColor: 'green', color: 'white', marginBottom: '2rem', }}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App
