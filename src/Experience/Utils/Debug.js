import * as dat from 'lil-gui'
import * as Stats from 'stats.js'

export default class Debug
{
    constructor()
    {

        this.active = window.location.hash === '#debug'
        // always using dat.gui for presentation
        this.active = true

        if(this.active)
        {
            this.ui = new dat.GUI()
        }

        var stats = new Stats();
        stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( stats.dom );

        function animate() {

            stats.begin();

            // monitored code goes here

            stats.end();

            requestAnimationFrame( animate );

        }

        requestAnimationFrame( animate );
    }
}