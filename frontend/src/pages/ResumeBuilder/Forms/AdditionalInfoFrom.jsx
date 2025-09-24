import Input from "../../../components/Input/Input";
import { LuTrash2 } from "react-icons/lu";

const AdditionalInfoForm = ({
  languages,
  interests,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Additional Info</h2>

      {/* Languages Section */}
      <div className="mt-4">
        <h3 className="font-medium text-gray-700">Languages</h3>
        {languages.map((lang, idx) => (
          <div
            key={idx}
            className="mt-2 border border-purple-200 rounded-lg p-4 bg-white shadow-sm relative flex flex-col gap-3"
          >
            {/* Delete button (absolute top-right, always visible, red) */}
            <button
              type="button"
              onClick={() => removeArrayItem("languages", idx)}
              className="absolute right-3 top-3 text-red-500 hover:text-red-700"
              title="Remove"
            >
              <LuTrash2 size={18} />
            </button>
            <div className="flex justify-between items-start gap-6">
              {/* Language Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Language
                </label>
                <Input
                  type="text"
                  placeholder="e.g. English"
                  value={lang.name}
                  onChange={(e) =>
                    updateArrayItem("languages", idx, "name", e.target.value)
                  }
                />
              </div>

              {/* Proficiency Section */}
              <div className="flex flex-col items-start min-w-[120px]">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Proficiency
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`w-5 h-5 rounded-full ${
                        lang.progress >= level
                          ? "bg-purple-500"
                          : "bg-purple-100"
                      } transition`}
                      onClick={() =>
                        updateArrayItem("languages", idx, "progress", level)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="mt-3 text-sm font-medium bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200 transition"
          onClick={() => addArrayItem("languages", { name: "", progress: 0 })}
        >
          + Add Language
        </button>
      </div>

      {/* Interests Section */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-700">Interests</h3>
        {interests.map((interest, idx) => (
          <div
            key={idx}
            className="mt-2 flex items-center gap-2 relative bg-white border border-purple-200 rounded-lg p-4 shadow-sm"
          >
            {/* Delete button (absolute top-right, always visible, red) */}
            <button
              type="button"
              onClick={() => removeArrayItem("interests", idx)}
              className="absolute right-3 top-3 text-red-500 hover:text-red-700"
              title="Remove"
            >
              <LuTrash2 size={18} />
            </button>
            <Input
              type="text"
              placeholder="e.g. Reading"
              value={interest}
              onChange={(e) =>
                updateArrayItem("interests", idx, null, e.target.value)
              }
              className="w-full"
            />
          </div>
        ))}

        <button
          type="button"
          className="mt-3 text-sm font-medium bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200 transition"
          onClick={() => addArrayItem("interests", "")}
        >
          + Add Interest
        </button>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
