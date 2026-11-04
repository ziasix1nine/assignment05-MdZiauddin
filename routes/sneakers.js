// Initial sneaker collection

export const sneakers = [
  {
    id: 1,
    name: 'Air Max 90',
    sizeUS: 10,
    type: 'casual',
    email: 'john@example.com'
  },
  {
    id: 2,
    name: 'Nike Pegasus',
    sizeUS: 9,
    type: 'running',
    email: 'sara@example.com'
  },
  {
    id: 3,
    name: 'Jordan 1',
    sizeUS: 11,
    type: 'basketball',
    email: 'mike@example.com'
  },
  {
    id: 4,
    name: 'Adidas Ultraboost',
    sizeUS: 10,
    type: 'running',
    email: 'alex@example.com'
  },
  {
    id: 5,
    name: 'Converse Chuck Taylor',
    sizeUS: 8,
    type: 'casual',
    email: 'emma@example.com'
  }
];

// Generate the next available ID
let currentId = 6;

export function nextId() {
  return currentId++;
}