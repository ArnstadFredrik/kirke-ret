import { getChristmasEve } from '../constants/christmasEve.js'
import makePayload from '../utils/makePayload.js'

const getDays = startYear => {
  const christmasEve = getChristmasEve(startYear)
  const christmasDay = christmasEve.plus({ days: 1 })

  const payload = [
    {
      name: 'Julaften',
      altName: 'Ottesang',
      date: christmasEve,
      color: 'white',
      id: '1-christmas',
    },
    {
      name: 'Juledag',
      date: christmasDay,
      color: 'white',
      id: '2-christmas',
    },
    {
      name: '2. Juledag',
      altName: 'Stefanusdagen',
      date: christmasEve.plus({ day: 2 }),
      color: 'red',
      id: '3-christmas',
    },
    {
      name: 'Romjulssøndag',
      date: christmasDay.plus({ days: (7 - christmasDay.weekday) % 7 }),
      color: 'white',
      id: 'christmas-sunday',
    },
    {
      name: 'Nyttårsaften',
      date: christmasEve.endOf('year').startOf('day'),
      color: 'white',
      id: 'newyear',
    },
  ]
  return payload
}

const christmas = startYear => {
  const periodInfo = `I juletiden feires Jesu fødsel`
  const christmasDays = getDays(startYear)
  let payload = []

  for (let { name, altName, date: dateTime, color, id } of christmasDays) {
    const result = {
      startYear,
      name,
      altName,
      dateTime,
      color,
      periodInfo,
      period: 'christmas',
      otherContent: { id },
    }
    // if ('altName' in day) result.altName = day.altName
    payload.push(makePayload(result))
  }

  return payload
}

export { christmas }
