 
let fs = require('fs');
let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug-recursive');



function mix_multiple(folder, method, srcExt, outputExt) {
    const paths = fs.readdirSync(folder);
    for (let i = 0; i < paths.length; i++) {
        if (paths[i].indexOf('.' + srcExt) > 0 && paths[i].charAt(0) !== '_') {
            const file_path = folder + paths[i];
            mix[method](file_path, outputExt);
        }
    }
}

mix_multiple('./frontend/src/static/styles/', "sass", "scss", "./docs/styles");


mix
    .options({
        processCssUrls: false
    })
      .copyDirectory('./frontend/src/static/svg/', './docs/svg')
    .copyDirectory('./frontend/src/static/images/', './docs/images')
    .pug('./frontend/src/templates/**/*.pug', './docs/',  {
        excludePath: __dirname+'/frontend/src/templates'
	})
    .setPublicPath('./docs/')
    .disableNotifications();