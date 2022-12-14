import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import AddBoxRounded from '@mui/icons-material/AddBoxRounded';
import { Route, Routes } from "react-router-dom";
import CreateUser from "./Createuser";
import { useNavigate} from "react-router-dom";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { AppBar, Button } from "@mui/material";
import {  red, deepOrange } from "@mui/material/colors";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Avatar from '@mui/material/Avatar';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },

  "&:last-child td, &:last-child th": {
    border: 0
  }
}));



export default function CustomizedTables() {
  const [userData, setUserData] = useState([]);

  

  const printUserData = () => {
    fetch("https://63969cb3a68e43e418074793.mockapi.io/userdata")
      .then((data) => data.json())
      .then((res) => setUserData(res));
  };
  useEffect(() => {
    printUserData();
  }, []);
  const navigate = useNavigate();


  const handleChange = () => {
    navigate("/Createuser");
  };
 

  const handleDelete= (id)=>{

    fetch("https://63969cb3a68e43e418074793.mockapi.io/userdata/" + id,{
      method: 'DELETE'
    })
      .then((data) => data.json())
      .then((res) => {
      printUserData()
     });
  };
 

  return (
    <>
    
     <IconButton onClick={handleChange} sx={{ color: deepOrange[500], mb: '20px' }} aria-label="Creat User">
  <AddBoxRounded /> Create User
</IconButton>

    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 1370, minHeight: 600 }}
        aria-label="customized table"
      >
        <TableHead >
          <TableRow >
            <StyledTableCell style={{color: '#FF4500', fontSize:'20px'}} align="center">Image</StyledTableCell>
            <StyledTableCell style={{color: '#FF4500', fontSize:'20px'}} align="center">Name</StyledTableCell>
            <StyledTableCell style={{color: '#FF4500', fontSize:'20px'}} align="center">Role</StyledTableCell>
            <StyledTableCell style={{color: '#FF4500', fontSize:'20px'}} align="center">Company</StyledTableCell>
            <StyledTableCell style={{color: '#FF4500', fontSize:'20px'}} align="center">City</StyledTableCell>
            <StyledTableCell style={{color: '#FF4500', fontSize:'20px'}} align="center">Edit</StyledTableCell>
            <StyledTableCell style={{color: '#FF4500', fontSize:'20px'}} align="center">View</StyledTableCell>
            <StyledTableCell style={{color: '#FF4500', fontSize:'20px'}} align="center">Delete</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((data) => (
            <StyledTableRow key={data.id}>
              <StyledTableCell align="center" component="th" scope="row">
                <Avatar sx={{ width: 70, height: 70}}  className="userimg" src={data.avatar} alt="Loading..."/>;
              </StyledTableCell>
              <StyledTableCell style={{ fontSize:'18px'}} align="center">{data.name}</StyledTableCell>
              <StyledTableCell style={{ fontSize:'18px'}} align="center">{data.role}</StyledTableCell>
              <StyledTableCell style={{ fontSize:'18px'}} align="center">{data.company}</StyledTableCell>
              <StyledTableCell style={{ fontSize:'18px'}} align="center">{data.city}</StyledTableCell>
               <StyledTableCell style={{ fontSize:'18px'}} align="center"><Button onClick={()=>navigate(`/Createuser/${data.id}/false`)}>< CreateRoundedIcon sx={{ color: deepOrange[400] }} /></Button></StyledTableCell>
               <StyledTableCell style={{ fontSize:'18px'}} align="center"><Button  onClick={()=>navigate(`/Createuser/${data.id}/true`)}>< VisibilityRoundedIcon sx={{ color: deepOrange[300] }} /></Button></StyledTableCell>
               <StyledTableCell style={{ fontSize:'18px'}} align="center"><Button onClick={()=>handleDelete(data.id)}>< DeleteRoundedIcon sx={{ color: red[500] }} /></Button></StyledTableCell>


            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Routes>
          <Route path="*" element={<AppBar />} />;
          <Route path="/Createuser" element={<CreateUser />} />;
          <Route path="/Createuser/:id/:isView" element={<CreateUser />} />;
        </Routes>
    </TableContainer>
    </>
  );
}
