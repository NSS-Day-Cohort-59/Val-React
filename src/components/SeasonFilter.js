/*
{
  setSeasonChoiceId: 
  seasons: 
}
*/
export const SeasonFilter = ({ setterFunction, seasonsArr }) => {
  return (
    <select
      className="filter-box"
      id="season-select"
      onChange={(event) => {
        setterFunction(parseInt(event.target.value))
      }}
    >
      <option key={0} value="0">
        All Seasons
      </option>
      {seasonsArr.map((seasonObj) => {
        return (
          <option key={seasonObj.id} value={seasonObj.id}>
            {seasonObj.name}
          </option>
        )
      })}
    </select>
  )
}
