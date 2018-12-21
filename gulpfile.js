/************************************************
 ** Imports
 ************************************************/

//Gulp Core 
var gulp 			= require('gulp');
var gutil           = require('gulp-util');


//Styles Imports (Used for compile SASS,CSS autoprefix, minify Css and create source Map)
var sass 			= require('gulp-sass');
var autoprefixer 	= require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');


//JavaScript Uglify, merge resources in one File
var uglify 			= require('gulp-uglify');	
var concat 			= require('gulp-concat');


// Images (Optimize Images)
var imagemin 		= require('gulp-imagemin');


// Browser (Live Server)
var browserSync 	= require('browser-sync');




/************************************************
 ** Configration
 ************************************************/
 var config			= require('./config.json');
 
 
 

 /************************************************
 ** Task Commands
 **** Gulp reload 		 : Reload server.
 **** Gulp serve         : Compile all resources then open it on browser using node server and keep update files whenver changed.
 **** Gulp watch		 : compile all resources and keep them updated whnever you made change.
 **** Gulp compile-sass  : Compile SASS files.
 **** Gulp minify-css  	 : Minify all Css files specifyed in configration source.
 **** Gulp minify-html   : Compile all resources then open it on browser.
 **** Gulp img-compress  : Compress all images in configration source.
 **** Gulp Build		 : 
 ************************************************/
 

// reload Task. 
gulp.task('reload', function() {
  browserSync.reload();
});

// serve Task.
// Run server on source path
gulp.task('serve', function() {
  browserSync({
    server: config.destination.path
  });
  gulp.watch(config.source.sass, gulp.task('compile-sass'));
  //gulp.task('watch')
});

// Compile-sass Task.
// generate css files from sass with sourceMaps
gulp.task('compile-sass', function() { //ToDo: add option to compress Sass Result
  return gulp.src(config.source.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write()) // ToDo: make source Maps optional
    .pipe(gulp.dest(config.destination.css))
    .pipe(browserSync.stream());
});

//Gulp minify-css
gulp.task('minify-css', function() {
	
	//ToDo: Create minify script (read all css files in arry compress them in one file) 
	
})

// Image Compression Task
gulp.task('img-compress', function() {
  gulp.src(config.source.imgs)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest(config.destination.imgs));
});

//gulp watch
// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.source.sass, gulp.task('compile-sass'));
    gulp.watch(config.source.sass, gulp.task('img-compress'));
    //gulp.watch(source.styles.site.watch, gulp.task('scripts:site'));
 
});


// Defualt Task.
gulp.task('default', function(){
	console.log(config.source.path);
});