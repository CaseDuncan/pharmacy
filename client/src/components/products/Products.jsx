import React,{useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import DataTable from "../../common/DataTable/DataTable";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Product Name", width: 150 },
  { field: "price", headerName: "Price", width: 150 },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 150,
  },
  {
    field: "instock",
    headerName: "Instock",
    width: 150,
  },
  {
    field: "batch_no",
    headerName: "Batch Number",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    name: "Paracitamol",
    price: 50,
    quantity: 100,
    instock: 30,
    batch_no: "B243",
    category: "Painekillers"
  },
  {
    id: 2,
    name: "P2",
    price: 50,
    quantity: 100,
    instock: 30,
    batch_no: "B243",
    category: "Contraceptives",
  },
  {
    id: 3,
    name: "amoxicillin",
    price: 50,
    quantity: 100,
    instock: 30,
    batch_no: "B243",
    category: "Antimalarial",
  },
  {
    id: 4,
    name: "Panadol",
    price: 50,
    quantity: 100,
    instock: 30,
    batch_no: "B243",
    category: "Painekillers"
  },
  {
    id: 5,
    name: "Chloroquine",
    price: 50,
    quantity: 100,
    instock: 30,
    batch_no: "B243",
    category: "Painekillers",
  },
  {
    id: 6,
    name: "Paracitamol",
    price: 50,
    quantity: 100,
    instock: 30,
    batch_no: "B243",
    category: "Painekillers"
  },
];
const Products = () => {
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
    <div
      style={{ height: 400, width: "100%", marginLeft: 30 }}
      className="container mt-5"
    >
      <div className="row">
        <div className="col-md-6">
          <h3>Products</h3>
        </div>
        <div className="col-md-6">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#productModal"
          >
            Add
          </button>
        </div>
      </div>
      <div class="modal mt-5 fade" id="productModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title my-3">Add Product</h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div class="modal-body">
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoFocus
                          name="name"
                          label="Product Name"
                          required
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="price"
                          label="Price"
                          required
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="quantity"
                          label="Quantity"
                          required
                          autoomplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="instock"
                          label="Instock"
                          required
                          autoomplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="batch_no"
                          label="Batch Number"
                          required
                          autoomplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          variant="filled"
                          sx={{ m: 1, minWidth: 120 }}
                        >
                          <InputLabel id="demo-simple-select-filled-label">
                            Category
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Antimalarial</MenuItem>
                            <MenuItem value={20}>Painkillers</MenuItem>
                            <MenuItem value={30}>Contraceptives</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
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
      <DataTable
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};
export default Products;
