import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/Layouts';
import Input from '../../UI/Input';
import MyModal from '../../UI/Model';
import linerCategories from '../../helpers/linearCategories'
import { createPage } from '../../actions';


const NewPage = () => {
  const [createModel, setCreateModel] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [descrb, setDescrb] = useState("");
  const [banner, setBanner] = useState([]);
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("")

  const dispatch = useDispatch()
  const page = useSelector(state => state.page)

  const category = useSelector(state => state.category)
  useEffect(() => {
    if (category) {
      setCategories(linerCategories(category.categories))
    }
  }, [category]);

  useEffect(() => {
    if (!page.loading) {
      setCreateModel(false);
      setTitle("");
      setType("")
      setProducts([])
      setBanner([])
      setDescrb("")
    }
  }, [page.loading])

  const handleBannerImages = (e) => {
    console.log(e);
    setBanner([...banner, e.target.files[0]])
  }

  const handleProductsImages = (e) => {
    setProducts([...products, e.target.files[0]])
  }

  const onCategoryChange = (e) => {
    const selCat = categories.find((cat => cat.value === e.target.value))
    setCategoryId(e.target.value);
    setType(selCat.type ? selCat.type : "page")
  }

  const submitPageForm = (e) => {
    if (title === "") {
      alert('title is required');
      setCreateModel(false)
      return;
    }
    const form = new FormData();
    form.append('title', title);
    form.append('description', descrb);
    form.append('category', categoryId);
    form.append('type', type);
    banner.forEach((ban) => {
      form.append('banners', ban)
    })

    products.forEach((prod) => {
      form.append('products', prod)
    })
    dispatch(createPage(form))
  }


  const renderCreatePageModal = () => {
    return (
      <MyModal
        show={createModel}
        title={'Create New Page'}
        handleClose={() => setCreateModel(false)}
        handleSubmit={submitPageForm}>
        <Row>
          <Col>
            <select className="form-control form-controll-sm" value={categoryId} onChange={onCategoryChange}>
              <option>select categories</option>
              {
                categories.map(cat =>
                  <option key={cat.value} value={cat.value}>{cat.name}</option>
                )
              }
            </select>
          </Col>
          <Col>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Page title" />
          </Col>
          <Col>
            <Input value={descrb} onChange={e => setDescrb(e.target.value)} placeholder="Describtion" />
          </Col>
        </Row>
        <Row>
          {banner.length > 0 && banner.map((banner, index) =>
            <Row>
              <Col>{banner.name}</Col>
            </Row>)}
          <Col>
            <Input type="file" name={"banner"} onChange={handleBannerImages} />
          </Col>
        </Row>
        <Row>
          {products.length > 0 && products.map((product, index) =>
            <Row>
              <Col>{product.name}</Col>
            </Row>)}
          <Col>
            <Input type="file" name={"products"} onChange={handleProductsImages} />
          </Col>
        </Row>
      </MyModal>
    )
  }
  return (
    <Layout sidebar>
      {renderCreatePageModal()}
      <Button onClick={e => setCreateModel(true)}>
        create page
      </Button>
    </Layout>

  )
}

export default NewPage

