import { useEffect, useState } from 'react'
import './styles.css'

export const DecorationStation = () => {
  const [items, setItems] = useState([]) // returns an array: [stateVariable, setStatefunction] takes one argument: the initial value of the state variable
  const [seasons, setSeasons] = useState([])
  const [seasonChoiceId, setSeasonChoiceId] = useState(0)
  const [filteredItems, setFilteredItems] = useState([])

  // Use Effect watches for state change
  // It takes two arguments, a function and an array
  // The array is which states we want to observe
  // The function is what we want to do when that observed state changes
  useEffect(() => {
    console.log('I only run once')
    fetch(`http://localhost:8088/items`)
      .then((res) => res.json())
      .then((itemsArray) => {
        setItems(itemsArray)
      })

    fetch('http://localhost:8088/seasons')
      .then((res) => res.json())
      .then((seasonsArray) => {
        setSeasons(seasonsArray)
      })
  }, []) // An empty dependency array will watch for the initial render of the component and only run the callback on that  initial run.

  // In this use effect's dependency array, we added the items state variable
  // Therefore, anytime the value of items is changed (state changed), the callback function will run
  useEffect(() => {
    console.log(`Items changed! : `, items)
  }, [items])

  useEffect(() => {
    if (seasonChoiceId === 0) {
      setFilteredItems(items)
    } else {
      const seasonChoiceItems = items.filter(
        (itemObj) => itemObj.seasonId === seasonChoiceId
      )
      setFilteredItems(seasonChoiceItems)
      // setItems(seasonChoiceItems)
    }
  }, [seasonChoiceId, items])

  return (
    <>
      <select
        className="filter-box"
        id="season-select"
        onChange={(event) => {
          setSeasonChoiceId(parseInt(event.target.value))
        }}
      >
        <option value="0">All Seasons</option>
        {seasons.map((seasonObj) => {
          return (
            <option key={seasonObj.id} value={seasonObj.id}>
              {seasonObj.name}
            </option>
          )
        })}
      </select>
      <div className="items-container">
        {filteredItems.map((itemObj) => {
          return (
            <div className="item-card" key={itemObj.id}>
              <img
                src={itemObj.imageUrl}
                alt={itemObj.name}
                className="item-img"
              />
              <div className="item-name">{itemObj.name}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}
