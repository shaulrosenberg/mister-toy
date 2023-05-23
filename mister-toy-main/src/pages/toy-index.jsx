import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// my cmps
import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, setFilterBy } from '../store/toy.action.js'



export function ToyIndex() {

    const { toys, filterBy } = useSelector((storeState) => storeState.toyModule)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)


    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }


    function onSetFilter(filterBy) {
        console.log('FilterBy', filterBy)
        setFilterBy(filterBy)
    }

    return <section className="toy-index">
        <main>
            <Link to={`/toy/edit`}>Add Toy</Link>

            <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            {isLoading && <h4 className="loading-message">Loading...</h4>}
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
            />
        </main>
    </section>
}