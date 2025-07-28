import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountTransactionRequest } from "../redux/slices/createAccountSlice";
import { fetchCustomerAccountRequest,createCustomerWithdrawalRequestRequest,fetchCustomerWithdrawalRequestRequest } from '../redux/slices/depositSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen,faMoneyBillTransfer,  faCircleInfo, faTimes, faLandmark, faMoneyBillWave,faCircleCheck,faHistory } from '@fortawesome/free-solid-svg-icons';
import { FaWhatsapp } from 'react-icons/fa';
import Loader from "./Loader";
import Tablebody from "./Table/TransactionTableBody";
import Tablehead from "./Table/TransactionTableHead";
import { Link, useParams } from "react-router-dom";
import advertImage from '../images/rent image.jpg'

const CustomerAccountDashboard = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();
   
  const { customerAccount } = useSelector((state) => state.customerAccount);
  const { loading, deposit } = useSelector((state) => state.deposit);
  const newSubAccount = deposit?.subAccount;
  // const withdrawalRequest = deposit?.withdrawalRequest;
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showDSCustomerWithdrawalRequestModal, setShowDSCustomerWithdrawalRequestModal] = useState(false);
  const [showSBCustomerWithdrawalRequestModal, setShowSBCustomerWithdrawalRequestModal] = useState(false);
  const [showFDCustomerWithdrawalRequestModal, setShowFDCustomerWithdrawalRequestModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentAccountType, setCurrentAccountType] = useState('');
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [packageNumber, setPackageNumber] = useState("");
  const [withdrawalType, setWithdrawalType] = useState("cash");
  const [accountName, setAccountName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [productName, setProductName] = useState("");
  const [packageType, setPackageType] = useState()
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState("");

  const handleCustomerWithdrawalRequest = (submissionData) => {
    // Handle both event object and direct data submission
    const isEvent = submissionData.preventDefault;
    if (isEvent) {
      submissionData.preventDefault();
    }
  
    console.log('Selected Account:', selectedAccount);
    console.log('Submission Data:', submissionData);
    
    setErrors("");
  
    // Determine the amount value with proper fallback
    const submittedAmount = isEvent ? amount : submissionData?.amount;
    const finalAmount = submittedAmount || selectedAccount?.sellingPrice;
  
    // Validation
    if (!finalAmount) {
      setErrors("Amount field is required.");
      return;
    }
  
    if (isNaN(finalAmount) || parseFloat(finalAmount) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }
  
    // Prepare the request data
    const details = { 
      accountNumber: selectedAccount.accountNumber,
      packageNumber,
      accountManagerId: selectedAccount.accountManagerId,
      branchId: selectedAccount.branchId,
      accountTypeId: selectedAccount._id,
      customerId: customerId, 
      bankName: bankName || "",
      bankAccountNumber: bankAccountNumber || "",
      accountName: accountName || "",
      productName: submissionData?.productName || productName || selectedAccount?.productName,
      shippingAddress: submissionData?.shippingAddress || shippingAddress,
      package: packageType,
      channelOfWithdrawal: withdrawalType || "shipping", // Default to shipping if not specified
      amount: parseFloat(finalAmount)
    };
  
    const data = { details };
    console.log('Final Submission Data:', data);
    
    dispatch(createCustomerWithdrawalRequestRequest(data));
  
    // Reset form state
    setAmount("");
    setBankName("");
    setBankAccountNumber("");
    setAccountName("");
    setWithdrawalType("");
    setShippingAddress("");
    setProductName("");
    setShowDSCustomerWithdrawalRequestModal(false);
    setShowSBCustomerWithdrawalRequestModal(false);
    setShowFDCustomerWithdrawalRequestModal(false);
    setShowSuccessModal(true); // Show success modal
  };

  useEffect(() => {
    const data = { customerId: customerId };
    dispatch(fetchCustomerAccountRequest(data));
  }, [dispatch, customerId]);
  useEffect(() => {
    const data = { customerId: customerId };
    dispatch(fetchCustomerWithdrawalRequestRequest(data));
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
      description: "The Savings account is for savings and purchasing of item only. Is for you to save towards buying an item and serves as your primary purchasing account.",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-2 md:p-6">
      {loading && <Loader />}
     
      {/* Header */}
      <header className="mb-2 mt-4 md:mt-6 md:px-10 bg-white p-2 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
  <strong>Welcome,</strong> {customerName}
</h1>
<div className="space-y-2 text-gray-700">
  <p><strong>Account Number:</strong> {deposit?.account?.accountNumber}</p>
  <div className="mt-3">
    <strong>Free to withdraw:</strong> ₦{deposit?.account?.availableBalance?.toLocaleString('en-US')}
  </div>
  <div className="flex justify-between items-start">
    {/* WhatsApp Support - Left Side (Larger) */}
    <a
      href="https://wa.me/+2348026211164"
      target="_blank"
      rel="noreferrer"
      className="flex flex-col items-center text-green-600 hover:text-green-800"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-8xl mb-1" />
      <span className="text-sm">Chat with us</span>
    </a>

    {/* Right Side Buttons */}
    <div className="flex flex-col space-y-1 items-end">
      {/* View Transactions Button */}
      <button
        onClick={() => accountTransaction(deposit?.account?._id)}
        className="flex items-center text-blue-600 hover:text-blue-800 space-x-2"
      >
        <FontAwesomeIcon icon={faFolderOpen} className="text-lg" />
        <span>View Transactions</span>
      </button>

      {/* Request Withdrawal Button */}
      <button
        onClick={() => {
          setSelectedAccount(deposit?.account);
          setPackageType('FW');
          setPackageNumber(deposit?.account?.accountNumber);
          setShowDSCustomerWithdrawalRequestModal(true);
        }}
        className="flex items-center text-red-600 hover:text-red-800 space-x-2"
      >
        <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-lg text-red-500" />
        <span>Request</span>
      </button>

      {/* Request History Button */}
      <button
        onClick={() => {/* Add your request history handler here */}}
        className="flex items-center text-purple-600 hover:text-purple-800 space-x-2"
      >
        <FontAwesomeIcon icon={faHistory} className="text-lg" />
        <Link to='/viewcustomerwithdrawalrequest'>
        <span>Request History</span>
        </Link>
      </button>
    </div>
  </div>

  {/* Available Balance - Moved below the buttons row */}

</div>
      </header>

   {/* Commercial Bank Details Section */}
<div className="mb-2 bg-gradient-to-r from-indigo-700 to-blue-800 text-white p-1 rounded-xl shadow-lg">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
    <div className="flex items-center mb-2 md:mb-0">
      <FontAwesomeIcon icon={faLandmark} className="text-2xl mr-3" />
      <div>
        <h2 className="text-sm font-bold">PAY TO THIS ACCOUNT, SEND US RECIEPT ON WHATSAPP, WE WILL CREDIT YOUR ACCOUNT WITH US.</h2>
      </div>
    </div>
  
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
    {/* Bank Account Information */}
    <div className="bg-white bg-opacity-10 p-2 rounded-lg">
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
          <p className="font-medium">SURE BANK STORES</p>
        </div>
        <div>
          <p className="text-xs opacity-80">Account Number</p>
          <p className="font-medium">5601047448 </p>
        </div>
      </div>
    </div>

    
 
  </div>
</div>



      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel - Account Details */}
        <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
        <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2 flex items-center gap-3">
  <strong>Accounts</strong>
      {/* Account Type Quick Info */}
      <div className="flex space-x-2 mb-1">
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
</h2>

          {(Array.isArray(newSubAccount?.dsAccount) && newSubAccount.dsAccount.length > 0) || 
          (Array.isArray(newSubAccount?.fdAccount) && newSubAccount.fdAccount.length > 0) || 
           (Array.isArray(newSubAccount?.sbAccount) && newSubAccount.sbAccount.length > 0) ? (
            <ul className="space-y-3">
              {/* DS Accounts */}
              {Array.isArray(newSubAccount?.dsAccount) &&
  newSubAccount.dsAccount.map((account, index) => {
    // Find matching withdrawal request for this account
    // const matchingRequest = Array.isArray(withdrawalRequest)
    // ? withdrawalRequest.find(request => request.accountTypeId === account._id)
    // : null;

    return (
      <li
        key={`ds-${account._id}`} // Using account._id for better key
        className="flex justify-between items-center bg-blue-50 p-3 rounded-lg hover:shadow-md transition-shadow"
      >
        <div>
          <div className="flex">
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
       
            {/* {console.log('::::::',matchingRequest.status)} */}
            {account.accountType} Account <strong>₦{account.amountPerDay?.toLocaleString('en-US')}</strong>
            
          </div>
          <div className="ml-4">
      
            </div>
            </div>
          <p className="text-sm text-gray-600">
            <span className="bg-blue-500 text-white w-8 h-8 rounded-sm"> DS:</span> 
            {account.DSAccountNumber || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            Balance: ₦{account.totalContribution?.toLocaleString('en-US') || 0}
          </p>
        </div>
        <div>
          {/* <div>
          {matchingRequest?.status && (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      matchingRequest?.status.toLowerCase() === 'pending' 
        ? 'bg-yellow-100 text-yellow-800' 
      : matchingRequest?.status.toLowerCase() === 'processing' 
        ? 'bg-blue-100 text-blue-800'
      : matchingRequest?.status.toLowerCase() === 'completed' 
        ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800'
    }`}>
      <span className="mr-1">Withdrawal:</span>
      <span className="font-semibold">
        {matchingRequest?.status}
      </span>
    </span>
  )}
          </div> */}
          <div className="flex flex-col space-y-2">
  <button
    onClick={() => {
      setSelectedAccount(account);
      setPackageType('DS');
      setPackageNumber(account.DSAccountNumber )
      setShowDSCustomerWithdrawalRequestModal(true);
    }}
    className="flex items-center text-red-600 hover:text-red-800 space-x-2"
  >
    <FontAwesomeIcon
      icon={faMoneyBillTransfer}
      className="text-lg md:text-lg text-red-500"
    />
    <span className="text-xs">Request</span>
  </button>
  <button
    onClick={() => accountTransaction(account._id)}
    className="flex items-center text-blue-600 hover:text-blue-800 space-x-2"
  >
    <FontAwesomeIcon
      className="text-lg md:text-lg"
      icon={faFolderOpen}
    />
    <span className="text-xs">View Transactions</span>
  </button>
</div>
        </div>
      </li>
    );
  })}
              
              {/* FD Accounts */}
              {Array.isArray(newSubAccount?.fdAccount) &&
                newSubAccount.fdAccount.map((account, index) => {
                      // Find matching withdrawal request for this account
                      // const matchingRequest = Array.isArray(withdrawalRequest)
                      // ? withdrawalRequest.find(request => request.accountTypeId === account._id)
                      // : null;

    return (
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
                        FD Account <strong>₦{account.fdamount?.toLocaleString('en-US')}</strong>
                      </div>
                      <p className="text-sm text-gray-600"><span className="bg-purple-500 text-white w-8 h-8 rounded-sm"> FD:</span>  {account.FDAccountNumber || "N/A"}</p>
                      <p className="text-sm text-gray-600">Interest: ₦{account.expenseInterest?.toLocaleString('en-US') || 0}</p>
                    </div>
                    <div>
          {/* <div>
          {matchingRequest?.status && (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      matchingRequest?.status.toLowerCase() === 'pending' 
        ? 'bg-yellow-100 text-yellow-800' 
      : matchingRequest?.status.toLowerCase() === 'processing' 
        ? 'bg-blue-100 text-blue-800'
      : matchingRequest?.status.toLowerCase() === 'completed' 
        ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800'
    }`}>
      <span className="mr-1">Withdrawal:</span>
      <span className="font-semibold">
        {matchingRequest?.status}
      </span>
    </span>
  )}
          </div> */}
          <div className="flex flex-col space-y-2">
  <button
    onClick={() => {
      setSelectedAccount(account);
      setPackageType('FD');
      setPackageNumber(account.FDAccountNumber )
      setShowFDCustomerWithdrawalRequestModal(true);
    }}
    className="flex items-center text-red-600 hover:text-red-800 space-x-2"
  >
    <FontAwesomeIcon
      icon={faMoneyBillTransfer}
      className="text-lg md:text-lg text-red-500"
    />
    <span className="text-xs">Request</span>
  </button>
  <button
    onClick={() => accountTransaction(account._id)}
    className="flex items-center text-blue-600 hover:text-blue-800 space-x-2"
  >
    <FontAwesomeIcon
      className="text-lg md:text-lg"
      icon={faFolderOpen}
    />
    <span className="text-xs">View Transactions</span>
  </button>
</div>
                    </div>
                  </li>
    )
})}

              {/* SB Accounts */}
              {Array.isArray(newSubAccount?.sbAccount) &&
                newSubAccount.sbAccount.map((account, index) => {
                    // Find matching withdrawal request for this account
                    // const matchingRequest = Array.isArray(withdrawalRequest)
                    // ? withdrawalRequest.find(request => request.accountTypeId === account._id)
                    // : null;

  return (
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
                          {account.productName} <strong>₦{account.sellingPrice?.toLocaleString('en-US')}</strong>
                        </span>

                        <div className="flex items-center space-x-2 mt-1 md:mt-0">
                          <div className="relative group">
                            <button className="text-gray-600 hover:text-gray-800">
                              <FontAwesomeIcon className="text-sm md:text-lg" icon={faCircleInfo} title="Product description"/>
                            </button>
                            <div className="absolute left-14 transform -translate-x-1/2 bottom-full mb-2 w-48 bg-green-700 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {account.productDescription || "No description available"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mt-2"><span className="bg-green-500 text-white w-8 h-8 rounded-sm"> SB:</span> {account.SBAccountNumber || "N/A"}</p>
                      <p className="text-xs text-gray-600">Balance: ₦{account.balance?.toLocaleString('en-US') || 0}</p>
                    </div>
                    <div>
                    {/* <div>
  {matchingRequest?.status && (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      matchingRequest?.status.toLowerCase() === 'pending' 
        ? 'bg-yellow-100 text-yellow-800' 
      : matchingRequest?.status.toLowerCase() === 'processing' 
        ? 'bg-blue-100 text-blue-800'
      : matchingRequest?.status.toLowerCase() === 'completed' 
        ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800'
    }`}>
      <span className="mr-1">Withdrawal:</span>
      <span className="font-semibold">
        {matchingRequest?.status}
      </span>
    </span>
  )}
</div> */}
<div className="flex flex-col space-y-2">
  <button
    onClick={() => {
      setSelectedAccount(account);
      setPackageType('SB');
      setPackageNumber(account.SBAccountNumber )
      setShowSBCustomerWithdrawalRequestModal(true);
    }}
    className="flex items-center text-red-600 hover:text-red-800 space-x-2"
  >
    <FontAwesomeIcon
      icon={faMoneyBillTransfer}
      className="text-lg md:text-lg text-red-500"
    />
    <span className="text-xs">Request</span>
  </button>
  <button
    onClick={() => accountTransaction(account._id)}
    className="flex items-center text-blue-600 hover:text-blue-800 space-x-2"
  >
    <FontAwesomeIcon
      className="text-lg md:text-lg"
      icon={faFolderOpen}
    />
    <span className="text-xs">View Transactions</span>
  </button>
</div>
                    </div>
                  </li>
  )
})}
            </ul>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-gray-600">Customer does not have any account.</p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-1">
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
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-1 border-b">
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

{showDSCustomerWithdrawalRequestModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-600" />
        Withdrawal Request
      </h3>
            {/* Information paragraph */}
            {/* <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-100">
        <p className="text-sm text-blue-800">
        Cash withdrawals will be processed immediately, while bank transfers 
        will be completed within 24 hours.
        </p>
      </div> */}
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
      
      <form onSubmit={handleCustomerWithdrawalRequest}>
        {/* Withdrawal Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Withdrawal Method</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setWithdrawalType('cash')}
              className={`px-4 py-2 rounded-md flex-1 ${
                withdrawalType === 'cash' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              Cash
            </button>
            <button
              type="button"
              onClick={() => setWithdrawalType('transfer')}
              className={`px-4 py-2 rounded-md flex-1 ${
                withdrawalType === 'transfer' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              Bank Transfer
            </button>
          </div>
        </div>

        {/* Amount Field (Always visible) */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Bank Details (Only for transfer) */}
        {withdrawalType === 'transfer' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Enter bank name"
                className="w-full border border-gray-300 rounded-md p-2"
                required={withdrawalType === 'transfer'}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Account Name</label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter account name"
                className="w-full border border-gray-300 rounded-md p-2"
                required={withdrawalType === 'transfer'}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Account Number</label>
              <input
                type="text"
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                placeholder="Enter account number"
                className="w-full border border-gray-300 rounded-md p-2"
                required={withdrawalType === 'transfer'}
              />
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => setShowDSCustomerWithdrawalRequestModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {withdrawalType === 'cash' ? 'Request Cash' : 'Request Transfer'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
{showFDCustomerWithdrawalRequestModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-600" />
        Withdrawal Request
      </h3>
      
      {/* Information paragraph */}
      {/* <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-100">
        <p className="text-sm text-blue-800">
          Cash withdrawals will be processed immediately, while bank transfers 
          will be completed within 24 hours.
        </p>
      </div> */}
            {/* Information paragraph */}
            <div className="mb-4 p-3 bg-red-500 rounded-md border border-blue-100">
        <p className="text-sm text-white">
    Withdrawing before maturity date will attract penalty charge.
        </p>
      </div>
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
      
      <form onSubmit={handleCustomerWithdrawalRequest}>
        {/* Withdrawal Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Withdrawal Method</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setWithdrawalType('cash')}
              className={`px-4 py-2 rounded-md flex-1 ${
                withdrawalType === 'cash' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              Cash
            </button>
            <button
              type="button"
              onClick={() => setWithdrawalType('transfer')}
              className={`px-4 py-2 rounded-md flex-1 ${
                withdrawalType === 'transfer' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              Bank Transfer
            </button>
          </div>
        </div>

        {/* Amount Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Bank Details (Conditional) */}
        {withdrawalType === 'transfer' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Enter bank name"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Account Name</label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter account name"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Account Number</label>
              <input
                type="text"
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                placeholder="Enter account number"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => setShowFDCustomerWithdrawalRequestModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {withdrawalType === 'cash' ? 'Request Cash' : 'Request Transfer'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
{showSBCustomerWithdrawalRequestModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-600" />
        Shipping Details
      </h3>
            {/* Information paragraph */}
            {/* <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-100">
        <p className="text-sm text-blue-800">
          Please select your withdrawal method and enter the required details. 
          Cash withdrawals will be processed immediately, while bank transfers 
          may take 1-2 business days to complete.
        </p>
      </div> */}
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
      
      {/* Product Info Display */}
      <div className="mb-4 p-3 bg-gray-50 rounded-md">
        <div className="flex justify-between mb-1">
          <span className="font-medium">Product:</span>
          <span>{selectedAccount.productName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Price:</span>
          <span>₦{selectedAccount.sellingPrice}</span>
        </div>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        handleCustomerWithdrawalRequest({
          amount: selectedAccount.sellingPrice,
          productName: selectedAccount.productName,
          shippingAddress
        });
      }}>
        {/* Hidden fields aren't needed since we're passing values directly */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Shipping Address</label>
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter full shipping address"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => setShowSBCustomerWithdrawalRequestModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  </div>
)}
{/* Success Modal */}
{showSuccessModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full text-center">
      {/* Success Icon */}
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
        <FontAwesomeIcon 
          icon={faCircleCheck} 
          className="text-green-600 text-xl"
        />
      </div>
      
      {/* Success Message */}
      <h3 className="text-lg font-bold mb-2">
        Request Successful!
      </h3>
      <div className="mb-6">
        <p className="text-gray-600 text-sm">
        THANK YOU FOR SUBMITTING YOUR REQUEST, OUR STANDARD PROCESSING TIME IS 24 TO 48 HOURS. YOU WILL RECEIVE A CONFIRMATION ONCE IT'S COMPLETED. FEEL FREE TO REACH OUT IF YOU NEED ANY UPDATES.
        </p>
      </div>
      
      {/* OK Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowSuccessModal(false)}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default CustomerAccountDashboard;