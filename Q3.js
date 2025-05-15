class FenwickTree {
  constructor(n) { this.tree = Array(n + 1).fill(0); }
  update(i, v) { while (i < this.tree.length) this.tree[i] += v, i += i & -i; }
  query(i) { let sum = 0; while (i > 0) sum += this.tree[i], i -= i & -i; return sum; }
  range(l, r) { return this.query(r) - this.query(l - 1); }
}

function maintenanceCost(logs, queries) {
  const dates = [...new Set(logs.map(x => x[1]).concat(...queries.flat()))].sort();
  const map = Object.fromEntries(dates.map((d, i) => [d, i + 1]));
  const bit = new FenwickTree(dates.length);
  for (let [_, d, c] of logs) bit.update(map[d], c);
  return queries.map(([s, e]) => bit.range(map[s], map[e]));
}
const logs = [[101, "2024-01-01", 500], [102, "2024-01-10", 300], [101, "2024-01-15", 700]];
const queries = [["2024-01-01", "2024-01-10"], ["2024-01-01", "2024-01-15"]];
console.log(maintenanceCost(logs, queries));
