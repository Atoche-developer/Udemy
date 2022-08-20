// *HTML
const htmlmin = require('gulp-htmlmin');

// *Css 
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const purgecss = require('gulp-purgecss');

// *IMG
const imagenmin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// *Js 
const babel = require('gulp-babel');


const html = (done) => {
    src('./*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('./'));
    done()
};

const css = (done) => {
    src('./src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css'))
    done()
}

const cssbuild = (done) => {
    src('./build/css/app.css')
        .pipe(purgecss({ content: ['index.html'] }))
        .pipe(dest('./build/css'))
    done()
};

const dev = (done) => {
    watch('./src/scss/**/*.scss', css);
    watch('./src/img/**/*', imagenes);
    done()
};

const imagenes = (done) => {
    src('./src/img/**/*')
        .pipe(imagenmin({ optimizationLevel: 3 }))
        .pipe(dest('./build/img'))
    done()
};

const imgWebp = (done) => {
    const opciones = {
        quality: 50
    };
    src('./src/img/**/*{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('./build/img'))
    done()
};

const imgAvif = (done) => {
    const opciones = {
        quality: 50
    };

    src('./src/img/**/*{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('./build/img'))
    done()
};

const js = (done) => {
    src('./src/js/index.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('./build/js'))
    done()
};

exports.html = html;

exports.css = css;
exports.dev = dev;

exports.cssbuild = cssbuild;

exports.imagenes = imagenes;
exports.imgWebp = imgWebp;
exports.imgAvif = imgAvif;

exports.js = js;

exports.default = series(js, imagenes, imgWebp, imgAvif, css, dev);