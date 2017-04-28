function (context, args) { // t: #s.script.name, lock: 'c00x', comb: {obj: ''}
  const pass = ['unlock', 'open', 'release']
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
  const colors = ['red', 'green', 'orange', 'cyan', 'yellow', 'blue', 'lime', 'purple']
  const complements = {
    red: 'green',
    orange: 'cyan',
    yellow: 'blue',
    green: 'red',
    lime: 'purple',
    blue: 'yellow',
    cyan: 'orange',
    purple: 'lime'
  }
  const triads = {
    red: ['cyan', 'lime'],
    green: ['orange', 'purple'],
    orange: ['blue', 'green'],
    cyan: ['yellow', 'red'],
    yellow: ['purple', 'cyan'],
    blue: ['lime', 'orange'],
    lime: ['red', 'blue'],
    purple: ['green', 'yellow']
  }
  let done = false
  let comb = {}
  let out

  do {
    out = args.t.call(comb)
    /** EZ_21 */
    if (out.indexOf('EZ_21') > -1) {
      for (let i = 0; i < pass.length; i++) {
        comb['ez_21'] = pass[i]
        out = args.t.call(comb)
        if (out.indexOf('ez_21') > -1 || out.indexOf('terminated') > -1) {
          break
        }
      }
    }
    /** EZ_35 */
    if (out.indexOf('EZ_35') > -1) {
      for (let i = 0; i < pass.length; i++) {
        comb['ez_35'] = pass[i]
        out = args.t.call(comb)
        if (out.indexOf('digit') > -1) {
          for (let j = 0; j < 10; j++) {
            comb['digit'] = j
            out = args.t.call(comb)
            if (out.indexOf('ez_35') > -1 || out.indexOf('terminated') > -1) {
              done = true
              break
            }
          }
        }
        if (done) {
          done = false
          break
        }
      }
    }
    /** EZ_40 */
    if (out.indexOf('EZ_40') > -1) {
      for (let i = 0; i < pass.length; i++) {
        comb['ez_40'] = pass[i]
        out = args.t.call(comb)
        if (out.indexOf('ez_prime') > -1) {
          for (let j = 0; j < primes.length; j++) {
            comb['ez_prime'] = primes[j]
            out = args.t.call(comb)
            if (out.indexOf('ez_40') > -1 || out.indexOf('terminated') > -1) {
              done = true
              break
            }
          }
        }
        if (done) {
          done = false
          break
        }
      }
    }
    /** c001 */
    if (out.indexOf('c001') > -1) {
      for (let i = 0; i < colors.length; i++) {
        comb['c001'] = colors[i]
        out = args.t.call(comb)
        if (out.indexOf('color_digit') > -1) {
          comb['color_digit'] = comb['c001'].length
          out = args.t.call(comb)
          break
        }
      }
    }
    /** c002 */
    if (out.indexOf('c002') > -1) {
      for (let i=0; i<colors.length; i++) {
        comb['c002'] = colors[i]
        out = args.t.call(comb)
        if (out.indexOf('c002_complement') > -1) {
          comb['c002_complement'] = complements[comb['c002']]
          out = args.t.call(comb)
          break
        }
      }
    }
    /** c003 */
    if (out.indexOf('c003') > -1) {
      for (let i=0; i<colors.length; i++) {
        comb['c003'] = colors[i]
        out = args.t.call(comb)
        if (out.indexOf('c003_triad_1') > -1) {
          comb['c003_triad_1'] = triads[comb['c003']][0]
          comb['c003_triad_2'] = triads[comb['c003']][1]
          out = args.t.call(comb)
          break
        }
      }
    }
  }

  while (out.indexOf('LOCK_ERROR') > -1)

  return {
    ok: done,
    msg: comb
  }
}