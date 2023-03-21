import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import print from "../../../public/img/print01.svg";
import invoice01 from "../../../public/img/invoice01.png";
import downloadIcon from "../../../public/img/downloadIcon.svg";
// import logo from "../../../public/img/loginlogo.svg";
import logo from "../../../public/img/logo.svg";
const InvoicePDF = ({ open, close, invoiceItems, formsData }) => {
  const handlePrint = () => {
    window.print();
  };
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let totalAmount = invoiceItems.reduce((accumulator, currentValue) => {
      return +accumulator + +currentValue.price;
    }, 0);
    setTotal(totalAmount);
  }, [invoiceItems]);
  return (
    // <div
    //   className="mx-[50px] space-y-6 bg-[#D9D9D9] py-[54px]"
    //   style={{ display: "none" }}
    // >
    <div
      className="print:max-w-8.3 text max-w-full p-4 text-[14px] text-[#333] print:mx-auto print:p-0"
      style={{ display: "none" }}
      id="InvoiceToPrint"
    >
      <div className="temp-header">
        <div className="temp-logo-container">
          <img
            className="temp-logo-img w-auto"
            src={logo}
            alt="..."
            width={60}
            height={60}
          />
          <p className="temp-logo-text font-[bold] text-[16px] text-[#280559]">
            Qetc Training and Education
          </p>
          <p className="temp-info-1">
            T3-08-05, 3 Towers @ KL City, 349, Jalan Ampang.
          </p>
          <p className="temp-info-2">
            Kampung Berembang, 5500 Kuala Lumbur, Federal Territory of Kuala
            Lumbur, Malaysia.
          </p>
        </div>
        <div className="temp-date-and-number">
          <h1 className="temp-data-header">INVOICE</h1>
          <div className="temp-data-and-number-content">
            <table>
              <tbody>
                <tr>
                  <td>Date:</td>
                  <td>
                    {new Date(formsData.createdAt).toLocaleDateString(
                      undefined,
                      {
                        dateStyle: "medium",
                      }
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Invoice No:</td>
                  <td>{formsData.ID}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h1>+603 2770 6476 / 0182725390</h1>
      <div className="temp-bill-to">
        <h3>BILL TO</h3>
        <p>{formsData?.University?.name}</p>
        <p>
          {formsData?.billing?.addressOne}, {formsData?.billing?.country}
        </p>
        <p>
          {formsData?.billing?.addressTwo}, {formsData?.billing?.country}
        </p>
      </div>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "25%",
                wordWrap: "break-word",
              }}
            >
              Recipient Name
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "25%",
                wordWrap: "break-word",
              }}
            >
              Phone No
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "25%",
                wordWrap: "break-word",
              }}
            >
              Number of Items
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "25%",
                wordWrap: "break-word",
              }}
            >
              Amount In ($)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "25%",
                wordWrap: "break-word",
              }}
            >
              {formsData?.recipient}
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "25%",
                wordWrap: "break-word",
              }}
            >
              {formsData?.billing?.phone}
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "25%",
                wordWrap: "break-word",
              }}
            >
              {invoiceItems.length}
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "25%",
                wordWrap: "break-word",
              }}
            >
              {(+`${total}`).toFixed(2)}
            </td>
          </tr>
          {/* <tr>
            <td style={{ border: "1px solid black", padding: "5px", width: "25%", wordWrap: "break-word" }}>
              Row 2, Column 1
            </td>
            <td style={{ border: "1px solid black", padding: "5px", width: "25%", wordWrap: "break-word" }}>
              Row 2, Column 2
            </td>
            <td style={{ border: "1px solid black", padding: "5px", width: "25%", wordWrap: "break-word" }}>
              Row 2, Column 3
            </td>
            <td style={{ border: "1px solid black", padding: "5px", width: "25%", wordWrap: "break-word" }}>
              Row 2, Column 4
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "5px", width: "25%", wordWrap: "break-word" }}>
              Row 3, Column 1
            </td>
            <td style={{ border: "1px solid black", padding: "5px", width: "25%", wordWrap: "break-word" }}>
              Row 3, Column 2
            </td>
            <td style={{ border: "1px solid black", padding: "5px", width: "25%", wordWrap: "break-word" }}>
              Row 3, Column 3
            </td>
            <td style={{ border: "1px solid black", padding: "5px", width: "25%", wordWrap: "break-word" }}>
              Row 3, Column 4
            </td>
          </tr> */}
        </tbody>
      </table>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "25%",
                wordWrap: "break-word",
              }}
            >
              Service
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "25%",
                wordWrap: "break-word",
              }}
            >
              Quantity
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "25%",
                wordWrap: "break-word",
              }}
            >
              Date
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "25%",
                wordWrap: "break-word",
              }}
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {console.log("items from ", invoiceItems)}
          {invoiceItems?.map((item) => {
            return (
              <tr
                key={
                  item?.id +
                  "item from preview!" +
                  item?.price +
                  item?.quantity +
                  item.createdAt
                }
              >
                <td
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    width: "25%",
                    wordWrap: "break-word",
                  }}
                >
                  {item?.name}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    width: "25%",
                    wordWrap: "break-word",
                  }}
                >
                  {item?.quantity}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    width: "25%",
                    wordWrap: "break-word",
                  }}
                >
                  {new Date(item?.createdAt).toLocaleDateString(undefined, {
                    dateStyle: "medium",
                  })}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    width: "25%",
                    wordWrap: "break-word",
                  }}
                >
                  {(+`${item?.price}`).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="temp-bold-info temp-total">
        Total Amount:{" "}
        <span className="temp-price">
          {+total ? (+total)?.toFixed(2) : (0).toFixed(2)}
        </span>
      </p>
      <p className="temp-bold-info">Payment Method:</p>
      <p className="temp-bold-info">All cheques should be payable to:</p>
      <p className="temp-bold-info text-[#280559]">
        "QETC Education and Traning Consultancy SDN BHD"
      </p>
      <p className="temp-bold-info">
        Or bank in the RHB Islamic Bank A/C No 21401360019479
      </p>
      <footer>
        <p className="temp-bold-info">
          This is a computer generated invoice and no signature is required
        </p>
        <p className="temp-blue-bar">
          <span className="temp-to-right">www.qetc.my</span>
        </p>
      </footer>
      <style type="text/css" media="print">
        {/* {PrintStyles} */}
      </style>
    </div>
    // </div>
  );
};

export default InvoicePDF;
