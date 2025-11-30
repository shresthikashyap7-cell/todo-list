import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "../lib/axios";
import { Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { Note } from "../types";
import { showSuccess, showError } from "../utils/toast";

const NoteForm = () => {
  const [note, setNote] = useState<Note | null>(null);
  const { id } = useParams();
  const isEditMode = !!id;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const fetchNote = async () => {
      try {
        const response = await axiosInstance.get(`/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched note:", response.data);
        setNote(response.data.note);
      } catch (error) {
        console.error("Error fetching note:", error);
        showError("Failed to load note");
      }
    };

    fetchNote();
  }, [id, isEditMode, token]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      status: note?.status || "pending",
      title: note?.title || "",
      description: note?.description || "",
    },
    onSubmit: async (values) => {
      try {
        if (isEditMode) {
          await axiosInstance.put(
            `/notes/${id}`,
            {
              title: values.title,
              description: values.description,
              status: values.status,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          showSuccess("Note updated successfully!");
        } else {
          await axiosInstance.post(
            "/notes",
            {
              title: values.title,
              description: values.description,
              status: values.status,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          showSuccess("Note created successfully!");
        }

        navigate("/notes");
      } catch (error) {
        console.error("Submit error:", error);
        showError(`Failed to ${isEditMode ? "update" : "create"} note`);
      }
    },
  });

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSuccess("Note deleted successfully!");
      navigate("/notes");
    } catch (error) {
      console.error("Delete error:", error);
      showError("Failed to delete note");
    }
  };

  const toggleStatus = () => {
    formik.setFieldValue(
      "status",
      formik.values.status === "pending" ? "complete" : "pending"
    );
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center gap-2">
              <label
                htmlFor="status"
                className="text-white text-lg font-semibold"
              >
                FINISH
              </label>
              <button
                type="button"
                onClick={toggleStatus}
                className={`rounded-full p-2 transition-colors ${
                  formik.values.status === "complete"
                    ? "bg-green-500"
                    : "bg-white"
                }`}
              >
                <Check
                  size={38}
                  className={
                    formik.values.status === "complete"
                      ? "text-white"
                      : "text-gray-800"
                  }
                />
              </button>
            </div>

            <div className="space-y-2 flex-1">
              <label
                htmlFor="title"
                className="block text-white text-lg font-semibold"
              >
                TITLE
              </label>
              <input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                required
                className="w-full px-4 py-3 rounded-lg text-black bg-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="TODO TITLE"
              />
            </div>
          </div>

          <div className="sm:ml-20 space-y-2">
            <label
              htmlFor="description"
              className="block text-white text-lg font-semibold"
            >
              DESCRIPTION
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              required
              rows={8}
              className="w-full px-4 py-3 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter your description here..."
            />
          </div>

          <div className="sm:ml-20 space-y-4 pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditMode ? "UPDATE" : "CREATE"}
            </button>

            {isEditMode && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full bg-red-500 text-white text-lg font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                DELETE
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
