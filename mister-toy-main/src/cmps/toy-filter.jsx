import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { LabelSelect } from "./label-select.jsx"
import { labelService } from "../services/label.service.js"


export function ToyFilter({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [selectedLabels, setSelectedLabels] = useState(filterBy.labels)

    onSetFilter = useRef(utilService.debounce(onSetFilter))
    const labelOptions = useRef(null)
    const elInputRef = useRef(null)

    useEffect(() => {
        labelService.query()
            .then(labels => labelOptions.current = labels)
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
        // eslint-disable-next-line
    }, [filterByToEdit])

    function handleChange(ev) {
        console.log(ev)
        const { target } = ev
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        // need to check if label already exists in selectedLabels
        console.log(field)
        if (field === 'labels') {
            // setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, labels: selectedLabels }))
            // setSelectedLabels(value)
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

            {
                labelOptions.current &&
                <LabelSelect
                    multiple
                    label="Labels"
                    name="labels"
                    options={labelOptions.current}
                    value={selectedLabels}
                    onChange={handleChange}
                />
            }

            <button hidden>Filter</button>
        </form>

    </section>
}