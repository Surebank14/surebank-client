import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountTransactionRequest } from "../redux/slices/createAccountSlice";
import { fetchCustomerAccountRequest } from '../redux/slices/depositSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faCircleInfo, faTimes, faLandmark } from '@fortawesome/free-solid-svg-icons';
import { FaWhatsapp } from 'react-icons/fa';
import Loader from "./Loader";
import Tablebody from "./Table/TransactionTableBody";
import Tablehead from "./Table/TransactionTableHead";
import { useParams } from "react-router-dom";
import advertImage from '../images/rent image.jpg'

const CustomerAccountDashboard = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();
   
  const { customerAccount } = useSelector((state) => state.customerAccount);
  const { loading, deposit } = useSelector((state) => state.deposit);
  const newSubAccount = deposit?.subAccount;
  
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentAccountType, setCurrentAccountType] = useState('');

  useEffect(() => {
    const data = { customerId: customerId };
    dispatch(fetchCustomerAccountRequest(data));
  }, [dispatch, customerId]);

  const customerName = localStorage.getItem("customerName");

  const accountTransaction = (accountTypeId) => {
    if (!accountTypeId) return;
    dispatch(fetchAccountTransactionRequest({ accountTypeId }));
    setSelectedAccount(accountTypeId);
    if (window.innerWidth < 768) {
      setShowMobileModal(true);
    }
  };
  
  const transactionHistory = Array.isArray(customerAccount) ? customerAccount : [];

  const handleAccountTypeClick = (type) => {
    setCurrentAccountType(type);
    setShowInfoModal(true);
  };

  const accountTypeInfo = {
    DS: {
      title: "Daily Savings (DS) Account",
      description: "A Daily Savings account allows you to save small amounts daily towards specific goals. You can save for rent, school fees, food, or other personal targets with daily contributions.",
      features: [
        "Daily contributions towards your goal",
        "Flexible withdrawal options",
        "Helps build consistent savings habits",
        "Multiple DS accounts for different goals"
      ]
    },
    SB: {
      title: "Savings (SB) Account",
      description: "The Savings account is your main account for savings and purchasing of item. Is for you to save towards buying an item and serves as your primary purchasing account.",
      features: [
        "Save to buy an item",
        "Unlimited deposits",
        "Primary account for purchasing an item"
      ]
    },
    FD: {
      title: "Fixed Deposit (FD) Account",
      description: "Fixed Deposit accounts allow you to earn higher interest by locking in your funds for a specific period. Your money grows while you wait for maturity.",
      features: [
        "Higher interest rates than regular savings",
        "Fixed tenure (6 months to 5 years)",
        "Interest paid before maturity",
        "Premature withdrawal penalties may apply"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-4 md:p-6">
      {loading && <Loader />}
     
      {/* Header */}
      <header className="mb-6 mt-4 md:mt-6 bg-white p-4 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
  <strong>Welcome,</strong> {customerName}
</h1>
        <div className="mt-3 space-y-2 text-gray-700">
          <p><strong>Account Number:</strong> {deposit?.account?.accountNumber}</p>
          <p><strong>Total Balance:</strong> ₦{deposit?.account?.ledgerBalance}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span>
              <strong>Available Balance:</strong> ₦{deposit?.account?.availableBalance}
            </span>
            <button
              onClick={() => accountTransaction(deposit?.account?._id)}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <FontAwesomeIcon icon={faFolderOpen} title="View Transactions" className="mr-1" />
              <span className="text-sm">View Transactions</span>
            </button>
            <a
              href="https://wa.me/+2348026211164"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-700 text-green-600 flex items-center"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp className="text-7xl" />
              <span className="ml-1 text-sm">Chat Support</span>
            </a>
          </div>
        </div>
      </header>

   {/* Commercial Bank Details Section */}
<div className="mb-6 bg-gradient-to-r from-indigo-700 to-blue-800 text-white p-5 rounded-xl shadow-lg">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
    <div className="flex items-center mb-3 md:mb-0">
      <FontAwesomeIcon icon={faLandmark} className="text-2xl mr-3" />
      <div>
        <h2 className="text-sm font-bold">PAY TO THIS ACCOUNT, SEND US RECIEPT ON WHATSAPP, WE WILL CREDIT YOUR ACCOUNT WITH US.</h2>
      </div>
    </div>
  
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    {/* Bank Account Information */}
    <div className="bg-white bg-opacity-10 p-4 rounded-lg">
      <h3 className="font-semibold mb-2 flex items-center">
        <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
        Account Details
      </h3>
      <div className="space-y-2">
        <div>
          <p className="text-xs opacity-80">Bank Name</p>
          <p className="font-medium">Fidelity Bank</p>
        </div>
        <div>
          <p className="text-xs opacity-80">Account Name</p>
          <p className="font-medium">EASYTOBUY</p>
        </div>
        <div>
          <p className="text-xs opacity-80">Account Number</p>
          <p className="font-medium">5601049851</p>
        </div>
      </div>
    </div>

    
 
  </div>
</div>

      {/* Account Type Quick Info */}
      <div className="flex space-x-2 mb-4">
        <div 
          className="cursor-pointer bg-blue-500 text-white w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
          onClick={() => handleAccountTypeClick('DS')}
          title="Daily Savings Info"
        >
          DS
        </div>
        <div 
          className="cursor-pointer bg-green-500 text-white w-8 h-8 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
          onClick={() => handleAccountTypeClick('SB')}
          title="Savings Account Info"
        >
          SB
        </div>
        <div 
          className="cursor-pointer bg-purple-500 text-white w-8 h-8 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
          onClick={() => handleAccountTypeClick('FD')}
          title="Fixed Deposit Info"
        >
          FD
        </div>
  
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel - Account Details */}
        <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
        <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2 flex items-center gap-3">
  <strong>Accounts</strong>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 
                  font-medium text-sm md:text-base animate-text-shimmer hover:animate-none">
    (Check statement to confirm deposit)
  </span>
</h2>

          {(Array.isArray(newSubAccount?.dsAccount) && newSubAccount.dsAccount.length > 0) || 
          (Array.isArray(newSubAccount?.fdAccount) && newSubAccount.fdAccount.length > 0) || 
           (Array.isArray(newSubAccount?.sbAccount) && newSubAccount.sbAccount.length > 0) ? (
            <ul className="space-y-3">
              {/* DS Accounts */}
              {Array.isArray(newSubAccount?.dsAccount) &&
                newSubAccount.dsAccount.map((account, index) => (
                  <li
                    key={`ds-${index}`}
                    className="flex justify-between items-center bg-blue-50 p-3 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                          account.accountType === "Rent"
                            ? "bg-blue-100 text-blue-800"
                            : account.accountType === "School fees"
                            ? "bg-green-100 text-green-800"
                            : account.accountType === "Food"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {account.accountType} Account <strong>₦{account.amountPerDay}</strong>
                      </div>
                      <p className="text-sm text-gray-600">Number: {account.DSAccountNumber || "N/A"}</p>
                      <p className="text-sm text-gray-600">Balance: ₦{account.totalContribution || 0}</p>
                    </div>
                    <button 
                      onClick={() => accountTransaction(account._id)} 
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100"
                    >
                      <FontAwesomeIcon icon={faFolderOpen} title="View Transactions"/>
                    </button>
                  </li>
                ))}
              
              {/* FD Accounts */}
              {Array.isArray(newSubAccount?.fdAccount) &&
                newSubAccount.fdAccount.map((account, index) => (
                  <li
                    key={`fd-${index}`}
                    className="flex justify-between items-center bg-green-50 p-3 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                          account.accountType === "Rent"
                            ? "bg-blue-100 text-blue-800"
                            : account.accountType === "School fees"
                            ? "bg-green-100 text-green-800"
                            : account.accountType === "Food"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        FD Account <strong>₦{account.fdamount}</strong>
                      </div>
                      <p className="text-sm text-gray-600">Number: {account.FDAccountNumber || "N/A"}</p>
                      <p className="text-sm text-gray-600">Balance: ₦{account.totalAmount || 0}</p>
                    </div>
                    <button 
                      onClick={() => accountTransaction(account._id)} 
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100"
                    >
                      <FontAwesomeIcon icon={faFolderOpen} title="View Transactions"/>
                    </button>
                  </li>
                ))}

              {/* SB Accounts */}
              {Array.isArray(newSubAccount?.sbAccount) &&
                newSubAccount.sbAccount.map((account, index) => (
                  <li
                    key={`sb-${index}`}
                    className="flex justify-between items-center bg-purple-50 p-3 rounded-lg hover:shadow-md transition-shadow relative"
                  >
                    <div>
                      <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            account.accountType === "Rent"
                              ? "bg-blue-100 text-blue-800"
                              : account.accountType === "School fees"
                              ? "bg-green-100 text-green-800"
                              : account.accountType === "Food"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {account.productName} <strong>₦{account.sellingPrice}</strong>
                        </span>

                        <div className="flex items-center space-x-2 mt-1 md:mt-0">
                          <div className="relative group">
                            <button className="text-gray-600 hover:text-gray-800">
                              <FontAwesomeIcon icon={faCircleInfo} title="Product description"/>
                            </button>
                            <div className="absolute left-14 transform -translate-x-1/2 bottom-full mb-2 w-48 bg-green-700 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {account.productDescription || "No description available"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mt-2">Number: {account.SBAccountNumber || "N/A"}</p>
                      <p className="text-xs text-gray-600">Balance: ₦{account.balance || 0}</p>
                    </div>

                    <button 
                      onClick={() => accountTransaction(account._id)} 
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100"
                    >
                      <FontAwesomeIcon icon={faFolderOpen} title="View Transactions"/>
                    </button>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-gray-600">Customer does not have any account.</p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Desktop Right Panel - Transactions */}
          <div className="hidden md:block bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Transaction History</h2>
            {selectedAccount ? (
              <div className="overflow-x-auto">
                {transactionHistory.length > 0 ? (
                  <table className="w-full">
                    <Tablehead />
                    <Tablebody customers={transactionHistory} />
                  </table>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-600">No transactions found.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">Select an account to view transactions.</p>
              </div>
            )}
          </div>

          {/* Advertisement Section */}
          <div className="bg-white p-0 rounded-lg shadow-sm overflow-hidden">
            <div className="p-3 border-b">
              <h3 className="font-semibold text-gray-700">Special Offer</h3>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              {/* Replace with your actual ad image */}
              <img 
                src={advertImage} 
                alt="Advertisement" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="p-3 text-center bg-gray-50">
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Modal for Transactions */}
      {showMobileModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center md:hidden">
          <div className="bg-white w-[95%] max-h-[85vh] overflow-auto p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-bold text-gray-800">Transaction History</h2>
              <button
                className="text-red-500 font-bold text-xl"
                onClick={() => setShowMobileModal(false)}
              >
                ✕
              </button>
            </div>
            {selectedAccount ? (
              <div className="overflow-x-auto">
                {transactionHistory.length > 0 ? (
                  <table className="w-full">
                    <Tablehead />
                    <Tablebody customers={transactionHistory} />
                  </table>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-600">No transactions found.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">Select an account to view transactions.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Account Type Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[90%] md:w-[60%] max-w-md p-6 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {accountTypeInfo[currentAccountType]?.title}
              </h3>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>
            <div className="mb-4 text-gray-700">
              <p className="mb-3">{accountTypeInfo[currentAccountType]?.description}</p>
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {accountTypeInfo[currentAccountType]?.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAccountDashboard;