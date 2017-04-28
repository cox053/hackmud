function t3_brute (Z, Y, s, u, a, p, l, P, o, t, m, r) // s:#s.corp.priv, u:'username', m:false, p:0
{
  // Z and Y are context and args respectively
  // s is scriptor from Y.s
  // u is username from Y.u
  // a is args object used to call scriptor 's.call(a)'
  // p is current pin number from Y.p
  // l is scripts.lib()
  // P is formatted pin number ('0013' instead of 13, needed for script input and used for output)
  // o is s.call(a) output in lowercase
  // t is a temporary string used to store the command used to continue bruteforcing
  // m is minimal output toggle value from Y.m
  // r is regex used to test if brute succeeded
  l = #s.scripts.lib()
  s = Y.s
  u = Y.u
  try {
    p = (Y.p >= 0) ? Y.p : #db.f({_id:'t3_brute'}).first().pin
  }
  catch (err) {
    p = 0
    #db.i({_id:'t3_brute', pin:p})
  }
  //p = Y.p || 0;
  m = Y.m
  a = {
    username: u
  }
  r = /pin|incorrect/

  let pOrig = p

  do { a.pin = P = '0'.repeat(4 - p.toString().length) + p++ }

  while (l.can_continue_execution(800) && r.test(o = s.call(a).toString().toLowerCase())) {
    t = `     ${Z.this_script}{s:#s.${s.name}, u:'${u}', p:${p}, m:${m?true:false}}`
  }

  #db.u({_id:'t3_brute'}, {$set:{pin:P}})

  return m ? [
    P,
    t,
    `diff: ${p-pOrig}`
  ] : [
    P,
    `diff: ${p-pOrig}`,
    '',
    t,
    t,
    t,
    '',
    `${s.name}{username:'${u}', pin:'${P}'}`,
    '',
    o
  ]
}

