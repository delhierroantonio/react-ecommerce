import { CircularProgress } from "@mui/material"
import './spinner.scss'

const Spinner = () => {
  return (
    <div className="spinner">
      <CircularProgress color="inherit" />
    </div>
  )
}

export default Spinner