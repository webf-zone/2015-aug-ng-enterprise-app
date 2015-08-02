/* @author Harshal Patil (harshal.rp@gmail.com)
 * @description Gulp build script
 * @version 1.0.0
 */

/* global require */
/* global process */

// Gulp specific
var gulp = require("gulp");
var tar = require("gulp-tar");
var concat = require("gulp-concat");
var runSequence = require("run-sequence");
var rename = require("gulp-rename");

// Logger modules
var gutil = require("gulp-util");
var colors = gutil.colors;

// File handling related modules
var del = require("del");
var fs = require("fs");

// Stream related modules
var merge = require("merge-stream");
var through2 = require("through2");

// CSS, SASS and styling related modules
var cssimport = require("gulp-cssimport");
var sass = require("gulp-sass");
var minifyCSS = require("gulp-minify-css");
var autoprefixer = require("autoprefixer-core");
var postCss = require("gulp-postcss");

// JavaScript related modules
var eslint = require("gulp-eslint");
var uglify = require("gulp-uglify");

// SVG and sprite related modules
var svgSprite = require("gulp-svg-sprite");

// Testing related modules
var KarmaServer = require("karma").Server;

// Local variables
var buildMode = process.argv[2] || "release";
var browsers = ["last 2 version"];

// System wide paths
var paths = (function () {

    var jsFiles, cssMain, resources;

    resources = [];
    cssMain = "commons/scss/main.scss";

    jsFiles = [
        "commons/js/index.js",
        "commons/**/*.js",
        "modules/**/*.js"
    ];

    return {
        src: "./src/",
        icons: "./vendor/icons/",
        iconSprite: "sprite.symbol.svg",
        dest: "./dist",
        resources: resources,
        cssMain: cssMain,
        jsFiles: jsFiles,
    };

})();

// File selection filters
var filters = (function () {
    return {
        all: "**/*.*",
        js: "**/*.{js,jst}",
        css: "**/*.css",
        svg: "**/*.svg",
        scss: "**/*.scss",
        images: "**/*.{jpg,jpeg,gif,png}",
        jscss: "**/*.{js,jst,css,scss}",
        html: "**/*.html"
    };
})();

// Clean the dist directory
del.sync([paths.dest]);

gulp.task("svg-sprite", function () {
    var config = {
        shape: {
            id: {
                separator: "-",
                whitespace: "-",
                generator: "icon-%s"
            }
        },
        mode: {
            inline: true,
            symbol: {
                dest: ".",
                sprite: paths.iconSprite,
                //example: true,
                inline: true,
            }
        }
    };

    return gulp.src([filters.svg, "!" + paths.iconSprite], { base: paths.icons, cwd: paths.icons })
        .pipe(svgSprite(config))
        .pipe(gulp.dest(paths.icons));
});

gulp.task("copy", function () {

    return gulp.src([filters.svg, filters.html, filters.images], { base: paths.cwd, cwd: paths.src })
        .pipe(gulp.dest(paths.dest));
});

gulp.task("resource", function (done) {

    var streams = merge(),
        resources = Object.keys(paths.resources);

    if (resources.length > 0) {
        resources.forEach(function (resource) {

            var stream = gulp.src(resource, { cwd: paths.src })
                .pipe(rename(function (path) {
                    path.dirname = "";
                }))
                .pipe(gulp.dest(paths.dest + paths.resources[resource]));

            streams.add(stream);
        });

        return streams;

    } else {
        done();
    }

});

gulp.task("eslint", function () {
    return gulp.src([filters.js], { cwd: paths.src })
        .pipe(eslint())
        .pipe(eslint.format("stylish"))
        .pipe(buildMode === "dev" ? gutil.noop() : eslint.failAfterError());
});


gulp.task("sass", function () {
    return gulp.src([paths.cssMain], { base: paths.src, cwd: paths.src })
        .pipe(sass())
        .pipe(cssimport({
            extensions: ["css"]
        }))
        .pipe(postCss([autoprefixer({ browsers: browsers })]))
        .pipe(buildMode === "dev" ? gutil.noop() : minifyCSS())
        .pipe(gulp.dest(paths.dest));
});

gulp.task("jsbundle", function () {

    return gulp.src(paths.jsFiles, { cwd: paths.src })
        .pipe(concat("plugin-bundle.jst"))
        .pipe(buildMode === "dev" ? gutil.noop() : uglify())
        .pipe(gulp.dest(paths.dest));
});

gulp.task("watcher", function (done) {

    gulp.watch([filters.svg, filters.html, filters.images], { cwd: paths.src }, function (event) {
        gutil.log("Modified:", colors.yellow(event.path));

        runSequence("copy");
    });

    gulp.watch(filters.js, { cwd: paths.src }, function (event) {
        gutil.log("Modified:", colors.yellow(event.path));

        runSequence("jsbundle");
    });

    gulp.watch([filters.css, filters.scss], { cwd: paths.src }, function (event) {
        gutil.log("Modified:", colors.yellow(event.path));
        runSequence("sass");
    });

    done();

});

gulp.task("ut", function (done) {
    gulp.task("ut", function (done) {
        var config = {
            configFile: __dirname + "/karma.conf.js",
            singleRun: true
        };

        new KarmaServer(config, done).start();
    });
});

// Compress task
gulp.task("upload", ["common", "ut"], function (done) {
    // Add some TODO code

    gutil.log(colors.bold.yellow("Uploaded bundle to server"));
    done();
});

// Common task
gulp.task("common", ["eslint", "resource", "copy", "sass", "jsbundle"]);

// dev mode task
gulp.task("dev", ["common", "watcher"], function (done) {
    gutil.log(colors.bold.yellow("Watchers Established. You can now start coding."));
    done();
});

// production mode task
gulp.task("release", ["common", "upload"], function (done) {
    gutil.log(colors.bold.yellow("Production build is ready."));
    done();
});

gulp.task("default", ["release"]);