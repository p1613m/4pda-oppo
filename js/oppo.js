document.addEventListener('DOMContentLoaded', () => {
    /** main slider parallax **/
    const mainSliderAbsolute = document.querySelector('#oppo-main-slider-absolute')
    const mainSliderParallax = document.querySelector('#oppo-main-slider-parallax-helper')
    const promoOppo = document.querySelector('#promo-oppo')
    let mainSliderParallaxActive = false

    const updateMainSliderParallax = () => {
        if (!mainSliderParallaxActive) return;

        const sliderHeight = mainSliderAbsolute.getBoundingClientRect().height
        const scrollTop = document.documentElement.scrollTop
        const promoOppoPagePosition = promoOppo.getBoundingClientRect().top + scrollTop
        let parallaxHeight = sliderHeight - scrollTop
        if (parallaxHeight < 0) {
            parallaxHeight = 0
        }

        if (sliderHeight > 0) {
            mainSliderAbsolute.style.position = 'absolute'
            mainSliderParallax.style.height = parallaxHeight + 'px'
        } else {
            mainSliderAbsolute.style.position = 'relative'
            mainSliderParallax.style.height = '0px'
        }
    }
    setInterval(() => {
        if (mainSliderAbsolute.querySelector('.slick-slider')) {
            mainSliderParallaxActive = true
            updateMainSliderParallax()
        }
    }, 50)

    window.addEventListener('resize', () => {
        updateMainSliderParallax()
    })

    document.addEventListener('scroll', () => {
        updateMainSliderParallax()
    })

    /** sliders **/
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
            if (minX >= 0) {
                arrowNext.style.display = 'none'
                arrowPrev.style.display = 'none'
            } else {
                arrowNext.style.display = 'block'
                arrowPrev.style.display = 'block'
            }
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
        })
    })
})
