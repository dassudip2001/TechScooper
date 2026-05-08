import app from "./src";

const PORT = process.env.PORT || 5000;
(async () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})();
