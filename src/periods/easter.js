import { Interval } from 'luxon'
import { getComputus } from '../constants/computus.js'
import { getPinse } from '../constants/pinse.js'
import makePayload from '../utils/makePayload.js'

const getDays = startYear => {
  const computus = getComputus(startYear)
  const pinse = getPinse(startYear)
  const days = [
    {
      name: 'Skjærtorsdag',
      date: computus.minus({ days: 3 }),
      color: 'purple',
      id: 'easter-thursdag',
    },
    {
      name: 'Langfredag',
      date: computus.minus({ day: 2 }),
      color: 'purple',
      id: 'easter-friday',
    },
    {
      name: 'Påskenatt',
      altName: 'Ottesang',
      date: computus.minus({ day: 1 }),
      color: 'white',
      id: 'easter-night',
    },
    {
      name: 'Påskedag',
      date: computus,
      color: 'white',
      id: 'easter-day',
    },
    {
      name: '2. Påskedag',
      date: computus.plus({ days: 1 }),
      color: 'white',
      id: 'easter-day-2',
    },
  ]

  return { days, computus, pinse }
}
const easter = startYear => {
  const period = 'easter'
  const periodInfo = `Påsketiden er den viktigste delen av kirkeåret, da feires Jesu død og oppstandelse. Påsketiden innledes med den påskeuken,
  så fortsetter påsketiden fra påskedag til Pinse.`
  const payload = []

  const { days: easterNames, computus, pinse } = getDays(startYear)

  for (let { name, altName, date: dateTime, color, id } of easterNames) {
    payload.push(
      makePayload({
        startYear,
        name,
        altName,
        dateTime,
        color,
        periodInfo,
        period,
        otherContent: { id },
      })
    )
  }

  const EasterPentacostInterval = Interval.fromDateTimes(computus, pinse)
  let easterSundays = Math.floor(EasterPentacostInterval.length('weeks'))
  while (easterSundays >= 2) {
    const week = 7 - easterSundays
    let name = `${week + 1}. Søndag i Påsketiden`
    let id = `${week + 1}-sunday-easter`
    const day = computus.endOf('week').plus({ week }).startOf('day')
    const color = 'white'

    payload.push(
      makePayload({
        startYear,
        name,
        dateTime: day,
        color,
        periodInfo,
        period,
        otherContent: { id },
      })
    )
    easterSundays -= 1
  }
  return payload
}

export { easter }
