import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import FadeIn from './FadeIn';
import { IMAGES } from '../data/images';

const works = [
  { id: 1, title: 'Классический фейд', image: IMAGES.work1 },
  { id: 2, title: 'Стрижка бороды', image: IMAGES.work2 },
  { id: 3, title: 'Современный андеркат', image: IMAGES.work3 },
  { id: 4, title: 'Королевское бритьё', image: IMAGES.work4 },
  { id: 5, title: 'Камуфляж седины', image: IMAGES.work5 },
  { id: 6, title: 'Детская стрижка', image: IMAGES.work6 },
];

export default function WorksSlider() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
            Наши работы
          </h2>
          <p className="text-text-muted text-center mb-12">То, чем мы гордимся</p>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            loop
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="pb-12"
          >
            {works.map((w) => (
              <SwiperSlide key={w.id}>
                <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                  <img
                    src={w.image}
                    alt={w.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <span className="font-heading text-xl font-semibold text-white">
                      {w.title}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}