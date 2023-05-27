import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import LabelSelect from "./label-select.jsx"
import { labelService } from "../services/label.service.js"
import { Autocomplete, TextField } from "@mui/material"


export function ToyFilter({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    // doesn't work yet
    const [selectedLabels, setSelectedLabels] = useState(filterBy.labels)
    const [labelOptions, setLabelOptions] = useState(null)
    onSetFilter = useRef(utilService.debounce(onSetFilter))


    const elInputRef = useRef(null)

    useEffect(() => {
        labelService.query()
            .then(setLabelOptions)
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
        // eslint-disable-next-line
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        // need to check if label already exists in selectedLabels
        console.log(field)
        if (field === 'labels' || target.role === 'option') {
            setSelectedLabels(prevLabels => ([...prevLabels, target.innerText]))
            setFilterByToEdit(prevFilterBy => ({
                ...prevFilterBy,
                labels: selectedLabels
            }))
        }
        else {
            setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
        }
    }


    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    return <section className="toy-filter">
        <h2>Toys Filter</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="name">Name:</label>
            <input type="text"
                id="name"
                name="txt"
                placeholder="By name"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />

            <label htmlFor="sortBy">Sort By:</label>
            <select
                id="sortBy"
                name="sortBy"
                value={filterByToEdit.sortBy}
                onChange={handleChange}
            >
                <option value="">None</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="date">Date</option>
                <option value="inStock">In Stock</option>
            </select>

            <label htmlFor="sortOrder">Sort Order:</label>
            <select
                id="sortOrder"
                name="sortOrder"
                value={filterByToEdit.sortOrder}
                onChange={handleChange}
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            {labelOptions && <Autocomplete
                multiple
                id="labels"
                name="labels"
                onChange={handleChange}
                value={selectedLabels}
                options={labelOptions}
                renderInput={(params) => (
                    <TextField {...params} label="limitTags" placeholder="Favorites" />
                )}
                sx={{ width: '500px' }}
            />}

            <button hidden>Filter</button>
        </form>

    </section>
}