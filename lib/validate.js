
const NUMBER_RE = /^\d+$/;

// Validate GET /sneakers query parameters
export function validateSneakerQuery(query = {}) {
  const errors = [];

  // Detect duplicate parameters
  function getSingleValue(key) {
    const value = query[key];

    if (Array.isArray(value)) {
      errors.push(`${key} must not be provided more than once`);
      return undefined;
    }

    return value;
  }

  // Convert and validate whole numbers
  function getNumber(key) {
    const value = getSingleValue(key);

    if (value === undefined) return undefined;

    if (!NUMBER_RE.test(String(value))) {
      errors.push(`${key} must be a whole number`);
      return undefined;
    }

    return Number(value);
  }

  const q = getSingleValue('q');
  const min = getNumber('min');
  const max = getNumber('max');
  const requestedLimit = getNumber('limit');

  const limit = requestedLimit ?? 10;

  if (requestedLimit !== undefined && (limit < 1 || limit > 50)) {
    errors.push('limit must be between 1 and 50');
  }

  if (min !== undefined && max !== undefined && min > max) {
    errors.push('min cannot be greater than max');
  }

  return {
    ok: errors.length === 0,
    errors,
    filters: {
      q: typeof q === 'string' ? q.trim().toLowerCase() : '',
      min,
      max,
      limit
    }
  };
}


export function validateNewSneaker(body = {}) {
  const errors = [];
  const allowedFields = ['name', 'sizeUS', 'type', 'email'];

  // Reject unexpected fields
  for (const field of Object.keys(body)) {
    if (!allowedFields.includes(field)) {
      errors.push(`Unexpected field: ${field}`);
    }
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const sizeUS = Number(body.sizeUS);
  const type = typeof body.type === 'string' ? body.type.trim().toLowerCase() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (name.length < 2 || name.length > 60) {
    errors.push('Name must be between 2 and 60 characters');
  }

  if (!Number.isInteger(sizeUS) || sizeUS < 4 || sizeUS > 16) {
    errors.push('sizeUS must be a whole number between 4 and 16');
  }

  if (!['running', 'basketball', 'casual'].includes(type)) {
    errors.push('Type must be running, basketball, or casual');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('A valid email is required');
  }

  return {
    ok: errors.length === 0,
    errors,
    data: { name, sizeUS, type, email }
  };
}