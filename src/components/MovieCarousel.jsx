import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const slideStyle = {
  height: "62vh",
  minHeight: "320px",
  width: "100%",
  position: "relative",
  overflow: "hidden",
  borderRadius: "12px",
};

const bgStyle = (image) => ({
  position: "absolute",
  inset: 0,
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.75)",
});

const overlayStyle = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(11,11,11,0.95) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
  zIndex: 1,
};

const contentStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 2,
  padding: "32px 28px",
};

function MovieCarousel({ movies }) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      slidesPerView={1}
      spaceBetween={0}
      style={{ width: "100%" }}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div style={slideStyle}>
            <div style={bgStyle(movie.image)} />
            <div style={overlayStyle} />
            <div style={contentStyle}>
              <h3 style={{
                fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                fontWeight: 900,
                color: "#fff",
                marginBottom: "8px",
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                fontFamily: "var(--font-heading)",
              }}>
                {movie.title}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#bbb", margin: 0 }}>
                {movie.genre}{movie.duration ? ` • ${movie.duration}` : ""}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MovieCarousel;
