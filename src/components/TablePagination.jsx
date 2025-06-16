import React from "react";
import { Box, Pagination } from "@mui/material";

const TablePagination = ({ count, page, onChange }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <Pagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default TablePagination;
