import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Hero.css';

const slides = [
    {
        img: "https://i.ibb.co/cKkdXhXM/foodshare1.jpg",
        title: "Discover the Joy of Sharing Homemade Meals",
        subtitle:
            "Connect with neighbors and friends who love cooking as much as you do. Share recipes, meals, and stories in your local food community.",
    },
    {
        img: "https://i.ibb.co/jZv3zs3v/foodshare2.jpg",
        title: "Cook Together, Eat Together, Grow Together",
        subtitle:
            "Join food share events and cooking clubs to learn new dishes and build meaningful relationships over shared meals.",
    },
    {
        img: "https://i.ibb.co/kstHSWwV/foodshare3.jpg",
        title: "Reduce Waste, Share Surplus, Save the Planet",
        subtitle:
            "Be part of a sustainable food movement by sharing leftovers and excess groceries with your community. Every meal counts!",
    },
    {
        img: "https://i.ibb.co/ynRBk9b7/foodshare4.jpg",
        title: "Explore Diverse Cuisines and Culinary Traditions",
        subtitle:
            "From comfort food to exotic flavors, discover new tastes by joining cooking exchanges and cultural food sharing groups.",
    },
    {
        img: "https://i.ibb.co/gFdXXBGb/foodshare5.jpg",
        title: "Empower Local Farmers and Homegrown Ingredients",
        subtitle:
            "Support local agriculture by sharing fresh produce and home-cooked meals made from seasonal ingredients.",
    },
];

const Hero = () => {
    return (
        <Swiper
            direction="vertical"
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="h-[calc(100vh-55px)]"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <section
                        className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center justify-center text-center px-4 sm:px-6 md:px-0 relative"
                        style={{ backgroundImage: `url(${slide.img})` }}
                    >

                        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] z-10" />
                        <div className="relative z-20 text-white max-w-3xl mx-auto">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 sm:mb-6">
                                {slide.title}
                                <span className="block text-[#4BAF47] mt-2 text-lg sm:text-xl font-semibold">— All in One Place</span>
                            </h1>
                            <p className="text-base sm:text-lg mb-8">{slide.subtitle}</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a
                                    href="#"
                                    className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded bg-[#4BAF47] text-white hover:bg-[#3a8b34] transition"
                                >
                                    Explore Foods
                                </a>
                                <a
                                    href="#"
                                    className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold border rounded border-[#4BAF47] text-[#4BAF47] hover:bg-[#4BAF47] hover:text-white transition"
                                >
                                    Join the Community
                                </a>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>
            ))}
        </Swiper>

    );
};

export default Hero;
