function(context, args) // s:#s.priv.corp, reset:false, debug:false
{
  const l = #s.scripts.lib()
  // Reset all to checked:false if flag set
  if (args.reset) {
    l.log('Resetting checked flag')
    let result = #db.u({SID:'t3_usernames'}, {$set:{checked:false}}, {multi:true})
    l.log(result)
  }

  // Get usernames that haven't been checked
  const usernames = #db.f({SID:'t3_usernames',checked:false}, {username:1, checked:1, _id:0}).array()
  l.log(`Found ${usernames.length} unchecked users`)
  // Valid username will return 'please provide pin as text', checking each individually to account for corruption
  const r = /please|provide|pin|as|text/
  let valid = []
  // eslint-disable-next-line no-unused-vars
  let out

  for (let user of usernames) {
    // If script has at least 750ms remaining before 5000ms limit, check if valid
    if (l.can_continue_execution(750)) {
      l.log(`username: ${user.username}, checked: ${user.checked}`)
      if (r.test(out = args.s.call({username:user.username}).toString().toLowerCase())) {
        l.log(`${user.username} is valid, adding to array`)
        valid.push(user.username)
      }
      // Update DB so user isn't checked again until reset
      l.log('Setting checked=true')
      #db.u({SID:'t3_usernames',username:user.username},{$set:{checked:true}})
    }
  }

  return args.debug ? [
    l.get_log(),
    '',
    'valid usernames:',
    valid.join(',')
  ] : [
    'valid usernames:',
    valid.join(',')
  ]
}
