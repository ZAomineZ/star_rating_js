const hues = [53, 30, 14, 344, 0]
let stars = document.querySelectorAll('.star') as NodeListOf<HTMLElement>
let ratingNumberElement = document.querySelector('#ratingInput') as HTMLInputElement
let rating = parseInt(ratingNumberElement.value)
let ratingPreview = document.querySelector('#ratingValue')  as HTMLElement

const click = (element: HTMLElement) => {
    ratingNumberElement.value = (element.getAttribute('star-rating') ?? 0).toString()
    let newRating = parseInt(ratingNumberElement.value) as number
    newRating--

    judgeRating(ratingPreview, (newRating + 1))

    // Assing Colors
    assignStars(newRating, stars)
}

const hover = (element: HTMLElement) => {
    let starRating = parseInt(element.getAttribute('star-rating') as string)
    const starRatingCurrent = starRating - 1
    let ratingIndex = rating - 1
    if (starRatingCurrent > ratingIndex) {
        assignColor(hues[starRatingCurrent], 'color')
    }

    Array.from(stars).slice(0, starRating).forEach(item => item.classList.add('hoveredStars'))
    judgeRating(ratingPreview, starRating)
}

const hoverOut = (element: HTMLElement) => {
    const clickStars = Array.from(stars).filter(item => !item.classList.contains('clickedStars'))
    clickStars.forEach(item => item.classList.remove('hoveredStars'))
}

const getSiblings = (node: any) => [...node.parentNode.children].filter(c => c !== node)

const init = (listElements: NodeListOf<HTMLElement>, rating: number) => {
    judgeRating(ratingPreview, rating)

    rating--

    // Assign Color
    assignStars(rating, listElements)
}

const assignColor = (hue: number, assigned: string) => {
    const sat = "85%",
        val = "55%"

    document.documentElement.style.setProperty(
        "--" + assigned,
        `hsl(${hue}, ${sat}, ${val})`
    )
}

const judgeRating = (ratingSelector: HTMLElement, rating: number) => {
    let reaction = (rating: number) => {
        switch (rating) {
            case 1:
                return "Terrible !"
                break;
            case 2:
                return "Eh, could've been better."
                break;
            case 3:
                return "Okay, I guess."
                break
            case 4:
                return "This is great !"
                break;
            case 5:
                return "Wow ! As good as it gets !"
            default:
                return "ERR: you shouldn't be able to see this value..."
        }
    }

    ratingSelector.innerText = "Rating: " + rating + ", " + reaction(rating)
}

const assignStars = (rating: number, list: NodeListOf<HTMLElement>) => {
    let initStar = list[rating]
    const siblings = getSiblings(initStar).filter(item => item.classList.contains('star'))
    siblings.forEach(item => item.classList.remove('clickedStars'))
    siblings.forEach(item => item.classList.remove('hoveredStars'))
    assignColor(hues[rating], "color")
    const prevAll = Array.from(list).slice(0, rating + 1)
    prevAll.forEach(item => item.classList.add('clickedStars'))
}

// Init; Set up stars
init(stars, rating)

// Stars Events
stars.forEach(element => {
    element.addEventListener('click', () => click(element))
    element.addEventListener('mouseover', () => hover(element))
    element.addEventListener('mouseout', () => hoverOut(element))
})