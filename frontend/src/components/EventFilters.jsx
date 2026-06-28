import {EVENT_TYPES,EVENT_STATUS,SORT_OPTIONS,} from "../constants/eventFilters";
import { memo } from "react";

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
applyFilters
}) {

return (
<form
  onSubmit={(e) => {
    e.preventDefault();
    applyFilters();
  }}
>
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
<button onClick={applyFilters}>
  Search
</button>

<button onClick={clearFilters}>
  Clear
</button>

</div>
</form>
);

}

export default memo(EventFilters);