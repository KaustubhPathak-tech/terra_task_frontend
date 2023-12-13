/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MainPage.css";
//mui backdrop
import Backdrop from "@mui/material/Backdrop";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

export default function mainPage() {
  const BASE_URL = "https://terracurrencyserver.vercel.app";
  //backdrop
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  //States for the form fields
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(1);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(1);
  const [CurrencyNames, setCurrencyNames] = useState([]); //Array of currency names

  //Revert the source and target currency
  const handleRevert = () => {
    const temp = sourceCurrency;
    setSourceCurrency(targetCurrency);
    setTargetCurrency(temp);
    setLoading(true);
  };

  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    if (
      sourceCurrency === "" ||
      targetCurrency === "" ||
      amountInSourceCurrency === 0
    ) {
      toast.error("Please fill all the fields");
      setTimeout(() => {
        toast.dismiss();
      }, 5000);
      return;
    }
    e.preventDefault();
    try {
      handleOpen();
      setTimeout(() => {
        handleClose();
      }, 3000);
      const response = await axios.get(`${BASE_URL}/convert`, {
        params: {
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      setAmountInTargetCurrency(response.data);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getAllCurrencies`);
        setCurrencyNames(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrencyNames();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-center flex-col mx-4 space-y-4 mb-14">
        <h4 className="lg:mx-32 text-2xl font-bold text-lightOrange-500">
          Currency Converter App
        </h4>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form>
            <div className="mb-4">
              <label
                htmlFor={amountInSourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount
              </label>

              <input
                onChange={(e) => {
                  setAmountInSourceCurrency(e.target.value);
                  setLoading(true);
                }}
                type="number"
                min="1"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                value={amountInSourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 magic"
                required
                placeholder="Enter The Amount"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                From
              </label>

              <select
                onChange={(e) => {
                  setSourceCurrency(e.target.value);
                  setLoading(true);
                }}
                name={sourceCurrency}
                id={sourceCurrency}
                value={sourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 magic"
                required
              >
                <option value="">Select Source Currency</option>
                {Object.keys(CurrencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currency} - {CurrencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="revertBtn">
              <Button onClick={handleRevert} data-toggle="tooltip" title="Interchange Currency">
              <svg
                width="24"
                height="31"
                viewBox="0 0 24 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="#4657A1"
                  stroke-width="2"
                  stroke-linecap="round"
                  d="M2.355 7.906h18.729"
                ></path>
                <path
                  d="M15.682 14.089l6.605-6.551-6.605-6.117"
                  stroke="#4657A1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  stroke="#4657A1"
                  stroke-width="2"
                  stroke-linecap="round"
                  d="M21.084 23.39H2.355"
                ></path>
                <path
                  d="M7.947 16.901L1.34 23.452l6.606 6.117"
                  stroke="#4657A1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              </Button>
            </div>
            <div className="mb-4">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
              >
                To
              </label>

              <select
                onChange={(e) => {
                  setTargetCurrency(e.target.value);
                  setLoading(true);
                }}
                name={targetCurrency}
                id={targetCurrency}
                value={targetCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 magic"
                required
              >
                <option value="">Select Target Currency</option>
                {Object.keys(CurrencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currency} - {CurrencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center flex-col mx-4 mt-10">
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md"
                onClick={handleSubmit}
              >
                Convert
              </button>
            </div>
          </form>
        </section>
      </div>

      {!loading ? (
        <section className="lg:mx-96 font-bold mt-5 text-xl flex items-center justify-center text-yellow-200 font">
          {amountInSourceCurrency} {CurrencyNames[sourceCurrency]}&nbsp; is
          equal to &nbsp;{amountInTargetCurrency}&nbsp; in{" "}
          {CurrencyNames[targetCurrency]}
        </section>
      ) : null}

      <div className="footer">
        &copy; {new Date().getFullYear()}&nbsp; Terra Motors India Pvt. Ltd.
      </div>
      <ToastContainer />
    </div>
  );
}
