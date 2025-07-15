const sharp = require("sharp");

module.exports = async (req, res) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const buffer = Buffer.concat(chunks);

  try {
    const output = await sharp(buffer).jpeg().toBuffer();
    res.setHeader("Content-Type", "image/jpeg");
    res.status(200).send(output);
  } catch (err) {
    res.status(500).send("Conversion error: " + err.message);
  }
};
