
// Mock function to get branch name from branchId
// const getBranchName = (staffId, staffs = []) => {
  
//     const staff = staffs.find((staff) => staff._id === staffId);
//     return staff ? staff.name : "Unknown Branch";
//   };

const Tablebody = ({ customers = [] }) => { // Default values for props
    console.log("trans",customers)
  return (
    <tbody className="text-xs">
      {Array.isArray(customers) && customers.length > 0 ? (
        customers.map((customer, index) => (
          <tr
            key={index}
            className=" hover:bg-gray-100"
          >
            <td>
            <p className="text-xs mb-2 font-semibold">
                <span className={customer.direction === 'Credit' ? "text-green-600" :customer.direction ==='Transfer'? "text-green-600" :customer.direction === 'Moved' ? "text-purple-500": "text-red-600"}>
                {customer.direction}
                </span>
                <br />
                <span className="text-gray-500">{customer.date}</span>
            </p>
            </td>            
            <td>
            <p className={`text-xs font-semibold ${customer.direction === 'Credit' ?  "text-green-600" :customer.direction ==='Transfer'? "text-green-600" :customer.direction === 'Moved' ? "text-purple-500" :  "text-red-600"}`}>
            {customer.direction === 'Credit' ? "+" :customer.direction === 'Transfer'?  "+": "-"} {customer.amount}
            </p>
            </td>
            <td>
  <p
    className={` text-xs flex items-center space-x-1 ${
      customer.direction === "Credit"
        ? "text-green-600"
        :customer.direction ==='Transfer'
        ? "text-green-600"
        : customer.direction === "Moved"
        ? "text-purple-500"
        : "text-red-600"
    }`}
  >
    {/* Icon with smaller size */}
    <span
      className={`cursor-pointer text-[10px] font-bold text-white w-4 h-4 rounded flex items-center justify-center ${
        customer.narration === "SB Deposit" ? "bg-green-500" :customer.narration === "DS Deposit"? "bg-blue-500":customer.narration === "DS Charge"? "bg-blue-500":customer.narration === "Total DS"? "bg-blue-500":""
      }`}
    >
      {customer.narration === "SB Deposit" ? "SB" :customer.narration==="DS Deposit"? "DS":customer.narration==="DS Charge"? "DS":customer.narration==="Total DS"? "DS":""}
    </span>

    {/* Text "Deposit" */}
    <span className="flex items-center gap-1">
  {customer.narration === "From DS account" ? (
    <>
      From
      <span className="cursor-pointer bg-blue-500 text-white w-4 h-4 text-[10px] font-bold rounded flex items-center justify-center">
        DS
      </span>
      account
    </>
  ) : customer.narration === "DS Deposit" ? (
    "Deposit"
  ) : customer.narration === "DS Charge" ? (
    "Charge"
  ) : customer.narration === "SB Deposit" ? (
    "Deposit"
  ) : customer.narration === "Total DS" ? (
    "Total"
  ) : (
    customer.narration
  )}
</span>
 
</p>
</td>

            <td ><p className={`ml-2 ${customer.direction === 'Credit' ?  "text-green-600" :customer.direction ==='Transfer'? "text-green-600" :customer.direction === 'Moved' ? "text-purple-500" :  "text-red-600"}`}>{customer.balance}</p></td>
            {/* <td >
              <p className={`${customer.direction === 'Credit' ?  "text-green-600" :customer.direction === 'Moved' ? "text-purple-500" :  "text-red-600"}`}>{getBranchName(customer.createdBy, branches)}</p>
            </td> */}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center p-4">
            No transaction found.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default Tablebody;
