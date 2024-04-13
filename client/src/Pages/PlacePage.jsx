import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import toast from 'react-hot-toast'
export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  

  useEffect(() => {
    
    if (!id) {
      
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
     
    });
  }, [id]);

  if (!place) return "";
 

  return (
  <div className="flex flex-col items-center ">
    <div className="-center mt-4 bg-gray-100 -mx-8 px-8 pt-8 rounded-2xl  max-w-screen-xl">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place}/>
     

      <div className=" mt-8 mb-8 grid gap-8 grid-col-1 md: grid-cols-[2fr_1fr]">
        <div>
        <div className="my-4">
        <h2 className="font-semibold text-4xl mb-1">Description</h2>
        <span className="pt-1 text-xl">{place.description}</span>
      </div >

      <div className="text-lg font-mono">
          Check-in at: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
          
          
        </div>
        <div>
            <BookingWidget place={place}/>
        </div>
      </div>
      <div className="bg-gray-50 -mx-8 px-8 py-8 border-t rounded-2xl">
      <div>
        <h2  className="font-semibold text-4xl">Extra Info</h2>
      </div>
      <div className="mb-4 mt-2 text-xl text-gray-700 leading-5">{place.extraInfo}</div>
      </div>
      
      
    </div>
  </div>
  );
}
