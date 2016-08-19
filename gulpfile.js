//
//	Require
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browsersync  = require('browser-sync');
var color        = require('gulp-color');
var concat       = require('gulp-concat');
var csscomb      = require('gulp-csscomb');
var cssnano      = require('gulp-cssnano');
var fs           = require('fs');
var gjade        = require('gulp-jade');
var gulpif       = require('gulp-if');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var run        	 = require('gulp-run');
var sass         = require('gulp-sass');
var sassdoc      = require('gulp-sassdoc');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var util         = require('gulp-util');
//
//	Defaults
var vers = util.env.vers;
if (vers === undefined) {
	console.log(color('Hold Up', 'RED'));
	console.log('Needs a version number, ex: "gulp taskname(optional) --vers 3".');
	console.log('Versions available: ' + fs.readdirSync('./app'));
	process.exit(1);
}
var isDev  = true;
var isProd = false;
var status = util.env.status;
if (status === 'production') {
	isProd = true;
	isDev  = false;
}
//
//	Paths
var paths = {
	font: {
        src:     './app/v' + vers + '/src/font/**/*.*',
        dist:    './app/v' + vers + '/dist/font/',
		export:  '\\\\assets2\\assets-dfs\\assets\\ui\\v' + vers + '\\font\\',
	},
	html: {
        src:     './app/v' + vers + '/src/**/*.html',
        dist:    './app/v' + vers + '/dist/',
		export:  '\\\\assets2\\assets-dfs\\assets\\ui\\v' + vers + '\\',
	},
	img: {
        src:     './app/v' + vers + '/src/img/**/*.*',
        dist:    './app/v' + vers + '/dist/img/',
		export:  '\\\\assets2\\assets-dfs\\assets\\ui\\v' + vers + '\\img\\',
	},
	jade: {
        src:     './app/v' + vers + '/src/**/*.jade',
        dist:    './app/v' + vers + '/dist/',
		export:  '\\\\assets2\\assets-dfs\\assets\\ui\\v' + vers + '\\',
	},
	jekyll: {
        src:     './app/v' + vers + '/',
        dist:    './app/v' + vers + '/_site/',
		export:  '\\\\assets2\\assets-dfs\\assets\\ui\\v' + vers + '\\',
		config:  './app/v' + vers + '/_config.yml',
		scripts: './app/v' + vers + '/js/**/*.js',
		styles:  './app/v' + vers + '/_sass/**/*.scss',
		stylesd: './app/v' + vers + '/css/',
		stylesi: './app/v' + vers + '/_includes/',
		html:    './app/v' + vers + '/*.html',
		include: './app/v' + vers + '/_includes/*',
		layouts: './app/v' + vers + '/_layouts/*',
		mockups: './app/v' + vers + '/_mockups/*',
		objectb: './app/v' + vers + '/_objects-bootstrap/*',
		objectu: './app/v' + vers + '/_objects-utilities/*',
		pages:   './app/v' + vers + '/_pages/*',
		posts:   './app/v' + vers + '/_posts/*',
	},
    scripts: {
        src:     './app/v' + vers + '/src/js/**/*.js',
        dist:    './app/v' + vers + '/dist/js/',
		export:  '\\\\assets2\\assets-dfs\\assets\\ui\\v' + vers + '\\js\\',
    },
	server:      './app/v' + vers + '/dist',
    styles: {
        src:     './app/v' + vers + '/src/sass/**/*.scss',
        dist:    './app/v' + vers + '/dist/css/',
        docs:    './app/v' + vers + '/dist/docs/',
		export:  '\\\\assets2\\assets-dfs\\assets\\ui\\v' + vers + '\\css\\',
    }
}
//
//	Tasks
gulp.task(font);
gulp.task(html);
gulp.task(img);
gulp.task(jade);
gulp.task(jekyllbuild);
gulp.task(jekyllrebuild);
gulp.task(jekyllsass);
gulp.task(jekyllserve);
gulp.task(jekyllwatch);
gulp.task(scripts);
gulp.task(serve);
gulp.task(styles);
gulp.task(watch);
gulp.task('jekyll',
	gulp.series(
		jekyllsass,
		jekyllbuild,
		jekyllserve,
		gulp.parallel(jekyllwatch)
	)
);
gulp.task('jekyll:export',
	gulp.series(
		jekyllsass,
		jekyllbuild
	)
);
gulp.task('build:export',
	gulp.series(
		font,
		html,
		img,
		jade,
		scripts,
		styles
	)
 );
gulp.task('build:watch',
	gulp.series(
		font,
		html,
		img,
		jade,
		scripts,
		styles,
		gulp.parallel(watch, serve)
	)
);

function font() {
    return gulp.src(paths.font.src)
		.pipe(plumber())
        .pipe(gulpif(isProd, gulp.dest(paths.font.export)))
        .pipe(gulp.dest(paths.font.dist))
        .pipe(browsersync.stream());
}

