
import Pixi from 'pixi.js'

import 'core/canvas'
import renderer from 'core/renderer'

let stage = new Pixi.Container()


function setup() {
    let tex = Pixi.loader.resources[ 'assets/awesome.jpg' ].texture
    let sprite = new Pixi.Sprite( tex )
    stage.addChild( sprite )

    renderer.render( stage )
}



Pixi.loader
    .add( 'assets/awesome.jpg' )
    .load( setup )


window.r = renderer
