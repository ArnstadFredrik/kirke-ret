import { DateTime } from 'luxon'
import churchYear from '../periods/churchYear.js'
import { calculateStartYear } from './calculateStartYear.js'
import FuzzySearch from 'fuzzy-search'

// unused in FuzzySearch
const safeString = query => {
  let payload = `^${query
    .replaceAll('.', '\\.')
    .replaceAll(' ', '.*')
    .replaceAll('-', '.*')
    .replaceAll('_', '.*')}.*`

  return payload
}

const regExQuery = ({ query, year }) => {
  // No need for regex
  const regexQuery = new RegExp(safeString(query), 'gi')
  const normalNames = year.filter(day => {
    return day.name.match(regexQuery)
  })
  const altNames = year.filter(day => {
    if (!('altName' in day)) return
    return day.altName.match(regexQuery)
  })
  const filter = [
    ...normalNames,
    ...altNames,
  ]

  //const payload = { filter, regexQuery, year, startYear }
  //console.log({ findByName: payload })
  return filter
}

const fuzzyQuery = ({ query, year }) => {
  const searcher = new FuzzySearch(year, ['name','altName'], {caseSensetive: false, sort: false})
  const payload = searcher.search(String(query))
  return payload
}

const findByName = ({
  query,
  startYear = calculateStartYear(DateTime.now()),
  commemorative,
  method,
}) => {
  const year = churchYear({ year: startYear, commemorative })

  let payload = []

  if (method === 'regex') {
    payload = regExQuery({ query, year })
  } else if (method === 'fuzzy') {
    payload = fuzzyQuery({ query, year })
  }
  else {
    payload = fuzzyQuery({ query, year })
  }
  return payload

}
export { findByName }

// console.log(findByName({ query: 'otte', startYear: 2019 }))
// console.log(findByName({ query: '3 åpenbaring' }))
