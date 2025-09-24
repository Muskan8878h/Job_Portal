const WorkExperience = ({ company, role, duration, durationColor, description }) => {
  return (
    <div className='mb-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-[15px] font-semibold text-gray-900'>{company}</h3>
        <p className='text-[13px] text-gray-700 font-medium' style={{ color: durationColor }}>
          {duration}
        </p>
      </div>

      <p className='text-[14px] text-gray-600 font-medium mt-1'>{role}</p>

      <p className='text-sm text-gray-600 font-medium italic mt-1'>{description}</p>
    </div>
  )
}

export default WorkExperience
