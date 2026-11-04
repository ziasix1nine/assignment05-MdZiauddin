
import { Router } from 'express';
import { sneakers, nextId } from '../lib/data.js';
import { validateSneakerQuery, validateNewSneaker } from '../lib/validate.js';

const router = Router();

// 1. GET all sneakers with search and filtering
router.get('/', (req, res) => {
  const { ok, errors, filters } = validateSneakerQuery(req.query);

  if (!ok) {
    return res.status(400).json({
      error: 'Invalid query parameters',
      errors
    });
  }

  let results = [...sneakers];

  // Search by sneaker name
  if (filters.q) {
    results = results.filter(sneaker =>
      sneaker.name.toLowerCase().includes(filters.q)
    );
  }

  // Filter by minimum shoe size
  if (filters.min !== undefined) {
    results = results.filter(
      sneaker => sneaker.sizeUS >= filters.min
    );
  }

  // Filter by maximum shoe size
  if (filters.max !== undefined) {
    results = results.filter(
      sneaker => sneaker.sizeUS <= filters.max
    );
  }

  // Limit the number of results
const count = results.length;
const limitedResults = results.slice(0, filters.limit);

res.status(200).json({
  count,
  results: limitedResults
});
});

// 2. GET sneaker statistics
router.get('/stats', (req, res) => {
  const totalSize = sneakers.reduce(
    (sum, sneaker) => sum + sneaker.sizeUS,
    0
  );

  const averageSize = totalSize / sneakers.length;

  const byType = {};

  sneakers.forEach(sneaker => {
    byType[sneaker.type] = (byType[sneaker.type] || 0) + 1;
  });

  res.status(200).json({
    count: sneakers.length,
    averageSizeUS: Number(averageSize.toFixed(1)),
    byType
  });
});

// 3. GET one sneaker by ID
router.get('/:id', (req, res) => {
  const sneakerId = Number(req.params.id);

  const sneaker = sneakers.find(
    item => item.id === sneakerId
  );

  if (!sneaker) {
    return res.status(404).json({
      error: `Sneaker ${req.params.id} not found`
    });
  }

  res.status(200).json(sneaker);
});

// POST a new sneaker
router.post('/', (req, res) => {
  const { ok, errors, data } = validateNewSneaker(req.body ?? {});

  if (!ok) {
    return res.status(400).json({ errors });
  }

  const newSneaker = {
    id: nextId(),
    ...data
  };

  sneakers.push(newSneaker);

  res.status(201).json(newSneaker);
});

export default router;
