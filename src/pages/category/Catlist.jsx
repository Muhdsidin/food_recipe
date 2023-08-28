import React, { useEffect } from 'react'
import {useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {Link} from "react-router-dom"

function Catlist() {
    const [data , setData] = useState([])
    const {name} = useParams()
   
    const fetchCatMeals = async ()=>{
        const response = await axios(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
        console.log(response.data.meals)
        setData(response.data.meals)
    }

    useEffect(()=>{
        fetchCatMeals()
    },[])
  return (
    <Container>
        <Row>
            {data.map((val)=>(
 <Col md={3} style={{ marginLeft: "5%", marginBottom: "20px", marginTop: "10%" }} key={val.strMealThumb}>
 <Card style={{ width: "18rem", marginLeft: "15px" }}>
   <Card.Img variant="top" src={val.strMealThumb} />
   <Card.Body>
     <Card.Title>{val.strMeal}</Card.Title>
     <Button variant="primary"><Link to={`/meals/${val.idMeal}`} style={{color:"white"}}>Meals Details</Link></Button>
   </Card.Body>
 </Card>
</Col>
            ))}
       
        </Row>
    </Container>
  )
}

export default Catlist
