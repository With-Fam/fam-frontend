import { Loading } from '@/components/shared'

const UploadProgress = ({ progress }: any) => (
  <>
    <div className="mb-1 text-base font-medium text-gray-400">
      Upload progress {progress}%
    </div>

    <Loading size={20} />
  </>
)

export default UploadProgress
