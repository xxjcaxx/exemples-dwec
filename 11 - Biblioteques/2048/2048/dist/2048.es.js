function c(r = 4) {
  return new Array(r).fill(0).map(() => new Array(r).fill(0));
}
function h(r) {
  return function(n) {
    const t = r.length ** 2;
    let o = Math.floor(Math.random() * t), e = o;
    for (; o === e; )
      e = Math.floor(Math.random() * t);
    const l = structuredClone(r);
    return l[Math.floor(o / r.length)][o % r.length] = n, l[Math.floor(e / r.length)][e % r.length] = n, l;
  };
}
function u(r) {
  const n = [...r];
  for (let t = n.length - 1; t >= 0; t--)
    n[t] !== 0 && n[t + 1] === 0 && (n[t + 1] = n[t], n[t] = 0);
  return n;
}
function i(r) {
  const n = [...r];
  for (let t = n.length - 1; t >= 0; t--)
    n[t] !== 0 && n[t + 1] === n[t] && (n[t + 1] = n[t] * 2, n[t] = 0);
  return n;
}
function a(r, n) {
  let t = structuredClone(r);
  for (let o = 0; o < n; o++)
    t = t[0].map((e, l) => t.map((f) => f[l]).reverse());
  return t;
}
function m(r) {
  return function(n) {
    const t = { rigth: 0, left: 2, up: 1, down: 3 };
    let o = a(r, t[n]);
    for (let e = 0; e < 3; e++)
      o = o.map(u);
    o = o.map(i);
    for (let e = 0; e < 3; e++)
      o = o.map(u);
    return a(o, 4 - t[n]);
  };
}
function s(r) {
  return function(n) {
  };
}
export {
  c as generate2048Board,
  s as insertRandomNumber,
  m as moveBoard,
  u as moveRow,
  h as randomPlace,
  a as rotateMatrix,
  i as sumRow
};
