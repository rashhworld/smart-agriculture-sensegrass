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
import { TbDatabaseX } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { GiHighGrass } from "react-icons/gi";
import { IoMapOutline } from "react-icons/io5";

export default function Dashboard() {
  const [fields, setFields] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [userCredits, setUserCredits] = useState(0);

  const loadFields = async () => {
    const response = await getFields();
    setFields(response.fields);
  };

  const handleSubmit = async (data) => {
    if (editingField) await updateField(editingField._id, data);
    else await createField(data);
    loadFields();
    loadUserCredits();
  };

  const handleEdit = (field) => {
    setEditingField(field);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this field?")) {
      await deleteField(id);
      loadFields();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingField(null);
  };

  const loadUserCredits = async () => {
    const { credits } = await getUserCredits();
    setUserCredits(credits);
  };

  useEffect(() => {
    loadFields();
    loadUserCredits();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        totalFields={fields.length}
        userCredits={userCredits}
        onOpenCreditsModal={() => setIsCreditsModalOpen(true)}
        onOpenFieldModal={() => setIsModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
            <TbDatabaseX className="h-12 w-12 text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No fields data found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new field.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {fields.map((field) => (
              <div
                key={field._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
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
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(field)}
                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <FaRegPenToSquare />
                      </button>
                      <button
                        onClick={() => handleDelete(field._id)}
                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </div>
                  <AIInsights fieldId={field._id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FieldModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editingField={editingField}
        totalFields={fields.length}
      />

      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        onSuccess={loadUserCredits}
      />
    </div>
  );
}
