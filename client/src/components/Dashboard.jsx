// Importing necessary libraries, APIs, and components
import { useState, useEffect } from "react";
import {
  createField,
  getFields,
  updateField,
  deleteField,
} from "../apis/field";
import Navbar from "./Navbar";
import FieldModal from "./FieldModal";
import AIInsights from "./AIInsights";
import CreditsModal from "./CreditsModal";
import { getUserCredits } from "../apis/auth";

import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdGrass } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { GiHighGrass } from "react-icons/gi";
import { IoMapOutline } from "react-icons/io5";
import { PiSpinner } from "react-icons/pi";

export default function Dashboard() {
  const [fields, setFields] = useState([]); // List of fields
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle field modal
  const [editingField, setEditingField] = useState(null); // Field being edited
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false); // State to toggle credits modal
  const [userCredits, setUserCredits] = useState(0); // User's available credits
  const [isLoading, setLoading] = useState(false); // Loading state for fetching data

  // Function to fetch all fields from the API
  const loadFields = async () => {
    try {
      setLoading(true); // Set loading state to true
      const response = await getFields(); // API call to fetch fields
      setFields(response.fields); // Update fields state
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to handle field creation or update
  const handleSubmit = async (data) => {
    editingField
      ? await updateField(editingField._id, data) // API call to update existing field data
      : await createField(data); // API call to create new field data
    loadUserCredits(); // Refresh user credits
    loadFields(); // Reload fields data
  };

  // Function to handle editing of a field
  const handleEdit = (field) => {
    setEditingField(field); // Set field to edit
    setIsModalOpen(true); // Open the field modal
  };

  // Function to handle deletion of a field
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this field?")) {
      await deleteField(id); // API call to delete the field
      loadFields(); // Reload fields data
    }
  };

  // Function to close the field modal and reset editing state
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setEditingField(null); // Clear editing state
  };

  // Function to fetch the user's current credit balance
  const loadUserCredits = async () => {
    const { credits } = await getUserCredits(); // API call to fetch user credits
    setUserCredits(credits); // Update credits state
  };

  // Fetch fields and user credits on component mount
  useEffect(() => {
    loadFields();
    loadUserCredits();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar displaying total fields and user credits */}
      <Navbar
        totalFields={fields.length}
        userCredits={userCredits}
        onOpenCreditsModal={() => setIsCreditsModalOpen(true)} // Open credits modal
        onOpenFieldModal={() => setIsModalOpen(true)} // Open field modal
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Display loading state or empty state if no fields */}
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
            {isLoading ? (
              <PiSpinner className="animate-spin h-7 w-7" />
            ) : (
              <MdGrass className="h-12 w-12 text-gray-500" />
            )}
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {isLoading ? "Fetching fields data" : "No fields data found"}
            </h3>
            {!isLoading && (
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new field.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {/* Render each field */}
            {fields.map((field) => (
              <div
                key={field._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {/* Field details */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {field.name}
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <GiHighGrass />
                          {field.cropType}
                        </span>
                        <span className="flex items-center gap-1">
                          <IoMapOutline />
                          {field.areaSize} hectares
                        </span>
                        <span className="flex items-center gap-1">
                          <GrLocation />
                          {field.location.latitude}, {field.location.longitude}
                        </span>
                      </div>
                    </div>
                    {/* Action buttons for editing or deleting a field */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(field)} // Open edit modal
                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <FaRegPenToSquare />
                      </button>
                      <button
                        onClick={() => handleDelete(field._id)} // Delete field
                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </div>
                  {/* AI insights for the field */}
                  <AIInsights fieldId={field._id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for creating/editing fields */}
      <FieldModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editingField={editingField}
        totalFields={fields.length}
      />

      {/* Modal for managing user credits */}
      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        onSuccess={loadUserCredits} // Reload credits after a successful operation
      />
    </div>
  );
}
