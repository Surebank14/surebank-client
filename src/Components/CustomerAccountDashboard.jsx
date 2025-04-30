import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountTransactionRequest } from "../redux/slices/createAccountSlice";
import { fetchCustomerAccountRequest } from '../redux/slices/depositSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FaWhatsapp } from 'react-icons/fa';


import Loader from "./Loader";
import Tablebody from "./Table/TransactionTableBody";
import Tablehead from "./Table/TransactionTableHead";


import { useParams } from "react-router-dom";


const CustomerAccountDashboard = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();
   
  const { customerAccount } = useSelector((state) => state.customerAccount);

    const {loading,deposit} = useSelector((state)=>state.deposit)
    const newSubAccount = deposit?.subAccount
  
  const [selectedAccount, setSelectedAccount] = useState(null);

  
  useEffect(() => {
    const data = { customerId: customerId };
    dispatch(fetchCustomerAccountRequest(data));
  }, [dispatch, customerId]);


  const customerName = localStorage.getItem("customerName");


  const accountTransaction = (accountTypeId) => {
    if (!accountTypeId) return;
    dispatch(fetchAccountTransactionRequest({ accountTypeId }));
    setSelectedAccount(accountTypeId);
  };
  
  const transactionHistory = Array.isArray(customerAccount) ? customerAccount : [];



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loading && <Loader />}
     
    
      {/* Header */}
      <header className="mb-6 mt-6">
        <h1 className="text-2xl font-bold">Customer Account Dashboard</h1>
        <p className="text-gray-700"><strong>Name:</strong> {customerName}</p>
        <p className="text-gray-700"><strong>Account Number:</strong> {deposit?.account?.accountNumber}</p>
        <p className="text-gray-700"><strong>Total Balance:</strong> ₦{deposit?.account?.ledgerBalance}</p>
        <div className="flex items-center text-gray-700 gap-3 flex-wrap">
  <span>
    <strong>Available Balance:</strong> ₦{deposit?.account?.availableBalance}
  </span>

  <button
    onClick={() => accountTransaction(deposit?.account?._id)}
    className="text-blue-600 hover:underline flex items-center"
  >
    <FontAwesomeIcon icon={faFolderOpen} title="View Transactions" />
  </button>

  <a
    href="https://wa.me/+2348026211164"
    target="_blank"
    rel="noreferrer"
    className="text-xl text-green-600 hover:text-blue-700"
    title="Chat on WhatsApp"
  >
    <FaWhatsapp />
  </a>
