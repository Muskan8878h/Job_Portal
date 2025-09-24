import Input from "../../../components/Input/Input";
import { LuTrash2, LuPlus } from "react-icons/lu";

const CertificationInfoForm = ({ certifications, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return <div className='px-5 pt-5'>
    <h2 className='text-lg font-semibold text-gray-900'>Certifications</h2>

    <div className='mt-4 flex flex-col gap-4 mb-3'>
      {certifications.map((cert, index) => (
        <div key={index}
        className='border border-gray-200/80 p-4 rounded-lg relative'
        >

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            
                <Input
                  label="Certificate Title"
                  placeholder="Full Stack Web Development"
                  type="text"
                  value={cert.title || ""}
                  onChange={({ target }) => updateArrayItem(index, "title", target.value)}
                />
                <Input
                  label="issuer"
                  placeholder="Coursera/ Google / etc."
                  type="text"
                  value={cert.issuer || ""}
                  onChange={({ target }) => updateArrayItem(index, "issuer", target.value)}
                />

                <Input
                  label="Year"
                  placeholder="2024"
                  type="text"
                  value={cert.year || ""}
                  onChange={({ target }) => updateArrayItem(index, "year", target.value)}
                  />
                  </div>

          {certifications.length > 1 &&  (
            <button
              type='button'
              className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer'
              onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 className='' />
              </button>
          )}
          </div>
      ))}

      <button
        type='button'
        className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer'
        onClick={() => 
          addArrayItem({
            title: "",
            issuer: "",
            year: "",
          })
        }
        >
          <LuPlus className='' /> Add Certification
        </button>
    </div>
  </div>
}

export default CertificationInfoForm