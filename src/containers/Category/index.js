import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, updateCategoryData, getAllCategory, deleteCategoryData } from '../../actions'
import Layout from '../../components/Layouts'
import Input from '../../UI/Input'
import MyModal from '../../UI/Model'
import CheckboxTree from 'react-checkbox-tree';
import { IoIosCheckbox, IoIosCheckboxOutline, IoIosArrowDown, IoIosArrowForward, IoIosAdd, IoIosTrash, IoMdCreate } from 'react-icons/io'

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './category.css'

const Category = (props) => {

  // useEffect(() => {
  //   console.log("get api called")
  //   dispatch(getAllCategory())
  // }, [])

  const dispatch = useDispatch()
  const catagory = useSelector(state => state.category)
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [updateCategoryModel, setUpdateCategoryModel] = useState(false);
  const [deleteCategoryModel, setDeleteCategoryModel] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0])
  }

  const handleSubmit = (e) => {
    setShow(false);
    const formData = new FormData()
    formData.append('name', categoryName)
    formData.append('parentId', parentCategoryId)
    formData.append('categoryImage', categoryImage)
    dispatch(addCategory(formData))
    setCategoryName("")
    setParentCategoryId("")
  }

  const handleUpdateForm = (e) => {
    setUpdateCategoryModel(false);
    const form = new FormData();
    expandedArray.forEach(item => {
      form.append('_id', item.value)
      form.append('name', item.name)
      form.append('type', item.type ? item.type : "")
      form.append('parentId', item.parentId ? item.parentId : "")
    })

    checkedArray.forEach(item => {
      form.append('_id', item.value)
      form.append('name', item.name)
      form.append('type', item.type ? item.type : "")
      form.append('parentId', item.parentId ? item.parentId : "")
    })
    dispatch(updateCategoryData(form))
    dispatch(getAllCategory())
  }

  const handleCategoryInput = (key, value, index, type) => {
    if (type == 'checked') {
      const updateCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
      setCheckedArray(updateCheckedArray)
    }
    else if (type == 'expanded') {
      const updateCheckedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
      setExpandedArray(updateCheckedArray)
    }
  }


  const renderCategories = (categories) => {
    let myCategories = []
    categories.map(category => {
      myCategories.push(
        {
          label: category.name,
          value: category._id,
          children: category.children.length > 0 && renderCategories(category.children)
        }
      )
    })
    return myCategories
  }

  const createCategoryList = (categories, options = []) => {
    categories.map(category => {
      options.push({ name: category.name, value: category._id, parentId: category.parentId, type: category.type })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    })
    return options
  }

  const updateCategory = () => {
    setUpdateCategoryModel(true)
    const categories = createCategoryList(catagory.categories)
    const checkedArray = []
    const expandedArray = []
    checked.length > 0 && checked.forEach((categoryId, index) => {
      let category = categories.find((category, _index) => category.value == categoryId)
      categories && checkedArray.push(category)
    })
    expanded.length > 0 && expanded.forEach((categoryId, index) => {
      let category = categories.find((category, _index) => category.value == categoryId)
      categories && expandedArray.push(category)
    })
    setCheckedArray(checkedArray)
    setExpandedArray(expandedArray)
  }

  const deleteCategory = () => {
    dispatch(deleteCategoryData(checked));
    setDeleteCategoryModel(false);
  }

  const icons = {
    check: <IoIosCheckbox />,
    uncheck: <IoIosCheckboxOutline />,
    halfCheck: <IoIosCheckboxOutline />,
    expandClose: <IoIosArrowForward />,
    expandOpen: <IoIosArrowDown />,
    expandAll: <IoIosArrowDown />
  }


  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className="categoryHeader">
              <h3>Category</h3>
              <div style={{ padding: '5px ' }}><Button variant="success" onClick={handleShow}>Add
                <IoIosAdd />
              </Button></div>

            </div>
          </Col>
        </Row>
        <Row md={12}>
          <Col>
            {/* <ul>{renderCategories(catagory.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(catagory.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={checked => setChecked(checked)}
              onExpand={expanded => setExpanded(expanded)}
              icons={icons} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={updateCategory}> Edit <IoMdCreate /></Button>
            <Button onClick={() => setDeleteCategoryModel(true)} variant="danger"> Delete <IoIosTrash /></Button>
          </Col>
        </Row>
      </Container>
      {/* create category */}
      <MyModal show={show} handleClose={handleClose} handleSubmit={handleSubmit}
        title={"Add a new category"}>
        <Input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
        />
        <select className="form-control" value={parentCategoryId} onChange={e => setParentCategoryId(e.target.value)}>
          <option>select category</option>
          {
            createCategoryList(catagory.categories).map(option =>
              <option key={option.value} value={option.value}>{option.name}</option>
            )
          }
        </select>
        <Input
          type="file"
          name="catagoryImage"
          onChange={handleCategoryImage}

        />
      </MyModal>

      {/* edit category model */}
      <MyModal show={updateCategoryModel} handleClose={() => setUpdateCategoryModel(false)} handleSubmit={handleUpdateForm}
        title={"Update categories"} size="lg">
        <h5>Expanded</h5>
        {expandedArray.length > 0 && expandedArray.map((item, index) =>
          <Row key={index}>
            <Col>
              <Input
                type="text"
                placeholder="Enter category name"
                value={item.name}
                onChange={e => handleCategoryInput('name', e.target.value, index, 'expanded')}
              />
            </Col>
            <Col>
              <select className="form-control" value={item.parentId} onChange={e => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                <option>select category</option>
                {
                  createCategoryList(catagory.categories).map(option =>
                    <option key={option.value} value={option.value}>{option.name}</option>
                  )
                }
              </select>
            </Col>
            <Col>
              <select className="form-control" value={item.type} onChange={e => handleCategoryInput('type', e.target.value, index, 'expanded')}>
                <option value="">Select Type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Col>
          </Row>
        )}
        <h5>Checked</h5>
        {checkedArray.length > 0 && checkedArray.map((item, index) =>
          <Row key={index}>
            <Col>handleUpdateForm
              <Input
                type="text"
                placeholder="Enter category name"
                value={item.name}
                onChange={e => handleCategoryInput('name', e.target.value, index, 'checked')}
              />
            </Col>
            <Col>
              <select className="form-control" value={item.parentId} onChange={e => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                <option>select category</option>
                {
                  createCategoryList(catagory.categories).map(option =>
                    <option key={option.value} value={option.value}>{option.name}</option>
                  )
                }
              </select>
            </Col>
            <Col>
              <select className="form-control" value={item.type} onChange={e => handleCategoryInput('type', e.target.value, index, 'checked')}>
                <option value="">Select Type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Col>
          </Row>
        )}

        <Input
          type="file"
          name="catagoryImage"
          onChange={handleCategoryImage}

        />
      </MyModal>

      {/* delete category model */}
      <MyModal show={deleteCategoryModel} handleClose={() => setDeleteCategoryModel(false)} handleSubmit={deleteCategory}
        title={"Confirm"}>
        Are you sure?
        </MyModal>
    </Layout>
  )
}

export default Category