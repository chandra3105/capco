import React, { useEffect, useState } from "react";
import { DataTable } from "../primary/dataTable/dataTable";
import axios from "axios";
import "./paymentPage.scss";
import PropTypes from 'prop-types';

export const PaymentPage = ({setIsLoader}) => {
  const [products, setProducts] = useState([]);

  // API calling method using axios
  const fetchListData = async () => {
    // loader enable 
    setIsLoader(true)
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => console.log(err));
    if (response) {
      const productsData = response.data;
      // storing API response data to DataTable props
      setProducts(productsData);
      // loader disable 
      setIsLoader(false)
    }
  };

  useEffect(() => {
    // Calling the API in componentDidMount
    fetchListData();
  }, []);

  return (
    <>
      <div className="Payment_container">
        <div className={"container_wrapper"}>
          {/* Used reusable component */}
          <DataTable tableData={products} />
        </div>
      </div>
    </>
  );
};

// Props type declaration
PaymentPage.propTypes = {
  setIsLoader: PropTypes.func,
}
