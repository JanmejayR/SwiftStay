import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([...response.data , ...response.data , ...response.data , ...response.data ]);
    });
  }, []);
  return (
    <div className=" mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place, index) => (

          <Link to={'/place/'+place._id} key={index}>
            <div className=" mb-2 bg-grey-500 rounded-2xl flex">
              {place.photos?.[0] && (
                <img className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:5000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
             <h2 className=" font-bold truncate leading-3 text-2xl min-h-5 pt-1 ">{place.title}</h2>
             <h3 className="  text-gray-500 text-md mt-1">{place.address}</h3>
             <div>
              <span className="font-bold text-xl">${place.price}</span> per night
             </div>
            
          </Link>
        ))}
    </div>
  );
}