function html() {
    return gulp.src(paths.html.src)
		.pipe(plumber())
        .pipe(gulpif(isProd, gulp.dest(paths.html.export)))
        .pipe(gulp.dest(paths.html.dist))
        .pipe(browsersync.stream());
}

function img() {
    return gulp.src(paths.img.src)
		.pipe(plumber())
        .pipe(gulpif(isProd, gulp.dest(paths.img.export)))
        .pipe(gulp.dest(paths.img.dist))
        .pipe(browsersync.stream());
}

function jade() {
    return gulp.src(paths.jade.src)
		.pipe(plumber())
		.pipe(gjade({
			pretty: true
		}))
        .pipe(gulpif(isProd, gulp.dest(paths.jade.export)))
        .pipe(gulp.dest(paths.jade.dist))
        .pipe(browsersync.stream());
}

function jekyllbuild() {
	browsersync.notify('Running: $ jekyll build');
	return gulp.src(paths.jekyll.src)
		.pipe(gulpif(isProd, run('jekyll build'
			  + ' --source ' + paths.jekyll.src
			  + ' --destination ' + paths.jekyll.export
			  + ' --config ' + paths.jekyll.config)))
		.pipe(gulpif(isDev, run('jekyll build'
			  + ' --source ' + paths.jekyll.src
			  + ' --destination ' + paths.jekyll.dist
			  + ' --config ' + paths.jekyll.config)))
		.on('error', util.log);
}

function jekyllrebuild() {
	console.log("I'm working!");
	//	gulp.series(
	//		jekyllbuild,
	//		gulp.parallel(browsersync.reload())
	//	)
}

function jekyllsass() {
    return gulp.src(paths.jekyll.styles)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulpif(isProd, sourcemaps.init()))
        .pipe(gulpif(isProd, autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        })))
		.pipe(gulpif(isProd, cssnano({
			core: true,
            discardComments: { removeAll: true },
			discardUnused: false
		})))
		.pipe(gulpif(isDev, csscomb()))
		.pipe(gulpif(isProd, sourcemaps.write('map')))
        .pipe(gulpif(isProd, gulp.dest(paths.jekyll.stylesd)))
        .pipe(gulpif(isDev, gulp.dest(paths.jekyll.stylesi)))
        .pipe(browsersync.stream());
}

function jekyllserve() {
    browsersync.init({
        server: paths.jekyll.dist,
        notify: true
    });
}

function jekyllwatch() {
	gulp.watch(paths.jekyll.scripts, jekyllrebuild);
	gulp.watch(paths.jekyll.styles, jekyllrebuild);
	gulp.watch(paths.jekyll.html, jekyllrebuild);
	gulp.watch(paths.jekyll.include, jekyllrebuild);
	gulp.watch(paths.jekyll.layouts, jekyllrebuild);
	gulp.watch(paths.jekyll.mockups, jekyllrebuild);
	gulp.watch(paths.jekyll.objectb, jekyllrebuild);
	gulp.watch(paths.jekyll.objectu, jekyllrebuild);
	gulp.watch(paths.jekyll.pages, jekyllrebuild);
	gulp.watch(paths.jekyll.posts, jekyllrebuild);
}

function scripts() {
	return gulp.src(paths.scripts.src)
		.pipe(plumber())
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulpif(isProd, gulp.dest(paths.scripts.export)))
		.pipe(gulp.dest(paths.scripts.dist))
        .pipe(browsersync.stream());
}

function serve() {
    browsersync.init({
        server: paths.server,
        notify: true
    });
}

function styles() {
    return gulp.src(paths.styles.src)
		.pipe(sass().on('error', sass.logError))
		//	.pipe(sassdoc({
		//		dest: paths.styles.docs
		//	}))
		.pipe(gulpif(isProd, sourcemaps.init()))
        .pipe(gulpif(isProd, autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        })))
		.pipe(gulpif(isProd, cssnano({
			core: true,
            discardComments: { removeAll: true },
			discardUnused: false
		})))
		.pipe(gulpif(isDev, csscomb()))
		.pipe(gulpif(isProd, sourcemaps.write('map')))
        .pipe(gulpif(isProd, gulp.dest(paths.styles.export)))
        .pipe(gulp.dest(paths.styles.dist))
        .pipe(browsersync.stream());
};

function watch() {
	gulp.watch(paths.font.src).on('change', font);
	gulp.watch(paths.html.src).on('change', html);
	gulp.watch(paths.img.src).on('change', img);
	gulp.watch(paths.jade.src).on('change', jade);
	gulp.watch(paths.scripts.src).on('change', scripts);
	gulp.watch(paths.styles.src).on('change', styles);
};
