import { useState } from 'react'
import type { CSSProperties, FC, ReactNode } from 'react'
import styles from './Carousel.module.css'

import DotsContainer from './DotsContainer'
import ArrowsContainer from './ArrowsContainer'

interface CarouselProps {
  itemsPerPage?: number
  slides: ReactNode[]
  gap?: number
}
const Carousel: FC<CarouselProps> = ({ itemsPerPage = 1, slides, gap = 0 }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slideContainerStyle: CSSProperties = {
    minWidth: `${100 * slides.length}%`,
    transform: `translateX(-${(currentSlide * 100) / slides.length}%)`,
  }
  const slideStyle: CSSProperties = {
    width: `calc(${100 / slides.length / itemsPerPage}% - ${gap}rem)`,
    marginLeft: `${gap}rem`,
  }

  function handleNextPage() {
    const limit = Math.ceil(slides.length / itemsPerPage) - 1
    if (currentSlide === limit) return
    setCurrentSlide((cur) => cur + 1)
  }

  function handlePrevPage() {
    if (currentSlide === 0) return
    setCurrentSlide((cur) => cur - 1)
  }

  function handleChangePage(index: number) {
    setCurrentSlide(index)
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.slideContainer} style={slideContainerStyle}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={styles.slide}
            style={{
              ...slideStyle,
              ...(index === 0 ? { marginLeft: `${gap / 2}rem` } : {}),
            }}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className={styles.actionsContainer}>
        <DotsContainer
          currentSlide={currentSlide}
          itemsPerPage={itemsPerPage}
          onChangePage={handleChangePage}
          slides={slides}
        />
        <ArrowsContainer
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
    </div>
  )
}

export default Carousel
