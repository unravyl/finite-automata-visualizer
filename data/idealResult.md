# Ideal Node

```javascript
const resultNodes = [
    { id: 1, values: [1, 2, 3] },
    { id: 2, values: [1, 2, 3, 4] },
    { id: 3, values: [1, 2, 3, 5] },
    { id: 4, values: [1, 2, 3, 6] },
];
```

# Ideal Links

```javascript
const resultLinks = [
    { source: 1, target: 2, transition: 'a' },
    { source: 1, target: 1, transition: 'b' },
    { source: 2, target: 2, transition: 'a' },
    { source: 2, target: 3, transition: 'b' },
    { source: 3, target: 2, transition: 'a' },
    { source: 3, target: 4, transition: 'b' },
    { source: 4, target: 2, transition: 'a' },
    { source: 4, target: 2, transition: 'a' },
    { source: 4, target: 1, transition: 'b' },
];
```
