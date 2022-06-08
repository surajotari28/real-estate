import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

const ListingForm = (props) => {
    const [formData, setFormData] = useState({
        sale_type: "For Sale",
        price: "100,000+",
        home_type: "Flat",
        city:'pune',
    });

    const {
        sale_type,
        price,
        home_type,
        city,
    } = formData;

    const [loading, setLoading] = useState(false);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/listings/search`,
                {
                    sale_type,
                    price,
                    home_type,
                    city,
                },
                config
            )
            .then((res) => {
                setLoading(false);
                props.setListings(res.data);
                window.scrollTo(0, 0);
            })
            .catch((err) => {
                setLoading(false);
                window.scrollTo(0, 0);
            });
    };

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/listings/search`,
                {
                    sale_type,
                    price,
                    home_type,
                    city,
                },
                config
            )
            .then((res) => {
                setLoading(false);
                props.setListings(res.data);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <form className="px-1" onSubmit={(e) => onSubmit(e)}>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <div className="listingform__section">
                            <label
                                className="listingform__label"
                                htmlFor="sale_type"
                            >
                                Sale or Rent
                            </label>
                            <select
                                className="form-control"
                                name="sale_type"
                                onChange={(e) => onChange(e)}
                                value={sale_type}
                            >
                                <option>For Sale</option>
                                <option>For Rent</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="listingform__label" htmlFor="price">
                            Price
                        </label>
                        <select
                            className="form-control"
                            name="price"
                            onChange={(e) => onChange(e)}
                            value={price}
                        >
                            <option>100,000+</option>
                            <option>200,000+</option>
                            <option>400,000+</option>
                            <option>600,000+</option>
                            <option>800,000+</option>
                            <option>1,000,000+</option>
                            <option>Any</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label
                            className="listingform__label"
                            htmlFor="home_type"
                        >
                            City
                        </label>
                        <select
                            className="form-control"
                            name="city"
                            onChange={(e) => onChange(e)}
                        >
                            <option>{city.pune}Pune</option>
                            <option>{city.mumbai}Mumbai</option>
                            <option>{city.delhi}Delhi</option>
                            <option>{city.banglore}Banglore</option>
                            <option>{city.bhopal}Bhopal</option>
                            <option>{city.kolhapur}Kolhapur</option>
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <label
                            className="listingform__label"
                            htmlFor="home_type"
                        >
                            Home Type
                        </label>
                        <select
                            className="form-control"
                            name="home_type"
                            onChange={(e) => onChange(e)}
                            value={home_type}
                        >
                            <option>Flat</option>
                            <option>Bungalow</option>
                            <option>Residential Land</option>
                            <option>Commercial Land</option>
                            <option>Shop</option>
                        </select>
                    </div>  
                </div>
                <div className="form-row">

                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                    </div>
                    <div className="col-md-12">
                        {loading ? (
                            <div className="form-group d-flex justify-content-center px-4 mt-4">
                                <Loader
                                    type="Oval"
                                    color="#424242"
                                    height={48}
                                    width={48}
                                />
                            </div>
                        ) : (
                            <div className="form-group d-flex justify-content-center">
                                <button className="btn btn-primary btn-lg btn-block py-2 px-4 mt-4">
                                    Search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
            <hr />
        </div>
    );
};

ListingForm.propTypes = {
    setListings: PropTypes.func.isRequired,
};

export default ListingForm;
