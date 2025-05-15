class FenwickTree {
  constructor(size) {
    this.tree = new Array(size + 1).fill(0);
  }

  update(index, value) {
    while (index < this.tree.length) {
      this.tree[index] += value;
      index += index & -index;
    }
  }

  query(index) {
    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }
    return sum;
  }

  rangeQuery(left, right) {
    return this.query(right) - this.query(left - 1);
  }
}

function processMaintenanceLogs(maintenance_logs, queries) {
  const uniqueDates = [...new Set(maintenance_logs.map(log => log[1]).concat(
    ...queries.map(q => [q[0], q[1]])
  ))].sort();
  const dateToIndex = {};
  uniqueDates.forEach((date, idx) => {
    dateToIndex[date] = idx + 1;
  });

  const fenwick = new FenwickTree(uniqueDates.length);
  for (let [_, date, cost] of maintenance_logs) {
    fenwick.update(dateToIndex[date], cost);
  }
  const results = [];
  for (let [start, end] of queries) {
    const left = dateToIndex[start];
    const right = dateToIndex[end];
    results.push(fenwick.rangeQuery(left, right));
  }

  return results;
}
const maintenance_logs = [
  [101, "2024-01-01", 500],
  [102, "2024-01-10", 300],
  [101, "2024-01-15", 700]
];

const queries = [
  ["2024-01-01", "2024-01-10"],
  ["2024-01-01", "2024-01-15"]
];

console.log(processMaintenanceLogs(maintenance_logs, queries));
