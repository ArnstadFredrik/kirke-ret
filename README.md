# Search functions

## Installation
```
npm install church-year
```
```js
import {
  nextByDate, 
  churchYear, 
  findByName, 
  findByDate
} from 'church-year'
```

```js
import church from 'church-year'
```

## nextByDate({date, commemorative})

```js
nextByDate({ date: '2021 04 20'})
nextByDate({ date: '2021 20 juni'})
nextByDate({ date: '20 juni 2021'})
nextByDate({ date: '2021-04-31'})
nextByDate({ date: isLuxonDateTime})
```
`nextByDate()` takes an object with a date parameter, as shown above, and returns an array of filtered results based on that date. It is an array, since commemorative days, might fall on the same sundays as regular church year sundays.
By default `nextByDate({date, commemorative: true})`, so if commemorative days are not needed set it to false.
```js
nextByDate({ date: '2022-02-06', commemorative: true})
```
Output:
```js
[
  {
    years: '2021-2022',
    name: '6. Søndag i Åpenbaringstiden',
    day: '2022-02-06T00:00:00.000+01:00',
    dateTime: DateTime {
      ts: 1644102000000,
      _zone: [IANAZone],
      loc: [Locale],
      invalid: null,
      weekData: null,
      c: [Object],
      o: 60,
      isLuxonDateTime: true
    },
    liturgical_color: { name: 'Grønn', hsl: 'hsla(103, 42%, 30%, 1)' },
    periodInfo: 'Åpenbaringstiden går fra Kristi Åpenbaringsdag, som er første søndag etter nyttår, og helt frem til fastetiden før påsken',
    period: 'epiphany',
    readings: { allReadings: [Object], currentReadings: [Object] }
  },
  {
    years: '2021-2022',
    name: 'Samefolkets dag',
    day: '2022-02-06T00:00:00.000+01:00',
    dateTime: DateTime {
      ts: 1644102000000,
      _zone: [IANAZone],
      loc: [Locale],
      invalid: null,
      weekData: null,
      c: [Object],
      o: 60,
      isLuxonDateTime: true
    },
    liturgical_color: { name: 'Grønn', hsl: 'hsla(103, 42%, 30%, 1)' },
    periodInfo: 'Samefolkets dag ble av samene i Norden i 1992 erlkært som en felles samisk nasjonaldag',
    period: 'commemorative',
    readings: { allReadings: [Object], currentReadings: [Object] }
  }
]
```

## findByDate({query, commemorative})
Function searched the church year for dates, corresponding to the 
query. Might be year, month and or day. for example:
```js
findByDate({query: '2022'}) // Entire calendar year 2022
findByDate({query: '2022-01'}) // Entire month of january 2022
findByDate({query: '2022-01-09'}) // Only the day 9. january 2022
```

You can also include `commemorative: false` in the object passed as argument to exclude the commemorative days.
```js
findByDate({query: '2022-02-06', commemorative: false}) // Only the day 6. january 2022
```

## findByName({query, startYear, commemorative, method})
```js
findByName({query: '3 åpenbaring'})
```
Unless `startYear` is specified, the current church years start year is used 

Example with start year
```js
findByName({query: '3 åpenbaring', startYear : 2021})
```

### Regex of Fuzzy Search

By default findByName now uses [Fuzzy Search](https://www.npmjs.com/package/fuzzy-search) for better searching.
This can be channged using `{ method }`. The options are `{ method: 'regex'}` or
`{ method: 'fuzzy' }`. The default if no method is specified is `{ method:
'fuzzy' }`

Using `method: 'regex'` The query matched with regex.
`.` gets escaped to `.*`
Samee goes for `-`and `_`gets escaped to `.*`

`{commemorative: true}` is the default, so it needs to be specified as `false` to exclude from search.

findByName also searched the altName field, on the days that have altName,
for example '6. Søndag i Treenighetstiden', that also is named 'Aposteldagen'

Output:
```js
[
  {
    years: '2021-2022',
    name: '3. Søndag i Åpenbaringstiden',
    day: '2022-01-16T00:00:00.000+01:00',
    dateTime: DateTime {
      ts: 1642287600000,
      _zone: [IANAZone],
      loc: [Locale],
      invalid: null,
      weekData: null,
      c: [Object],
      o: 60,
      isLuxonDateTime: true
    },
    liturgical_color: { name: 'Grønn', hsl: 'hsla(103, 42%, 30%, 1)' },
    periodInfo: 'Åpenbaringstiden går fra Kristi Åpenbaringsdag, som er første søndag etter nyttår, og helt frem til fastetiden før påsken',
    period: 'epiphany',
    readings: { allReadings: [Object], currentReadings: [Object] }
  }
]
```

## churchYear({date, year, commemorative })
`churchYear({date, year})` where either a date luxon date is supplied and the year is calculated, or the church years start year is supplied as `churchYear({ year: 2021 })` and the entire church year for 2021-2022 is generated and returned.

```js
churchYear({date: '2022-01-07'})
churchYear({year: '2021'})
churchYear({year: '2021', commemorative: false})
```

# ToDo
- [x] Kirkeårsdager med alternativt navn, må må et altName felt. som også er søkbart.
  - NB: Oppdatter tekstrekke når navn på kirkeårsdag bytter. Eventuelt ordne med ID, for hver dag
- [x] Pinseaften, currentReadings er tom. Har ikke F, så alt blir utlatt, skriv om getReadings.
- [x] Langfredag har fire tekstrekker I,II,III,IV, med kun en tekst: evangelietekst.
  - startYear = 2018, Rekke (Evangelie) I. Bruk lignende modulus utregning som tekstrekkene
  - Feil tekst velges, og må navngis E, ikke L1
- [x] Bots og bønnedag 2018-2019 skal være 27.oktober, får 3.nov
- [x] inkluder kirkeårstekster
- [x] include minnedager
  - check all functions to work with {commemorative}
  - update readme
  - move 'nyttårsdag' to commemorative?
  - [x] har Allehelgensdag, men ikke minnedag, hva er forskjellen? Minne dag og tekster må med
- [x] include informasjon om dag og/eller periode
- [x] startYear is hardcoded, needs to be dynamic. *startYear is now dynamic based on current date*
