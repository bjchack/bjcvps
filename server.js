import express from "express";
import { randomUUID } from "crypto";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <h2>BJC VLESS Config Generator</h2>
    <form action="/vless">
      <label>Enter Domain (example: bjcvps.glitch.me)</label><br>
      <input name="domain" value="${req.headers.host}" required><br><br>
      <button type="submit">Generate VLESS</button>
    </form>
  `);
});

app.get("/vless", (req, res) => {
  const domain = req.query.domain || req.headers.host;
  const uuid = randomUUID();

  const vlessLink = `vless://${uuid}@${domain}:443?encryption=none&security=tls&type=ws&path=/ray#BJC-VPN`;

  res.send(`
    <h2>✅ Your VLESS Config</h2>
    <textarea style="width:100%;height:100px">${vlessLink}</textarea>
    <br><br>
    <a href="/">Generate New</a>
  `);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
