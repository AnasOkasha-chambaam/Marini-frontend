import { useState } from "react";
import Expenses from "./expenses";
import Income from "./income";
import Profit from "./profit";
import Reports from "./reports";
import ReportsCost from "./reportsCost";
import { data } from "autoprefixer";

import {
  listSales,
  listCostOfSales,
  listGeneralInvoices,
  listCommissionInvoices,
  listExpenses,
} from "@/redux/actions/actions";
import universitiesReducer from "@/redux/reducers/reducer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//  Anasite - Edits: Assuming that only sales has costs, so `Sales Revenue` will be (`sales total` - `cost of sales total`) and `Sales Revenue` will be (`paid services` - `unpaid serices`)
/**
 * Needed to be listed with total values:
 * - sales
 * - costOfSales
 * - Invoices
 */

const initialRevenue = {
  salesRevenue: {
    name: "Sales Revenue",
    currency: "USD",
    amount: (0).toFixed(2),
    symbol: "$",
  },
  commissionInvoicesRevenue: {
    name: "Commission Invoices Revenue",
    currency: "USD",
    amount: (0).toFixed(2),
    symbol: "$",
  },
  generalInvoicesRevenue: {
    name: "General Invoices  Revenue",
    currency: "USD",
    amount: (0).toFixed(2),
    symbol: "$",
  },
  // interestRevenue: {
  //   name: "Interest Revenue",
  //   currency: "USD",
  //   amount: "$120.00",
  // symbol: "$",
  // },
  gainOfSalesOfAssets: {
    name: "Gain of Sales of Assets",
    currency: "USD",
    amount: (0).toFixed(2),
    symbol: "$",
  },
};
export function ReportsManagement() {
  // Start Revenue
  const [revenue, setRevenue] = useState(initialRevenue);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const dispatch = useDispatch();
  const { sales, costOfSales, commissionInvoices, generalInvoices } =
    useSelector((state) => state?.universitiesReducer);
  console.log("sales from income statement ===>", sales);
  console.log("costOfSales from income statement ===>", costOfSales);
  console.log(
    "commissionInvoices from income statement ===>",
    commissionInvoices
  );
  console.log("generalInvoices from income statement ===>", generalInvoices);
  useEffect(() => {
    dispatch(listCommissionInvoices());
  }, []);
  useEffect(() => {
    dispatch(listGeneralInvoices());
  }, []);
  useEffect(() => {
    dispatch(listSales());
  }, []);
  useEffect(() => {
    dispatch(listCostOfSales());
  }, []);
  useEffect(() => {
    setRevenue({
      ...revenue,
      salesRevenue: {
        ...revenue.salesRevenue,
        amount: (sales.data?.totalPrice - costOfSales.data?.totalPrice).toFixed(
          2
        ),
      },
    });
  }, [sales, costOfSales]);
  useEffect(() => {
    setRevenue({
      ...revenue,
      commissionInvoicesRevenue: {
        ...revenue.commissionInvoicesRevenue,
        amount: (
          2 * +commissionInvoices.data?.totalCredited -
          +commissionInvoices.data?.totalPrice
        ).toFixed(2),
      },
    });
  }, [commissionInvoices]);
  useEffect(() => {
    console.log("strange NaN total general", generalInvoices.data);
    setRevenue({
      ...revenue,
      generalInvoicesRevenue: {
        ...revenue.generalInvoicesRevenue,
        amount: (
          2 * +generalInvoices.data?.totalCredited -
          +generalInvoices.data?.totalPrice
        ).toFixed(2),
      },
    });
  }, [generalInvoices]);
  //  set total revenue
  useEffect(() => {
    let finalTotalRevenue = Object.values(revenue)?.reduce(
      (mainCounter, singleRevenue) => {
        return +mainCounter + +singleRevenue.amount;
      },
      0
    );
    setTotalRevenue(finalTotalRevenue);
  }, [revenue]);
  console.log(Object.values(revenue));
  // END
  //   Start Expenses
  const [totalExpenses, setTotalExpenses] = useState(0);

  const { expenses } = useSelector((state) => state?.universitiesReducer);
  console.log("Expenses from report module", expenses);
  useEffect(() => {
    dispatch(listExpenses());
  }, []);
  useEffect(() => {
    setTotalExpenses(
      expenses?.data?.faqs
        .reduce((a, one) => {
          // console.log(one.amount, total);
          return +a + +one.amount;
          // console.log(ind, total);
          // setTotal(newAmount);
        }, 0)
        .toFixed(2)
    );
  }, [expenses]);
  // END

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsData = [
    {
      label: "Balance Sheet",
      content: <Reports />,
    },
    {
      label: "Profit Loss",
      content: (
        <Profit
          revenue={revenue}
          totalRevenue={totalRevenue}
          expenses={expenses}
          totalExpenses={totalExpenses}
        />
      ),
    },
    {
      label: "Income Statement",
      content: <Income revenue={revenue} totalRevenue={totalRevenue} />,
    },
    {
      label: "Expenses",
      content: <Expenses expenses={expenses} total={totalExpenses} />,
    },
    {
      label: "Cost Of Sale",
      content: <ReportsCost />,
    },
  ];
  return (
    <div className="mt-12 w-full bg-[#E8E9EB] pr-8 font-display">
      <div className="my-10 grid grid-cols-1">
        <p className=" mb-2 text-4xl font-semibold text-[#280559]">Reports</p>
        <p className=" font text-base text-[#9898A3]">View Reports</p>
      </div>
      <div className=" mb-7 flex flex-row  items-center gap-10 overflow-x-auto rounded-[34px] bg-white px-8 xl:px-[64px]">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`whitespace-nowrap border-t-4 py-9 transition-colors duration-300 ${
                idx === activeTabIndex
                  ? "border-[#280559]"
                  : "border-transparent hover:border-gray-200 "
              }`}
              onClick={() => setActiveTabIndex(idx)}
            >
              <p
                className={`text-[24px] font-semibold ${
                  idx === activeTabIndex ? "text-[#280559]" : "text-[#92929D] "
                }`}
              >
                {tab.label}
              </p>
            </button>
          );
        })}
      </div>
      <div>{tabsData[activeTabIndex].content}</div>
    </div>
  );
}

export default ReportsManagement;
