/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

//mui backdrop
import Backdrop from "@mui/material/Backdrop";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

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
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [CurrencyNames, setCurrencyNames] = useState([]); //Array of currency names

  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
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
        const response = await axios.get(
          `${BASE_URL}/getAllCurrencies`
        );
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
                min="0"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                value={amountInSourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 magic"
                placeholder="Enter The Amount"
                required
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

      <div className="flex items-center justify-center flex-col mx-4 mt-10 border-1">
        &copy; {new Date().getFullYear()}&nbsp; Terra Motors India Pvt. Ltd.
      </div>
    </div>
  );
}
