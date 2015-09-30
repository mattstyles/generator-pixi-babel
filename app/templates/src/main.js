
import Pixi from 'pixi.js'

import 'core/canvas'
import renderer from 'core/renderer'

console.log( 'Hooray!' )


if ( process.env.DEBUG ) {
    window.renderer = renderer
}