</div>

      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel - Account Details */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Accounts</h2>
          {(Array.isArray(newSubAccount?.dsAccount) && newSubAccount.dsAccount.length > 0) || 
 (Array.isArray(newSubAccount?.sbAccount) && newSubAccount.sbAccount.length > 0) ? (
  <ul className="space-y-4">
    {/* DS Accounts */}
    {Array.isArray(newSubAccount?.dsAccount) &&
      newSubAccount.dsAccount.map((account, index) => (
        <li
          key={`ds-${index}`}
          className="flex justify-between items-center bg-gray-50 p-3 rounded hover:shadow-md"
        >
          <div>
            <div
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-1 ${
                account.accountType === "Rent"
                  ? "bg-blue-100 text-gray-700"
                  : account.accountType === "School fees"
                  ? "bg-green-100 text-green-700"
                  : account.accountType === "Food"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-blue-700"
              }`}
            >
              {account.accountType} Account <strong>₦{account.amountPerDay}</strong>
          
            </div>
            <p className="text-sm text-gray-600">Number: {account.DSAccountNumber || "N/A"}</p>
            <p className="text-sm text-gray-600">Balance: ₦{account.totalContribution || 0}</p>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => accountTransaction(account._id)} className="text-blue-600 hover:underline">
            <FontAwesomeIcon icon={faFolderOpen} title="View Transactions"/>
            </button>
      
          </div>
        </li>
      ))}
{/* FD Accounts */}
{Array.isArray(newSubAccount?.fdAccount) &&
  newSubAccount.fdAccount.map((account, index) => {
    // const today = new Date();
    // const maturityDate = new Date(account.maturityDate);
    // const isMatured = maturityDate <= today; // Check if matured
    return (
      <li
        key={`fd-${index}`}
        className="flex justify-between items-center bg-gray-50 p-3 rounded hover:shadow-md"
      >
        <div>
          <div
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-1 ${
              account.accountType === "Rent"
                ? "bg-blue-100 text-gray-700"
                : account.accountType === "School fees"
                ? "bg-green-100 text-green-700"
                : account.accountType === "Food"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-blue-700"
            }`}
          >
            FD Account <strong>₦{account.fdamount}</strong>
  
          </div>
          <p className="text-sm text-gray-600">Number: {account.FDAccountNumber || "N/A"}</p>
          <p className="text-sm text-gray-600">Balance: ₦{account.totalAmount || 0}</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => accountTransaction(account._id)} className="text-blue-600 hover:underline">
          <FontAwesomeIcon icon={faFolderOpen} title="View Transactions"/>
          </button>
     

          {/* New Button for Withdrawing Matured Fixed Deposit */}
          {/* {isMatured && account.totalAmount > 0 && (
           
            <button
              onClick={() => { setSelectedAccount(account); setShowMaturedWithdrawalModal(true); }}
              className="text-yellow-600 hover:text-yellow-800"
            >
              <i className="fas fa-unlock text-sm md:text-lg" title="Withdraw Matured FD"></i>
            </button>
          )} */}
        </div>
      </li>
    );
  })}


    {/* SB Accounts */}
    {Array.isArray(newSubAccount?.sbAccount) &&
  newSubAccount.sbAccount.map((account, index) => (
    <li
      key={`sb-${index}`}
      className="flex justify-between items-center bg-gray-50 p-3 rounded hover:shadow-md relative"
    >
      <div>
        {/* Product Info Container - Responsive Flex */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
          {/* Product Name & Price */}
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              account.accountType === "Rent"
                ? "bg-blue-100 text-gray-700"
                : account.accountType === "School fees"
                ? "bg-green-100 text-green-700"
                : account.accountType === "Food"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-blue-700"
            }`}
          >
            {account.productName} <strong>₦{account.sellingPrice}</strong>
          </span>

          {/* Tooltip & Edit - Same Row on Desktop, Below on Mobile */}
          <div className="flex items-center space-x-2 mt-1 md:mt-0">
            {/* Info Icon with Tooltip */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-800">
              <FontAwesomeIcon icon={faCircleInfo} title="Product description"/>
              </button>
              <div className="absolute left-14 transform -translate-x-1/2 bottom-full mb-2 w-48 bg-green-700 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {account.productDescription || "No description available"}
              </div>
            </div>

            {/* Edit Button */}
       

          </div>
        </div>

        {/* Account Details */}
        <p className="text-xs text-gray-600">Number: {account.SBAccountNumber || "N/A"}</p>
        <p className="text-xs text-gray-600">Balance: ₦{account.balance || 0}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-1">
        {/* View Transactions */}
        <button onClick={() => accountTransaction(account._id)} className="text-blue-600 hover:underline">
        <FontAwesomeIcon icon={faFolderOpen} title="View Transactions"/>
        </button>
      
      </div>
    </li>
  ))}
  </ul>
) : (
  <p className="text-gray-600">Customer does not have any account.</p>
)}
  </div>
        {/* Right Panel - Transaction History */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Transaction History</h2>
          {selectedAccount ? (
            <div>
              {/* <h3 className="text-md font-semibold mb-2">Account: {subAccount.DSAccountNumber}</h3> */}
              <ul className="space-y-2">
                {transactionHistory.length > 0 ? (
          
                  <table className="md:min-w-[500px] md:ml-4">
                  <Tablehead />
                  <Tablebody customers={transactionHistory}/>
                </table>
                  
                ) : (
                  <p className="text-gray-600">No transactions found.</p>
                )}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">Select an account to view transactions.</p>
          )}
        </div>
      </div>



  </div>
  )
    };
    export default CustomerAccountDashboard;

    