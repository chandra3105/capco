import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss";
import { PaymentPage } from "./components/core/paymentPage";
import { Loader } from "./components/primary/loader";

const App = () => {
  const [isLoader, setIsLoader] = useState(false)
  return (
    <>
      {/* Added loader for while API fetching time */}
      {isLoader && <Loader />}
      <PaymentPage setIsLoader={setIsLoader} />
    </>
  );
};

export default App;
