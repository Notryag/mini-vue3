//todo 最长子序列
function getSequence(arr) {
  const result = [0]

  let i, j, u, v, c
  const len = arr.length
  for(i=0;i<len ;i++) {
    let arrI = arr[i]
    j = result[result.length - 1]
    if(arrI > arr[j]) {
      result.push(i)
    }

    u = 0
    v = result.length - 1
    while(u < v) {
      let c = (u + v) / 2 | 0
      if(arr[result[c]] < arrI) {
        u = c + 1
      }else {
        v = c
      }
    }
    // 找到比arrI大的值, 并且是极限(就是数组中大的最少的),相当于 插入有序数组,并使数组依然有序
    result[u] = i
  }
  return result
}
                      // 0   1  2  3  4  5  6  7
console.log(getSequence([1, 2, 5, 3, 0, 4, 7, 6]))
// 1 3 6
