'use client'

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type HeroSlide = {
  subtitle: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  ctaHref: string;
};

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 9000,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: { slidesPerView: 1 },
    575: { slidesPerView: 1 },
    767: { slidesPerView: 1 },
    991: { slidesPerView: 1 },
    1199: { slidesPerView: 1 },
    1350: { slidesPerView: 1 },
  },
};

const slideBackgrounds = [
  "/assets/images/background/MainBG1.jpeg",
  "/assets/images/background/MainBG2.jpeg",
  "/assets/images/background/MainBG3.jpeg",
];

export default function Banner() {
  const t = useTranslations('home.hero');
  const params = useParams();
  const lang = params.lang as string;
  const slides = t.raw('slides') as HeroSlide[];

  return (
    <section className="banner-section p_relative">
      <div
        className="pattern-layer"
        style={{ backgroundImage: "url(/assets/images/shape/shape-3.png)" }}
      ></div>

      <Swiper {...swiperOptions} className="swiper-container banner-carousel">
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className="slide-item p_relative">

              {/* Background Layer */}
              <div
                className="bg-layer"
                style={{ backgroundImage: `url(${slideBackgrounds[index % slideBackgrounds.length]})` }}
              />

              {/* Pattern Layer */}
              <div className="pattern-layer">
                <div
                  className="pattern-1"
                  style={{ backgroundImage: "url(/assets/images/shape/shape-1.png)" }}
                />
                <div
                  className="pattern-2"
                  style={{ backgroundImage: "url(/assets/images/shape/shape-2.png)" }}
                />
              </div>

              {/* Shape Layer */}
              <div className="shape-layer">
                <div
                  className="shape-1 float-bob-y"
                  style={{ backgroundImage: "url(/assets/images/shape/shape-3.png)" }}
                />
                <div
                  className="shape-2"
                  style={{ backgroundImage: "url(/assets/images/shape/shape-4.png)" }}
                />
                <div
                  className="shape-3"
                  style={{ backgroundImage: "url(/assets/images/shape/shape-5.png)" }}
                />
                <div
                  className="shape-4"
                  style={{ backgroundImage: "url(/assets/images/shape/shape-6.png)" }}
                />
              </div>

              {/* Content Box */}
              <div className="auto-container">
                <div className="content-box p_relative d_block z_5">
                  <Image
                    className="banner-logo"
                    src="/assets/images/logos/logo-white.jpg"
                    alt="NUPEC"
                    width={260}
                    height={160}
                  />
                  <span className="title-text p_relative d_block">{slide.subtitle}</span>
                  <h2 className="p_relative d_block">
                    {slide.title}
                  </h2>
                  <p>
                    {slide.description}
                  </p>
                  <div className="btn-box">
                    <Link href={`/${lang}${slide.ctaHref}`} className="theme-btn btn-two"><span>{slide.cta}</span></Link>
                  </div>
                </div>
              </div>

              {/* Image Box */}
              <div className="image-box">
                <figure className="image">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={711}
                    height={700}
                  />
                </figure>
              </div>

            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </section>
  );
}