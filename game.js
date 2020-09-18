document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoredisplay = document.getElementById('score')
    const width = 8
    const squares = []
    let score = 0
    const candyColors = [
        'url(images/blue-candy.png)', 'url(images/green-candy.png)', 'url(images/orange-candy.png)', 'url(images/purple-candy.png)', 'url(images/red-candy.png)', 'url(images/yellow-candy.png)'
    ]


    // board creation
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()

    let colorBeingDragged
    let colorBeignReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach(square => square.addEventListener('dragstart', dragStart
    ))
    squares.forEach(square => square.addEventListener('dragend', dragEnd
    ))
    squares.forEach(square => square.addEventListener('dragover', dragOver
    ))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter
    ))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave
    ))
    squares.forEach(square => square.addEventListener('drop', dragDrop
    ))

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)

        console.log(colorBeingDragged);
        console.log(this.id, 'dragstart');
    }


    function dragOver(e) {
        e.preventDefault()
        console.log(this.id, 'dragover');
    }

    function dragEnter(e) {
        e.preventDefault()
        console.log(this.id, 'dragenter');
    }

    function dragLeave() {
        console.log(this.id, 'dragleave');
    }

    function dragDrop() {
        console.log(this.id, 'dragdrop');
        colorBeignReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeignReplaced
    }
    function dragEnd() {
        console.log(this.id, 'dragend');

        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width

        ]
        let validmove = validMoves.includes(squareIdBeingReplaced)
        if (squareIdBeingReplaced && validmove) {
            squareIdBeingReplaced = null
        } else if (squareIdBeingReplaced && !validmove) {
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeignReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    }
    function moveDown() {
        for (i = 0; i <= 55; i++) {
            if (squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
                const firstrow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstrow = firstrow.includes(i)
                if (isFirstrow && squares[i].style.backgroundImage === '') {
                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundImage = candyColors[randomColor]
                }

            }
        }
    } moveDown()
    function checkRowforThree() {
        for (let i = 0; i <= 61; i++) {
            let rowofthree = [i, i + 1, i + 2]
            let decidedcolor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue
            if (rowofthree.every(index => squares[index].style.backgroundImage === decidedcolor && !isBlank)) {
                score += 3
                scoredisplay.innerHTML = score
                rowofthree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    function checkColforThree() {
        for (let i = 0; i <= 47; i++) {
            let colofthree = [i, i + width, i + (width * 2)]
            let decidedcolor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
            if (colofthree.every(index => squares[index].style.backgroundImage === decidedcolor && !isBlank)) {
                score += 3
                scoredisplay.innerHTML = score
                colofthree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    checkColforThree()
    checkRowforThree()


    function checkRowforfour() {
        for (let i = 0; i <= 60; i++) {
            let rowoffour = [i, i + 1, i + 2, i + 3]
            let decidedcolor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (notValid.includes(i)) continue
            if (rowoffour.every(index => squares[index].style.backgroundImage === decidedcolor && !isBlank)) {
                score += 4
                scoredisplay.innerHTML = score
                rowoffour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    function checkColforfour() {
        for (let i = 0; i <= 47; i++) {
            let coloffour = [i, i + width, i + width * 2, i + width * 3]
            let decidedcolor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
            if (coloffour.every(index => squares[index].style.backgroundImage === decidedcolor && !isBlank)) {
                score += 4
                scoredisplay.innerHTML = score
                coloffour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    checkColforfour()
    checkRowforfour()
    checkColforThree()
    checkRowforThree()



    window.setInterval(function () {
        moveDown()
        checkColforfour()
        checkRowforfour()
        checkRowforThree()
        checkColforThree()
    }, 100)
})