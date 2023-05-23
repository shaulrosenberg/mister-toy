import { storeService } from "../services/store.service"
import { GoogleMap } from "../cmps/google-map"
import { useEffect, useState } from "react"

// install map module from npm
// make server request for store branches, 
// map in map and display


// display map
export function AboutUs() {

    const [branches, setBranches] = useState(null)

    useEffect(() => {
        loadBranches()
    }, [])

    function loadBranches() {
        storeService.query()
            .then(setBranches)
            .catch(console.log)
    }

    return (
        <section className="about-us">
            <h2>About Mister-Toy</h2>
            <p>Find your nearest branch: </p>
            <GoogleMap branches={branches} />
        </section>
    )
}


