import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { labelService } from "../services/label.service.js"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    const [labels, setLabels] = useState([])

    useEffect(() => {
        if (!toyId) return
        labelService.query()
            .then(labels => {
                setLabels(labels)
                loadToy()
            })
        // eslint-disable-next-line
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    function onHandleLabel({ target }) {
        const label = target.id
        console.log('label:', label)
        const idx = toyToEdit.labels.findIndex(curLabel => curLabel === label)
        if (idx === -1) {
            setToyToEdit((prevToy) => {
                return { ...prevToy, labels: [...prevToy.labels, label] }
            }
            )
        } else {
            setToyToEdit((prevToy) => {
                return {
                    ...prevToy,
                    labels: [...prevToy.labels.slice(0, idx), ...prevToy.labels.slice(idx + 1)]
                }
            })
        }
    }
    const labelsAsStr = JSON.stringify(toyToEdit.labels)
    console.log('labelsAsStr:', labelsAsStr)

    return <section className="toy-edit">
        <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="name">Name : </label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter name..."
                value={toyToEdit.name}
                onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toyToEdit.price}
                onChange={handleChange}
            />
            <pre>
                {labelsAsStr}
            </pre>
            <div className="label-container">
                <label>Labels:</label>
                <ul>
                    {labels.map(label => {
                        return <li
                            onClick={onHandleLabel}
                            id={label}
                            key={label}
                            className={`${labelsAsStr.includes(label) ? 'red' : 'black'}`}
                        >
                            {label}
                        </li>
                    })}
                </ul>
            </div>

            <div className="button-group">
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>
        </form>
    </section>
}