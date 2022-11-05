import React,{useEffect, useState} from 'react'
import DataTable from '../../common/DataTable/DataTable'


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
        field: 'date',
        headerName: 'Date Created',
        width:150
    }
]
const Categories = () => {

    const [categories, setCategories] = useState({})
    
    useEffect(() => {
        fetch(' http://127.0.0.1:8000/api/categories/')
            .then((res) => res.json())
            .then((data) => {
            setCategories(data)
            })
            .catch((error) => {
            console.log(error.message)
        })
    },[])
  return (
      <div>
          <DataTable
              rows={categories}
              columns={columns}
              loading={!categories.length}
          />
    </div>
  )
}

export default Categories