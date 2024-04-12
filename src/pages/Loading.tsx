import { CircularProgress } from "@mui/material"

const Loading = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <CircularProgress />
    </div>
  )
}

export default Loading