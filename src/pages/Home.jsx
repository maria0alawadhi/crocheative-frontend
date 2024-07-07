import React, { useEffect, useState } from 'react'
import '../App.css'
import CategoryCard from '../components/CategoryCard'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import { Link } from 'react-router-dom'
//
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
//
const Home = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`)
        setCategories(response.data)
      } catch (error) {
        throw error
      }
    }
    fetchCategories()
  }, [])
  return (
    <div>
      <div className="img-container"></div>
      <div className="category-container">
        <div className="home-guest">
          <div>
            <h1 className="home-text">Get your unique piece now! </h1>

            {/* <p id="home-text">Choose what's good for you</p> */}
            {/* <button className="button home-button" onClick={() => navigate('/login')}>

          Get Started
        </button> */}
          </div>
          <img src="https://i.imgur.com/duk3b58.jpeg" alt="Home page cover" />
        </div>
        <h1 className="title">Categories</h1>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category}>
              <Link to={`/${category}/items`}>
                <CategoryCard category={category} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* {categories.map((category) => (
          <Link to={`/${category}/items`} key={category}>
            <CategoryCard category={category} />
          </Link>
        ))} */}
      </div>
      <div className="about-us-container"></div>
      <div className="contact-us-container"></div>
    </div>
  )
}

export default Home
