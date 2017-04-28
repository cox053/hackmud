function (context, args) // t:#s.user.loc, a: {args}
{
  const l = #s.scripts.lib()
  const r = /--/

  let out
  let success = false

  do {
    out = args.t.call(args.a)
    l.log(out)
  }
  // If less than 750ms remains in 5000ms time limit, immediately stop running to return the current progress before timeout
  while (l.can_continue_execution(750) && r.test(out))

  return {
    ok: success,
    msg: out
  }
}
