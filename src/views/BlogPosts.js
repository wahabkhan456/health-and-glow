/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { connect } from "react-redux";
import { request as blogpost } from "../redux/actions/blogData";
import { Container, Row, Col, Card, CardBody, Badge } from "shards-react";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import Pagination from "react-js-pagination";
import data from "../services/data";
import en from "../locales/en.json";
import { BASE_URL, PRODUCT, GET_PRODUCTS, SEARCH } from "../config/WebServices";

class BlogPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRow: false,
      activePage: 1,
      search: "",
      itemPerPage: 10,
      res: {},
      sort: "",
      selectedCateg: "",
      category: data.category,
      shade: data.shade,

      PostsListOne: []
    };
  }
  componentDidMount() {
    let url = `${BASE_URL}/${GET_PRODUCTS}`;

    this.props.blogpost(url);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.blogData && nextProps.blogData.data) {
        this.setState({
          res: nextProps.blogData.data,
          PostsListOne: nextProps.blogData.data.data.products
        });
      }
    }
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };
  searchFun = () => {
    let { search } = this.state;

    if (search !== "") {
      let url = `${BASE_URL}/${PRODUCT}&tag=${this.state.search}&page=0:20`;

      this.props.blogpost(url);
      console.log("checking", this.props.blogpost(url));
    } else {
      alert("No Search Text");
    }
  };

  handleShadeFilter = () => {
    const { shade, category } = this.state;
    let selectedCateg = category.find(v => v.check);
    let shadeTrueValue = shade.find(v => v.check);
    let url = `${BASE_URL}/${PRODUCT}&tag=loreal-paris&page=0:20&category=${
      !!selectedCateg ? selectedCateg.value : ""
    }&shade=${!!shadeTrueValue ? shadeTrueValue.value : ""}`;

    this.props.blogpost(url);
  };
  handleSort = () => {
    const { shade, category, sort } = this.state;
    let selectedCateg = category.find(v => v.check);
    let shadeTrueValue = shade.find(v => v.check);
    let url = `${BASE_URL}/${SEARCH}&category=${
      !!selectedCateg ? selectedCateg.value : ""
    }&shade=${!!shadeTrueValue ? shadeTrueValue.value : ""}&sort=price:${sort}`;

    this.props.blogpost(url);
  };
  render() {
    const {
      PostsListOne,
      itemPerPage,
      category,
      isRow,
      activePage,
      shade
    } = this.state;
    let indexOfLastTodo = activePage * itemPerPage;
    let indexOfFirstTodo = indexOfLastTodo - itemPerPage;
    let renderedProjects = PostsListOne.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );

    return (
      <Container fluid className="main-content-container px-4">
        <MainNavbar
          btn={this.searchFun}
          func={e => {
            this.setState({ search: e });
          }}
        />
        {/* Page Header */}

        <Col className="page-header py-4">
          <div className="row">
            <div className="col-2">
              <button
                type="button"
                onClick={() => {
                  this.setState({ isRow: !isRow });
                }}
                className="btn btn-outline-primary  btn-block"
              >
                <i style={{ marginLeft: -5 }} className="material-icons">
                  &#xE5D2;
                </i>
              </button>
            </div>
            <div className="col-5">
              <button
                type="button"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                className="btn btn-outline-primary  btn-block"
              >
                {en.Sort}
              </button>
            </div>
            <div className="col-5">
              <button
                type="button"
                data-toggle="modal"
                data-target="#exampleModalCenter1"
                className="btn btn-outline-primary  btn-block"
              >
                {en.Filter}
              </button>
            </div>
          </div>
        </Col>

        {/* First Row of Posts */}
        <Row>
          {renderedProjects.length ? (
            renderedProjects.map((post, idx) => (
              <Col
                lg={isRow ? "12" : "6"}
                md={isRow ? "12" : "6"}
                sm={isRow ? "12" : "6"}
                className="mb-4"
                key={idx}
              >
                <Card small className="card-post card-post--1">
                  <div
                    className="card-post__image"
                    style={{ backgroundImage: `url(${post.skuImageUrl})` }}
                  >
                    <Badge
                      pill
                      className={`card-post__category bg-${post.categoryTheme}`}
                    >
                      {post.skuPromoText ? post.skuPromoText : null}
                    </Badge>
                    <span
                      style={{ color: "red", marginLeft: -10 }}
                      className="material-icons"
                    >
                      {en.Favorite}
                    </span>
                    {/* <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                    >
                      Written by {post.author}
                    </a>
                  </div> */}
                  </div>
                  <CardBody>
                    <h5 className="card-title">
                      <a href="#" className="text-fiord-blue">
                        {post.title}
                      </a>
                    </h5>
                    <p className="card-text d-inline-block mb-3">
                      {post.skuName ? post.skuName : null}
                    </p>
                    <br />

                    <div className="row">
                      <div className="col">
                        <span className="text-muted">
                          <del>
                            {post.defaultPrice ? "₹" + post.defaultPrice : null}
                          </del>{" "}
                          {post.listPrice ? "₹" + post.listPrice : null}{" "}
                        </span>
                      </div>
                      <div className=" col-md-offset-2">
                        <h6>
                          <span
                            style={{ fontSize: 14 }}
                            className="material-icons"
                          >
                            {en.Star}
                          </span>{" "}
                          {post.skuAverageRating ? post.skuAverageRating : 0}
                        </h6>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Card small className="card-post card-post--1 my-10 btn-block">
              <CardBody>
                <h3 className="mx-10">{en.No_Data_Found}</h3>
              </CardBody>
            </Card>
          )}
        </Row>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={itemPerPage}
          totalItemsCount={PostsListOne.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
        {/* SOrt */}
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  {en.Sort_List}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="">
                <ul className="list-group">
                  <li className="list-group-item ">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sort"
                        id="popula"
                        value="asc"
                        onChange={e => this.setState({ sort: e.target.value })}
                      />
                      <label
                        className="form-check-label w-100"
                        htmlFor="popula"
                      >
                        {en.Popularity}
                      </label>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sort"
                        id="desc"
                        value="desc"
                        onChange={e => this.setState({ sort: e.target.value })}
                      />
                      <label className="form-check-label w-100" htmlFor="desc">
                        {en.Discount}
                      </label>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sort"
                        id="hlac"
                        value="desc"
                        onChange={e => this.setState({ sort: e.target.value })}
                      />
                      <label className="form-check-label w-100" htmlFor="hlac">
                        {en.High_Low}
                      </label>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sort"
                        id="lhac"
                        value="asc"
                        onChange={e => this.setState({ sort: e.target.value })}
                      />
                      <label className="form-check-label w-100" htmlFor="lhac">
                        {en.Low_High}
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  data-toggle="modal"
                  data-dismiss="modal"
                  className="btn btn-outline-primary btn-block"
                  onClick={() => this.handleSort()}
                >
                  {en.Sort}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SOrt */}
        {/* filter */}
        <div
          className="modal fade "
          id="exampleModalCenter1"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered  modal-lg"
            role="document"
          >
            <div className="modal-content m-2">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  {en.Filter_List}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="col-sm-12">
                <Row>
                  <div className="col">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <a>{en.Category}</a>
                      </li>
                      {category.map((v, k) => (
                        <li key={k} className="list-group-item ">
                          <div className="col-12">
                            <input
                              type="checkbox"
                              onChange={e => {
                                v.check = !v.check;
                                let newShade = [...category];
                                newShade[v.id - 1] = v;
                                this.setState({ category: newShade });
                              }}
                              className="form-check-input"
                              value={v.value}
                              id={v.id}
                            />
                            <label className="form-check-label">
                              {v.value}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col">
                    <ul className="list-group">
                      {shade.map((v, k) => (
                        <li key={k} className="list-group-item ">
                          <div className="col-12">
                            <input
                              type="checkbox"
                              onChange={e => {
                                v.check = !v.check;
                                let newShade = [...shade];
                                newShade[v.id - 1] = v;
                                this.setState({ shade: newShade });
                              }}
                              className="form-check-input"
                              value={v.value}
                              id={v.id}
                            />
                            <label className="form-check-label">
                              {v.value}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Row>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => this.handleShadeFilter()}
                  data-toggle="modal"
                  data-dismiss="modal"
                  className="btn btn-outline-primary  btn-block"
                >
                  {en.Apply}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* SOrt */}
      </Container>
    );
  }
}
const mapStateToProps = state => ({ blogData: state.blog });

const action = { blogpost };

export default connect(mapStateToProps, action)(BlogPosts);
