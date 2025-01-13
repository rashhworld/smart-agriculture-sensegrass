// Importing necessary libraries, APIs, and components
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RiCloseLargeLine } from "react-icons/ri";

export default function FieldModal({
  isOpen,
  onClose,
  onSubmit,
  editingField,
  totalFields,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Populate form if editingField is provided, otherwise reset form
  useEffect(() => {
    if (editingField) {
      // Pre-fill form values when editing
      setValue("name", editingField.name);
      setValue("location.latitude", editingField.location.latitude);
      setValue("location.longitude", editingField.location.longitude);
      setValue("cropType", editingField.cropType);
      setValue("areaSize", editingField.areaSize);
    } else {
      // Reset form for creating a new field
      reset({
        name: "",
        location: { latitude: "", longitude: "" },
        cropType: "",
        areaSize: "",
      });
    }
  }, [editingField, setValue, reset, isOpen]);

  // Handle form submission
  const handleFormSubmit = async (data) => {
    // Check credits when adding a new field and totalFields >= 1
    if (!editingField && totalFields >= 1) {
      if (!confirm("5 credits will be charged for adding a new field. Want to proceed?")) {
        return; // Stop if user cancels
      }
    }

    await onSubmit(data); // Call onSubmit with form data
    reset(); // Reset form fields
    onClose(); // Close the modal
  };

  // Reset and close modal when cancelled
  const handleClose = () => {
    reset();
    onClose();
  };

  // Do not render anything if modal is not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50"
      onClick={handleClose} // close modal when click outside
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()} // do not close modal when click inside
        >
          <div className="flex items-center justify-between border-gray-200 pb-4 mb-3">
            <h2 className="uppercase font-semibold text-gray-900">
              {editingField ? "Edit Field data" : "Add Field Data"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-900"
            >
              <RiCloseLargeLine />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            {/* Field name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Name
              </label>
              <input
                {...register("name", { required: "Field name is required" })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-colors"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Latitude and Longitude inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  type="text"
                  {...register("location.latitude", {
                    required: "Latitude is required",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-colors"
                />
                {errors.location?.latitude && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.location.latitude.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  type="text"
                  {...register("location.longitude", {
                    required: "Longitude is required",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-colors"
                />
                {errors.location?.longitude && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.location.longitude.message}
                  </p>
                )}
              </div>
            </div>

            {/* Crop type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Crop Type
              </label>
              <input
                {...register("cropType", { required: "Crop type is required" })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-colors"
              />
              {errors.cropType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.cropType.message}
                </p>
              )}
            </div>

            {/* Area size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area Size (hectares)
              </label>
              <input
                type="number"
                step="any"
                {...register("areaSize", {
                  required: "Area size is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Area size must be positive" },
                })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-colors"
              />
              {errors.areaSize && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.areaSize.message}
                </p>
              )}
            </div>

            {/* submit and cancel button */}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {editingField ? "Update Field" : "Create Field"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
