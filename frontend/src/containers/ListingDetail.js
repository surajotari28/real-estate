import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { Email, Person, Phone } from "@material-ui/icons";
import Loader from "react-loader-spinner";
import setAlert from "../store/actions/alert";

const ListingDetail = ({ match, isAuthenticated, setAlert }) => {
  const [listing, setListing] = useState({});
  const [realtor, setRealtor] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [cart_slug, setCartSlug] = useState("");

  const { name, email, subject, message } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const slug = match.params.id;
    setCartSlug(slug);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/listings/${slug}`, config)
      .then((res) => {
        setListing(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [match.params.id]);

  useEffect(() => {
    const id = listing.realtor;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/realtors/${id}/`, config)
        .then((res) => {
          setRealtor(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [listing.realtor]);

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
    let seller_email = realtor.email;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/contactSeller/`,
        { name, email, seller_email, subject, message },
        config
      )
      .then((res) => {
        setAlert("Message Sent", "success");
        setLoading(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setAlert("Error with Sending Message", "error");
        setLoading(false);
        window.scrollTo(0, 0);
      });
  };

  return (
    <>
      <Helmet>
        <title>Real Estate - {`${listing.title}`}</title>
        <meta name="description" content="Listing detail" />
      </Helmet>
      {isAuthenticated ? (
        <>
          <header className="heading-component">
            <h1 className="font-weight-bold">{listing.title}</h1>
            <h6 className="">
              {listing.city}, {listing.state}, {listing.zipcode}
            </h6>
          </header>
          <div className="container mt-3">
            <div className="link-bar">
              <h4>
                <Link exact to="/">
                  Home
                </Link>{" "}
                / {listing.title}
              </h4>
            </div>
            <div className="row my-3">
              <div className="col-md-9 col-12">
                <figure>
                  <img
                    src={listing.photo_main}
                    alt="Main Tasbir"
                    width="100%"
                    height="auto"
                  />
                </figure>
                <div className="row detail font-weight-bold">
                  <div className="col-md-6">
                    <ul>
                      <li>
                        <p className="m-1">Price: {listing.price}</p>
                      </li>
                      <li>
                        <p className="m-1">Bedrooms: {listing.bedrooms}</p>
                      </li>
                      <li>
                        <p className="m-1">Bathrooms: {listing.bathrooms}</p>
                      </li>
                      <li>
                        <p className="m-1">Sale Type: {listing.sale_type}</p>
                      </li>
                      <li>
                        <p className="m-1">Home Type: {listing.home_type}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul>
                      <li>
                        <p className="m-1">City: {listing.city}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-12">
                <div className="heading-component ">
                  <h2>Seller</h2>
                </div>
                <figure>
                  <img
                    src={realtor.photo}
                    alt="Realtor pic"
                    width="100%"
                    height="auto"
                  />
                </figure>
                <div className="detail">
                  <h5 className="pb-3">Name : {realtor.name}</h5>
                  <h5 className="pb-3">Contact : {realtor.phone}</h5>
                  <h5 className="pb-3">Email : {realtor.email}</h5>
                  <h5 className="pb-3">Description : {realtor.description}</h5>
                </div>
              </div>
            </div>
            <div className="listing-description">
              <div className="link-bar my-4">
                <h3>Description</h3>
              </div>
              <p className="text-justify">{listing.description}</p>
            </div>
            <div className="image-section">
              <div className="link-bar my-4">
                <h3>Related Photos</h3>
              </div>
              <div className="row">
                <div className="col-md-4">
                  {listing.photo_1 ? (
                    <div className="image-div">
                      <figure>
                        <img
                          width="100%"
                          height="auto"
                          src={listing.photo_1}
                          alt="First pic"
                        />
                      </figure>
                    </div>
                  ) : null}
                </div>
                <div className="col-md-4">
                  {listing.photo_2 ? (
                    <div className="image-div">
                      <figure>
                        <img
                          width="100%"
                          height="auto"
                          src={listing.photo_2}
                          alt="Second pic"
                        />
                      </figure>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <hr />
            <div className="buynow d-flex justify-content-center align-items-center my-5">
              <Link to={`/listing/${cart_slug}/buy`}>
                <button className="btn btn-buynow">
                  <h1 className="m-0">Add to Cart</h1>
                </button>
              </Link>
            </div>
            <hr />
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center">You should login to see details.</h1>
          <h1 className="text-center">
            <Link exact to="/login">
              Login
            </Link>
          </h1>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(ListingDetail);
