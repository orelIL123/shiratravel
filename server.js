const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.post('/proxy-api/chat', async (req, res) => {
  try {
    const apiResponse = await fetch('https://orelagantmoney-cs3k6lxd--oreli123s-projects.vercel.app/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 