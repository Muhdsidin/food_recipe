import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Toast } from "bootstrap";
import "./Meal.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Meal() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const user = localStorage.getItem("token");

  const fetchMealDetails = async () => {
    const response = await axios(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    console.log(response.data.meals);
    setData(response.data.meals);
  };
  console.log(id);

  useEffect(() => {
    fetchMealDetails();
  }, []);

  function Toggle() {
    setError((prev) => setError(!prev));
  }
  console.log(error);
  console.log(user);

  const AddToFav = async (MealId) => {
    const newData = {
      favMeal: [],
    };

    newData.favMeal.push(MealId)
    try {
      const document = doc(db, "user", user);
      await updateDoc(document, newData);
      console.log("success");
      toast.success('Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
        });
    } catch (error) {
      console.log(`error : ${error}`);
    }
  };

  console.log(data);
  return (
    <Container className="mt-4">
      <Row>
        {data.map((val) => (
          <div style={{ display: "flex" }}>
            <Col>
              <img
                src={val.strMealThumb}
                alt=""
                style={{ width: "90%", height: "90%" }}
              />
            </Col>

            <Col style={{ width: "50%", height: "50%" }}>
              <div>
                <h5 className="p-1" style={{ fontStyle: "sans-sarif" }}>
                  Dish :{val.strMeal}
                </h5>
                <br />
                <p>Tag : {val.strTags}</p>
              </div>

              <button onClick={Toggle} className="btn btn-primary">
                CLICK TO INSTRUCTION
              </button>

              {error ? (
                <div className="int">
                  <p className="p">{val.strInstructions}</p>
                </div>
              ) : null}

              <button
                className="btn btn-success m-lg-3 mt-1"
                onClick={() => AddToFav(val.idMeal)}
              >
                ADD TO FAVRATE
              </button>
            </Col>
          </div>
        ))}
        <ToastContainer
       
        />
      </Row>
    </Container>
  );
}

export default Meal;
