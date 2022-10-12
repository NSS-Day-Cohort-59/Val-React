import { useState } from 'react'

export const ItemsList = ({ filteredItems }) => {
  return (
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
  )
}
