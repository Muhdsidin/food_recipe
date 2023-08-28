import axios from "axios";
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./Home.css"
import {Link} from "react-router-dom"

function Home() {
  const [input, setInput] = useState("");
  const [meals, setMeals] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // Updated state name

  const HandleSearch = (event) => {
    setInput(event.target.value);
  }

  const SearchByName = async () => { // Removed the unnecessary 'e' parameter
    const options = {
      method: "GET",
      url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`,
    };

    try {
      const response = await axios.request(options);
      setSearchResults(response.data.meals); // Updated state name
    } catch (error) {
      console.error(error);
    }
  };

  const FetchCategory = async () => { // Corrected function name
    const response = await axios("https://www.themealdb.com/api/json/v1/1/search.php?f=c");
    setMeals(response.data.meals);
    console.log(response.data)
  }

  useEffect(() => {
    FetchCategory();
  }, []);

  return (
    <Container className="mt-5 m-3">
      <input
        id="user-input"
        type="text"
        placeholder="Type here to search..."
        value={input} // Added value prop
        onChange={HandleSearch}
      />
      <FiSearch
        className="icon"
        style={{ fontSize: "30px", marginLeft: "10px", color:"white" , cursor:"pointer" }}
        onClick={SearchByName}
      />
      <Row>
        {input === "" // Render meals if no input, or if searchResults are available
          ? meals.map((val) => (
              <Col md={3} style={{ marginLeft: "5%", marginBottom: "20px", marginTop: "10%" }}>
                <Card style={{ width: "18rem", marginLeft: "15px" }}>
                  <Card.Img variant="top" src={val.strMealThumb} />
                  <Card.Body>
                    <Card.Title>{val.strMeal}</Card.Title>
                    <Button variant="primary"><Link to={`/meals/${val.idMeal}`} style={{color:"white"}}>Meals Details</Link></Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
            
            :
            searchResults === null? <div>cannot find</div>
          : searchResults.map((val) => (
              <Col md={3} style={{ marginLeft: "5%", marginBottom: "20px", marginTop: "10%" }}>
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
  );
}

export default Home;
