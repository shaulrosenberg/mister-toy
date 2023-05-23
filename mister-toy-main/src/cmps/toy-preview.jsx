import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    const robohashUrl = `https://robohash.org/${toy._id}?set=set2&size=200x200`

    return <article>
        <h4>{toy.name}</h4>
        <img src={robohashUrl}></img>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        <Link to={`/toy/${toy._id}`}>Details</Link>
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
    </article>
}