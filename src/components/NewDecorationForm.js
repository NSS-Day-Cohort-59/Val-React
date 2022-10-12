import { useState } from 'react'

// {
//   "id": 1,
//   "name": "Skeleton Plates",
//   "imageUrl": "https://images.kirklands.com/is/image/Kirklands/279661?hei=300&qlt=85,1&wid=300&fmt=jpeg&resMode=bicub&op_sharpen=1",
//   "seasonId": 1,
//   "categoryId": 4
// }

export const NewDecorationForm = ({
  seasons,
  categoriesOptions,
  itemSetterFunction,
}) => {
  const [userChoices, setUserChoices] = useState({
    name: '',
    imageUrl: '',
    seasonId: 0,
    categoryId: 0,
  })

  // Undefined, '', 0, null
  const handleSaveDecoration = (evt) => {
    evt.preventDefault()

    if (
      userChoices.name &&
      userChoices.imageUrl &&
      userChoices.seasonId &&
      userChoices.categoryId
    ) {
      fetch('http://localhost:8088/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userChoices),
      }).then(() => {
        fetch(`http://localhost:8088/items`)
          .then((res) => res.json())
          .then((itemsArray) => {
            itemSetterFunction(itemsArray)
            setUserChoices({
              name: '',
              imageUrl: '',
              seasonId: 0,
              categoryId: 0,
            })
          })
      })
    } else {
      alert('Yo, fill out my form.')
    }
  }

  return (
    <form className="decoration-form">
      <h2 className="decoration-form-title">Add a decoration to the catalog</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            required
            id="name"
            type="text"
            className="form-control"
            placeholder="Item name"
            value={userChoices.name}
            onChange={(event) => {
              const copy = { ...userChoices }
              copy.name = event.target.value
              setUserChoices(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="imgUrl">Image URL: </label>
          <input
            required
            id="imgUrl"
            type="text"
            className="form-control"
            placeholder="example.com"
            value={userChoices.imageUrl}
            onChange={(event) => {
              const copy = { ...userChoices }
              copy.imageUrl = event.target.value
              setUserChoices(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Season: </div>
          {seasons.map((seasonObj) => {
            return (
              <div key={seasonObj.id} className="radio">
                <label>
                  <input
                    type="radio"
                    value={seasonObj.id}
                    checked={userChoices.seasonId === seasonObj.id}
                    onChange={(event) => {
                      const copy = { ...userChoices }
                      copy.seasonId = parseInt(event.target.value)
                      setUserChoices(copy)
                    }}
                  />
                  {seasonObj.name}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Category: </div>
          {categoriesOptions.map((categoryObj) => {
            return (
              <div key={categoryObj.id} className="radio">
                <label>
                  <input
                    type="radio"
                    value={categoryObj.id}
                    checked={userChoices.categoryId === categoryObj.id}
                    onChange={(event) => {
                      const copy = { ...userChoices }
                      copy.categoryId = parseInt(event.target.value)
                      setUserChoices(copy)
                    }}
                  />
                  {categoryObj.name}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>
      <button
        className="btn"
        onClick={(event) => {
          handleSaveDecoration(event)
        }}
      >
        Add Decoration
      </button>
    </form>
  )
}
