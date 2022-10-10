import { useEffect, useState } from 'react'
import './DecorationStation.css'
import { ItemsList } from './ItemsList'
import { NewDecorationForm } from './NewDecorationForm'
import { SeasonFilter } from './SeasonFilter'

export const DecorationStation = () => {
  const [items, setItems] = useState([])
  const [seasons, setSeasons] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [seasonChoice, setSeasonChoice] = useState(0)
  const [userChoices, setUserChoices] = useState({
    name: '',
    imageUrl: '',
    seasonId: 0,
    categoryId: 0,
  })

  useEffect(() => {
    fetch('http://localhost:8088/items')
      .then((res) => res.json())
      .then((itemsData) => {
        setItems(itemsData)
      })

    fetch('http://localhost:8088/seasons')
      .then((res) => res.json())
      .then((seasonsData) => {
        setSeasons(seasonsData)
      })
  }, [])

  useEffect(() => {
    if (seasonChoice === 0) {
      setFilteredItems(items)
    } else {
      const seasonItems = items.filter((item) => item.seasonId === seasonChoice)
      setFilteredItems(seasonItems)
    }
  }, [seasonChoice, items])

  return (
    <>
      <div id="filter-bar">
        <SeasonFilter
          seasonChoice={seasonChoice}
          setSeasonChoice={setSeasonChoice}
          seasons={seasons}
        />
      </div>
      <NewDecorationForm
        userChoices={userChoices}
        setUserChoices={setUserChoices}
        seasons={seasons}
        setItems={setItems}
      />
      <ItemsList filteredItems={filteredItems} />
    </>
  )
}
