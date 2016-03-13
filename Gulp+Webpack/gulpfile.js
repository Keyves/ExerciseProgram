var gulp = require('gulp'),
	del = require('del'),
	path = require('path'),
	autoprefixer = require('gulp-autoprefixer'),
	gutil = require('gulp-util'),
	spriter = require('gulp-css-spriter'),
	base64 = require('gulp-css-base64'),
	webpack = require('webpack'),
	webpackDevServer = require('webpack-dev-server'),
	webpackConfig = require('./webpack.config.js'),
	webpackDevServerConfig = require('./webpackDevServer.config.js'),
	browserSync = require('browser-sync');

// js/app.js 精确匹配文件
// js/*.js 仅匹配js目录下的所有后缀为.js的文件
// js/*/.js 匹配js目录及其子目录下所有后缀为.js的文件
// !js/app.js 从匹配结果中排除js/app.js，这种方法在你想要匹配除了特殊文件之外的所有文件时非常管用
// *.+(js|css) 匹配根目录下所有后缀为.js或者.css的文件

var dir = {
	input: {
		html: 'src/app/*.html',
		js: 'src/js/*.js',
		css: 'src/css/*.css',
		images: 'src/images/*'
	},
	output: {
		html: 'build/app/',
		js: 'build/js/',
		css: 'build/css/',
		images: 'build/images/'
	}
};

function outToIn(src, file) {
	file = file || '*';
	return path.join(src, file);
}

//mac chrome: 'Google chrome', 
//var browser = os.platform() === 'linux' ? 'Google chrome' : (os.platform() === 'darwin' ? 'Google chrome' : (os.platform() === 'win32' ? 'chrome' : 'firefox'));

gulp.task('clean', function() {
	return del(['build']);
});


//引用webpack对js进行编译、压缩、合并操作, js内部css加载 webpackDevServer启动服务器
gulp.task('webpack:dev', function(callback) {
	var myWebpackDevServerConfig = Object.create(webpackDevServerConfig);

	new webpackDevServer(webpack(myWebpackDevServerConfig), myWebpackDevServerConfig.devServer)
		.listen(3000, 'localhost', function(err) {
			if (err) throw new gutil.PluginError("webpack:dev", err);
			// gutil.log('[webpack:dev]', 'http://localhost:3000/');
			callback();
		});
});
//引用webpack对js进行编译、压缩、合并操作, js内部css加载
gulp.task('webpack:build', function(callback) {
	var myWebConfig = Object.create(webpackConfig);

	webpack(myWebConfig).run(function(err, stats) {
		if (err) throw new gutil.PluginError("webpack:build", err);
		gutil.log('[webpack:build]', stats.toString({
			colors: true,
			profile: true
		}));
		callback();
	});
});

//css中base64转换、雪碧图操作
gulp.task('css:images', function() {
	var timestamp = +new Date();
	return gulp.src(dir.input.css)
		.pipe(base64({
			baseDir: '../images',
			maxWeightResource: 100 * 1024 // 小于20KB
				/*extensionsAllowed: ['.jpg', '.png']*/
		}))
		.pipe(spriter({
			spriteSheet: './' + path.join(dir.output.images, '/spriter_' + timestamp + '.png'), // './build/images/spriter_' + timestamp + '.png',
			pathToSpriteSheetFromCSS: '../images/spriter_' + timestamp + '.png',
			spritesmithOptions: {
				padding: 10
			}
		}))
		.pipe(gulp.dest(dir.output.css));
});

//压缩合并css, css中既有自己写的.sass, 也有引入第三方库的.css
gulp.task('css:work', function() {
	return gulp.src(outToIn(dir.output.css))
		.pipe(autoprefixer())
		.pipe(gulp.dest(dir.output.css))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//静态服务器
gulp.task('server', function(callback) {
	browserSync({
		/*		server: {
					baseDir: './'
				},*/
		proxy: 'http://localhost:3000',
		startPath: path.join(dir.output.html, 'index.html'),
		notify: false,
		online: false,
		browser: "google chrome",
		open: 'local'
	}, callback);
});

//发布
gulp.task(
	'build',
	gulp.series(
		'clean',
		gulp.parallel(
			// gulp.series('css:images', 'css:work'),
			'webpack:build'
		)
		// 'css:md5',
		// 'js:md5'
	)
);


//开发
gulp.task(
	'dev',
	gulp.series(
		'clean',
		'webpack:dev'
		// gulp.series('css:images', 'css:work'),
	)
);