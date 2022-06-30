var mySet = new Set(["foo", "bar", "foobar", "foo"]);

// has
console.info(mySet.has("bar")); // true
console.info(mySet.has("xxx")); // false

// entries
for (let value of mySet.entries()) {
  console.info(value);
}

// values
for (let value of mySet.values()) {
  console.info(value);
}

// keys
for (let value of mySet.keys()) {
  console.info(value);
}

// Clearing
mySet.clear();
console.info(mySet.size); // 0
