import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductById, getAllCategory } from '../../actions'
import { addProduct } from '../../actions'
import Layout from '../../components/Layouts'
import Input from '../../UI/Input'
import MyModal from '../../UI/Model'
import { generatePubicUrl } from '../../urlConfig'
import './style.css'

const Products = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategory())
  }, [])
  const [show, setShow] = useState(false);
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [productPictures, setProductPictures] = useState([])
  const [productDetailsMod, setProductDetailsMod] = useState(false)
  const [productDetails, setProductDetails] = useState(null)


  const catagory = useSelector(state => state.category)
  const product = useSelector(state => state.product)

  // handler for create product model
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    categories.map(category => {
      options.push({ name: category.name, value: category._id })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    })
    return options
  }

  const handleCategoryImage = (e) => {
    setProductPictures([...productPictures, ...e.target.files])
  }
  // form submit handler for add product
  const handleSubmit = (e) => {
    setShow(false);
    console.log(name, description, quantity, price, category, productPictures)
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('quantity', quantity)
    formData.append('price', price)
    formData.append('category', category)
    productPictures.map(pic => formData.append('productPicture', pic))

    console.log(formData)
    dispatch(addProduct(formData))
  }
  // handler for show product details model
  const showProductDetails = (product) => {
    setProductDetailsMod(true)
    setProductDetails(product)
  }
  // show all available product in a table
  const renderProducts = () => {
    return (
      <Table responsive="sm" size="sm" striped bordered hover style={{ fontSize: 12 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.map((prod, index) =>
            <tr key={index} onClick={() => showProductDetails(prod)}>
              <td>{index + 1}</td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.quantity}</td>
              <td>{prod.category && prod.category.name}</td>
              <td onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}>
                <button >Edit</button>
                <button onClick={() => dispatch(deleteProductById({ productId: prod._id }))}>Delete</button>
              </td>
            </tr>)}

        </tbody>
      </Table>
    )
  }
  // product details models
  const renderShowProductDetailModel = () => {
    return (
      <MyModal show={productDetailsMod} handleClose={() => setProductDetailsMod(false)} handleSubmit={() => setProductDetailsMod(false)}
        title={"Product Details"} size="lg">
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails && productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails && productDetails.price}</p>
          </Col>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails && productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Catagory</label>
            <p className="value">{productDetails && productDetails.category.name}</p>
          </Col>
          <Col md="12">
            <label className="key">Descriptions</label>
            <p className="value">{productDetails && productDetails.description}</p>
          </Col>
          <Col className="product_img_main_container">
            {productDetails && productDetails.productPictures.map((pic) =>
              <div className="product_img_container">
                <img src={generatePubicUrl(pic.img)} />
              </div>)}
          </Col>
        </Row>
      </MyModal>
    )
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className="categoryHeader">
              <h3>Product</h3>
              <div style={{ padding: '5px ' }}><Button variant="success" onClick={handleShow}>Add
                <span><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg></span>
              </Button></div>

            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {renderProducts()}
          </Col>
        </Row>
      </Container>
      <MyModal show={show} handleClose={handleClose} handleSubmit={handleSubmit}
        title={"Add a new product"}>
        <Input
          type="text"
          label="Name"
          placeholder="Enter product name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          type="text"
          label="Description"
          placeholder="Enter product description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiple
        />
        <Input
          type="number"
          label="price"
          placeholder="Enter product price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <label>select category</label>
        <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
          <option>select category</option>
          {
            createCategoryList(catagory.categories).map(option =>
              <option key={option.value} value={option.value}>{option.name}</option>
            )
          }
        </select>
        <Input
          type="number"
          label="quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
        <Input
          type="file"
          name="catagoryImage"
          onChange={handleCategoryImage}
          multiple

        />
      </MyModal>
      {renderShowProductDetailModel()}
    </Layout>
  )
}

export default Products
