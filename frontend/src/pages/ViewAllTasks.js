import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { DataGrid } from '@mui/x-data-grid';
import {
    Box, Paper
} from '@mui/material';
import axios from 'axios';
import FormDialogDeleteUser from "../components/DeleteDialog";
import FormDialogEditUser from "../components/EditDialog";
import FormDialogAddUser from "../components/AddDialog";

const ViewAllTasks = () => {
    const [tasksData, setTasksData] = React.useState([]);
    const [getData,setGetData] = React.useState(false);
    useEffect(() => {
        const token = localStorage.getItem('mypegtoken')
        axios.get('http://localhost:5000/tasks/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                setTasksData(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }, [getData]);

    const filteredRows = tasksData.map(row => ({
        id: row._id,
        description: row.description,
        completed: row.completed,
        owner: row.owner,
    }));

    const refresh = async () => {
        setGetData(!getData);
    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        //Temporary trick to shift first column to right
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
        },
        {
            field: 'completed',
            headerName: 'Completed Status',
            flex: 1,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) =>
            (<div style={{"width":"20rem","display":"flex"}}>
                <FormDialogEditUser
                    description = {params.row.description}
                    completed = {params.row.completed}
                    taskid = {params.row.id}
                    refresh={refresh}
                />
                <FormDialogDeleteUser
                    taskid = {params.row.id}
                    // delete={props.delete}
                    refresh={refresh}
                />
            </div>
            )
        },
    ];

    return (
        <Layout>
            <FormDialogAddUser component={Paper}
                // create={props.create}
                refresh={refresh}
                />
            <Box sx={{ overflowX: "hidden" }}>
                <DataGrid
                    sx={{
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                            outline: "none !important",
                        },
                        "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
                        {
                            outline: "none !important",
                        },
                        '& .MuiDataGrid-virtualScroller': {
                            overflowX: 'hidden',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'rgba(242,242,242)',
                            fontWeight: 'bold',
                        }
                    }}
                    autoHeight={true}
                    rows={filteredRows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 8,
                            },
                        },
                    }}
                    pageSizeOptions={[8, 10, 20]}
                    disableRowSelectionOnClick
                    rowHeight={61}
                />
            </Box>
        </Layout>

    )
}

export default ViewAllTasks;