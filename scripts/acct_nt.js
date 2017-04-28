function (context, args) { // from: "", to: "", memo:<true>
  /** Libraries */
  const l = #s.scripts.lib()
  let d = ({d,context,args}=#s.dtr.lib({context:context,args:args}))
  let balance = 0

	/** Constants */
  let transactions = #s.accts.transactions({count: 'all'})
  const from = toDate(args.from).valueOf()
  const to = toDate(args.to).valueOf()
  const data = []

  // Sets up column headings for output
  const titles = [
    {name: d.color('time',2), dir:0, key:'time'},
    {name: d.color('amount',2), dir:-4, key:'amount'},
    {name: d.color('balance',2), dir:-4, key:'balance'},
    {name: d.color('memo',2), dir:0, key:'memo'},
  ]

  transactions = l.select(transactions, (i, t) => {
    return isValid(t)
  })

  transactions = transactions.sort((a,b) => {
    if (a.time < b.time) {
      return -1
    }
    if (a.time > b.time) {
      return 1
    }
    if (a.time === b.time) {
      return 0
    }
  })

  for (let transaction of transactions) {
    if (transaction.sender !== context.caller) {
      balance += Number(transaction.amount)
			// Not sender so positive value formatted green
      transaction.amount = d.color(transaction.amount.toString(), 'L')
    } else {
      balance -= Number(transaction.amount)
			// Sender so negative value formatted red
      transaction.amount = d.color(transaction.amount.toString(), 'd')
    }
    data.push({time: l.to_game_timestr(transaction.time), amount: transaction.amount, balance: balance, memo: transaction.memo})
  }

  function toDate (gameTimeStr) {
		// Will always be in format YYMMDD.hhmm
    const year = Number('20' + gameTimeStr.substr(0,2))
    const month = Number(gameTimeStr.substr(2,2)) - 1
    const day = Number(gameTimeStr.substr(4,2))
    const hour = Number(gameTimeStr.substr(7,2))
    const minute = Number(gameTimeStr.substr(9,2))
    return new Date(year, month, day, hour, minute,0)
  }

  function isValid (t) {
    let time = t.time.valueOf()
    let valid = false
    if (args.memo === true) {
      valid = (t.memo)
    } else if (args.memo === false) {
      valid = (!t.memo)
    } else {
      valid = true
    }
    return (valid && time <= to && time >= from)
  }

  return [`from: ${args.from} | to: ${args.to}`,
    d.columns(data, titles, {}, true)
  ]
}
