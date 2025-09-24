import { Briefcase } from "lucide-react"

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center h-screen w-full bg-gray-50 flex-col gap-4">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute text-blue-600">
          <Briefcase className="w-8 h-8" />
        </div>
      </div>

      <p className="text-lg font-medium text-gray-600 animate-pulse">
        Finding amazing opportunities...
      </p>
    </div>
  )
}

export default LoadingSpinner