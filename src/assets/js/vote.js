var voteDeskConfig = (function () {
	return {
		init: function (voteId, token, name) {
			var _options = {
				'_license_key': voteId,
				'_role_token': token,
				'_registration_token': '',
				'_nick_name': name,
				'_widget_containerID': 'embedDeskWidget',
				'_widget_width': '100%',
				'_widget_height': '100vh',
			};
			(function () {
				!function (i) {
					i.Widget = function (c) {
						'function' == typeof c && i.Widget.__cbs.push(c),
							i.Widget.initialized && (i.Widget.__cbs.forEach(function (i) {
								i()
							}),
								i.Widget.__cbs = [])
					},
						i.Widget.__cbs = []
				}(window);
				var ab = document.createElement('script');
				ab.type = 'text/javascript';
				ab.async = true;
				ab.src = 'https://embed.livewebinar.com/em?t=' + _options['_license_key'] + '&' + Object.keys(_options).reduce(function (a, k) {
					a.push(k + '=' + encodeURIComponent(_options[k]));
					return a
				}, []).join('&');
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(ab, s);
			})();
		}
	}
})(voteDeskConfig || {});


var voteMobConfig = (function () {
	return {
		init: function (voteId, token, name) {
			var _options = {
				'_license_key': voteId,
				'_role_token': token,
				'_registration_token': '',
				'_nick_name': name,
				'_widget_containerID': 'embedMobWidget',
				'_widget_width': '100%',
				'_widget_height': '100vh',
			};
			(function () {
				!function (i) {
					i.Widget = function (c) {
						'function' == typeof c && i.Widget.__cbs.push(c),
							i.Widget.initialized && (i.Widget.__cbs.forEach(function (i) {
								i()
							}),
								i.Widget.__cbs = [])
					},
						i.Widget.__cbs = []
				}(window);
				var ab = document.createElement('script');
				ab.type = 'text/javascript';
				ab.async = true;
				ab.src = 'https://embed.livewebinar.com/em?t=' + _options['_license_key'] + '&' + Object.keys(_options).reduce(function (a, k) {
					a.push(k + '=' + encodeURIComponent(_options[k]));
					return a
				}, []).join('&');
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(ab, s);
			})();
		}
	}
})(voteMobConfig || {});
