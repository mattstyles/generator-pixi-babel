
import Pixi from 'pixi.js'

import { canvas } from 'core/canvas'
import APP from 'constants/app'

const renderer = Pixi.autoDetectRenderer( APP.get( 'CANVAS_WIDTH' ), APP.get( 'CANVAS_HEIGHT' ), {
    antialiasing: false,
    transparent: false,
    resolution: APP.get( 'CANVAS_DP' ),
    view: canvas
})

document.body.appendChild( renderer.view )

export default renderer
