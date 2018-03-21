export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + "").substr(4 - RegExp.$1.length)
		)
	}
	let o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds()
	}
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ""
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? str : padLeftZero(str)
			)
		}
	}
	return fmt
}

function padLeftZero(str) {
	return ("00" + str).substr(str.length)
}

// 输入的时间格式为yyyy-MM-dd
export function convertDateFromString(dateString) {
	if (dateString) {
		var date = new Date(dateString.replace(/-/, "/"))
		return date
	}
}

// 获取前一个月 参数格式为yyyy-MM-dd
// 会给出日期信息
export function getPreMonth(date) {
	var arr = date.split("-")
	var year = arr[0] //获取当前日期的年份
	var month = arr[1] //获取当前日期的月份
	var day = arr[2] //获取当前日期的日
	var days = new Date(year, month, 0)
	days = days.getDate() //获取当前日期中月的天数
	var year2 = year
	var month2 = parseInt(month) - 1
	if (month2 == 0) {
		year2 = parseInt(year2) - 1
		month2 = 12
	}
	var day2 = day
	var days2 = new Date(year2, month2, 0)
	days2 = days2.getDate()
	if (day2 > days2) {
		day2 = days2
	}
	if (month2 < 10) {
		month2 = "0" + month2
	}
	var t2 = year2 + "-" + month2 + "-" + day2
	return t2
}

// 获取后一个月 参数格式为yyyy-MM-dd
// 会给出日期信息
export function getNextMonth(date) {
	var arr = date.split("-")
	var year = arr[0] //获取当前日期的年份
	var month = arr[1] //获取当前日期的月份
	var day = arr[2] //获取当前日期的日
	var days = new Date(year, month, 0)
	days = days.getDate() //获取当前日期中的月的天数
	var year2 = year
	var month2 = parseInt(month) + 1
	if (month2 == 13) {
		year2 = parseInt(year2) + 1
		month2 = 1
	}
	var day2 = day
	var days2 = new Date(year2, month2, 0)
	days2 = days2.getDate()
	if (day2 > days2) {
		day2 = days2
	}
	if (month2 < 10) {
		month2 = "0" + month2
	}

	var t2 = year2 + "-" + month2 + "-" + day2
	return t2
}
