import React, { useState } from "react";
import ListingForm from "../components/ListingForm";
import ListingHome from "../components/ListingHome";
import { Helmet } from "react-helmet";

const Home = () => {
    const [listings, setListings] = useState([]);

    return (
        <>
            <section className="">
                <ListingForm setListings={setListings} />
            </section>
            <section>
                <ListingHome listings={listings} />
            </section>
        </>
    );
};

export default Home;
