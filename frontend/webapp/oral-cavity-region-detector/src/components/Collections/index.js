import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'
import GetImg from './GetImg'
import ShowCase from '../ShowCase'
import Stack from '@mui/material/Stack';

import {Wrapper, Section, Grid} from './Collections.styles'

import ResearcherNavbar from '../ResearcherNavbar'
import {LinearColor, IconLabelButtons,OutlinedLightButton} from '../Buttons'

const Collection = ({setData, setState}) => {
  const [files, setFiles] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [userinfo, setUserInfo] = useState({
    images: [],
  });

  const navigate = useNavigate();

  const handleClear = () =>{
    setUserInfo({images: []})
    setFiles([])
  }

  const handleNavigate = ()=>{
    var dataArray = []
    for(let i=0; i<userinfo.images.length;i++){
      dataArray.push(files.filter(function(item) { return item._id === userinfo.images[i]; }))
    }
    setData(dataArray);
    setState(true);
  }

  const handleCheckbox = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { images } = userinfo;
     
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        images: [...images, value]
      });
    }
  
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        images: images.filter((e) => e !== value)
      });
    }
  };

  return (
    <>
    <ResearcherNavbar/>
    <Wrapper>
      <Section style={{borderRight: "2px solid #D3D3D3"}}>
        {isFetching?<LinearColor/>: 
        <Stack spacing={2} direction="row">
        <IconLabelButtons label={`Load ( ${userinfo.images.length} ) Images`} disabled={userinfo.images.length==0} onClick={handleNavigate}/>
        <OutlinedLightButton variant="outlined" onClick={handleClear}>Clear</OutlinedLightButton> 
        </Stack>  
        }  
        <br/> 
        {files.length !== 0? <Grid>{files.map((image, index) =>{
            return (
            <ShowCase 
            key={index} 
            details={image} 
            handleCheckbox={handleCheckbox} 
            userInfo={userinfo}
            />)
        })}
        </Grid>:
        <div style={{height:'80%' , display: "flex", justifyContent: "center", alignItems: "center", color: "#D3D3D3"}}>No images available</div>}
        
      </Section>
      <Section style={{minHeight:"100vh"}}>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="selectpatient-tab" data-bs-toggle="tab" data-bs-target="#selectpatient" type="button" role="tab" aria-controls="selectpatient" aria-selected="true">Filter</button>
      </li>
      </ul>
      <br/>
      <div className="tab-content" id="myTabContent" style={{display: 'flex', justifyContent: 'center'}}>
      <div className="tab-pane fade show active" id="selectpatient" role="tabpanel" aria-labelledby="selectpatient-tab">
        <GetImg setFiles={setFiles} setIsFetching={setIsFetching}/>
      </div>
      </div>
      </Section>
    </Wrapper>
    </>    
  )
}

export default Collection