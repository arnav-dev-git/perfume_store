import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
// import products from "../products";
import { useEffect } from "react";
import axios from "axios";

const ProductScreen = ({ match }) => {
  // const product = products.find((product) => product._id === match.params.id);

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [match]);

  return (
    <>
      <Link to="/" className="btn btn-primary my-3">
        GO BACK
      </Link>
      <Row>
        <Col md={6}>
          <div className="jumbotron">
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{
                borderRadius: "555px 25px 15px 25px/35px 50px 35px 655px",
              }}
            />
          </div>
        </Col>
        <Col md={3}>
          <ListGroup
            variant="flush"
            // style={{ borderColor: "rgba(255,255,255,0)" }}
          >
            <ListGroup.Item className="bg-success text-white ">
              <h3>{product.name} hello</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                stars={product.rating}
                text={`${product.numReviews} Reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item style={{ fontSize: "22px", letterSpacing: "2px" }}>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: &nbsp;
              <span style={{ color: "gray" }}>{product.description}</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row style={{ fontSize: "20px", letterSpacing: "1px" }}>
                  <Col>Price: </Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row style={{ fontSize: "20px", letterSpacing: "1px" }}>
                  <Col>Status: </Col>
                  <Col>
                    {/* {product.countInStock > 0 ? product.countInStock : null} */}
                    {/* &nbsp; */}
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row style={{ fontSize: "20px", letterSpacing: "1px" }}>
                  <Col>Brand: </Col>
                  <Col>{product.brand}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn-block btn-info"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
