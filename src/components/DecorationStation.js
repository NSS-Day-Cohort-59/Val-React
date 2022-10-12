import { useEffect, useState } from 'react'
import { ItemsList } from './ItemsList'
import { NewDecorationForm } from './NewDecorationForm'
import { SeasonFilter } from './SeasonFilter'
import './styles.css'

export const DecorationStation = () => {
  const [items, setItems] = useState([]) // returns an array: [stateVariable, setStatefunction] takes one argument: the initial value of the state variable
  const [seasons, setSeasons] = useState([])
  const [seasonChoiceId, setSeasonChoiceId] = useState(0)
  const [filteredItems, setFilteredItems] = useState([])
  const [categories, setCategories] = useState([])

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

    fetch('http://localhost:8088/categories')
      .then((res) => res.json())
      .then((categoriesArray) => {
        setCategories(categoriesArray)
      })
  }, []) // An empty dependency array will watch for the initial render of the component and only run the callback on that  initial run.

  // In this use effect's dependency array, we added the items and seasonChoiceId state variables
  // Therefore, anytime the value of items or seasonChoiceId is changed (state changed), the callback function will run
  useEffect(() => {
    if (seasonChoiceId === 0) {
      setFilteredItems(items)
    } else {
      const seasonChoiceItems = items.filter(
        (itemObj) => itemObj.seasonId === seasonChoiceId
      )
      setFilteredItems(seasonChoiceItems)
    }
  }, [seasonChoiceId, items])

  return (
    <>
      <SeasonFilter setterFunction={setSeasonChoiceId} seasonsArr={seasons} />
      <NewDecorationForm
        seasons={seasons}
        categoriesOptions={categories}
        itemSetterFunction={setItems}
      />
      <ItemsList filteredItems={filteredItems} />
    </>
  )
}
