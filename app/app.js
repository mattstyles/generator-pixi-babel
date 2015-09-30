
import path from 'path'

import glob from 'glob'
import osenv from 'osenv'
import chalk from 'chalk'
import { Base } from 'yeoman-generator'
import yosay from 'yosay'



/**
 * PixiBabel
 * @class
 * @extends Base <Yeoman-generator>
 */
export default class PixiBabel extends Base {

    /**
     * @constructs
     */
    constructor( ...args ) {
        super( ...args )

        if ( process.env.DEBUG ) {
            this.destinationRoot( path.join( __dirname, '../debug' ) )
        }
    }

    /**
     * Package, info used in templates
     */
    pkg = require( '../package.json' )

    /**
     * Prompts for user config
     * @static
     */
    static prompts = [{
        name: 'projectName',
        message: 'What is the name of your project?',
        validate: str => !/\s/.test( str )
    }, {
        name: 'projectDescription',
        message: 'What is the project description?'
    }, {
        name: 'authorName',
        message: 'What is the author name?',
        default: osenv.user(),
        store: true
    }, {
        name: 'userName',
        message: 'What is your github username?',
        default: osenv.user().toLowerCase().replace( /\s/g, '' ),
        store: true
    }, {
        type: 'list',
        name: 'license',
        message: 'What is the project license?',
        choices: [ 'WTFPL', 'ISC', 'MIT' ]
    }]

    /**
     * Initial greeting app state
     */
    hello() {
        this.log( yosay([
            chalk.cyan( 'Pixi Babel' ),
            'Pixi Powered!'
        ].join( '\n' ) ))
    }

    /**
     * Prompting for user config app state
     */
    prompting() {
        let done = this.async()

        this.prompt( PixiBabel.prompts, props => {
            this.props = props
            done()
        })
    }

    /**
     * Main scaffold app state
     */
    app() {
        let done = this.async()

        this.log( 'Copying templates' )

        glob( path.join( this.sourceRoot(), '**/*' ), {
            dot: true
        }, ( err, files ) => {
            if ( err ) {
                throw new Error( err )
            }

            files
                .filter( file => !/^_/.test( path.relative( this.sourceRoot(), file ) ) )
                .map( file => file.replace( this.sourceRoot(), '' ) )
                .map( file => file.replace( /^\//, '' ) )
                .forEach( file => {
                    this.fs.copyTpl(
                        this.templatePath( file ),
                        this.destinationPath( file ),
                        this.props
                    )
                })

            // For now just tack on the optional file here
            files
                .filter( file => /^_/.test( path.relative( this.sourceRoot(), file ) ) )
                .map( file => file.replace( this.sourceRoot(), '' ) )
                .map( file => file.replace( /^\//, '' ) )
                .forEach( file => {
                    this.fs.copyTpl(
                        this.templatePath( file ),
                        this.destinationPath( file.replace( /^_/, '' ) ),
                        this.props
                    )
                })

            done()
        })
    }

    /**
     * Install app state
     */
    install() {
        if ( this.options[ 'skip-install' ] ) {
            this.log( 'Skipping install' )
            return
        }

        this.installDependencies({
            bower: false
        })
    }

}
