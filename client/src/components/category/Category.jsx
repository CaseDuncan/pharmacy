import React,{useState} from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

const Category = () => {

  const [formData, setFormData] = useState({
    name:''
  })
  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addCategory(formData)
  }
  // sudo fuser -k 8000/tcp

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const addCategory = (data) => {
    fetch(' http://127.0.0.1:8000/api/categoriess/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      setFormData('')
      })
      .catch((error) => {
      console.log(error.message)
    })
  }
  return (
    <div>
    <Container component="main" maxWidth="xs">
     <CssBaseline />
     <Box
       sx={{
         marginTop: 8,
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
       }}
     >
       
       <Typography component="h1" variant="h5">
        Add Category
       </Typography>
       <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
         <TextField
           margin="normal"
           required
           fullWidth
           id="name"
           label="Category Name"
           name="name"
           autoComplete="off"
           autoFocus
           value={formData.name}
           onChange={(e)=>handleChange(e)}
         />
         
         <Button
           type="submit"
           fullWidth
           variant="contained"
           sx={{ mt: 3, mb: 2 }}
         >
           Create
         </Button>
       </Box>
     </Box>
   </Container>
 </div>
  )
}

export default Category