import React,{useState} from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
// import FormControlLabel from '@mui/material/FormControlLabel';

const Register = () => {

    // http://127.0.0.1:8000
   
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        role:'',
        username:''
    })


    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(formData)
        createUser(formData)
    }

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    const createUser = (data) => {
        fetch('/api/users/register/', {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then((res)=>res.json())
            .then((data) => {
                setFormData('')
                console.log(data)
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="off"
                  value={formData.username}
                  onChange={(e)=>handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  value={formData.first_name}
                  onChange={(e)=>handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  value={formData.last_name}
                  onChange={(e)=>handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={(e)=>handleChange(e)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="role"
                  label="Role"
                  type="text"
                  id="role"
                  autoComplete="off"
                  value={formData.role}
                  onChange={(e)=>handleChange(e)}
                />
              </Grid>           
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={formData.password}
                  onChange={(e)=>handleChange(e)}
                />
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
      </div>
  )
}

export default Register