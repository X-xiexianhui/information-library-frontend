export function getUpdate (oldValue, newValue) {
  const keys = Object.keys(oldValue)
  let ans = []
  for (const key of keys) {
    if (oldValue[key] !== newValue[key]) {
      ans.push({col_name: key, value: newValue[key]})
    }
  }
  return ans
}
