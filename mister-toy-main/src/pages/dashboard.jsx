import { useEffect } from 'react'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { RadialLinearScale, Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/toy.action'
import { utilService } from '../services/util.service'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)


export function Dashboard() {

    const { toys, filterBy } = useSelector(storeState => storeState.toyModule)
    useEffect(() => {
        loadToys(filterBy)
    }, [])

    function getPricesPerLabelData() {
        const labels = []
        const inventory = []
        const prices = []

        toys.forEach(toy => {
            if (toy.labels && toy.labels.length) {
                toy.labels.forEach(label => {
                    if (!labels.includes(label)) labels.push(label)
                    // prices[label] = prices[label] ? prices[label] + toy.price : toy.price
                })
            }
        })

        labels.forEach((label, idx) => {
            toys.forEach(toy => {
                if (toy.labels.includes(label)) {
                    if (!prices[idx]) {
                        prices[idx] = toy.price
                        if (toy.inStock) inventory[idx] = 1
                    }
                    else {
                        prices[idx] = prices[idx] + toy.price
                        if (toy.inStock) inventory[idx] += 1
                    }
                }
            })
        })

        // only for inventory for now
        const datasets = [
            {
                label: '# in inventory',
                data: inventory,
                backgroundColor: labels.map(label => utilService.getRandomRGBA(0.2))
            }
        ]

        return {
            labels,
            datasets
        }

    }


    getPricesPerLabelData()

    return (
        <section className='dashboard' style={{ maxWidth: '50%', margin: 'auto' }}>
            <h1>Dashboard</h1>
            {/* <Bar data={data} /> */}
            <Doughnut data={getPricesPerLabelData()}/>
        </section>
        // <Bar />
    )
}