export const abs = num => {
  return (num ^ (num >> 31)) - (num >> 31)
}
