
// quiz.js
// Description: process the requests related to quiz page.

const express = require('express')
var app = express()
var pool = require('../tools/database').pool		// defined in "../tools/database.js"

app.get('/quiz', (req, res) => { res.render('pages/quiz') })
app.get('/math', (req, res) => res.render('pages/math'))
app.get('/math2', (req, res) => res.render('pages/math2'))
app.get('/math3', (req, res) => res.render('pages/math3'))
app.get('/history', (req, res) => res.render('pages/history'))
app.get('/history2', (req, res) => res.render('pages/history2'))
app.get('/history3', (req, res) => res.render('pages/history3'))
app.get('/science', (req, res) => res.render('pages/science'))
app.get('/science2', (req, res) => res.render('pages/science2'))
app.get('/science3', (req, res) => res.render('pages/science3'))
app.get('/geography', (req, res) => res.render('pages/geography'))
app.get('/geography2', (req, res) => res.render('pages/geography2'))
app.get('/geography3', (req, res) => res.render('pages/geography3'))
// Path: "/checkin"
// Method: POST
// Desc: verify the quiz answer
app.post('/checkquiz', (req, res) => {
	let body = req.body
	let coins = 0, totalQuestions = 4
	let answers = Object.values(body)
	for (let i = 0; i < answers.length; i++) {
		if (answers[i] === '1') {
			coins += 5
		}
	}
	let username = req.cookies['username']
	let query_cmd = `UPDATE user_account SET coin=coin+$1 WHERE username=$2`
	pool.query(query_cmd, [coins, username] , (err, results) => {
		if (err) {
			res.status(500).render('pages/message', {
				'title': 'Error',
				'msg': 'Database error'
			})
		} else {
			if (coins === 0) {
				res.status(200).render('pages/message', {
					'title': 'Sorry, wrong answer~',
					'msg': `Better Luck Next Time`
				})
			} else {
				res.status(200).render('pages/message', {
					'title': `Great job!`,
					'msg': `You correctly answered ${ parseInt(coins / 5) } question(s). Earned ${ coins } Coins`
				})
			}
		}
	})
}) // End of POST "/checkquiz"

module.exports = app	// Export app

// End of quiz.js
