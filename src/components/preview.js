import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Layout from "../components/layout"
import Helmet from "react-helmet"
import Carousel from 'react-bootstrap/Carousel'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "@fortawesome/fontawesome-svg-core/styles.css";
import * as moment from 'moment'

const element = <FontAwesomeIcon icon={faClock} />

const contentful = require('contentful');

let client = contentful.createClient({
  space: process.env.NEXT_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_CONTENTFUL_PREVIEW_TOKEN,
  host: 'preview.contentful.com',
  resolveLinks: true,
  include: 10,
});


const product = 'product';
export async function getServerSideProps() {
  let data = await client.getEntry('ABbhJhQVxkLl5eZcA717j');
  let products = await client.getEntries({
    content_type: product,
  })
  return {
    props: {
      data: data,
      products: products,
    },
  };
}

export default function Preview ({ data, products }) {
  console.log(data)
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
/* Product Component */
  <Layout>
    {/* External Scripts */}
    <Helmet>
      <script src='../static/script.js' type="text/javascript" />
    </Helmet>
    
    {/*!-- Hero Slider */}
    <Carousel className="owl-carousel owl-theme owl-dots-modern home-full-slider owl-loaded owl-drag pt-0 pl-0 pr-0">
      {data.fields.heroSection[0].fields.carouselItem.map((edge, i) => 
      <Carousel.Item key={i} style={{ height: '600px'}}>

        <img className="carousel-image" src={edge.fields.image.fields.file.url} alt={edge.fields.altText}/>
        <div className="container-fluid h-100 py-5 absolute">
          <div className="row align-items-center h-100">
            <div className="col-lg-8 col-xl-6 mx-auto text-white text-center">
              <h1 className="mb-4 display-2 text-uppercase font-weight-bold">{edge.fields.name}</h1>
              <p className="lead mb-4">{edge.fields.name}</p>
              <a className="btn btn-light" href={'/category/'+edge.fields.slug}>Collection</a>
            </div>
          </div>
        </div>
   
    </Carousel.Item>
      )}
    </Carousel>

    {/*!-- Hero Categories */}
    <section>
      <div className="container-fluid px-5px">
        <div className="row mx-0">
          {data.fields.topSection.map((edge, i) => 
            <CategoriesRow key={i} node={edge}/>
          )}
        </div>
      </div>
    </section>  

    {/* Product Container */}
    <section className="py-4">
      <div className="container">        

      <div className="container mt-3">
        <div className="col-xl-8 mx-auto text-center mt-2">
          <h2 className="text-uppercase">Products</h2>
          <p className="lead text-muted">This component is an example of how products can be used in Contentful</p>
        </div>
      </div>

      <ItemsCarousel
                  requestToChangeActive={setActiveItemIndex}
                  activeItemIndex={activeItemIndex}
                  numberOfCards={5  }
                  gutter={20}
                  leftChevron={<button className="btn btn-light border-black">{<FontAwesomeIcon icon={faChevronLeft}/>}</button>}
                  rightChevron={<button className="btn btn-light border-black">{<FontAwesomeIcon icon={faChevronRight}/>}</button>}
                  outsideChevron
                  chevronWidth={chevronWidth}
                >
        {products.items.map((edge, i) => 
          <Products key={i} node={edge}/>
        )}
        </ItemsCarousel>  

    </div>
    </section> 

    {/* News Container */}
    <section className="py-4">
      <div className="container">   
      {/* Content */}
      <div className="container mt-3">
        <div className="col-xl-8 mx-auto text-center mt-2">
          <h2 className="text-uppercase">FROM OUR BLOG</h2>
          <p className="lead text-muted">This is an example of how blog posts can be used in Contentful</p>
        </div>
      </div>
      <div className="row">
        {data.fields.thirdSection.map((edge, i) => 
          <BlogPost key={i} node={edge}/>
        )}
      </div>
    </div>

    </section>

  </Layout>

  )

}
/* CategoryRow Component */
const CategoriesRow = ({node}) => {

  return (
    <div className="col-lg-3 mb-10px px-5px">
    <div className="card border-0 text-center text-white"><img className="card-img background" src={node.fields.featuredImage.fields.file.url} alt={node.fields.title}/>
      <div className="card-img-overlay d-flex align-items-center"> 
        <div className="w-100">
          <h2 className="display-5 mb-4">{node.fields.title}</h2>
          <a href={'/category/'+node.fields.slug} className="btn btn-link text-white">See More<i className="fa-arrow-right fa ml-2"></i></a>
        </div>
      </div>
    </div>
  </div>  
  )
}

// Product Component
const Products = ({node}) => {
  return (
    <div className="card">
      <div className="product-image">
      {node.newArrival === "Yes" &&
        <div className="ribbon ribbon-info">
            New
        </div>
        }
        <img className="img-fluid" alt={node.fields.featuredImage.altText} src={node.fields.featuredImage.fields.mediaReference[0].fields.file.url}/>
        <div className="product-hover-overlay"><a href={"/product/" + node.fields.slug} className="product-hover-overlay-link"></a>
          <div className="product-hover-overlay-buttons"><a href={"/product/" + node.fields.slug} className="btn btn-dark"><i className="fa-search fa"></i><span className="btn-buy-label">View</span></a>
          </div>
        </div>
      </div>
      <div className="py-2">
        <p className="text-muted text-sm mb-1">{node.fields.title}</p>
        <h4 className="h6 text-uppercase mb-1 tiny"><a href={"/product/"+ node.fields.slug} className="text-dark">{node.fields.title}</a></h4><span className="text-muted">EUR {node.fields.discountedPrice}</span>
      </div>
    </div>
  )
} 

/* Latest News Component */
const BlogPost = ({node}) => {
  console.log(node.fields)
  return (
    <div className="col-4">
        <div className="top">
          {console.log(node)}
         <img alt={node.fields.title} src={(node.fields.featuredImage.fields.file.url+"?fit=crop&w=600&h=500")}/>
          <div className="card-text"><small><span className="tiny light-grey mr-1">{element}</span><span className="text-muted">{moment(node.fields.publicationDate).format("MMM Do YY")}</span></small></div>
          <a className="text-dark" href={"/blog-post/"+ node.sys.id}><b>{node.fields.title}</b></a>
          <div className="grey"><small>{node.fields.content}</small></div>
        </div>
    </div>
  )
}