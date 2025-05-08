import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import PaymentStatusIndicator from "./PaymentStatusIndicator";

const AdminInstallmentReport = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filters, setFilters] = useState({
    searchTerm: "",
    paymentStatus: "",
    dateRange: "",
    participantType: "",
  });

  // Fetch registrations with installments
  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);

      // Convert filters to query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        sort: sortField,
        direction: sortDirection,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== "")
        ),
      });

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/admin/registrations?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (response.data.success) {
        setRegistrations(response.data.registrations);
        setTotalPages(response.data.totalPages);
      } else {
        setError(response.data.message || "Failed to fetch registrations");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchRegistrations();
  }, [page, sortField, sortDirection]);

  // Handle sort toggle
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const applyFilters = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page
    fetchRegistrations();
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      paymentStatus: "",
      dateRange: "",
      participantType: "",
    });
    setPage(1);
    setSortField("createdAt");
    setSortDirection("desc");
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate payment progress percentage
  const calculateProgress = (registration) => {
    const totalAmount = registration.amount;
    const paidAmount = registration.totalPaid || 0;
    return Math.round((paidAmount / totalAmount) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Installment Payments Report
      </h2>

      {/* Filters */}
      <form onSubmit={applyFilters} className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label
              htmlFor="searchTerm"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search
            </label>
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              placeholder="Name, Email, Confirmation Code"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="paymentStatus"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Payment Status
            </label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              value={filters.paymentStatus}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dateRange"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date Range
            </label>
            <select
              id="dateRange"
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="participantType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Participant Type
            </label>
            <select
              id="participantType"
              name="participantType"
              value={filters.participantType}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              <option value="visitor">Visitor</option>
              <option value="local-exhibitor">Local Exhibitor</option>
              <option value="international-exhibitor">
                International Exhibitor
              </option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-3" />
          <p>Loading registrations...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Results Table */}
      {!loading && !error && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("confirmationCode")}
                  >
                    <div className="flex items-center">
                      Confirmation Code
                      {sortField === "confirmationCode" && (
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("lastName")}
                  >
                    <div className="flex items-center">
                      Name
                      {sortField === "lastName" && (
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center">
                      Amount
                      {sortField === "amount" && (
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment Progress
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("paymentStatus")}
                  >
                    <div className="flex items-center">
                      Status
                      {sortField === "paymentStatus" && (
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center">
                      Date
                      {sortField === "createdAt" && (
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((registration) => (
                  <tr key={registration._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {registration.confirmationCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {registration.lastName} {registration.firstName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Intl.NumberFormat("fr-FR").format(
                        registration.amount
                      )}{" "}
                      {registration.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{
                              width: `${calculateProgress(registration)}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-500">
                          {calculateProgress(registration)}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {registration.installments?.filter(
                          (i) => i.status === "completed"
                        ).length || 0}
                        /{registration.installments?.length || 0} paid
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PaymentStatusIndicator
                        status={registration.paymentStatus}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(registration.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href={`/admin/registrations/${registration._id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}

                {registrations.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No registrations found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing page {page} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminInstallmentReport;
