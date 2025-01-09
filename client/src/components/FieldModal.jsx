import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FieldModal({
  isOpen,
  onClose,
  onSubmit,
  editingField,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editingField) {
      setValue("name", editingField.name);
      setValue("location.latitude", editingField.location.latitude);
      setValue("location.longitude", editingField.location.longitude);
      setValue("cropType", editingField.cropType);
      setValue("areaSize", editingField.areaSize);
    } else {
      reset({
        name: "",
        location: { latitude: "", longitude: "" },
        cropType: "",
        areaSize: "",
      });
    }
  }, [editingField, setValue, reset, isOpen]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between border-gray-200 pb-4 mb-3">
            <h2 className="uppercase font-semibold text-gray-900">
              {editingField ? "Edit Field data" : "Add Field Data"}
            </h2>
            <button
              onClick={handleClose}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
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
