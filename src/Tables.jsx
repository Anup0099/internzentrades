import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Tables = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://s3.amazonaws.com/open-to-cors/assignment.json")
      .then((response) => {
        const data = response.data.products;
        const result = Object.keys(data).map((key) => {
          return { id: key, ...data[key] };
        });
        console.log(result)
        const sortedResult = result.sort(
          (a, b) => parseInt(b.popularity) - parseInt(a.popularity)
        );
        setProducts(sortedResult);
      });
  }, []);
  return (
    <Box className="h-screen w-full flex  items-center">
      <DataGrid
        rows={products}
        columns={[
          { field: "id", headerName: "ID", width: 70, flex: 1 },
          {
            field: "subcategory",
            headerName: "Subcategory",
            width: 130,
            flex: 1,
          },
          { field: "title", headerName: "Title", width: 150, flex: 1 },
          { field: "price", headerName: "Price", width: 130, flex: 1 },
          {
            field: "popularity",
            headerName: "Popularity",
            width: 130,
            flex: 1,
          },
        ]}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableRowSelectionOnClick
        className="w-1/2"
      />
    </Box>
  );
};

export default Tables;
