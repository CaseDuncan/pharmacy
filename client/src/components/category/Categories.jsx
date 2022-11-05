import React,{useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';


const columns = [
    {
        field: 'id',
        headerName: "Category ID",
        width:150
    },
    {
        field: 'name',
        headerName: 'Category Name',
        width:150
    },
    {
        field: 'description',
        headerName: 'Description',
        width:300
    },
    {
        field: 'created_at',
        headerName: 'Date Created',
        width:180
    }
]
//fetch existing categories from the database
const Categories = () => {

    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        name:''
      })
      let navigate = useNavigate()
    
    useEffect(() => {
        fetch(' http://127.0.0.1:8000/api/categories/')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            setCategories(data.data)
            })
            .catch((error) => {
            console.log(error.message)
        })
    }, [])
    
    // add categories
    
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
    <div style={{ height: 400, width: "100%" }} className="mt-5">
      <div className="row">
        <div className="col-md-6">
          <h3>Product Categories</h3>
        </div>
        <div className="col-md-6">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#categoryModal"
          >
            Add
          </button>
        </div>
      </div>

      <div class="modal mt-5 fade" id="categoryModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Add Category</h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div class="modal-body">
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
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
                      onChange={(e) => handleChange(e)}
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

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <DataGrid
        rows={categories}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        loading={!categories.length}
      />
    </div>
  );
}

export default Categories

