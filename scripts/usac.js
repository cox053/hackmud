function usac (context, args) // salt: 4
{
  // Loads dtr.lib with cloned context and args (see #s.dtr.man {page:'dtr.lib'})
  let d = ({d,context,args}=#s.dtr.lib({context:context,args:args}))
  // Sets up column headings for output
  const titles = [
    {name: d.color('index',2), dir:0, key:'index'},
    {name: d.color('name',2), dir:0, key:'name'},
    {name: d.color('rarity',2), dir:0, key:'rarity'},
    {name: d.color('tier',2), dir:0, key:'tier'},
    {name: d.color('hash',2), dir:0, key:'hash'},
    {name: d.color('usac',2), dir:0, key:'usac'},
  ]

  let data = [] // Array containing output rows
  let s = args ? args.salt || '' : ''  // Uses salt param if present, otherwise ''

  // Calculates usac value using hash of name, rarity, tier, sn, i and salt (credit to n00bish for code)
  function hashUsac (str) {
    let digits = [0, 0, 0, 0, 0, 0, 0]
    let valueOf = c =>
      (c == '_' ? 0 :
        /\d/.test(c) ? c :
        c.charCodeAt(0) - 97
      ) % 7
    str.toLowerCase().split('').forEach((c) => {
      digits[valueOf(c)]++
    })
    return digits.map(d => 'abcdef'[d % 6]).join('')
  }

  // Get all upgrades and iterate over each to calculate usac
  const u = #s.sys.upgrades({full: true})
  u.forEach((uElem) => {
    let hash = uElem.name + uElem.rarity + uElem.tier + uElem.sn + uElem.i + s
    let usac = hashUsac(hash)
    data.push({index:uElem.i, name:uElem.name, rarity:uElem.rarity, tier:uElem.tier, hash:hash, usac:usac})
  })

  return [ d.color(`Salt: '${s}'`,'J'),
    d.columns(data,titles,{},true)
  ]
}
