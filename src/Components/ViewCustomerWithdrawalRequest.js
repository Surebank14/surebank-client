import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerAccountRequest} from '../redux/slices/depositSlice';

const ViewCustomerWithdrawalRequest = () => {
    const customerId = localStorage.getItem('customerId');
    const dispatch = useDispatch();
    const { loading, deposit, error } = useSelector((state) => state.deposit);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const data = { customerId: customerId };
        dispatch(fetchCustomerAccountRequest(data));
        // dispatch(fetchCustomerWithdrawalRequestRequest(data));
    }, [dispatch, customerId]);

    useEffect(() => {
        if (error) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="container mx-auto p-4 md:p-6">
            {/* Error Notification */}
            {showError && (
                <div className="fixed top-4 left-0 right-0 z-50 flex justify-center animate-slideDown">
                    <div className="w-full max-w-md p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Error</p>
                                <p>{error}</p>
                            </div>
                            <button
                                onClick={() => setShowError(false)}
                                className="ml-4 text-red-700 hover:text-red-900 text-xl font-bold"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-6 md:mt-10">Withdrawal Requests</h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden rounded-lg">
                    {/* Mobile Cards View */}
                    <div className="md:hidden space-y-4 p-4">
                        {deposit?.withdrawalRequest?.length > 0 ? (
                            deposit?.withdrawalRequest?.map((customer) => (
                                <div key={customer?._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium">{customer?.customerId?.firstName} {customer?.customerId?.lastName || ''}</h3>
                                            <span className={`px-2 text-xs leading-5 font-semibold rounded-full ${
                                                customer?.status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' :
                                                customer?.status?.toLowerCase() === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {customer?.status || 'N/A'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">Product: {customer?.productName || 'N/A'}</p>
                                        <p className="text-sm text-gray-600">Amount: ₦{customer?.amount?.toLocaleString() || 'N/A'}</p>
                                        <p className="text-sm text-gray-600">Method: {customer?.channelOfWithdrawal || 'N/A'}</p>
                                        <p className="text-sm text-gray-600">Address: {customer?.shippingAddress || 'N/A'}</p>
                                        {customer?.bankName && (
                                            <div className="mt-2 pt-2 border-t">
                                                <p className="text-sm text-gray-600">Bank: {customer?.bankName}</p>
                                                <p className="text-sm text-gray-600">Account: {customer?.accountName} ({customer?.bankAccountNumber})</p>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                                            <span>Rep: {customer?.accountManagerId?.firstName || 'N/A'}</span>
                                            <span>{new Date(customer?.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No withdrawal requests found
                            </div>
                        )}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rep</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {deposit?.withdrawalRequest?.length > 0 ? (
                                    deposit?.withdrawalRequest?.map((customer) => (
                                        <tr key={customer?._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {customer?.customerId?.firstName} {customer?.customerId?.lastName || ''}
                                                        </div>
                                                        <div className="text-sm text-gray-500">{customer?.customerId?.phone || 'N/A'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {customer?.productName || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                ₦{customer?.amount?.toLocaleString() || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {customer?.channelOfWithdrawal || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                                                {customer?.shippingAddress || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {customer?.bankName ? (
                                                    <div>
                                                        <div>{customer.bankName}</div>
                                                        <div>{customer.accountName}</div>
                                                        <div>{customer.bankAccountNumber}</div>
                                                    </div>
                                                ) : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {customer?.accountManagerId?.firstName || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(customer?.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    customer?.status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' :
                                                    customer?.status?.toLowerCase() === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {customer?.status || 'N/A'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No withdrawal requests found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCustomerWithdrawalRequest;