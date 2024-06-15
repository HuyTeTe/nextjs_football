import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function BotPagination(props) {
  return (
    <Stack spacing={2} className="bg-white p-2 align-items-center rounded-pill">
        <Pagination disabled = {(props.canFilter)? false : true}
        count={500} variant="outlined"
        siblingCount={3} boundaryCount={2}
        color="primary" size="small"
        onChange={(e, value) => props.setPage(value)} />
    </Stack>
  );
}

export default BotPagination;
