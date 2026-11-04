
import express from 'express';
import sneakerRouter from './routes/sneakers.js';

// Initialize Express
const app = express();

// Server configuration
const PORT = process.env.PORT || 3000;

// Disable Express identification header
app.disable('x-powered-by');

// Request logger middleware
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} ${req.method} ${req.url}`
  );

  next();
});

// Home page route
app.get('/', (req, res) => {
  res.send('Welcome to Sneaker API! Available endpoints: /sneakers and /sneakers/stats');
});


app.use(express.urlencoded({ extended: true }));
// Mount sneaker router
app.use('/sneakers', sneakerRouter);

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Sneaker API running at http://localhost:${PORT}`);
});
