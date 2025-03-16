export function extractDateRange(key: string, target: any, fields: [string, string]) {
  const [startField, endField] = fields
  const [startDate, endDate] = target[key] ?? []
  target[startField] = startDate
  target[endField] = endDate

  delete target[key]
}
