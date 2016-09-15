'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = require('path');

module.exports = function (context) {

	var Component = context.React.Component;
	var React = context.React;
	var $ = context.jQuery;
	var remote = context.electron.remote;

	var pressmaticPath = remote.app.getAppPath();

	return function (_Component) {
		_inherits(SiteInfoLogs, _Component);

		function SiteInfoLogs(props) {
			_classCallCheck(this, SiteInfoLogs);

			var _this = _possibleConstructorReturn(this, (SiteInfoLogs.__proto__ || Object.getPrototypeOf(SiteInfoLogs)).call(this, props));

			_this.getLog = _this.getLog.bind(_this);

			_this.showApacheAccess = _this.showApacheAccess.bind(_this);
			_this.showApacheError = _this.showApacheError.bind(_this);
			_this.showApacheVhosts = _this.showApacheVhosts.bind(_this);
			_this.showNginxAccess = _this.showNginxAccess.bind(_this);
			_this.showNginxError = _this.showNginxError.bind(_this);
			_this.showMysqlError = _this.showMysqlError.bind(_this);
			_this.showPhpError = _this.showPhpError.bind(_this);
			_this.showPhpFpm = _this.showPhpFpm.bind(_this);

			_this.siteID = this.props.params.siteID;
			_this.site = this.props.sites[_this.siteID];
			_this.viewTitle = 'Select a Log File';
			_this.activeView = false;

			_this.stylesheetPath = path.resolve(__dirname, '../style.css');
			_this.logPath = path.resolve(this.site.path, 'logs');
			_this.apacheClass = this.site.webServer === 'apache' ? '' : ' hiddenGroup';
			_this.nginxClass = this.site.webServer === 'nginx' ? '' : ' hiddenGroup';
			return _this;
		}

		_createClass(SiteInfoLogs, [{
			key: 'getLog',
			value: function getLog(file) {
				var _logFile = path.resolve(this.logPath, file);
				var _monitor = $('.logview-monitor');
				this.forceUpdate();

				_monitor.text('');

				var div = $('.logview-monitor');
				var reader = require('fs-reader');
				reader(_logFile, -25, function(err, contents) {
					if(err) throw err;

					contents.split("\n").map(function (line) {
						if(line !== '... <<< more >>>' && line !== '') {
							_monitor.append(line + "<br /><br />");
							div.scrollTop(div[0].scrollHeight);
						}
					});
				});

				var ft = require('file-tail').startTailing(_logFile);
				ft.on('line', function(line) {
					_monitor.append(line + "<br /><br />");
					div.scrollTop(div[0].scrollHeight);
				});
				return;
			}
		}, {
			key: 'showApacheAccess',
			value: function showApacheAccess() {
				this.viewTitle = 'Apache Access Log';
				this.activeView = 'apacheAccess';
				this.getLog('apache/access.log');
			}
		}, {
			key: 'showApacheError',
			value: function showApacheError() {
				this.viewTitle = 'Apache Error Log';
				this.activeView = 'apacheError';
				this.getLog('apache/error.log');
			}
		}, {
			key: 'showApacheVhosts',
			value: function showApacheVhosts() {
				this.viewTitle = 'Apache VHosts Log';
				this.activeView = 'apacheVhosts';
				this.getLog('apache/other_vhosts_access.log');
			}
		}, {
			key: 'showNginxAccess',
			value: function showNginxAccess() {
				this.viewTitle = 'Nginx Access Log';
				this.activeView = 'nginxAccess';
				this.getLog('nginx/access.log');
			}
		}, {
			key: 'showNginxError',
			value: function showNginxError() {
				this.viewTitle = 'Nginx Error Log';
				this.activeView = 'nginxError';
				this.getLog('nginx/error.log');
			}
		}, {
			key: 'showMysqlError',
			value: function showMysqlError() {
				this.viewTitle = 'MySQL Error Log';
				this.activeView = 'mysqlError';
				this.getLog('mysql/error.log');
			}
		}, {
			key: 'showPhpError',
			value: function showPhpError() {
				this.viewTitle = 'PHP Error Log';
				this.activeView = 'phpError';
				this.getLog('php/' + this.site.phpVersion + '/error.log');
			}
		}, {
			key: 'showPhpFpm',
			value: function showPhpFpm() {
				this.viewTitle = 'PHP FPM Log';
				this.activeView = 'phpFpm';
				this.getLog('php/' + this.site.phpVersion + '/php-fpm.log');
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'logs-container' },
					React.createElement('link', { rel: 'stylesheet', href: this.stylesheetPath }),
					React.createElement(
						'div',
						{ className: 'wrapper' },
						React.createElement(
							'div',
							{ className: 'logview' },
							React.createElement(
								'h4',
								{ className: 'padded-horizontally-more', style: { marginTop: 0 } },
								this.viewTitle
							),
							React.createElement(
								'div',
								{ className: 'padded-horizontally-more logview-monitor' }
							)
						),
						React.createElement(
							'div',
							{ className: 'toolbar toolbar-footer' },
							React.createElement(
								'div',
								{ className: 'toolbar-title' },
								'Logs:'
							),
							React.createElement(
								'div',
								{ className: 'toolbar-actions' },
								React.createElement(
									'div',
									{ className: 'btn-group' + this.apacheClass },
									React.createElement(
										'button',
										{ className: 'btn btn-default btn-small',
											disabled: this.activeView && this.activeView === 'apacheAccess',
											onClick: this.showApacheAccess },
										'Apache Access'
									),
									React.createElement(
										'button',
										{ className: 'btn btn-default btn-small',
											disabled: this.activeView && this.activeView === 'apacheError',
											onClick: this.showApacheError },
										'Error'
									),
									React.createElement(
										'button',
										{ className: 'btn btn-default btn-small',
											disabled: this.activeView && this.activeView === 'apacheVhosts',
											onClick: this.showApacheVhosts },
										'VHosts'
									)
								),
								React.createElement(
									'div',
									{ className: 'btn-group' + this.nginxClass },
									React.createElement(
										'button',
										{ className: 'btn btn-default btn-small',
											disabled: this.activeView && this.activeView === 'nginxAccess',
											onClick: this.showNginxAccess },
										'Nginx Access'
									),
									React.createElement(
										'button',
										{ className: 'btn btn-default btn-small',
											disabled: this.activeView && this.activeView === 'nginxError',
											onClick: this.showNginxError },
										'Error'
									)
								),
								React.createElement(
									'div',
									{ className: 'btn-group' },
									React.createElement(
										'button',
										{ className: 'btn btn-default btn-small',
											disabled: this.activeView && this.activeView === 'mysqlError',
											onClick: this.showMysqlError },
										'MySQL Error'
									)
								),
								React.createElement(
									'div',
									{ className: 'btn-group' },
									React.createElement(
										'button',
										{ className: 'btn btn-default btn-small',
											disabled: this.activeView && this.activeView === 'phpError',
											onClick: this.showPhpError },
										'PHP Error'
									),
									React.createElement(
										'button',
										{ className: 'btn btn-default btn-small',
											disabled: this.activeView && this.activeView === 'phpFpm',
											onClick: this.showPhpFpm },
										'FPM'
									)
								)
							)
						)
					)
				);
			}
		}]);

		return SiteInfoLogs;
	}(Component);
};
