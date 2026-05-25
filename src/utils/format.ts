export function formatCount(n: number): string {
  if (n >= 1000) {
    const k = (n / 1000).toFixed(1)
    return `${k.replace(/\.0$/, '')}k`
  }
  return String(n)
}
