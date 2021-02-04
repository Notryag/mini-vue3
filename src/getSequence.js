//todo 最长子序列
function getSequence(arr) {
  const result = [0]
  let i, j, u, v
  const p = arr.slice()
  const len = arr.length
  for (i = 0; i < len; i++) {
    let arrI = arr[i]
    j = result[result.length - 1]
    if (arrI > arr[j]) {
      p[i] = j
      result.push(i)
    }
    u = 0
    v = result.length - 1
    while (u < v) {
      c = ((u + v) / 2) | 0
      if (arrI > arr[c]) {
        u = c + 1
      } else {
        v = c
      }
    }
    if (arrI < arr[result[u]]) {
      if (u > 0) {
        p[i] = result[u - 1]
      }
      result[u] = i
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
// 0   1  2  3  4  5  6  7
console.log(getSequence([1, 2, 5, 3, 0, 4, 7, 6]))
// 1 3 6
// 了解贪心 + 二分法  
// 其中的p  作为存储数组,了解其思想