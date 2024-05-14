document.addEventListener('DOMContentLoaded', () => {
    const sliderStep = 500

    document.querySelectorAll('[data-promo-oppo-slider]').forEach(slider => {
        const slideId = slider.getAttribute('data-promo-oppo-slider')
        const arrowPrev = document.querySelector(`[data-promo-oppo-slider-arrow-prev="${slideId}"]`)
        const arrowNext = document.querySelector(`[data-promo-oppo-slider-arrow-next="${slideId}"]`)
        const track = slider.querySelector('.promo-oppo-slider-track')
        let x = 0
        let minX = 0
        const changeX = x => {
            track.style.transform = `translateX(${x}px)`

            if (x < 0) {
                arrowPrev.classList.remove('disabled')
            } else {
                arrowPrev.classList.add('disabled')
            }

            if (x === minX) {
                arrowNext.classList.add('disabled')
            } else {
                arrowNext.classList.remove('disabled')
            }
        }
        const updateMinX = () => {
            minX = ~~(slider.getBoundingClientRect().width - track.getBoundingClientRect().width)
        }

        arrowPrev.addEventListener('click', () => {
            x += sliderStep
            x = x > 0 ? 0 : x

            changeX(x)
        })
        arrowNext.addEventListener('click', () => {
            x -= sliderStep
            x = x < minX ? minX : x

            changeX(x)
        })

        updateMinX()

        window.addEventListener('resize', () => {
            updateMinX()
            changeX(0)
            console.log('resized');
        })
    })
})
