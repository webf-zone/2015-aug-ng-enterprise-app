/* Gulp Build file
 * Options related to JSHint go below
 */

/* global require */
/* global process */

// Gulp specific
var gulp = require("gulp");
var gzip = require("gulp-gzip");
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
var glob = require("glob");
var path = require("path");

// Stream related modules
var merge = require("merge-stream");
var through2 = require("through2");

// Network modules
var request = require("request");

// CSS, SASS and styling related modules
var cssimport = require("gulp-cssimport");
var sass = require("gulp-sass");
var minifyCSS = require("gulp-minify-css");
var autoprefixer = require('autoprefixer-core');
var postCss = require("gulp-postcss");

// JavaScript related modules
var jshint = require("gulp-jshint");
var jshintStylish = require("jshint-stylish");
var uglify = require("gulp-uglify");

// Testing related modules
var karma = require('karma').server;

// Local variables
var pkg = require("./package.json");
var pluginOpts = pkg.samplePluginProps;
var archiveName = pkg.name + "." + pkg.version + pluginOpts.archiveExtension;
var buildMode = process.argv[2] || "release";
var browsers = pluginOpts.targetBrowsers;

// System wide paths
var paths = (function() {
    return {
        src: "./src/",
        build: pluginOpts.buildDestination,
        dest: pluginOpts.buildDestination + "/",
        preloads: pluginOpts.preloads,
        preloadFolder: "libraries/",
        cssMain: pluginOpts.cssMain,
        jsFiles: pluginOpts.jsFiles
    };
})();

// File selection filters
var filters = (function() {
    return {
        all: "**/*.*",
        js: "**/*.js",
        css: "**/*.css",
        scss: "**/*.scss",
        jscss: "**/*.{js,css,scss}",
        html: "**/*.html"
    };
})();

// Clean the dist directory
del.sync([paths.dest]);

gulp.task("copy", function() {
    return gulp.src([filters.all, "../package.json", "!" + filters.jscss], {
            cwd: paths.src
        })
        .pipe(gulp.dest(paths.dest));
});

gulp.task("jshint", function() {
    return gulp.src([filters.js, filters.html], {
            cwd: paths.src
        })
        .pipe(jshint.extract("auto"))
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish))
        .pipe(buildMode === "dev" ? gutil.noop() : jshint.reporter("fail"));
});

gulp.task("preload", ["jshint"], function() {

    return gulp.src(paths.preloads, {
            base: paths.src,
            cwd: paths.src
        })
        .pipe(concat("load.js", {
            newLine: ";"
        }))
        .pipe(buildMode === "dev" ? gutil.noop() : uglify())
        .pipe(gulp.dest(paths.dest + paths.preloadFolder));
});

gulp.task("sass", function() {
    return gulp.src([paths.cssMain], {
            base: paths.src,
            cwd: paths.src
        })
        .pipe(sass())
        .pipe(cssimport({
            extensions: ["css"]
        }))
        .pipe(postCss([autoprefixer({
            browsers: browsers
        })]))
        .pipe(buildMode === "dev" ? gutil.noop() : minifyCSS())
        .pipe(gulp.dest(paths.dest));
});

gulp.task("jsbundle", function(done) {

    return gulp.src(paths.jsFiles, {
            cwd: paths.src
        })
        .pipe(concat("app.js"))
        .pipe(buildMode === "dev" ? gutil.noop() : uglify())
        .pipe(gulp.dest(paths.dest + "commons/js/"));
});

gulp.task("watcher", function(done) {

    gulp.watch(paths.src + "index.html", function(event) {
        gutil.log("Modified:", colors.yellow(event.path));
        runSequence("zip", "upload");
    });

    gulp.watch(paths.src + filters.js, function(event) {
        gutil.log("Modified:", colors.yellow(event.path));
        runSequence("jsbundle", "zip", "upload");
    });

    gulp.watch([paths.src + filters.css, paths.src + filters.scss], function(event) {
        gutil.log("Modified:", colors.yellow(event.path));
        runSequence("sass", "zip", "upload");
    });

    done();

});

gulp.task("ut", function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

// Compress task
gulp.task("compress", ["common"], function(done) {
    runSequence("zip", done);
});

gulp.task("zip", function() {

    gutil.log("Building package: ", colors.red(archiveName));

    return gulp.src([paths.build + "**/**.*"], {
            buffer: false
        })
        .pipe(tar(archiveName))
        .pipe(gzip({
            append: false
        }))
        .pipe(gulp.dest(".").on("finish", function() {
            gutil.log(colors.bold("Package built"));
        }));
});

// Just plain vanilla upload
gulp.task("upload", function(done) {

    var fileToUpload = "./" + archiveName;

    gutil.log("Uploading package to Server");

    request({
        url: "http://localhost:8000/updatePlugin",
        method: "POST",
        formData: {
            "f": fs.createReadStream(fileToUpload)
        }
    }, function(error) {
        if (error) {
            gutil.log(colors.bold.bgRed("COULD NOT UPLOAD THE PACKAGE"));
            gutil.log(colors.bold("CHECK IF SERVER IS RUNNING"));
        } else {
            gutil.log(colors.bold.green("PACKAGE UPLOADED SUCCESSFULLY"));
        }
        done();
    });

});
// Common task
gulp.task("common", ["jshint", "copy", "preload", "sass", "jsbundle"]);

// dev mode task
gulp.task("dev", ["common", "compress", "watcher"], function(done) {
    gutil.log(colors.bold.yellow("Watchers Established. You can now start coding"));
    runSequence("upload", done);
});

// test mode task
gulp.task("test", ["common", "compress"], function(done) {
    runSequence("ut", "upload", done);
});

// production mode task
gulp.task("release", ["common", "compress"], function(done) {
    runSequence("ut", "upload", done);
});

gulp.task("default", ["release"]);