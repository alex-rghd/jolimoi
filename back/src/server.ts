import app from './app';

// .env
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});