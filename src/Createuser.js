import { Button, Container } from "@mui/material";
import { useState } from "react";
import InputBase from '@mui/material/InputBase';
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";




const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red"
    },
    "&:hover fieldset": {
      borderColor: "yellow"
    },
    "&.Mui-focused fieldset": {
      borderColor: "green"
    }
  }
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3)
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow"
    ]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}));

const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow"
    ]),
    "&:hover": {
      backgroundColor: "transparent"
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    }
  }
}));

const ValidationTextField = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "green",
    borderWidth: 2
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important" 
  }
});
let emptyForm = {
 name: "",
    avatar: "",
    role: "",
    city: "",
    company: ""}

export default function CreateUser() {
  const [creationForm, setCreationForm] = useState(emptyForm);

  const navigate = useNavigate();
  const {id, isView} = useParams();
 
const handleSubmit = () =>{
if(id){
  fetch('https://63969cb3a68e43e418074793.mockapi.io/userdata/'+id,{
    method: 'PUT',
    headers: {
      'Content-Type' : "application/json"
    },
    body: JSON.stringify(creationForm)

  }).then(data=>console.log(data)).then(res=> {
    setCreationForm(emptyForm);
    navigate(-1);
  });

} 
 else{
   fetch('https://63969cb3a68e43e418074793.mockapi.io/userdata',{
    method: 'POST',
    headers: {
      'Content-Type' : "application/json"
    },
    body: JSON.stringify(creationForm)

  }).then(data=>console.log(data)).then(res=> {
    setCreationForm(emptyForm);
    navigate(-1);
    });

}
}
React.useEffect(()=>{
  console.log(id)
  if(id){
    fetch("https://63969cb3a68e43e418074793.mockapi.io/userdata/"+ id)
      .then((data) => data.json())
      .then((res) => setCreationForm(res));
  }
} , [id])

  const handleChange = (e) =>{
    setCreationForm ({...creationForm, [e.target.name]: e.target.value})
  }



  
  return (
   <Container>
    <Box
      component="form"
      noValidate
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "1fr 1fr" },
        gap: 5,
        mt:'1cm', 
        ml: '10cm'
      
      }}
    >
      <CssTextField sx={{width: '15cm'}} className="imageurl" disabled={isView==='true' ? true : false}name="avatar" value={creationForm.avatar}  onChange = {handleChange} label="Image URL" id="Image-url-outlined-input" /><br></br>
      <CssTextField className="namefield"disabled={isView==='true' ? true : false} name="name" value={creationForm.name} onChange = {handleChange} label="Name" id="name-outlined-input" required /><br></br>
      <CssTextField className="rolefield" disabled={isView==='true' ? true : false}name="role" value={creationForm.role} onChange = {handleChange} label="Role" id="role-outlined-input" required /><br></br>
      <CssTextField className="company"disabled={isView==='true' ? true : false} name="company" value={creationForm.company} onChange = {handleChange} label="Company" id="companyoutlined-input" required /><br></br>
      <CssTextField className="city" disabled={isView==='true' ? true : false}name="city" value={creationForm.city} onChange = {handleChange} label="City" id="city-outlined-input"  /><br></br>
      <div><Button onClick = {handleSubmit} sx={{background: '#000000', color: '#FF4500', fontSize: '18px', ml:'3cm'}} disabled={isView==='true' ? true : false}className="Submit" variant="outlined" color="warning" >Submit</Button>
      <Button onClick = {()=>navigate(-1)} sx={{background: '#000000', color: '#FF4500',fontSize: '18px', ml:'3cm'}}className="Submit" variant="outlined" color="warning" >Cancel</Button></div>
     
    </Box>
    
    </Container>
  );
}
