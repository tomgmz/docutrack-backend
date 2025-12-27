import app from "./server";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express is running at http://localhost//${PORT}`);
});