import {EVENT_TYPES,EVENT_STATUS,SORT_OPTIONS,} from "../constants/eventFilters";

function EventFilters({
search,
setSearch,
type,
setType,
venue,
setVenue,
status,
setStatus,
sort,
setSort,
clearFilters,
}) {

return (

<div className="card">

<input
placeholder="Search Events..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<select
value={type}
onChange={(e)=>setType(e.target.value)}
>

{EVENT_TYPES.map(item=>(
<option
key={item}
value={item}
>
{item}
</option>
))}

</select>

<input
placeholder="Venue"
value={venue}
onChange={(e)=>setVenue(e.target.value)}
/>

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

{EVENT_STATUS.map(item=>(
<option
key={item}
value={item}
>
{item}
</option>
))}

</select>

<select
value={sort}
onChange={(e)=>setSort(e.target.value)}
>

{SORT_OPTIONS.map(item=>(
<option
key={item.value}
value={item.value}
>
{item.label}
</option>
))}

</select>

<button
type="button"
onClick={clearFilters}
>

Clear Filters

</button>

</div>

);

}

export default EventFilters;