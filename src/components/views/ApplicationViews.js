import { Outlet, Route, Routes, IndexRoute } from 'react-router-dom'
import { ItemsList } from '../ItemsList'

import { NewDecorationForm } from '../NewDecorationForm'

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ItemsList />} />
        <Route path="new" element={<NewDecorationForm />} />
      </Route>
    </Routes>
  )
}
